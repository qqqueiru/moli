class Level extends GameScreen {
    constructor(levelId) {
        super();
        this.id = levelId;
        this.subLevels = new Map();  // sublevel id --> SubLevel
        this.currentSubLevelId = 0;

        this.subLevels.set(0, new SubLevel());
    }

    update() {
        this.subLevels.get(this.currentSubLevelId).update();
    }

    draw() {
        this.subLevels.get(this.currentSubLevelId).draw(GameScreen.ctx);
    }
}