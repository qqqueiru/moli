/**
 * Base class for player or NPCs
 */
class Character {
    //      |1
    //  1---------2  // hSegment
    //      |
    //      |
    //      |2  // vSegment
    #health = 1;

    // Las dimensiones de los sprites deberían coincidir con las de los segmentos
    #hSegmentCrouched = new Segment({x: -65, y: 0}, {x: 65, y: 0});  // Relativo a _pos
    #hSegmentStraight = new Segment({x: -65, y: -50}, {x: 65, y: -50});  // Relativo a _pos
    #hSegment = this.#hSegmentStraight  // Relativo a _pos

    #vSegmentStraight = new Segment({x: 0, y: -125}, {x: 0, y: 75});  // Relativo a _pos
    #vSegmentCrouched = new Segment({x: 0, y: -50}, {x: 0, y: 50});  // Relativo a _pos
    #vSegment = this.#vSegmentStraight;  // Relativo a _pos

    #leftRayCastSegment = new Segment({x: -40, y: 20}, {x: -40, y: 60});  // Relativo a _pos (Creo que lo más sencillo es hacer la plataforma más grande...)
    #rightRayCastSegment = new Segment({x: 40, y: 20}, {x: 40, y: 60});  // Relativo a _pos

    #previousPos = new Point(0, 0);
    #previousVy = 0;    
    _pos = new Point(500, 500);
    #vx = 0;  // TODO establecer un máximo
    #vy = 0;
    #jumpVy = -200;
    #maxVy = 10;
    #ay = 1;
    #platforms = [];
    #availablePlatformIds = [];
    #lastPlatformTouchedId = null;
    #canJump = false;
    #finishedJumping = false;  // Se puede usar para saber si se ha de dibujar el salto
    #iterationsToBeJumped = 0;
    #maxIterationsJumped = 20;
    #crouched = false;
    #shootingHeight = 0;
    #lookingUp = false;
    #faceDirection = "right";  // right, left or up
    #previousFaceDirection = "right";
    #coyoteIterations = 0;
    #currentWeapon = new Weapon();
    #currentGrenadeThrower = new BasicGrenadeThrower();

    _hitEllipseCrouched = new Ellipse(this._pos, 50, 50);
    _hitEllipseStraight = new Ellipse(this._pos, 50, 100);
    // #maxYFromLastFloorIntersection
    // Solamente se permite el salto si hay interseccion del segmento vertical y vy > 0
    constructor() {
        // TODO
    }

    setVx(newVx) {
        this.#vx = newVx;
    }

    setVy(newVy) {
        this.#vy = newVy;
    }

    setCanJump(canJump) {
        this.#canJump = canJump;
        if (canJump) {
            this.#finishedJumping = canJump;
        }
    }

    setWeapon(weapon) {
        this.#currentWeapon = weapon;
    }

    setGrenadeThrower(grenadeThrower) {
        this.#currentGrenadeThrower = grenadeThrower;
    }

    setLookingUp(lookUp) {
        if (this.#finishedJumping && !this.#lookingUp && lookUp && !this.#crouched) {
            this.#previousFaceDirection = this.#faceDirection;
            this.#faceDirection = "up";
        }
        if (this.#lookingUp && !lookUp) {
            this.#faceDirection = this.#previousFaceDirection;
        }
        this.#lookingUp = lookUp;
    }

    dontMove() {
        this.#vx = 0;
    }

    moveRight() {
        this.#vx = this.#crouched ? 5 : 10;
        this.#vx += this.#iterationsToBeJumped > 0 ? 2 : 0;
        if (this.#finishedJumping && !this.#lookingUp) {
            this.#faceDirection = "right";
        }
    }

    moveLeft() {
        this.#vx = this.#crouched ? -5 : -10;
        this.#vx += this.#iterationsToBeJumped > 0 ? -2 : 0;
        if (this.#finishedJumping && !this.#lookingUp) {
            this.#faceDirection = "left";
        }
    }

    jump(vy) {
        if (this.#iterationsToBeJumped > 0) {
            this.#vy = vy;
            this.#iterationsToBeJumped--;
        }
    }

    startJump() {
        let startedJump = false;
        if (this.#canJump && this.#iterationsToBeJumped == 0) {
            this.#iterationsToBeJumped = this.#maxIterationsJumped;
            this.#coyoteIterations = 0;
            startedJump = true;
            this.#finishedJumping = false;
        }
        return startedJump;
    }

    stopJumping() {
        // console.log("NOT JUMPING...");
        if (this.#coyoteIterations <= 0) {
            this.#iterationsToBeJumped = 0;  // Si el jugador ha dejado de presionar el salto
        }
    }

    setCrouched(crouched) {
        this.#crouched = crouched;
        if (crouched) {
            this.#hSegment = this.#hSegmentCrouched;
            this.#vSegment = this.#vSegmentCrouched;
            this.#shootingHeight = 0;
        } else {
            this.#hSegment = this.#hSegmentStraight;
            this.#vSegment = this.#vSegmentStraight;
            this.#shootingHeight = -50;
        }
    }

