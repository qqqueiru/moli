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
    #lerpSegment = new Segment(this.#pos, this.#previousPos);
    #vx = 0;
    #vy = 0;

    constructor(damage, speed, direction, startingPoint, maxDistance) {
        this.#damage = damage;
        this.#speed = speed;
        this.#direction = direction;  // Projectiles will travel in a straight line
        this.#previousPos.x = startingPoint.x;
        this.#previousPos.y = startingPoint.y;
        this.#pos.x = startingPoint.x
        this.#pos.y = startingPoint.y;
        this.#distanceTraveled = 0;
        this.#maxDistance = maxDistance;

        if (this.#direction === "right") { this.#vx = this.#speed; }
        if (this.#direction === "left") { this.#vx = -this.#speed; }
        if (this.#direction === "up") { this.#vy = -this.#speed; }
        if (this.#direction === "down") { this.#vy = this.#speed; }
        if ((this.#vx * this.#vx + this.#vy * this.#vy) === 0) {
            alert("projectile with 0 speed");
        }
    }

    setWalls(walls) {
        this.#walls = walls;
    }

    update() {
        this.#previousPos.x = this.#pos.x;
        this.#previousPos.y = this.#pos.y;
        this.#pos.x += this.#vx;
        this.#pos.y += this.#vy;
        this.#distanceTraveled += this.#speed;

        if (this.#distanceTraveled >= this.#maxDistance) {
            this.#beyondLimits = true;
        }

        this.#updateWallHit();
    }

    #updateWallHit() {
        for (const [id, wall] of this.#walls) {
            if (!wall.bouncesGrenades()) {
                continue;
            }
            const wallSegment = wall.getSegment();
            if (Segment.doIntersect(wallSegment, this.#lerpSegment)) {
                this.#hitWallPoint = Segment.pointIntersection(wallSegment, this.#lerpSegment);
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
        const hitPoints = this.#lerpSegment.getFourDiscretePoints();
        for (const character of characters) {
            if (!hitStates.includes(character.getCurrentState())) {
                continue;
            }
            if (character.getsHitByPoints(hitPoints)) {
                character.inflictDamage(this.#damage);
                return true;  // NOTE: en caso de tener un proyectil que daña a más de un personaje a la vez, habría que plantearlo de otro modo
            }
        }
        return false;
    }
}
