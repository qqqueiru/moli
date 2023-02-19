class SubLevel {
    #platforms;
    #topSegments;
    #leftSegments;
    #rightSegments;
    #player;
    #npcs;
    #upBuffer = [];
    #cameraPos;
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
        this.#cameraPos = this.#player.getPos();  // Testing camera pos

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
        // testing
        for (const npc of this.#npcs) {
            npc.setLookingUp(false);
            npc.dontMove();
            npc.setCrouched(false);
            npc.setFaceDirection(this.#player.getPos().x > npc.getPos().x ? "right" : "left");
            if (this.#player.getPos().x - npc.getPos().x > 300) {
                npc.moveRight();
            }

            if (this.#player.getPos().x - npc.getPos().x < -300) {
                npc.moveLeft();
            }

            if (Date.now() % 2000 < 20) {
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
                continue;
            }
            if (projectile.checkHit(this.#npcs)) {  // NOTE: Quizás el proyectil pueda impactar a más de un personaje a la vez. Por el momento si impacta en uno, desaparece.
                this.#playerProjectiles.splice(i, 1);
                continue;
            }
        }

        const nEnemyProjectiles = this.#enemyProjectiles.length;
        for (let i = nEnemyProjectiles - 1; i >= 0; --i) {
            const projectile = this.#enemyProjectiles[i];
            projectile.update();
            if (projectile.isBeyondLimits()) {
                this.#enemyProjectiles.splice(i, 1);
                continue;
            }
            if (projectile.checkHit([this.#player])) {
                this.#enemyProjectiles.splice(i, 1);
                continue;
            }
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
        ctx.drawImage(
            this.#backgroundImg,
            GameScreen.width / 2 - this.#cameraPos.x,
            GameScreen.height / 2 - this.#cameraPos.y,
            GameScreen.width,
            GameScreen.height
        );

        for (const npc of this.#npcs) {
            npc.draw(ctx, this.#cameraPos);
        }

        this.#player.draw(ctx, this.#cameraPos);

        // Debug floor segments
        ctx.beginPath();
        for (const [id, platform] of this.#platforms) {
            const segment = platform.getSegment();
            ctx.moveTo(segment.p1.x + GameScreen.width / 2 - this.#cameraPos.x, segment.p1.y + GameScreen.height / 2 - this.#cameraPos.y);
            ctx.lineTo(segment.p2.x + GameScreen.width / 2 - this.#cameraPos.x, segment.p2.y + GameScreen.height / 2 - this.#cameraPos.y);
        }
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.stroke();

        // Los proyectiles y granadas se dibujan por encima de todo
        for (const projectile of this.#enemyProjectiles) {
            projectile.draw(ctx, this.#cameraPos);
        }
        for (const projectile of this.#playerProjectiles) {
            projectile.draw(ctx, this.#cameraPos);
        }
        for (const grenade of this.#grenades) {
            grenade.draw(ctx, this.#cameraPos);
        }
    }
}