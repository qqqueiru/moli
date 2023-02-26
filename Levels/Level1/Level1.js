class Level1 extends Level {
    constructor() {
        super(1);  // pass levelId

        this.subLevels.set(0, new SubLevel1_1());

        this.currentSubLevelId = 0;
    }
}