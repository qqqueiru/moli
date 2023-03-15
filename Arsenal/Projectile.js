class Projectile {
    #damage = 1;
    #speed = 50;
    #direction = "right";  // left, right, up, down (down solo para los villanos)
    #previousPos = new Point(0, 0);
    #pos = new Point(0, 0);
    #distanceTraveled = 0;
    #maxDistance = GameScreen.drawDistance;  // Puede depender de la dirección de disparo (idealmente no debería sobresalir de la pantalla)
    #beyondLimits = false;
    #walls = [];
    #hitWallPoint = null;

    constructor(damage, speed, direction, startingPoint, maxDistance) {
        this.#damage = damage;
        this.#speed = speed;
        this.#direction = direction;  // Projectiles will travel in a straight line
        this.#previousPos = startingPoint.clone();
        this.#pos = new Point(startingPoint.x, startingPoint.y);
        this.#distanceTraveled = 0;
        this.#maxDistance = maxDistance;
    }

    setWalls(walls) {
        this.#walls = walls;
    }

    update() {
        let velocityVector = new Point(0, 0);
        if (this.#direction === "right") { velocityVector = new Point(this.#speed, 0); }
        if (this.#direction === "left") { velocityVector = new Point(-this.#speed, 0); }
        if (this.#direction === "up") { velocityVector = new Point(0, -this.#speed); }
        if (this.#direction === "down") { velocityVector = new Point(0, this.#speed); }
        if ((velocityVector.x * velocityVector.x + velocityVector.y + velocityVector.y) === 0) {
            console.error("projectile with 0 speed");
        }
        this.#previousPos = this.#pos.clone();
        this.#pos.add(velocityVector);
        this.#distanceTraveled += this.#speed;

        if (this.#distanceTraveled >= this.#maxDistance) {
            this.#beyondLimits = true;
        }

        this.#updateWallHit();
    }

    #updateWallHit() {
        const lerpSegment = new Segment(this.#pos, this.#previousPos);
        for (const [id, wall] of this.#walls) {
            if (!wall.bouncesGrenades()) {
                continue;
            }
            const wallSegment = wall.getSegment();
            if (Segment.doIntersect(wallSegment, lerpSegment)) {
                this.#hitWallPoint = Segment.pointIntersection(wallSegment, lerpSegment);
                break;
            }
        }
    }

    getHitWallPoint() {
        return this.#hitWallPoint;
    }

    isBeyondLimits(cameraPos) {
        const isInScreenX = 2 * Math.abs(cameraPos.x - this.#pos.x) < GameScreen.width;
        const isInScreenY = 2 * Math.abs(cameraPos.y - this.#pos.y) < GameScreen.height;
        const isInScreen = isInScreenX && isInScreenY;
        if (!isInScreen) {
            return true;
        }
        return this.#beyondLimits;
    }

    getHitWallOnceSprite() {
        return new OnceSprite("grenade_explosion", 1, 5, 1, 10, GameScreen.ctx, this.#hitWallPoint);
    }

    getHitCharacterOnceSprite() {
        return new OnceSprite("grenade_explosion", 1, 5, 1, 10, GameScreen.ctx, this.#pos);
    }

    draw(ctx, cameraPos) {
        if (this.#pos.distanceFromPoint(cameraPos) > GameScreen.drawDistance) {
            return;
        }
        // Depuración
        ctx.beginPath();
        ctx.rect(this.#pos.x + GameScreen.width / 2 - cameraPos.x, this.#pos.y + GameScreen.height / 2 - cameraPos.y, 40, 40);
        ctx.fillStyle = "black";
        ctx.fill();
    }

    /**
     * Returns true if the projectile hits a character from the input array of characters
     * @param {[Character]} characters
     * @param {[string]} hitStates if a character is in one of these states it will be checked for hit
     * @returns 
     */
    checkHit(characters, hitStates) {
        const segmentToCheck = new Segment(this.#pos, this.#previousPos);
        for (const character of characters) {
            if (!hitStates.includes(character.getCurrentState())) {
                continue;
            }
            if (character.getsHitBySegment(segmentToCheck)) {
                character.inflictDamage(this.#damage);
                return true;  // NOTE: en caso de tener un proyectil que daña a más de un personaje a la vez, habría que plantearlo de otro modo
            }
        }
        return false;
    }
}
