class SubLevel1_1 extends SubLevel {
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
            platforms.set(i, new Platform(i, new Segment({x: 15366, y: 1518}, {x: 18520, y: 1518})));
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
            this.setPlatforms(platforms);
        }
        {
            let i = 0;
            const walls = new Map();
            // walls.set(i, new Wall(i, new Segment({x: 50 * 3.779527377, y: 0}, {x: 50 * 3.779527377, y: 10000}), false));
            // ++i;
            // walls.set(i, new Wall(i, new Segment({x: 698 * 3.779527377, y: 0}, {x: 698 * 3.779527377, y: 10000}), false));
            // ++i;
            this.setWalls(walls);
        }
        {
            const player = new Player(new Point(400, 2700));  // TODO planteamiento
            player.setWeapon(new Pistol(player));
            player.setGrenadeThrower(new BasicGrenadeThrower(player));
            this.setPlayer(player);
            this._cameraPos = player.getPos();  // Testing camera pos
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
            // Loop sprites
            const loopSprites = [];
            loopSprites.push(new LoopSprite("agua_lavadero", 1, 2, 1, 5, GameScreen.ctx, new Point(11843, 3378)));
            loopSprites.push(new LoopSprite("moscas", 1, 5, 1, 5, GameScreen.ctx, new Point(7157, 3107)));
            this.setLoopSprites(loopSprites);
        }

    }

    onPlayerDeath() {
        alert("TODO test onPlayerDeath");
        const player = new Player(new Point(500, 400));  // Just create a new player and garbage out the dead player
        player.setWeapon(new Pistol(player));
        player.setGrenadeThrower(new BasicGrenadeThrower(player));
        this.subLevels.get(this.currentSubLevelId).setPlayer(player);
        this._cameraPos = player.getPos();
    }
}
