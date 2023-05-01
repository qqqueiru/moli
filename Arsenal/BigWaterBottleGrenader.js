class BigWaterBottleGrenader extends BasicGrenadeThrower {
    constructor(character) {
        super(character);
    }

    throw() {
        if (!this.checkIfCanThrowSinceLastThrowing()) { return null; }
        if (this._grenadesLeft <= 0) { return null; }
        this._grenadesLeft--;
        return new Grenade(
            3,  // damage
            1 + 10 * Math.random(),  // speed
            this._character.getFaceDirection(),  // direction
            this._character.getPos().addConst(new Point(0, this._character.getShootingHeight() - Math.random() * 20)),  // startingPosition
            150,  // blastRadius
            new AnimatedSprite("big_water_bottle", 1, 3, 1, 10, GameScreen.ctx),
        );
    }
}