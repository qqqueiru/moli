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
    #backgroundImg;
    #cameraWallLeft = new Wall(-1, new Segment({x: 0, y: 0}, {x: 0, y: 10800}), false);
    #cameraWallRight = new Wall(-2, new Segment({x: 0, y: 0}, {x: 0, y: 10800}), false);
    #bgSprites = [];  // Includes any complementary sprite (OnceSprite, LoopSprite, StaticSprite...) the sublevel may have
    #fgSprites = [];  // Background sprites will be drawn under the characters, and foreground ones will be drawn over.
    #collectables = [];

    _triggers = [];

    _camera = new Camera();

    _levelMusicId = "silence";

    constructor() {
    }

    setLevelMusicId(levelMusicId) {
        this._levelMusicId = levelMusicId;
    }

    setBackgroundImg(backgroundImg) {
        this.#backgroundImg = backgroundImg;
        const w = this.#backgroundImg.getTotalWidth();
        const h = this.#backgroundImg.getTotalHeight();
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

    getDeadNpcCount() {
        let count = 0;
        for (const npc of this.#npcs) {
            count += npc.getCurrentState() === "DEAD";
        }
        return count;
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
        const previousBotTip = character.getPreviousBotTip();
        for (const availablePlatformId of availablePlatformIds) {
            const platform = this.#platforms.get(availablePlatformId);
            if (platform.characterIsFar(character.getPos())) {
                continue;
            }
            const bottomSegment = platform.getSegment();
            if (!Segment.doIntersect(characterFloorRayCast, bottomSegment)) {
                continue;
            }
            intersection = Segment.pointIntersection(characterSegment, bottomSegment);
            lastPlatformTouchedId = availablePlatformId;
            if (intersection === null) {continue;}
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
            AudioManager.stopLoop(this._levelMusicId);
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
        if (this._player.getCurrentState() != "ALIVE") {
            return;
        }
        for (const npc of this.#npcs) {
            const isInScreenX = 2 * Math.abs(this._camera.getPos().x - npc.getPos().x) < GameScreen.width;
            const isInScreenY = 2 * Math.abs(this._camera.getPos().y - npc.getPos().y) < GameScreen.height;
            const isInScreen = isInScreenX && isInScreenY;

            let isCloseToPlayer = false;
            if (isInScreen) {
                isCloseToPlayer = npc.checkCloseToPlayer(this._player.getPos());
            }
            if (!npc.isActivated()) {
                continue;
            }
            if (npc.getCurrentState() != "ALIVE") {
                continue;
            }
            npc.setLookingUp(false);
            npc.dontMove();
            npc.setCrouched(false);
            npc.setFaceDirection(this._player.getPos().x > npc.getPos().x ? "right" : "left");
            if (this._player.getPos().x - npc.getPos().x > npc.getSafetyDistance() + 1) {
                npc.moveRight();
            }

            if (this._player.getPos().x - npc.getPos().x < -npc.getSafetyDistance() - 1) {
                npc.moveLeft();
            }

            if (Date.now() % npc.getJumpRate() < 20 && 
                !this._player.isJumping() && 
                this._player.getPos().y < npc.getPos().y - 200) {
                npc.startJump();
            }

            if (Date.now() % npc.getShootRate() < 20 && isCloseToPlayer && isInScreen) {
                const enemyProjectilesDontSaturateScreen = this.#enemyProjectiles.length < 10;
                const projectile = npc.shoot();
                if (projectile && enemyProjectilesDontSaturateScreen) {
                    projectile.setWalls(this.#walls);
                    this.#enemyProjectiles.push(projectile);
                }
                // const enemyGrenadesDontSaturateScreen = this.#enemyGrenades.length < 10;
                // const grenade = npc.throwGrenade();
                // if (grenade && enemyGrenadesDontSaturateScreen) {
                //     grenade.setPlatforms(this.#platforms);
                //     grenade.setWalls(this.#walls);
                //     this.#enemyGrenades.push(grenade);
                // }
            }
        }
    }

    updateProjectiles() {
        const nPlayerProjectiles = this.#playerProjectiles.length;
        for (let i = nPlayerProjectiles - 1; i >= 0; --i) {
            const projectile = this.#playerProjectiles[i];
            projectile.update();
            if (projectile.isBeyondLimits(this._camera.getPos())) {
                this.#playerProjectiles.splice(i, 1);
                continue;
            }
            const hitWallPoint = projectile.getHitWallPoint();
            if (hitWallPoint != null) {
                this.#playerProjectiles.splice(i, 1);
                this.#fgSprites.push(projectile.getHitWallOnceSprite());
                continue;
            }
            const activatedNpcs = this.#npcs.filter((npc) => npc.isActivated());
            if (projectile.checkHit(activatedNpcs, ["SPAWNING", "ALIVE"])) {  // NOTE: Quizás el proyectil pueda impactar a más de un personaje a la vez. Por el momento si impacta en uno, desaparece.
                this.#playerProjectiles.splice(i, 1);
                this.#fgSprites.push(projectile.getHitCharacterOnceSprite());
                continue;
            }
        }

        const nEnemyProjectiles = this.#enemyProjectiles.length;
        for (let i = nEnemyProjectiles - 1; i >= 0; --i) {
            const projectile = this.#enemyProjectiles[i];
            projectile.update();
            if (projectile.isBeyondLimits(this._camera.getPos())) {
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
            if (grenade.isBeyondLimits(this._camera.getPos())) {
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
            if (grenade.isBeyondLimits(this._camera.getPos())) {
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
        this.#cameraWallLeft.moveTo(this._camera.getPos().addConst(new Point(-GameScreen.width / 2 - 40, 0)));
        this.#cameraWallRight.moveTo(this._camera.getPos().addConst(new Point(GameScreen.width / 2 + 40, 0)));
    }

    update() {
        if (!AudioManager.isPlaying(this._levelMusicId)) {
            AudioManager.playLoop(this._levelMusicId);
        }

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

        this.#backgroundImg.draw(ctx, this._camera.getPos());

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

        // Debug triggers
        for (const trigger of this._triggers) {
            // trigger.draw(ctx, this._camera.getPos());  // Big ellipse drawings are slow for some reason in Firefox
        }

        for (const collectable of this.#collectables) {
            collectable.draw(ctx, this._camera.getPos());
        }

        // Debug camera
        // this._camera.draw(ctx);
    }
}