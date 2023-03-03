class Can extends Collectable {
    constructor(pos) {
        const imgId = "energy_drink"
        super(pos, imgId);
        this.setSprite(new LoopSprite(imgId, 1, 8, 1, 5, GameScreen.ctx, pos));
    }
}