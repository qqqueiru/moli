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

    _frameCount = 0;
    _deathCount = 0;
    _playable = true;

    _finalBoss;

    constructor() {
        super();
        {
            const bgImg = new BackgroundImage();
            const T = (imgId, w, h) => { return new BackgroundImageTile(imgId, w, h); }
            // bgImg.addRow(["sublevel1_1"]);
            bgImg.addRow([T("", 2272, 1278      ), T("", 2272, 1278      ), T("", 2272, 1278      ), T("", 2272, 1278      ), T("", 2272, 1278      ), T("sublevel1_1_x05y00"), T("sublevel1_1_x06y00"), T("sublevel1_1_x07y00"), T("sublevel1_1_x08y00")]);
            bgImg.addRow([T("sublevel1_1_x00y01"), T("sublevel1_1_x01y01"), T("sublevel1_1_x02y01"), T("sublevel1_1_x03y01"), T("sublevel1_1_x04y01"), T("sublevel1_1_x05y01"), T("sublevel1_1_x06y01"), T("sublevel1_1_x07y01"), T("sublevel1_1_x08y01")]);
            bgImg.addRow([T("sublevel1_1_x00y02"), T("sublevel1_1_x01y02"), T("sublevel1_1_x02y02"), T("sublevel1_1_x03y02"), T("sublevel1_1_x04y02"), T("sublevel1_1_x05y02"), T("sublevel1_1_x06y02"), T("", 2272, 1334      ), T("", 792, 1334       )]);
            this.setBackgroundImg(bgImg);
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
            platforms.set(i, new Platform(i, new Segment({x: 17655, y: 1056}, {x: 18013, y: 950})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 18013, y: 950}, {x: 18371, y: 1054})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 17638, y: 1337}, {x: 17676, y: 1337})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 17676, y: 1400}, {x: 17915, y: 1400})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 17915, y: 1299}, {x: 17953, y: 1299})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 18079, y: 1299}, {x: 18116, y: 1299})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 18079, y: 1400}, {x: 18343, y: 1400})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 18343, y: 1337}, {x: 18380, y: 1337})));
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
            // npcs.push(new NPC(new Point(2500, 3500)));
            // npcs.push(new NPC(new Point(2770, 3500)));
            npcs.push(new NPC(new Point(3000, 3400)));
            npcs.push(new NPC(new Point(3260, 3230)));
            npcs.push(new NPC(new Point(3500, 3330)));
            npcs.push(new NPC(new Point(4200, 3330)));
            npcs.push(new NPC(new Point(4800, 3330)));
            npcs.push(new NPC(new Point(5200, 3330)));
            for (let x = 4790; x < 12450; x += 130) {
                npcs.push(new NPC(new Point(x, 3330)));
            }
            for (let x = 4980; x < 12250; x += 130) {
                npcs.push(new NPC(new Point(x, 2700)));
            }
            for (let x = 7300; x < 8360; x += 130) {
                npcs.push(new NPC(new Point(x, 2960)));
            }
            for (let x = 12900; x < 15000; x += 130) {
                npcs.push(new NPC(new Point(x, 500)));
            }
            for (let x = 15750; x < 17500; x += 130) {
                npcs.push(new NPC(new Point(x, 1250)));
            }
            for (let x = 15750; x < 17500; x += 180) {
                npcs.push(new NPC(new Point(x, 500)));
            }
            for (const npc of npcs) {
                npc.setWeapon(new SlowPistol(npc));
                npc.setGrenadeThrower(new BasicGrenadeThrower(npc));
                npc.onlyActivateUntilCloseToPlayer();  // First npcs won't be activated until player gets near them. Dynamically spawned npcs will automatically search and destroy the player.
            }
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
            bgSprites.push(new StaticSprite("torre", 1, GameScreen.ctx, new Point(15600, 1012)));
            bgSprites.push(new LoopSprite("eolico", 1, 16, 1, 3, GameScreen.ctx, new Point(15600, 952)));
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

            // collectables.push(new Can(new Point(4800, 2870)));
            collectables.push(new Can(new Point(5100, 2870)));
            // collectables.push(new Can(new Point(5400, 2870)));
            collectables.push(new Can(new Point(5770, 2960)));
            // collectables.push(new Can(new Point(5960, 3030)));
            collectables.push(new Can(new Point(6690, 3100)));
            // collectables.push(new Can(new Point(7130, 3070)));
            collectables.push(new Can(new Point(7470, 2800)));
            // collectables.push(new Can(new Point(7790, 3110)));
            // collectables.push(new Can(new Point(8030, 3110)));
            collectables.push(new Can(new Point(7910, 2900)));
            collectables.push(new Can(new Point(8010, 2630)));
            collectables.push(new Can(new Point(8240, 2540)));
            // collectables.push(new Can(new Point(8545, 2310)));
            collectables.push(new Can(new Point(8915, 2620)));

            collectables.push(new Can(new Point(8695, 2830)));
            // collectables.push(new Can(new Point(8920, 2830)));
            collectables.push(new Can(new Point(9145, 2830)));
            collectables.push(new Can(new Point(10730, 2840)));
            // collectables.push(new Can(new Point(10940, 2840)));
            collectables.push(new Can(new Point(11160, 2840)));
            // collectables.push(new Can(new Point(11840, 3240)));
            collectables.push(new Can(new Point(11960, 2960)));
            // collectables.push(new Can(new Point(11960, 2830)));
            collectables.push(new Can(new Point(11960, 2700)));

            collectables.push(new Can(new Point(16140, 1240)));
            collectables.push(new Can(new Point(17260, 1240)));
            collectables.push(new Can(new Point(16540, 1100)));
            // collectables.push(new Can(new Point(16700, 1100)));
            collectables.push(new Can(new Point(16860, 1100)));
            collectables.push(new Can(new Point(16280, 820)));
            // collectables.push(new Can(new Point(16700, 720)));
            collectables.push(new Can(new Point(17120, 820)));
            collectables.push(new Can(new Point(18020, 660)));
            this._totalCollectablesCount = collectables.length;
            this.setCollectables(collectables);
        }

    }

    pauseAtChurch() {
        this._inChurch = true;
        this._camera.setTargetPoint(this._targetPointChurch);
        // this._triggers.push(
        //     new LocationTrigger(
        //         this._player,
        //         new Ellipse(new Point(7730, 3120), 50, 50),
        //         () => { this.resumeFromChurch(); }
        //     )
        // );
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
        // this._triggers.push(
        //     new LocationTrigger(
        //         this._player,
        //         new Ellipse(new Point(11950, 3120), 50, 50),
        //         () => { this.resumeFromLavadero(); }
        //     )
        // );
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

        const npcs = [];
        for (let x = 15800; x < 17500; x += 100) {
            npcs.push(new NPC(new Point(x, -4000)));
        }
        for (let x = 15800; x < 17500; x += 100) {
            npcs.push(new NPC(new Point(x, -1000)));
        }
        for (let x = 15800; x < 17500; x += 100) {
            npcs.push(new NPC(new Point(x, 0)));
        }
        for (const npc of npcs) {
            npc.setWeapon(new SlowPistol(npc));
            npc.setGrenadeThrower(new BasicGrenadeThrower(npc));
            npc.onlyActivateUntilCloseToPlayer();  // First npcs won't be activated until player gets near them. Dynamically spawned npcs will automatically search and destroy the player.
        }
        this.setNpcs(npcs);


        // this._triggers.push(
        //     new LocationTrigger(
        //         this._player,
        //         new Ellipse(new Point(16685, 1258), 50, 50),
        //         () => { this.resumeFromCaserio(); }
        //     )
        // );
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

        this._finalBoss = new FinalBoss(new Point(18888, -1000), this._player);
        this._finalBoss.setWeapon(new MediumSpeedPistol(this._finalBoss));
        this._finalBoss.setGrenadeThrower(new BigWaterBottleGrenader(this._finalBoss));
        this._finalBoss.onlyActivateUntilCloseToPlayer();
        this.setNpcs([this._finalBoss]);
        
        // this._triggers.push(
        //     new LocationTrigger(
        //         this._player,
        //         new Ellipse(new Point(18370, 1258), 50, 50),
        //         () => { this.resumeFromRoldans(); }
        //     )
        // );
    }

    resumeFromRoldans() {
        this._inRoldans = false;
        this._camera.setTargetPoint(this._player.getPos());
        this._playable = false;

        if (this._player.getPos().x < this._finalBoss.getPos().x) {
            this._player.salute("right");
        } else {
            this._player.salute("left");
        }

        AudioManager.stopLoop(this._levelMusicId);
        this._muteBgMusic = true;

        setTimeout(() => {
            const collectedCollectablesCount = this._totalCollectablesCount - this._collectables.length;
            GameScreen.currentScreen = new FinishedMenu(this._frameCount, this._deathCount, collectedCollectablesCount, this._totalCollectablesCount);
        }, 5000);
    }

    update() {
        super.update();

        if (!this._playable) {
            return;
        }

        this._frameCount++;

        // Update camera offset
        // X Offset
        const playerVx = this._player.getVx();
        const playerVxNorm = Math.sign(playerVx);
        this.#playerVxNorms.push(playerVxNorm);
        if (this.#playerVxNorms.length > 30) {
            const vx = this.#playerVxNorms.shift();
            if (true || (vx != 0 && this.#playerVxNorms.every(v => v === vx))) {
                if (vx < 0) {
                    if (this._camera.offset.x > -700) {
                        this._camera.offset.x -= 5;
                    }
                } else if (vx >= 0) {
                    if (this._camera.offset.x < 700) {
                        this._camera.offset.x += 20;
                    }
                }
            } else {
                if (this._camera.offset.x > 0) {
                    this._camera.offset.x -= 20;
                } else if (this._camera.offset.x < 0) {
                    this._camera.offset.x += 20;
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
            if (this.getDeadNpcCount() >= 74) {
                this.resumeFromChurch();
            }
        }
        if (this._inLavadero) {
            this._targetPointLavadero.y = this._player.getPos().y;
            this._camera.offset.x = 0;
            if (this.getDeadNpcCount() >= 130) {
                this.resumeFromLavadero();
            }
        }
        if (this._inCaserio) {
            this._targetPointCaserio.y = this._player.getPos().y;
            this._camera.offset.x = 0;
            if (this.getDeadNpcCount() >= 222) {
                this.resumeFromCaserio();
            }
        }
        if (this._inRoldans) {
            // this._targetPointRoldans.y = this._player.getPos().y;
            this._camera.offset.x = 0;
            this._camera.offset.y = 0;
            if (this.getDeadNpcCount() >= 223) {
                this.resumeFromRoldans();
            }
        }
    }

    onPlayerDeath() {
        this._deathCount++;
        this._player.respawn();
        // const respawnPos = this._player.getPos().addConst(new Point(0, -500));
        // const player = new Player(respawnPos);  // Just create a new player and garbage out the dead player
        // player.setWeapon(new Pistol(player));
        // player.setGrenadeThrower(new BasicGrenadeThrower(player));
        // this.setPlayer(player);
        // this._camera.setFirstPoint(player.getPos());
    }
}