    setCoyoteIterations(coyoteIterations) {
        this.#coyoteIterations = coyoteIterations;
    }

    #getCurrentSprite() {
        if (this.#crouched) {
            return "crouch_" + this.#faceDirection;
        } else {
            return this.#faceDirection;
        }
    }

    getShootingHeight() {
        return this.#shootingHeight;
    }

    getCoyoteIterations() {
        return this.#coyoteIterations;
    }

    getFaceDirection() {
        return this.#faceDirection;
    }

    setFaceDirection(direction) {
        this.#faceDirection = direction;
    }

    getPos() {
        return this._pos;
    }

    getHSegmentAbs() {
        return new Segment(this._pos.addConst(this.#hSegment.p1), this._pos.addConst(this.#hSegment.p2));
    }
    getVSegmentAbs() {
        return new Segment(this._pos.addConst(this.#vSegment.p1), this._pos.addConst(this.#vSegment.p2));
    }
    getFloorRayCast() {
        const vSegmentAbs = new Segment(this._pos.addConst(this.#vSegment.p1), this._pos.addConst(this.#vSegment.p2));
        if (vSegmentAbs.p1.y > vSegmentAbs.p2.y) {
            vSegmentAbs.p2.y = vSegmentAbs.p1.y - 50;
        } else {
            vSegmentAbs.p1.y = vSegmentAbs.p2.y - 50;
        }
        return vSegmentAbs;
    }
    getLeftRayCastSegmentAbs() {
        return new Segment(this._pos.addConst(this.#leftRayCastSegment.p1), this._pos.addConst(this.#leftRayCastSegment.p2));
    }
    getRightRayCastSegmentAbs() {
        return new Segment(this._pos.addConst(this.#rightRayCastSegment.p1), this._pos.addConst(this.#rightRayCastSegment.p2));
    }

    isMovingUp() { return this.#vy < 0; }
    isMovingDown() { return this.#vy > 0; }
    isMovingLeft() { return this.#vx < 0; }
    isMovingRight() { return this.#vx > 0; }

    moveRel(delta) {
        this._pos.add(delta);
    }

    getBotTipLerpSegment() {
        return new Segment(this._pos.addConst(this.#vSegment.p2), this.#previousPos.addConst(this.#vSegment.p2));
    }
    getTopTipLerpSegment() {
        return new Segment(this._pos.addConst(this.#vSegment.p1), this.#previousPos.addConst(this.#vSegment.p1));
    }
    getLeftTipLerpSegment() {
        return new Segment(this._pos.addConst(this.#hSegment.p1), this.#previousPos.addConst(this.#hSegment.p1));
    }
    getRightTipLerpSegment() {
        return new Segment(this._pos.addConst(this.#hSegment.p2), this.#previousPos.addConst(this.#hSegment.p2));
    }

    update() {
        if (this.#coyoteIterations > 0) {
            this.#coyoteIterations--;
        }
        if (this.#iterationsToBeJumped > 0) {
            this.#vy = this.#jumpVy;
            this.#ay = this.#crouched ? 2 : 1;
            this.#iterationsToBeJumped--;
        }

        if (this.#crouched && (this.#faceDirection === "up" || this.#lookingUp)) {
            if (this.#vx != 0) {
                this.#faceDirection = this.#vx > 0 ? "right" : "left";
                this.#previousFaceDirection = this.#faceDirection;
            } else {
                this.#faceDirection = this.#previousFaceDirection;
            }
        }
        if (this.#lookingUp && !this.#crouched && this.#faceDirection !== "up") {
            if (this.#vx != 0) {
                this.#previousFaceDirection = this.#vx > 0 ? "right" : "left";
            } else {
                this.#previousFaceDirection = this.#faceDirection;
            }
            this.#faceDirection = "up";
        }

        this.#previousVy = this.#vy;
        this.#vy += this.#ay;
        if (this.#previousVy > this.#maxVy) { this.#previousVy = this.#maxVy; }
        if (this.#previousVy < -this.#maxVy) { this.#previousVy = -this.#maxVy; }
        if (this.#vy > this.#maxVy) { this.#vy = this.#maxVy; }
        if (this.#vy < -this.#maxVy) { this.#vy = -this.#maxVy; }

        this.#previousPos = this._pos.clone();
        this._pos.x += this.#vx;
        this._pos.y += this.#vy;

        if (this.#vy >= 0 && this.#previousVy < 0) {
            // Starting to fall after jumping
            this.updateAvailablePlatforms();
        }

        const botTip = this._pos.addConst(this.#vSegment.p2);
        if (this.#platforms.get(this.#lastPlatformTouchedId)?.mayFallOutside(botTip) && this.#finishedJumping) {
            // Falling from platform without jumping (just going beyond its lateral limits)
            const yLimit = this.#platforms.get(this.#lastPlatformTouchedId).getYFromLimit(botTip);
            const margin = 50;  // Chapucilla
            this.updateAvailablePlatforms(yLimit - margin);
            const platformIdxToIgnore = this.#availablePlatformIds.indexOf(this.#lastPlatformTouchedId);
            this.#availablePlatformIds.splice(platformIdxToIgnore, 1);
            this.#lastPlatformTouchedId = null;
        }

        // Attaching to current platform if not jumping
        const withinPlatformBounds = this.#platforms.get(this.#lastPlatformTouchedId)?.isWithinXBounds(this._pos.x);
        if (this.#finishedJumping && withinPlatformBounds) {
            const segmentY = this.#platforms.get(this.#lastPlatformTouchedId)?.getYFromX(this._pos.x);
            this._pos.y = segmentY - this.#vSegment.p2.y + 1;  // +1 para que el personaje pueda intersecar con la plataforma
        }
    }

    setPlatforms(platforms) {
        this.#platforms = platforms;
    }

    updateAvailablePlatforms(yLimit = null) {
        this.#availablePlatformIds = [];
        const botTip = this._pos.addConst(this.#vSegment.p2);
        if (yLimit !== null && botTip.y > yLimit) {
            botTip.y = yLimit;
        }
        for (const [id, platform] of this.#platforms) {
            if (platform.isPointAbovePlatform(botTip)) {
                this.#availablePlatformIds.push(id);
            }
        }
    }

    getAvailablePlatformIds() {
        return this.#availablePlatformIds;
    }

    setLastPlatformTouchedId(lastPlatformTouchedId) {
        this.#lastPlatformTouchedId = lastPlatformTouchedId;
    }

    shoot() {
        this.updateFaceDirection();
        return this.#currentWeapon.shoot();
    }

    throwGrenade() {
        this.updateFaceDirection();
        return this.#currentGrenadeThrower.throw();
    }

    updateFaceDirection() {
        if (this.#finishedJumping || this.#faceDirection === "up") { return; }
        if (this.#vx > 0) {
            this.#faceDirection = "right";
        }
        if (this.#vx < 0) {
            this.#faceDirection = "left";
        }
    }

    /**
     * Returns true if projectile hits the character.
     * The projectile is a segment whose points are its current and previous position.
     * That segment will be checked for collision with the character's ellipse
     * @param {Segment} projectileSegment 
     */
    getsHit(projectileSegment) {
        const hitEllipse = this.#crouched ? this._hitEllipseCrouched : this._hitEllipseStraight;
        const hitPoints = projectileSegment.getDiscretePoints();
        for (const hitPoint of hitPoints) {
            if (hitEllipse.isPointInside(hitPoint)) {
                return true;
            }
        }
        return false;
    }

    inflictDamage(damage) {
        this.#health -= damage;
    }

    draw(ctx, cameraPos) {
        // Debugging...
        ctx.beginPath();
        const vSegmentAbs = this.getVSegmentAbs();
        ctx.moveTo(vSegmentAbs.p1.x + GameScreen.width / 2 - cameraPos.x, vSegmentAbs.p1.y + GameScreen.height / 2 - cameraPos.y);
        ctx.lineTo(vSegmentAbs.p2.x + GameScreen.width / 2 - cameraPos.x, vSegmentAbs.p2.y + GameScreen.height / 2 - cameraPos.y);
        const hSegmentAbs = this.getHSegmentAbs();
        ctx.moveTo(hSegmentAbs.p1.x + GameScreen.width / 2 - cameraPos.x, hSegmentAbs.p1.y + GameScreen.height / 2 - cameraPos.y);
        ctx.lineTo(hSegmentAbs.p2.x + GameScreen.width / 2 - cameraPos.x, hSegmentAbs.p2.y + GameScreen.height / 2 - cameraPos.y);
        // const leftRayCastSegmentAbs = this.getLeftRayCastSegmentAbs();
        // ctx.moveTo(leftRayCastSegmentAbs.p1.x, leftRayCastSegmentAbs.p1.y);
        // ctx.lineTo(leftRayCastSegmentAbs.p2.x, leftRayCastSegmentAbs.p2.y);
        // const rightRayCastSegmentAbs = this.getRightRayCastSegmentAbs();
        // ctx.moveTo(rightRayCastSegmentAbs.p1.x, rightRayCastSegmentAbs.p1.y);
        // ctx.lineTo(rightRayCastSegmentAbs.p2.x, rightRayCastSegmentAbs.p2.y);

        ctx.strokeStyle = "blue";
        ctx.lineWidth = 5;
        ctx.stroke();

        const currentSprite = this._sprites[this.#getCurrentSprite()];
        currentSprite.setStepsPerFrame(1);  // No creo que las animaciones se vayan a acelerar
        currentSprite.resume();
        currentSprite.draw(this._pos.x, this._pos.y + (this.#vSegment.p1.y + this.#vSegment.p2.y) / 2, cameraPos);

        const hitEllipse = this.#crouched ? this._hitEllipseCrouched : this._hitEllipseStraight;
        hitEllipse.draw(ctx, cameraPos);
    }
}