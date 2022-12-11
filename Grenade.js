class Grenade {
    #damage = 1;
    #vx = 20;
    #previousPos = new Point(0, 0);
    #pos = new Point(0, 0);
    #startingPoint = new Point(0, 0);  // Punto desde el que el personaje tiró la granada
    #maxDistance = 1920;  // Depende del startingPoint y de la cámara
    #beyondLimits = false;

    constructor(damage, speed, direction, startingPoint, maxDistance) {
        this.#damage = damage;
        if (direction === "left") {
            this.#vx = -speed;
        } else {
            this.#vx = speed;
        }
        this.#previousPos = new Point(startingPoint.x, startingPoint.y);
        this.#pos = new Point(startingPoint.x, startingPoint.y);
        this.#maxDistance = maxDistance;
    }

    update() {
        let velocityVector = new Point(0, 0);
        // TODO continuar aqui...
    }

    isBeyondLimits() {
        return this.#beyondLimits;
    }

    draw() {

    }
}

class BasicGrenadeThrower {
    #grenadesLeft = 10;
    #character;
    #rate = 1000;
    #lastThrowingTime = 0;
    constructor(character) {
        this.#character = character;
    }
    throw() {
        if (!this.checkIfCanThrowSinceLastThrowing()) { return null; }
        return new Grenade(
            10,  // damage
            20,  // speed
            this.character.getFaceDirection(),  // direction
            this.character.getPos().addConst(new Point(0, this.character.getShootingHeight())),  // startingPosition
            1920  // maxDistance
        );
    }

    addGrenades(amount) {
        this.#grenadesLeft += amount;
    }

    checkIfCanThrowSinceLastThrowing() {
        let canThrow = false;
        if (Date.now() - this.#lastThrowingTime > this.rate) {
            canThrow = true;
            this.#lastThrowingTime = Date.now();
        }
        return canThrow;
    }
}