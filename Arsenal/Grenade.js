class Grenade {
    #damage = 1;
    #vx = 12;
    #vy = -12;
    #ay = 1;
    #maxVy = 50;
    #previousPos = new Point(0, 0);
    #pos = new Point(0, 0);
    #startingPoint = new Point(0, 0);  // Punto desde el que el personaje tiró la granada
    #maxDistance = GameScreen.drawDistance;  // Depende del startingPoint y de la cámara
    #beyondLimits = false;
    #platforms = [];

    constructor(damage, speed, direction, startingPoint, maxDistance) {
        this.#damage = damage;
        if (direction === "left") {
            this.#vx = -speed;
        } else {
            this.#vx = speed;
        }
        this.#previousPos = startingPoint.clone();
        this.#pos = new Point(startingPoint.x, startingPoint.y);
        this.#startingPoint = new Point(startingPoint.x, startingPoint.y);
        this.#maxDistance = maxDistance;
    }

    setPlatforms(platforms) {
        this.#platforms = platforms;
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
                // alert(`boing posY:${this.#pos.y} platformY:${platformPointOnTheSameVertical.y}`);
            }
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
