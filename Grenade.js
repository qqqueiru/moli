class Grenade {
    #damage = 1;
    #vx = 12;
    #vy = -12;
    #ay = 1;
    #maxVy = 50;
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
        this.#startingPoint = new Point(startingPoint.x, startingPoint.y);
        this.#maxDistance = maxDistance;
    }

    update() {
        this.#vy += this.#ay;
        if (this.#vy > this.#maxVy) {
            this.#vy = this.#maxVy;
        }
        const velocityVector = new Point(this.#vx, this.#vy);
        this.#previousPos = this.#pos;
        this.#pos.add(velocityVector);
        
        const distanceFromStartingPoint = this.#pos.distanceFromPoint(this.#startingPoint);
        if (distanceFromStartingPoint >= this.#maxDistance) {
            this.#beyondLimits = true;
        }
    }

    checkHit() {
        // TODO
        const segmentToCheck = new Segment(this.#pos, this.#previousPos);
        // return entidad que golpeó a la cual haga daño y que sea enemiga...
    }

    isBeyondLimits() {
        return this.#beyondLimits;
    }

    draw(ctx) {
        // Depuración
        ctx.beginPath();
        ctx.rect(this.#pos.x, this.#pos.y, 30, 30);
        ctx.fillStyle = "black";
        ctx.fill();
    }
}

class BasicGrenadeThrower {
    #grenadesLeft = 10;
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
            this.#character.getPos().addConst(new Point(0, this.#character.getShootingHeight())),  // startingPosition
            1920  // maxDistance
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