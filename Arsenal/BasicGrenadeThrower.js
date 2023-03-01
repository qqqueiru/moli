class BasicGrenadeThrower {
    #grenadesLeft = 10000;  // TODO dejar en 10
    #character;
    #rate = 100;
    #lastThrowingTime = 0;
    constructor(character) {
        this.#character = character;
    }
    throw() {
        if (!this.checkIfCanThrowSinceLastThrowing()) { return null; }
        if (this.#grenadesLeft <= 0) { return null; }
        this.#grenadesLeft--;
        return new Grenade(
            10,  // damage
            20,  // speed
            this.#character.getFaceDirection(),  // direction
            this.#character.getPos().addConst(new Point(0, this.#character.getShootingHeight()))  // startingPosition
        );
    }

    addGrenades(amount) {
        this.#grenadesLeft += amount;
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