class BasicGrenadeThrower {
    _grenadesLeft = 1000000;  // TODO dejar en 10
    _character;
    #rate = 100;
    #lastThrowingTime = 0;
    constructor(character) {
        this._character = character;
    }
    throw() {
        if (!this.checkIfCanThrowSinceLastThrowing()) { return null; }
        if (this._grenadesLeft <= 0) { return null; }
        this._grenadesLeft--;
        const botchFaceDirection = this._character.getCurrentSprite().includes("right") ? "right" : "left";
        return new Grenade(
            3,  // damage
            20,  // speed
            botchFaceDirection,  // direction
            this._character.getPos().addConst(new Point(0, this._character.getShootingHeight())),  // startingPosition
            100,  // blastRadius
            new AnimatedSprite("d20", 1, 3, 1, 10, GameScreen.ctx),
        );
    }

    addGrenades(amount) {
        this._grenadesLeft += amount;
    }

    checkIfCanThrowSinceLastThrowing() {
        let canThrow = false;
        if (Date.now() - this.#lastThrowingTime > this.#rate) {
            canThrow = true;
            this.#lastThrowingTime = Date.now();
        }
        return canThrow;
    }
}