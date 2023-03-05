class SubLevel {
    #platforms = new Map();  // Characters can walk over these segments
    #walls = new Map();  // Characters cannot trespass walls
    #topSegments = [];  // Characters can't go above these segments
    #leftSegments = [];
    #rightSegments = [];
    _player;
    #npcs = [];
    #upBuffer = [];
    #playerProjectiles = [];  // Lista de proyectiles presentes en el subnivel...
    #enemyProjectiles = [];
    #playerGrenades = [];  // Lista de granadas presentes en el subnivel...
    #enemyGrenades = [];
    #backgroundImg = "";
    #cameraWallLeft = new Wall(-1, new Segment({x: 0, y: 0}, {x: 0, y: 1080}), false);
    #cameraWallRight = new Wall(-2, new Segment({x: 0, y: 0}, {x: 0, y: 1080}), false);
    #bgSprites = [];  // Includes any complementary sprite (OnceSprite, LoopSprite, StaticSprite...) the sublevel may have
    #fgSprites = [];  // Background sprites will be drawn under the characters, and foreground ones will be drawn over.
    #collectables = [];

    _triggers = [];

    _camera = new Camera();

    constructor() {
    }

    setBackgroundImg(imgId) {
        this.#backgroundImg = ImageManager.getImage(imgId);
        const w = this.#backgroundImg.width;
        const h = this.#backgroundImg.height;
        this._camera.setSubLevelDimensions(w, h);
    }

    setPlatforms(platforms) {
        this.#platforms = platforms;
    }

    setWalls(walls) {
        this.#walls = walls;
    }

    setBgSprites(bgSprites) {
        this.#bgSprites = bgSprites;
    }

    setFgSprites(fgSprites) {
        this.#fgSprites = fgSprites;
    }

    setCollectables(collectables) {
        this.#collectables = collectables;
    }

    setPlayer(player) {
        this._player = player;
        this._player.setPlatforms(this.#platforms);
        const playerWalls = new Map(this.#walls);
        this._player.setWalls(playerWalls);
        playerWalls.set(-1, this.#cameraWallLeft);
        playerWalls.set(-2, this.#cameraWallRight);

        this._player.updateAvailablePlatforms();
    }

    setNpcs(npcs) {
        this.#npcs = npcs;
        for (const npc of this.#npcs) {
            npc.setPlatforms(this.#platforms);
            npc.setWalls(this.#walls);
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
        let comingFromTop = false;
        for (const availablePlatformId of availablePlatformIds) {
            const platform = this.#platforms.get(availablePlatformId);
            const bottomSegment = platform.getSegment();
            if (!Segment.doIntersect(characterFloorRayCast, bottomSegment)) {
                continue;
            }
            intersection = Segment.pointIntersection(characterSegment, bottomSegment);
            lastPlatformTouchedId = availablePlatformId;
            if (intersection === null) {continue;}
            const previousBotTip = character.getPreviousBotTip();
            comingFromTop = platform.isPointAbovePlatform(previousBotTip);
            break;
        }
        if (intersection !== null) {
            // Special case when jumping from below to a superior platform
            if (!comingFromTop && !character.isMovingDown() && lastPlatformTouchedId != character.getLastPlatformTouchedId()) { return; }

            const delta = intersection.substractConst(characterSegment.p2);
            character.moveRel(delta);
            character.setLastPlatformTouchedId(lastPlatformTouchedId);
            character.setVy(0);
            character.setCoyoteIterations(15);
        }
        if (character.getCoyoteIterations() > 0) {
            character.setCanJump(true);
        }
    }

    #reviseCharacterPosWithPlatforms(character) {
        this.#reviseCharacterPosWithBottomPlatforms(character);
    }

    updatePlayerControl() {
        if (this.#upBuffer.length > 0 && Date.now() - this.#upBuffer[0] > 250) {
            this.#upBuffer.shift();
        }
        if (inputs.get("escape")?.consumeIfActivated()) {
            // Sorry no pause buffering
            GameScreen.previousScreen = GameScreen.currentScreen;
            GameScreen.currentScreen = new PauseMenu();
        }
        if (this._player.getCurrentState() != "ALIVE") {
            return;
        }
        if (inputs.get("w")?.isPressed()) {
            this._player.setLookingUp(true);
        } else {
            this._player.setLookingUp(false);
        }
        this._player.dontMove();
        if (inputs.get("a")?.isPressed()) {
            this._player.moveLeft();
        }
        if (inputs.get("d")?.isPressed()) {
            this._player.moveRight();
        }
        if (inputs.get("j")?.consumeIfActivated()) {
            this._camera.shake();
            const projectile = this._player.shoot();
            if (projectile) {
                projectile.setWalls(this.#walls);
                this.#playerProjectiles.push(projectile);
            }
        }
        if (inputs.get("l")?.consumeIfActivated()) {
            const grenade = this._player.throwGrenade();
            if (grenade) {
                grenade.setPlatforms(this.#platforms);
                grenade.setWalls(this.#walls);
                this.#playerGrenades.push(grenade);
            }
        }
        if (inputs.get("k")?.consumeIfActivated()) {
            this.#upBuffer.push(Date.now());
        }
        if (this.#upBuffer.length > 0) {
            const startedJump = this._player.startJump();
            if (startedJump) {
                this.#upBuffer.shift();
            }
        }
        if (inputs.get("k")?.isPressed()) {
            // this._player.jump();
            this._player.setCrouched(false);
        } else {
            // this._player.stopJumping();
            if (inputs.get("s")?.isPressed()) {
                this._player.setCrouched(true);
            } else {
                this._player.setCrouched(false);
            }
        }
    }

    updateNpcAi() {
        // testing
        for (const npc of this.#npcs) {
            if (npc.getCurrentState() != "ALIVE") {
                continue;
            }
            npc.setLookingUp(false);
            npc.dontMove();
            npc.setCrouched(false);
            npc.setFaceDirection(this._player.getPos().x > npc.getPos().x ? "right" : "left");
            if (this._player.getPos().x - npc.getPos().x > 300) {
                npc.moveRight();
            }

            if (this._player.getPos().x - npc.getPos().x < -300) {
                npc.moveLeft();
            }

            // if (Date.now() % 2000 < 20) {
            //     const projectile = npc.shoot();
            //     if (projectile) {
            //         projectile.setWalls(this.#walls);
            //         this.#enemyProjectiles.push(projectile);
            //     }
            //     const grenade = npc.throwGrenade();
            //     if (grenade) {
            //         grenade.setPlatforms(this.#platforms);
            //         grenade.setWalls(this.#walls);
            //         this.#enemyGrenades.push(grenade);
            //     }
            // }
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
            const hitWallPoint = projectile.getHitWallPoint();
            if (hitWallPoint != null) {
                this.#playerProjectiles.splice(i, 1);
                this.#fgSprites.push(projectile.getHitWallOnceSprite());
                continue;
            }
            if (projectile.checkHit(this.#npcs, ["SPAWNING", "ALIVE"])) {  // NOTE: Quizás el proyectil pueda impactar a más de un personaje a la vez. Por el momento si impacta en uno, desaparece.
                this.#playerProjectiles.splice(i, 1);
                this.#fgSprites.push(projectile.getHitCharacterOnceSprite());
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
            const hitWallPoint = projectile.getHitWallPoint();
            if (hitWallPoint != null) {
                this.#enemyProjectiles.splice(i, 1);
                this.#fgSprites.push(projectile.getHitWallOnceSprite());
                continue;
            }
            if (projectile.checkHit([this._player], ["ALIVE"])) {
                this.#enemyProjectiles.splice(i, 1);
                this.#fgSprites.push(projectile.getHitCharacterOnceSprite());
                continue;
            }
        }
    }

    updateGrenades() {
        const nPlayerGrenades = this.#playerGrenades.length;
        for (let i = nPlayerGrenades - 1; i >= 0; --i) {
            const grenade = this.#playerGrenades[i];
            grenade.update();
            if (grenade.isBeyondLimits()) {
                this.#playerGrenades.splice(i, 1);
                continue;
            }
            if (grenade.checkHit(this.#npcs, ["SPAWNING", "ALIVE"]) || grenade.hasStopped()) {
                grenade.explode(this.#npcs, ["SPAWNING", "ALIVE"]);
                this.#playerGrenades.splice(i, 1);
                this.#fgSprites.push(grenade.getExplosionOnceSprite());
                continue;
            }
        }

        const nEnemyGrenades = this.#enemyGrenades.length;
        for (let i = nEnemyGrenades - 1; i >= 0; --i) {
            const grenade = this.#enemyGrenades[i];
            grenade.update();
            if (grenade.isBeyondLimits()) {
                this.#enemyGrenades.splice(i, 1);
                continue;
            }
            if (grenade.checkHit([this._player], ["ALIVE"]) || grenade.hasStopped()) {
                grenade.explode([this._player], ["ALIVE"]);
                this.#enemyGrenades.splice(i, 1);
                this.#fgSprites.push(grenade.getExplosionOnceSprite());
                continue;
            }
        }
    }

    updateCollectables() {
        const nCollectables = this.#collectables.length;
        for (let i = nCollectables - 1; i >= 0; --i) {
            const collectable = this.#collectables[i];
            collectable.update();
            if (collectable.checkHit(this._player, ["ALIVE"])) {
                this.#collectables.splice(i, 1);
                continue;
            }
        }
    }

    #moveCameraWalls() {
        this.#cameraWallLeft.moveTo(this._camera.getPos().addConst(new Point(-GameScreen.width / 2, 0)));
        this.#cameraWallRight.moveTo(this._camera.getPos().addConst(new Point(GameScreen.width / 2, 0)));
    }

    update() {
        this.#moveCameraWalls();

        this.#reviseCharacterPosWithPlatforms(this._player);
        for (const npc of this.#npcs) {
            this.#reviseCharacterPosWithPlatforms(npc);
        }

        this.updatePlayerControl();
        this.updateNpcAi();
        this.updateProjectiles();
        this.updateGrenades();
        this.updateCollectables();

        this._player.update();
        for (const npc of this.#npcs) {
            npc.update();
        }

        if (this._player.isDead()) {
            this.onPlayerDeath();
        }

        const nTriggers = this._triggers.length;
        for (let i = nTriggers - 1; i >= 0; --i) {
            this._triggers[i].update();
            if (this._triggers[i].isDone()) {
                this._triggers.splice(i, 1);
            }
        }

        this._camera.update();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.clearRect(0, 0, GameScreen.width, GameScreen.height);
        ctx.drawImage(
            this.#backgroundImg,
            -GameScreen.width / 2 + this._camera.getPos().x,
            -GameScreen.height / 2 + this._camera.getPos().y,
            GameScreen.width,
            GameScreen.height,
            0,
            0,
            GameScreen.width,
            GameScreen.height
        );

        const bgSpritesLength = this.#bgSprites.length;
        for (let i = bgSpritesLength - 1; i >= 0; --i) {
            this.#bgSprites[i].draw(this._camera.getPos());
            if (this.#bgSprites[i].isFinished()) {
                this.#bgSprites.splice(i, 1);
                continue;
            }
        }

        for (const npc of this.#npcs) {
            npc.draw(ctx, this._camera.getPos());
        }

        this._player.draw(ctx, this._camera.getPos());

        // Debug floor segments
        for (const [id, platform] of this.#platforms) {
            // platform.draw(ctx, this._camera.getPos());
        }

        // Debug wall segments
        for (const [id, wall] of this.#walls) {
            wall.draw(ctx, this._camera.getPos());
        }
        this.#cameraWallLeft.draw(ctx, this._camera.getPos());
        this.#cameraWallRight.draw(ctx, this._camera.getPos());

        const fgSpritesLength = this.#fgSprites.length;
        for (let i = fgSpritesLength - 1; i >= 0; --i) {
            this.#fgSprites[i].draw(this._camera.getPos());
            if (this.#fgSprites[i].isFinished()) {
                this.#fgSprites.splice(i, 1);
                continue;
            }
        }

        // Los proyectiles y granadas se dibujan por encima de todo
        for (const projectile of this.#enemyProjectiles) {
            projectile.draw(ctx, this._camera.getPos());
        }
        for (const grenade of this.#enemyGrenades) {
            grenade.draw(ctx, this._camera.getPos());
        }
        for (const projectile of this.#playerProjectiles) {
            projectile.draw(ctx, this._camera.getPos());
        }
        for (const grenade of this.#playerGrenades) {
            grenade.draw(ctx, this._camera.getPos());
        }

        for (const trigger of this._triggers) {
            trigger.draw(ctx, this._camera.getPos());
        }

        for (const collectable of this.#collectables) {
            collectable.draw(ctx, this._camera.getPos());
        }

        this._camera.draw(ctx);
    }
}