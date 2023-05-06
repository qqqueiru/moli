class BigWaterBottleGrenader extends BasicGrenadeThrower {
    constructor(character) {
        super(character);
    }

    throw() {
        if (!this.checkIfCanThrowSinceLastThrowing()) { return null; }
        if (this._grenadesLeft <= 0) { return null; }
        this._grenadesLeft--;
        let speed = 20 * PseudoRandom.get();
        const distanceToTarget = this._character.getDistanceToTarget();
        if (distanceToTarget < 400) {
            speed = 1 + this._character.getDistanceToTarget() / 100 * 3;
        } else if (distanceToTarget > 600) {
            speed = 25;
        }
        return new Grenade(
            3,  // damage
            speed,  // speed
            this._character.getFaceDirection(),  // direction
            this._character.getPos().addConst(new Point(0, this._character.getShootingHeight() - PseudoRandom.get() * 20)),  // startingPosition
            150,  // blastRadius
            new AnimatedSprite("big_water_bottle", 1, 3, 1, 10, GameScreen.ctx),
        );
    }
}