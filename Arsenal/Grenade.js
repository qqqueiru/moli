class Grenade {
    #damage = 1;
    #vx = 12;
    #vy = -12;
    #ay = 1;
    #maxVy = 50;
    #previousPos = new Point(0, 0);
    #pos = new Point(0, 0);
    #startingPoint = new Point(0, 0);  // Punto desde el que el personaje tiró la granada
    #animatedSprite;
    #maxDistance = GameScreen.drawDistance * 3;  // Depende del startingPoint y de la cámara
    #beyondLimits = false;
    #platforms = [];
    #walls = [];
    #lerpSegment = new Segment(this.#pos, this.#previousPos);

    constructor(damage, speed, direction, startingPoint, animatedSprite) {
        this.#damage = damage;
        if (direction === "left") {
            this.#vx = -speed;
        } else {
            this.#vx = speed;
        }
        this.#previousPos.x = startingPoint.x;
        this.#previousPos.y = startingPoint.y;
        this.#pos.x = startingPoint.x;
        this.#pos.y = startingPoint.y;
        this.#startingPoint.x = startingPoint.x;
        this.#startingPoint.y = startingPoint.y;
        this.#animatedSprite = animatedSprite;
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
        this.#previousPos.x = this.#pos.x;
        this.#previousPos.y = this.#pos.y;
        this.#pos.x += this.#vx;
        this.#pos.y += this.#vy;
        
        const distanceFromStartingPoint = this.#pos.distanceFromPoint(this.#startingPoint);
        if (distanceFromStartingPoint >= this.#maxDistance) {
            this.#beyondLimits = true;
        }

        this.#updateFloorBounce();
        this.#updateWallBounce();
    }

    #updateFloorBounce() {
        // Revisar rebote con el suelo.
        const restitutionCoefficientX = 0.5;
        const restitutionCoefficientY = 0.9;

        for (const [id, platform] of this.#platforms) {
            const falling = !platform.isPointAbovePlatform(this.#pos);
            if (!falling) { continue; }

            const platformSegment = platform.getSegment();
            if (Segment.doIntersect(platformSegment, this.#lerpSegment)) {
                const pIntersection = Segment.pointIntersection(platformSegment, this.#lerpSegment);
                const newPointX = this.#pos.x;
                const newPointY = 2 * pIntersection.y - this.#pos.y;

                const platformPointOnTheSameVerticalX = this.#pos.x;
                const platformPointOnTheSameVerticalY = platform.getYFromX(this.#pos.x);
                if (newPointY < platformPointOnTheSameVerticalY) {
                    this.#pos.x = newPointX;
                    this.#pos.y = newPointY;
                } else {
                    this.#pos.x = platformPointOnTheSameVerticalX;
                    this.#pos.y = platformPointOnTheSameVerticalY;
                    this.#pos.y -= 1;  // Un pixel de regalo para evitar bugs
                }
                this.#vx *= restitutionCoefficientX
                this.#vy *= restitutionCoefficientY;
                this.#vy = -Math.abs(this.#vy);  // La granada siempre rebota hacia arriba
            }
        }
    }

    #updateWallBounce() {
        for (const [id, wall] of this.#walls) {
            if (!wall.bouncesGrenades()) {
                continue;
            }
            const wallSegment = wall.getSegment();
            if (Segment.doIntersect(wallSegment, this.#lerpSegment)) {
                const pIntersection = Segment.pointIntersection(wallSegment, this.#lerpSegment);
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
        const hitPoints = this.#lerpSegment.getFourDiscretePoints();
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
        // ctx.beginPath();
        // const grenadeSize = 10;
        // const drawX = this.#pos.x - grenadeSize / 2 + GameScreen.width / 2 - cameraPos.x;
        // const drawY = this.#pos.y - grenadeSize / 2 + GameScreen.height / 2 - cameraPos.y;
        // ctx.rect(drawX, drawY, grenadeSize, grenadeSize);
        // ctx.fillStyle = "black";
        // ctx.fill();

        this.#animatedSprite.draw(this.#pos.x, this.#pos.y, cameraPos);
    }
}
