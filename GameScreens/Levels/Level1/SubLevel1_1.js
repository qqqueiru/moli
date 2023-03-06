class SubLevel1_1 extends SubLevel {
    #playerVxNorms = [];
    _inChurch = false;
    _targetPointChurch = new Point(7900, 3200);
    _inLavadero = false;
    _targetPointLavadero = new Point(11950, 3120);
    _inCaserio = false;
    _targetPointCaserio = new Point(16885, 1258);
    _inRoldans = false;
    _targetPointRoldans = new Point(18370, 1258);
    constructor() {
        super();
        {
            this.setBackgroundImg("sublevel1_1");
        }
        {
            let i = 0;  // Id must not be negative
            const platforms = new Map();
            // Main Route
            platforms.set(i, new Platform(i, new Segment({x: 191, y: 3098}, {x: 846, y: 3098})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 846, y: 3098}, {x: 1068, y: 3319})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 1068, y: 3319}, {x: 1189, y: 3319})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 1189, y: 3319}, {x: 1365, y: 3495})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 1365, y: 3495}, {x: 1506, y: 3552})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 1506, y: 3552}, {x: 1702, y: 3552})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 1702, y: 3552}, {x: 2064, y: 3761})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 2064, y: 3761}, {x: 3026, y: 3761})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 3026, y: 3761}, {x: 3457, y: 3512})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 3457, y: 3512}, {x: 12602, y: 3512})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 12602, y: 3512}, {x: 15366, y: 1518})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 15366, y: 1518}, {x: 20000, y: 1518})));
            ++i;

            // Additional platforms
            // Iglesia -413
            platforms.set(i, new Platform(i, new Segment({x: 7105, y: 2830}, {x: 7492, y: 2703})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 7492, y: 2703}, {x: 8299, y: 2886})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 7300, y: 2985}, {x: 8293, y: 2640})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 7037, y: 3147}, {x: 7289, y: 3147})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 6861, y: 3248}, {x: 8499, y: 3248})));
            ++i;
            // Lavadero
            platforms.set(i, new Platform(i, new Segment({x: 11807, y: 3295}, {x: 11881, y: 3295})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 11539, y: 3159}, {x: 11964, y: 3038})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 11964, y: 3038}, {x: 12385, y: 3159})));
            ++i;
            // Casas
            platforms.set(i, new Platform(i, new Segment({x: 4766, y: 2955}, {x: 5504, y: 2955})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 5568, y: 2964}, {x: 6191, y: 3194})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 6183, y: 3167}, {x: 6885, y: 3167})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 8540, y: 2926}, {x: 9330, y: 2926})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 9316, y: 3110}, {x: 9602, y: 3229})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 9607, y: 3184}, {x: 9660, y: 3083})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 9660, y: 3083}, {x: 9844, y: 3083})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 9844, y: 3083}, {x: 9912, y: 3184})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 9905, y: 2957}, {x: 10254, y: 2964})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 10254, y: 2964}, {x: 10557, y: 3112})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 10554, y: 2953}, {x: 11354, y: 2953})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 11330, y: 3228}, {x: 11502, y: 3228})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 16016, y: 1311}, {x: 16251, y: 1311})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 17145, y: 1311}, {x: 17380, y: 1311})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 16331, y: 1198}, {x: 17065, y: 1198})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 15878, y: 1012}, {x: 16694, y: 805})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 16694, y: 805}, {x: 17517, y: 1011})));
            ++i;
            // Casa Daspi
            platforms.set(i, new Platform(i, new Segment({x: 17655, y: 1061}, {x: 18013, y: 955})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 18013, y: 955}, {x: 18371, y: 1059})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 17638, y: 1342}, {x: 17676, y: 1342})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 17676, y: 1405}, {x: 17915, y: 1405})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 17915, y: 1304}, {x: 17953, y: 1304})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 18079, y: 1304}, {x: 18116, y: 1304})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 18079, y: 1405}, {x: 18343, y: 1405})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 18343, y: 1342}, {x: 18380, y: 1342})));
            ++i;
            this.setPlatforms(platforms);
        }
        {
            let i = 0;
            const walls = new Map();
            walls.set(i, new Wall(i, new Segment({x: 191, y: 0}, {x: 191, y: 10000}), false));
            ++i;
            walls.set(i, new Wall(i, new Segment({x: 20000, y: 0}, {x: 20000, y: 10000}), false));
            ++i;
            this.setWalls(walls);
        }
        {
            const player = new Player(new Point(400, 2700));
            player.setWeapon(new Pistol(player));
            player.setGrenadeThrower(new BasicGrenadeThrower(player));
            this.setPlayer(player);
            this._camera.setFirstPoint(player.getPos());
        }
        {
            const npcs = [];
            // npcs.push(new NPC(new Point(500, 400)));
            // npcs[npcs.length - 1].setWeapon(new Pistol(npcs[npcs.length - 1]));
            // npcs[npcs.length - 1].setGrenadeThrower(new BasicGrenadeThrower(npcs[npcs.length - 1]));
            this.setNpcs(npcs);

            // this._triggers.push(new HealthTrigger(npcs[0], 0, () => {
            //     alert("Example health trigger");
            // }));
            // this._triggers.push(
            //     new LocationTrigger(
            //         npcs[0], 
            //         new Ellipse(new Point(900, 800), 100, 100), 
            //         () => {
            //             GameScreen.currentScreen = new GameOverMenu();
            //             // alert("Example location trigger");
            //         }
            //     )
            // );
        }
        {
            // this._triggers.push(new TimeTrigger(600, () => {
            //     alert("Example trigger");
            // }));
        }
        {
            this._triggers.push(
                new LocationTrigger(
                    this._player, 
                    new Ellipse(new Point(7730, 3120), 750, 850), 
                    () => { this.pauseAtChurch(); }
                )
            );
        }
        {
            const bgSprites = [];
            bgSprites.push(new LoopSprite("agua_lavadero", 1, 2, 1, 5, GameScreen.ctx, new Point(11843, 3378)));
            bgSprites.push(new LoopSprite("moscas", 1, 5, 1, 5, GameScreen.ctx, new Point(7157, 3107)));
            this.setBgSprites(bgSprites);

            const fgSprites = [];
            fgSprites.push(new StaticSprite("casa_moli", 1, GameScreen.ctx, new Point(759.72519, 3198.9289)));
            fgSprites.push(new StaticSprite("terraza_caserio", 1, GameScreen.ctx, new Point(16700.30271, 1155.30786)));
            this.setFgSprites(fgSprites);
        }
        {
            // Collectables
            const collectables = [];
            collectables.push(new Can(new Point(991, 2807)));
            collectables.push(new Can(new Point(1138, 2723)));
            collectables.push(new Can(new Point(1268, 2807)));
            collectables.push(new Can(new Point(1384, 2924)));
            collectables.push(new Can(new Point(1500, 3040)));
            collectables.push(new Can(new Point(1515, 3477)));
            collectables.push(new Can(new Point(1716, 3477)));
            collectables.push(new Can(new Point(1901, 3576)));
            collectables.push(new Can(new Point(2081, 3649)));
            this.setCollectables(collectables);
        }

    }

    pauseAtChurch() {
        this._inChurch = true;
        this._camera.setTargetPoint(this._targetPointChurch);
        this._triggers.push(
            new LocationTrigger(
                this._player,
                new Ellipse(new Point(7730, 3120), 50, 50),
                () => { this.resumeFromChurch(); }
            )
        );
    }

    resumeFromChurch() {
        this._inChurch = false;
        this._camera.setTargetPoint(this._player.getPos());
        this._triggers.push(
            new LocationTrigger(
                this._player, 
                new Ellipse(new Point(11950, 3120), 750, 850), 
                () => { this.pauseAtLavadero(); }
            )
        );
    }

    pauseAtLavadero() {
        this._inLavadero = true;
        this._camera.setTargetPoint(this._targetPointLavadero);
        this._triggers.push(
            new LocationTrigger(
                this._player,
                new Ellipse(new Point(11950, 3120), 50, 50),
                () => { this.resumeFromLavadero(); }
            )
        );
    }

    resumeFromLavadero() {
        this._inLavadero = false;
        this._camera.setTargetPoint(this._player.getPos());
        this._triggers.push(
            new LocationTrigger(
                this._player, 
                new Ellipse(new Point(16685, 1258), 750, 850), 
                () => { this.pauseAtCaserio(); }
            )
        );
    }

    pauseAtCaserio() {
        this._inCaserio = true;
        this._camera.setTargetPoint(this._targetPointCaserio);
        this._triggers.push(
            new LocationTrigger(
                this._player,
                new Ellipse(new Point(16685, 1258), 50, 50),
                () => { this.resumeFromCaserio(); }
            )
        );
    }

    resumeFromCaserio() {
        this._inCaserio = false;
        this._camera.setTargetPoint(this._player.getPos());
        this._triggers.push(
            new LocationTrigger(
                this._player, 
                new Ellipse(new Point(18370, 1258), 750, 850), 
                () => { this.pauseAtRoldans(); }
            )
        );
    }

    pauseAtRoldans() {
        this._inRoldans = true;
        this._camera.setTargetPoint(this._targetPointRoldans);
        this._triggers.push(
            new LocationTrigger(
                this._player,
                new Ellipse(new Point(18370, 1258), 50, 50),
                () => { this.resumeFromRoldans(); }
            )
        );
    }

    resumeFromRoldans() {
        alert("GAME OVER...");
        this._inRoldans = false;
        this._camera.setTargetPoint(this._player.getPos());
    }

    update() {
        super.update();

        // Update camera offset
        // X Offset
        const playerVx = this._player.getVx();
        const playerVxNorm = Math.sign(playerVx);
        this.#playerVxNorms.push(playerVxNorm);
        if (this.#playerVxNorms.length > 60) {
            const vx = this.#playerVxNorms.shift();
            if (vx != 0 && this.#playerVxNorms.every(v => v === vx)) {
                if (vx < 0) {
                    if (this._camera.offset.x > -700) {
                        this._camera.offset.x -= 10;
                    }
                } else if (vx > 0) {
                    if (this._camera.offset.x < 700) {
                        this._camera.offset.x += 10;
                    }
                }
            } else {
                if (this._camera.offset.x > 0) {
                    this._camera.offset.x -= 10;
                } else if (this._camera.offset.x < 0) {
                    this._camera.offset.x += 10;
                }
            }
        }
        // Y Offset
        const playerPos = this._player.getPos();
        if (playerPos.x > 4000 && playerPos.x < 12500) {
            if (playerPos.y < 3060) {
                // Player is on the roofs
                if (this._camera.offset.y < 300) {
                    this._camera.offset.y += 10;
                }
            } else if (playerPos.y > 3200) {
                // Player is on the floor street
                if (this._camera.offset.y > -300) {
                    this._camera.offset.y -= 10;
                }
            } else {
                if (this._camera.offset.y > 0) {
                    this._camera.offset.y -= 5;
                } else if (this._camera.offset.y < 0) {
                    this._camera.offset.y += 5;
                }
            }
        } else if (playerPos.x > 12600 /*&& playerPos.x < 15600*/) {
            if (playerPos.y < 990) {
                // Player is on the roofs
                if (this._camera.offset.y < 300) {
                    this._camera.offset.y += 10;
                }
            } else if (playerPos.y > 1150) {
                if (this._camera.offset.y > -300) {
                    this._camera.offset.y -= 10;
                }
            } else {
                if (this._camera.offset.y > 0) {
                    this._camera.offset.y -= 5;
                } else if (this._camera.offset.y < 0) {
                    this._camera.offset.y += 5;
                }
            }
        } else {
            if (this._camera.offset.y > 0) {
                this._camera.offset.y -= 10;
            } else if (this._camera.offset.y < 0) {
                this._camera.offset.y += 10;
            }
        }

        if (this._inChurch) {
            this._targetPointChurch.y = this._player.getPos().y;
            this._camera.offset.x = 0;
        }
        if (this._inLavadero) {
            this._targetPointLavadero.y = this._player.getPos().y;
            this._camera.offset.x = 0;
        }
        if (this._inCaserio) {
            this._targetPointCaserio.y = this._player.getPos().y;
            this._camera.offset.x = 0;
        }
        if (this._inRoldans) {
            // this._targetPointRoldans.y = this._player.getPos().y;
            this._camera.offset.x = 0;
            this._camera.offset.y = 0;
        }
    }

    onPlayerDeath() {
        alert("TODO test onPlayerDeath");
        const player = new Player(new Point(500, 400));  // Just create a new player and garbage out the dead player
        player.setWeapon(new Pistol(player));
        player.setGrenadeThrower(new BasicGrenadeThrower(player));
        this.subLevels.get(this.currentSubLevelId).setPlayer(player);
        this._camera.setFirstPoint(player.getPos());
    }
}
