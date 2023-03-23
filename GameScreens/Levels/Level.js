class Level extends GameScreen {
    constructor(levelId) {
        super();
        this.name = "Level";
        this.id = levelId;
        this.subLevels = new Map();  // sublevel id --> SubLevel
        this.currentSubLevelId = -1;
    }

    update() {
        const currentSubLevel = this.subLevels.get(this.currentSubLevelId);
        if (currentSubLevel) {
            currentSubLevel.update();
        } else {
            console.error(`Update error. Level with id ${this.id}: currentSubLevel ${currentSubLevel} does not exist.`);
        }
        
    }

    draw() {
        const currentSubLevel = this.subLevels.get(this.currentSubLevelId);
        if (currentSubLevel) {
            currentSubLevel.draw(GameScreen.ctx);
        } else {
            console.error(`Draw error. Level with id ${this.id}: currentSubLevel ${currentSubLevel} does not exist.`);
        }
    }
}