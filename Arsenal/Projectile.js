class Projectile {
    #damage = 1;
    #speed = 50;
    #direction = "right";  // left, right, up, down (down solo para los villanos)
    #previousPos = new Point(0, 0);
    #pos = new Point(0, 0);
    #distanceTraveled = 0;
    #maxDistance = GameScreen.drawDistance;  // Puede depender de la dirección de disparo (idealmente no debería sobresalir de la pantalla)
    #beyondLimits = false;

    constructor(damage, speed, direction, startingPoint, maxDistance) {
        this.#damage = damage;
        this.#speed = speed;
        this.#direction = direction;  // Projectiles will travel in a straight line
        this.#previousPos = startingPoint.clone();
        this.#pos = new Point(startingPoint.x, startingPoint.y);
        this.#distanceTraveled = 0;
        this.#maxDistance = maxDistance;
    }

    update() {
        let velocityVector = new Point(0, 0);
        if (this.#direction === "right") { velocityVector = new Point(this.#speed, 0); }
        if (this.#direction === "left") { velocityVector = new Point(-this.#speed, 0); }
        if (this.#direction === "up") { velocityVector = new Point(0, -this.#speed); }
        if (this.#direction === "down") { velocityVector = new Point(0, this.#speed); }
        if ((velocityVector.x * velocityVector.x + velocityVector.y + velocityVector.y) == 0) {
            console.error("projectile with 0 speed");
        }

        this.#pos.add(velocityVector);
        this.#distanceTraveled += this.#speed;

        if (this.#distanceTraveled >= this.#maxDistance) {
            this.#beyondLimits = true;
        }
    }

    isBeyondLimits() {
        return this.#beyondLimits;
    }

    draw(ctx, cameraPos) {
        if (this.#pos.distanceFromPoint(cameraPos) > GameScreen.drawDistance) {
            return;
        }
        // Depuración
        ctx.beginPath();
        ctx.rect(this.#pos.x + GameScreen.width / 2 - cameraPos.x, this.#pos.y + GameScreen.height / 2 - cameraPos.y, 20, 10);
        ctx.fillStyle = "black";
        ctx.fill();
    }

    /**
     * Returns true if the projectile hits a character from the input array of characters
     * @param {[Character]} characters
     * @returns 
     */
    checkHit(characters) {
        const segmentToCheck = new Segment(this.#pos, this.#previousPos);
        for (const character of characters) {
            if (character.getsHitBySegment(segmentToCheck)) {
                character.inflictDamage(this.#damage);
                return true;  // NOTE: en caso de tener un proyectil que daña a más de un personaje a la vez, habría que plantearlo de otro modo
            }
        }
        return false;
    }
}
