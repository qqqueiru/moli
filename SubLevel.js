class SubLevel {
    #platforms;
    #topSegments;
    #leftSegments;
    #rightSegments;
    #player;
    #npcs;
    #upBuffer = [];
    #cameraPos;
    #lastIntersection;  // TODO depurando...
    #playerProjectiles = [];  // Lista de proyectiles presentes en el subnivel...
    #enemyProjectiles = [];
    #grenades = [];  // Lista de granadas presentes en el subnivel...
    #backgroundImg = ImageManager.getImage("background_test_00");
    constructor() {
        this.#platforms = new Map();  // Characters can walk over these segments
        this.#topSegments = [];  // Characters can't go above these segments
        this.#leftSegments = [];  // blablabla
        this.#rightSegments = [];
        this.#player = new Player();  // TODO planteamiento
        this.#npcs = [];
        this.#npcs.push(new NPC(new Point(500, 400)));  // Test
        this.#cameraPos = new Point(0, 0);

        // Debugging...
        let i = 0;
        this.#platforms.set(i, new Platform(i, new Segment({x: 200, y: 450}, {x: 800, y: 700})));
        ++i;
        this.#platforms.set(i, new Platform(i, new Segment({x: 800, y: 700}, {x: 1700, y: 600})));
        ++i;

        this.#player.setPlatforms(this.#platforms);
        this.#player.setWeapon(new Pistol(this.#player));
        this.#player.setGrenadeThrower(new BasicGrenadeThrower(this.#player));
        this.#player.updateAvailablePlatforms();

        for (const npc of this.#npcs) {
            npc.setPlatforms(this.#platforms);
            npc.setWeapon(new Pistol(npc));
            npc.setGrenadeThrower(new BasicGrenadeThrower(npc));
            npc.updateAvailablePlatforms();
        }
    }
    #reviseCharacterPosWithBottomPlatforms(character) {
        let intersection = null;
        let lastPlatformTouchedId = null;
        const characterSegment = character.getVSegmentAbs();
        const characterFloorRayCast = character.getFloorRayCast();
        const availablePlatformIds = character.getAvailablePlatformIds();
        if (character.getCoyoteIterations() <= 0) {  // AKA Coyote Time
            character.setCanJump(false);  // Si no está tocando el suelo, no puede saltar
        }
        for (const availablePlatformId of availablePlatformIds) {
            const platform = this.#platforms.get(availablePlatformId);
            const bottomSegment = platform.getSegment();
            if (!Segment.doIntersect(characterFloorRayCast, bottomSegment)) {
                continue;
            }
            intersection = Segment.pointIntersection(characterSegment, bottomSegment);
            lastPlatformTouchedId = availablePlatformId;
            if (intersection === null) {continue;}
            break;
        }
        // Este bloque se comenta ya que no funciona, pero no sería necesario ya que los máximos en velocidad no permiten estas situaciones
        // if (intersection === null) {
        //     // Hay que ver si interseca la interpolación
        //     const lerpSegment = character.getBotTipLerpSegment();  // Quizás la interpolación sea más segura haciéndola entre centros directamente
        //     for (const availablePlatformId of availablePlatformIds) {
        //         const platform = this.#platforms.get(availablePlatformId);
        //         const bottomSegment = platform.getSegment();
        //         if (!Segment.doIntersect(lerpSegment, bottomSegment)) {
        //             continue;
        //         }
        //         intersection = Segment.pointIntersection(lerpSegment, bottomSegment) - 1;
        //         lastPlatformTouchedId = availablePlatformId;
        //         alert("OJO interseccion de interpolacion con bottip!");
        //         break;
        //     }
        // }
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

    #reviseCharacterPosWithPlatforms(character) {
        this.#reviseCharacterPosWithBottomPlatforms(character);
    }

    updatePlayerControl() {
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
                this.#playerProjectiles = this.#playerProjectiles.concat(projectile);
            }
        }
        if (inputs.get("l")?.consumeIfActivated()) {
            const grenade = this.#player.throwGrenade();
            if (grenade) {
                grenade.setPlatforms(this.#platforms);
                this.#grenades = this.#grenades.concat(grenade);
            }
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
    }

    updateNpcAi() {
        if (Date.now() % 2000 < 20) {
            // testing
            for (const npc of this.#npcs) {
                const projectile = npc.shoot();
                if (projectile) {
                    this.#enemyProjectiles = this.#enemyProjectiles.concat(projectile);
                }
            }
        }
    }

    updateProjectiles() {
        const nPlayerProjectiles = this.#playerProjectiles.length;
        for (let i = nPlayerProjectiles - 1; i >= 0; --i) {
            const projectile = this.#playerProjectiles[i];
            projectile.update();
            if (projectile.isBeyondLimits()) {
                this.#playerProjectiles.splice(i, 1);
            }
            projectile.checkHit();  // TODO, comprobar si golpeó a alguien. No necesariamente el proyectil desaparece al tocar a alguien...
        }

        const nEnemyProjectiles = this.#enemyProjectiles.length;
        for (let i = nEnemyProjectiles - 1; i >= 0; --i) {
            const projectile = this.#enemyProjectiles[i];
            projectile.update();
            if (projectile.isBeyondLimits()) {
                this.#enemyProjectiles.splice(i, 1);
            }
            projectile.checkHit();  // TODO, comprobar si golpeó a alguien. No necesariamente el proyectil desaparece al tocar a alguien...
        }
    }

    updateGrenades() {
        const nGrenades = this.#grenades.length;
        for (let i = nGrenades - 1; i >= 0; --i) {
            const grenade = this.#grenades[i];
            grenade.update();
            if (grenade.isBeyondLimits()) {
                this.#grenades.splice(i, 1);
            }
            grenade.checkHit();  // TODO, comprobar si golpeó a alguien. No necesariamente el proyectil desaparece al tocar a alguien...
        }
    }

    update() {
        this.#reviseCharacterPosWithPlatforms(this.#player);
        for (const npc of this.#npcs) {
            this.#reviseCharacterPosWithPlatforms(npc);
        }
        if (this.#upBuffer.length > 0 && Date.now() - this.#upBuffer[0] > 250) {
            this.#upBuffer.shift();
        }

        this.updatePlayerControl();
        this.updateNpcAi();
        this.updateProjectiles();
        this.updateGrenades();

        this.#player.update();
        for (const npc of this.#npcs) {
            npc.update();
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.clearRect(0, 0, GameScreen.width, GameScreen.height);
        ctx.drawImage(this.#backgroundImg, 0, 0, GameScreen.width, GameScreen.height);

        this.#player.draw(ctx, this.#cameraPos);

        for (const npc of this.#npcs) {
            npc.draw(ctx);
        }

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

        // Los proyectiles y granadas se dibujan por encima de todo
        for (const projectile of this.#enemyProjectiles) {
            projectile.draw(ctx);
        }
        for (const projectile of this.#playerProjectiles) {
            projectile.draw(ctx);
        }
        for (const grenade of this.#grenades) {
            grenade.draw(ctx);
        }
    }
}