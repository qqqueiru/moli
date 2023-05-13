class Level1 extends Level {
    constructor(recordedInputs) {
        super(1);  // pass levelId

        const subLevel1_1 = new SubLevel1_1(recordedInputs);
        subLevel1_1.setLevelMusicId("level_1");
        this.subLevels.set(0, subLevel1_1);

        this.currentSubLevelId = 0;
    }
}