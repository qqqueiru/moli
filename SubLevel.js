class SubLevel {
    #platforms;
    #topSegments;
    #leftSegments;
    #rightSegments;
    #player;
    #upBuffer = [];
    #cameraPos;
    #lastIntersection;  // TODO depurando...
    #projectiles = [];  // Lista de proyectiles presentes en el subnivel...
    constructor() {
        this.#platforms = new Map();  // Characters can walk over these segments
        this.#topSegments = [];  // Characters can't go above these segments
        this.#leftSegments = [];  // blablabla
        this.#rightSegments = [];
        this.#player = new Character();  // TODO planteamiento
        this.#cameraPos = new Point(0, 0);

        // Debugging...
        let i = 0;
        this.#platforms.set(i, new Platform(i, new Segment({x: 200, y: 900}, {x: 1700, y: 700})));
        ++i;
        this.#platforms.set(i, new Platform(i, new Segment({x: 200, y: 500}, {x: 1700, y: 600})));
        ++i;

        this.#player.setPlatforms(this.#platforms);
        this.#player.setWeapon(new Pistol(this.#player));
        this.#player.updateAvailablePlatforms();
    }
    #reviseCharacterPosWithPlatforms(character) {
        let intersection = null;
        let lastPlatformTouchedId = null;
        const characterSegment = character.getVSegmentAbs();
        const availablePlatformIds = character.getAvailablePlatformIds();
        if (character.getCoyoteIterations() <= 0) {  // AKA Coyote Time
            character.setCanJump(false);  // Si no está tocando el suelo, no puede saltar
        }
        for (const availablePlatformId of availablePlatformIds) {
            const platform = this.#platforms.get(availablePlatformId);
            const bottomSegment = platform.getSegment();
            if (!Segment.doIntersect(characterSegment, bottomSegment)) {
                continue;
            }
            intersection = Segment.pointIntersection(characterSegment, bottomSegment);
            lastPlatformTouchedId = availablePlatformId;
            if (intersection === null) {continue;}
            break;
        }
        if (intersection === null) {
            // Hay que ver si interseca la interpolación
            const lerpSegment = character.getBotTipLerpSegment();  // Quizás la interpolación sea más segura haciéndola entre centros directamente
            for (const availablePlatformId of availablePlatformIds) {
                const platform = this.#platforms.get(availablePlatformId);
                const bottomSegment = platform.getSegment();
                if (!Segment.doIntersect(lerpSegment, bottomSegment)) {
                    continue;
                }
                intersection = Segment.pointIntersection(lerpSegment, bottomSegment);
                lastPlatformTouchedId = availablePlatformId;
                alert("OJO interseccion de interpolacion con bottip!");
                break;
            }
        }
        if (intersection !== null) {
            this.#lastIntersection = intersection;
            if (!character.isMovingDown()) { return; }

            const delta = intersection.substractConst(characterSegment.p2);
            character.moveRel(delta);
            character.setLastPlatformTouchedId(lastPlatformTouchedId);
            character.setVy(0);
            character.setCoyoteIterations(15);
            // if (character === this.#player && inputs.get("k")?.consumeIfActivated()) {
            //     character.setCanJump(true);
            // }
        }
        if (character.getCoyoteIterations() > 0) {
            character.setCanJump(true);
        }
    }

    update() {
        this.#reviseCharacterPosWithPlatforms(this.#player);
        if (this.#upBuffer.length > 0 && Date.now() - this.#upBuffer[0] > 250) {
            this.#upBuffer.shift();
        }
        if (inputs.get("w")?.isPressed()) {
            this.#player.setLookingUp(true);
        } else {
            this.#player.setLookingUp(false);
        }
        this.#player.dontMove();
        if (inputs.get("a")?.isPressed()) {
            this.#player.moveLeft();
        }
        if (inputs.get("d")?.isPressed()) {
            this.#player.moveRight();
        }
        if (inputs.get("j")?.consumeIfActivated()) {
            const projectile = this.#player.shoot();
            if (projectile) {
                this.#projectiles = this.#projectiles.concat(projectile);
            }
        }
        if (inputs.get("l")?.consumeIfActivated()) {
            this.#player.throwGrenade();
        }
        if (inputs.get("k")?.consumeIfActivated()) {
            this.#upBuffer.push(Date.now());
        }
        if (this.#upBuffer.length > 0) {
            const startedJump = this.#player.startJump();
            if (startedJump) {
                this.#upBuffer.shift();
            }
        }
        if (inputs.get("k")?.isPressed()) {
            // this.#player.jump();
            this.#player.setCrouched(false);
        } else {
            // this.#player.stopJumping();
            if (inputs.get("s")?.isPressed()) {
                this.#player.setCrouched(true);
            } else {
                this.#player.setCrouched(false);
            }
        }

        const nProjectiles = this.#projectiles.length;
        for (let i = nProjectiles - 1; i >= 0; --i) {
            const projectile = this.#projectiles[i];
            projectile.update();
            if (projectile.isBeyondLimits()) {
                this.#projectiles.splice(i, 1);
            }
            projectile.checkHit();  // TODO, comprobar si golpeó a alguien. No necesariamente el proyectil desaparece al tocar a alguien...
        }
        this.#player.update();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.clearRect(0, 0, GameScreen.width, GameScreen.height);
        ctx.rect(0, 0, GameScreen.width, GameScreen.height);
        ctx.fillStyle = "grey";
        ctx.fill();

        this.#player.draw(ctx, this.#cameraPos);

        // Dibujado de los segmentos del suelo
        ctx.beginPath();
        for (const [id, platform] of this.#platforms) {
            const segment = platform.getSegment();
            ctx.moveTo(segment.p1.x, segment.p1.y);
            ctx.lineTo(segment.p2.x, segment.p2.y);
        }
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.stroke();

        // Dibujando el último punto de intersección
        if (this.#lastIntersection) {
            ctx.beginPath();
            ctx.rect(this.#lastIntersection.x-5, this.#lastIntersection.y-5, 10, 10);
            ctx.fillStyle = "green";
            ctx.fill();
        }

        // Los proyectiles se dibujan por encima de todo
        for (const projectile of this.#projectiles) {
            projectile.draw(ctx);
        }
    }
}