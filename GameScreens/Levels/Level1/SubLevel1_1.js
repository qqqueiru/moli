class SubLevel1_1 extends SubLevel {
    constructor() {
        super();
        {
            this.setBackgroundImg("background_test_00");
        }
        {
            let i = 0;  // Id must not be negative
            const platforms = new Map();
            platforms.set(i, new Platform(i, new Segment({x: 500, y: 200}, {x: 1000, y: 450})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 1000, y: 450}, {x: 1400, y: 200})));
            ++i;
            platforms.set(i, new Platform(i, new Segment({x: 0, y: 800}, {x: 1920, y: 800})));
            ++i;
            this.setPlatforms(platforms);
        }
        {
            let i = 0;
            const walls = new Map();
            walls.set(i, new Wall(i, new Segment({x: 200, y: 450}, {x: 200, y: 300}), false));
            ++i;
            walls.set(i, new Wall(i, new Segment({x: 1700, y: 600}, {x: 1700, y: 300}), true));
            ++i;
            this.setWalls(walls);
        }
        {
            const player = new Player(new Point(1100, 100));  // TODO planteamiento
            player.setWeapon(new Pistol(player));
            player.setGrenadeThrower(new BasicGrenadeThrower(player));
            this.setPlayer(player);
            this._cameraPos = player.getPos();  // Testing camera pos
        }
        {
            const npcs = [];
            npcs.push(new NPC(new Point(500, 400)));
            npcs[npcs.length - 1].setWeapon(new Pistol(npcs[npcs.length - 1]));
            npcs[npcs.length - 1].setGrenadeThrower(new BasicGrenadeThrower(npcs[npcs.length - 1]));
            this.setNpcs(npcs);

            // this._triggers.push(new HealthTrigger(npcs[0], 0, () => {
            //     alert("Example health trigger");
            // }));
            this._triggers.push(
                new LocationTrigger(
                    npcs[0], 
                    new Ellipse(new Point(900, 800), 100, 100), 
                    () => {
                        GameScreen.currentScreen = new GameOverMenu();
                        // alert("Example location trigger");
                    }
                )
            );
        }
        {
            // this._triggers.push(new TimeTrigger(600, () => {
            //     alert("Example trigger");
            // }));
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
