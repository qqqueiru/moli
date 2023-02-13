class Projectile {
    #damage = 1;
    #speed = 50;
    #direction = "right";  // left, right, up, down (down solo para los villanos)
    #previousPos = new Point(0, 0);
    #pos = new Point(0, 0);
    #distanceTraveled = 0;
    #maxDistance = 1920;  // Puede depender de la dirección de disparo (idealmente no debería sobresalir de la pantalla)
    #beyondLimits = false;

    constructor(damage, speed, direction, startingPoint, maxDistance) {
        this.#damage = damage;
        this.#speed = speed;
        this.#direction = direction;  // Projectiles will travel in a straight line
        this.#previousPos = startingPoint.clone();
        this.#pos = new Point(startingPoint.x, startingPoint.y);
        this.#distanceTraveled = 0;
        this.#maxDistance = maxDistance;

        // Saturación de distancia máxima (no puede exceder los límites de la pantalla)  // TODO cuando se tenga la cámara

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

    draw(ctx) {
        // Depuración
        ctx.beginPath();
        ctx.rect(this.#pos.x, this.#pos.y, 20, 10);
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
            if (character.getsHit(segmentToCheck)) {
                character.inflictDamage(this.#damage);
                return true;  // NOTE: en caso de tener un proyectil que daña a más de un personaje a la vez, habría que plantearlo de otro modo
            }
        }
        return false;
    }
}

/**
 * Clase para gestionar los disparos de un arma
 */
class Weapon {
    name = "NONE";  // pistol, machine-gun, shotgun
    ammoLeft = -1;  // -1: infinite
    ammoWhenFound = 20;
    character;
    rate = 10;  // Tasa máxima de disparo en ms (no se podrá disparar a mayor frecuencia)
    #lastShootingTime = 0;
    constructor(character) {
        this.character = character;
    }

    shoot() {
        alert("Método shoot de la clase base Weapon...");
    }

    checkIfCanShootSinceLastShooting() {
        let canShoot = false;
        if (Date.now() - this.#lastShootingTime > this.rate) {
            canShoot = true;
            this.#lastShootingTime = Date.now();
        }
        return canShoot;
    }
}