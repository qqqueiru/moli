class Grenade {
    #damage = 1;
    #vx = 12;
    #vy = -12;
    #ay = 1;
    #maxVy = 50;
    #previousPos = new Point(0, 0);
    #pos = new Point(0, 0);
    #startingPoint = new Point(0, 0);  // Punto desde el que el personaje tiró la granada
    #maxDistance = GameScreen.drawDistance * 3;  // Depende del startingPoint y de la cámara
    #beyondLimits = false;
    #platforms = [];
    #walls = [];

    constructor(damage, speed, direction, startingPoint) {
        this.#damage = damage;
        if (direction === "left") {
            this.#vx = -speed;
        } else {
            this.#vx = speed;
        }
        this.#previousPos = startingPoint.clone();
        this.#pos = new Point(startingPoint.x, startingPoint.y);
        this.#startingPoint = new Point(startingPoint.x, startingPoint.y);
    }

    setPlatforms(platforms) {
        this.#platforms = platforms;
    }

    setWalls(walls) {
        this.#walls = walls;
    }

    update() {
        this.#vy += this.#ay;
        if (this.#vy > this.#maxVy) {
            this.#vy = this.#maxVy;
        }
        const velocityVector = new Point(this.#vx, this.#vy);
        this.#previousPos = this.#pos.clone();
        this.#pos.add(velocityVector);
        
        const distanceFromStartingPoint = this.#pos.distanceFromPoint(this.#startingPoint);
        if (distanceFromStartingPoint >= this.#maxDistance) {
            this.#beyondLimits = true;
        }

        this.#updateFloorBounce();
        this.#updateWallBounce();
    }

    #updateFloorBounce() {
        // Revisar rebote con el suelo.
        const lerpSegment = new Segment(this.#pos, this.#previousPos);
        const restitutionCoefficientX = 0.5;
        const restitutionCoefficientY = 0.9;

        for (const [id, platform] of this.#platforms) {
            const falling = !platform.isPointAbovePlatform(this.#pos);
            if (!falling) { continue; }

            const platformSegment = platform.getSegment();
            if (Segment.doIntersect(platformSegment, lerpSegment)) {
                const pIntersection = Segment.pointIntersection(platformSegment, lerpSegment);
                const newPoint = new Point(this.#pos.x, 2 * pIntersection.y - this.#pos.y);
                const platformPointOnTheSameVertical = new Point(this.#pos.x, platform.getYFromX(this.#pos.x));
                if (newPoint.y < platformPointOnTheSameVertical.y) {
                    this.#pos = newPoint;
                } else {
                    this.#pos = platformPointOnTheSameVertical;
                    this.#pos.y -= 1;  // Un pixel de regalo para evitar bugs
                }
                this.#vx *= restitutionCoefficientX
                this.#vy *= restitutionCoefficientY;
                this.#vy = -Math.abs(this.#vy);  // La granada siempre rebota hacia arriba
            }
        }
    }

    #updateWallBounce() {
        const lerpSegment = new Segment(this.#pos, this.#previousPos);
        for (const [id, wall] of this.#walls) {
            if (!wall.bouncesGrenades()) {
                continue;
            }
            const wallSegment = wall.getSegment();
            if (Segment.doIntersect(wallSegment, lerpSegment)) {
                const pIntersection = Segment.pointIntersection(wallSegment, lerpSegment);
                // this.#pos.x -= 2 * (this.#pos.x - pIntersection.x) + Math.sign(this.#vx);
                // New position may trespass another wall or floor segment
                this.#pos.x = pIntersection.x - Math.sign(this.#vx);
                this.#pos.y = this.#previousPos.y;
                this.#vx *= -1;
            }
        }
    }

    /**
     * Returns true if the grenade hit someone from the character array
     * @param {[Character]} characters
     * @param {[string]} hitStates if a character is in one of these states it will be checked for hit
     * @returns
     */
    checkHit(characters, hitStates) {
        const segmentToCheck = new Segment(this.#pos, this.#previousPos);
        const hitPoints = segmentToCheck.getFourDiscretePoints();
        for (const character of characters) {
            if (!hitStates.includes(character.getCurrentState())) {
                continue;
            }
            if (character.getsHitByPoints(hitPoints)) {
                return true;
            }
        }
        return false;
    }

    getExplosionOnceSprite() {
        return new OnceSprite("grenade_explosion", 1, 5, 1, 10, GameScreen.ctx, this.#pos);
    }

    hasStopped() {
        return Math.abs(this.#vx) < 1;
    }

    /**
     * Inflicts damage on nearby characters
     * @param {[Character]} characters
     * @param {[string]} hitStates if a character is in one of these states it will be checked for hit
     */
    explode(characters, hitStates) {
        const blastRadius = 100;
        const blastCircle = new Circle(this.#pos, blastRadius);
        const hitPoints = blastCircle.getDiscretePoints();
        for (const character of characters) {
            if (!hitStates.includes(character.getCurrentState())) {
                continue;
            }
            if (character.getsHitByPoints(hitPoints)) {
                character.inflictDamage(this.#damage);
            }
        }
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

    draw(ctx, cameraPos) {
        if (this.#pos.distanceFromPoint(cameraPos) > GameScreen.drawDistance) {
            return;
        }
        // Depuración
        ctx.beginPath();
        const grenadeSize = 10;
        const drawX = this.#pos.x - grenadeSize / 2 + GameScreen.width / 2 - cameraPos.x;
        const drawY = this.#pos.y - grenadeSize / 2 + GameScreen.height / 2 - cameraPos.y;
        ctx.rect(drawX, drawY, grenadeSize, grenadeSize);
        ctx.fillStyle = "black";
        ctx.fill();
    }
}
