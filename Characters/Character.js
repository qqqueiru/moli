/**
 * Base class for player or NPCs
 */
class Character {
    //      |1
    //  1---------2  // hSegment
    //      |
    //      |
    //      |2  // vSegment
    _health = 1;

    // Las dimensiones de los sprites deberían coincidir con las de los segmentos
    #hSegmentCrouched = new Segment({x: -65, y: 0}, {x: 65, y: 0});  // Relativo a _pos
    #hSegmentStraight = new Segment({x: -65, y: -50}, {x: 65, y: -50});  // Relativo a _pos
    #hSegment = this.#hSegmentStraight  // Relativo a _pos
    #hSegmentAbs = new Segment({x: 0, y: 0}, {x: 0, y: 0});  // Already allocated here, so it won't have to later.

    #vSegmentStraight = new Segment({x: 0, y: -125}, {x: 0, y: 75});  // Relativo a _pos
    #vSegmentCrouched = new Segment({x: 0, y: -50}, {x: 0, y: 50});  // Relativo a _pos
    #vSegment = this.#vSegmentStraight;  // Relativo a _pos
    #vSegmentAbs = new Segment({x: 0, y: 0}, {x: 0, y: 0});  // Already allocated here, so it won't have to later.

    #leftRayCastSegment = new Segment({x: -40, y: 20}, {x: -40, y: 60});  // Relativo a _pos (Creo que lo más sencillo es hacer la plataforma más grande...)
    #rightRayCastSegment = new Segment({x: 40, y: 20}, {x: 40, y: 60});  // Relativo a _pos

    #floorRayCast = new Segment({x: 0, y: 0}, {x: 0, y: 0});  // Already allocated here, so it won't have to later.
    #botTip = new Point(0, 0);
    #previousBotTip = new Point(0, 0);

    #previousPos = new Point(0, 0);
    #previousVy = 0;    
    _pos = new Point(0, 0);
    _maxSpeedX = 10;
    #vx = 0;
    #vy = 0;
    #jumpVy = -200;
    #maxVy = 10;
    #ay = 1;
    #platforms = [];
    #walls = [];
    #availablePlatformIds = [];
    #lastPlatformTouchedId = null;
    #canJump = false;
    #finishedJumping = false;  // Se puede usar para saber si se ha de dibujar el salto
    #iterationsToBeJumped = 0;
    #maxIterationsJumped = 20;
    #crouched = false;
    #shootingHeight = 0;
    _shootingHeightUp = -43;
    _shootingHeightCrouched = 0;
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

    _states;

    #tracePoints = [];

    _facingDirection = "right";  // Only left or right...
    constructor(pos) {
        if (pos) {
            this._pos = pos.clone();
            this.#previousPos = this._pos.clone();
        }
        this.reset();
    }

    reset() {
        this.#faceDirection = "right";  // right, left or up
        this.#previousFaceDirection = "right";
        this.#coyoteIterations = 0;
        this.#crouched = false;
        this.#lookingUp = false;
        this.#finishedJumping = false;  // Se puede usar para saber si se ha de dibujar el salto
        this._health = 1;
        this._states = {
            currentState: "NONE",
            NONE: new CharacterState(
                "NONE", 
                0, 
                () => {
                    // NOP
                },
                () => {
                    // if (this.#canSpawn) {  // TODO, ?
                        this._states.currentState = "SPAWNING";
                    // }
                },
            ),
            SPAWNING: new CharacterState(
                "SPAWNING", 
                60, 
                () => {
                    // NOP
                },
                () => {
                    this._states.currentState = "ALIVE";
                },
            ),
            ALIVE:  new CharacterState(
                "ALIVE", 
                -1, 
                () => {
                    if (this._health <= 0) {
                        this._states.currentState = "DYING";
                        if (this.#canJump) {
                            this.startJump();
                            this.#iterationsToBeJumped = 1;
                        }
                        if (this.#faceDirection === "up") {
                            this.setLookingUp(false);
                            this.#faceDirection = this._facingDirection;
                        }
                        if (this.#faceDirection === "left") {
                            this.#vx = this._maxSpeedX;
                        } else {
                            this.#vx = -this._maxSpeedX;
                        }
                        this.setCrouched(true);
                    }
                },
                () => {
                    // NOP
                },
            ),
            DYING: new CharacterState(
                "DYING", 
                50, 
                () => {
                    if (Math.abs(this.#vx) < 0.1) {
                        this.#vx = 0;
                    } else {
                        this.#vx *= 0.9; 
                    }
                },
                () => {
                    this._states.currentState = "DEAD";
                },
            ),
            DEAD: new CharacterState(
                "DEAD", 
                -1, 
                () => {
                    if (Math.abs(this.#vx) < 0.1) {
                        this.#vx = 0;
                    } else {
                        this.#vx *= 0.9; 
                    }
                },
                () => {
                    // NOP
                },
            ),
            SALUTING: new CharacterState(
                "SALUTING",
                -1,
                () => {
                    this.dontMove();
                    this.setCrouched(false);
                },
                () => {
                    // NOP
                },
            )
        };
    }

    getCurrentState() {
        return this._states.currentState;
    }

    getVx() {
        return this.#vx;
    }

    isDead() {
        return this._states.currentState === "DEAD";
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
            this.#faceDirection = this._facingDirection;
        }
        this.#lookingUp = lookUp;
    }

    dontMove() {
        this.#vx = 0;
    }

    moveRight() {
        this.#vx = this.#crouched ? this._maxSpeedX / 2 : this._maxSpeedX;
        this.#vx += this.#iterationsToBeJumped > 0 ? 2 : 0;
        if (this.#finishedJumping && !this.#lookingUp) {
            this.#faceDirection = "right";
        }
        this._facingDirection = "right";
    }

    moveLeft() {
        this.#vx = this.#crouched ? -this._maxSpeedX / 2 : -this._maxSpeedX;
        this.#vx += this.#iterationsToBeJumped > 0 ? -2 : 0;
        if (this.#finishedJumping && !this.#lookingUp) {
            this.#faceDirection = "left";
        }
        this._facingDirection = "left";
    }

    jump(vy) {
        if (this.#iterationsToBeJumped > 0) {
            this.#vy = vy;
            this.#iterationsToBeJumped--;
        }
    }

    getHealth() {
        return this._health;
    }

    startJump() {
        let startedJump = false;
        if (this.#canJump && this.#iterationsToBeJumped === 0) {
            this.#iterationsToBeJumped = this.#maxIterationsJumped;
            this.#coyoteIterations = 0;
            startedJump = true;
            this.#finishedJumping = false;
            this._pos.y -= 25;
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
            this.#shootingHeight = this._shootingHeightCrouched;
        } else {
            this.#hSegment = this.#hSegmentStraight;
            this.#vSegment = this.#vSegmentStraight;
            this.#shootingHeight = this._shootingHeightUp;
        }
    }

    setCoyoteIterations(coyoteIterations) {
        this.#coyoteIterations = coyoteIterations;
    }

    getCurrentSprite() {
        const defaultSprite = "blank";
        if (this._states.currentState === "SALUTING") {
            return "saluting_" + this._facingDirection;
        }
        if (this._states.currentState === "ALIVE" || this._states.currentState === "SPAWNING") {
            if (this.#crouched) {
                return "crouch_" + this.#faceDirection;
            } else {
                if (this.#faceDirection === "up")  {
                    return "up_" + this._facingDirection;
                }
                return this.#faceDirection;
            }
        }
        if (this._states.currentState === "DYING") {
            return "dying_" + (this.#crouched ? "crouch_" : "") + this.#faceDirection;
        }
        if (this._states.currentState === "DEAD") {
            return "dead_" + (this.#crouched ? "crouch_" : "") + this.#faceDirection;
        }
        return defaultSprite;
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
        this.#hSegmentAbs.p1.x = this._pos.x + this.#hSegment.p1.x;
        this.#hSegmentAbs.p1.y = this._pos.y + this.#hSegment.p1.y;
        this.#hSegmentAbs.p2.x = this._pos.x + this.#hSegment.p2.x;
        this.#hSegmentAbs.p2.y = this._pos.y + this.#hSegment.p2.y;
        return this.#hSegmentAbs;
    }
    getVSegmentAbs() {
        this.#vSegmentAbs.p1.x = this._pos.x + this.#vSegment.p1.x;
        this.#vSegmentAbs.p1.y = this._pos.y + this.#vSegment.p1.y;
        this.#vSegmentAbs.p2.x = this._pos.x + this.#vSegment.p2.x;
        this.#vSegmentAbs.p2.y = this._pos.y + this.#vSegment.p2.y;
        return this.#vSegmentAbs;
    }
    getFloorRayCast() {
        this.#floorRayCast.p1.x = this._pos.x + this.#vSegment.p1.x;
        this.#floorRayCast.p1.y = this._pos.y + this.#vSegment.p1.y;

        this.#floorRayCast.p2.x = this._pos.x + this.#vSegment.p2.x;
        this.#floorRayCast.p2.y = this._pos.y + this.#vSegment.p2.y;

        if (this.#floorRayCast.p1.y > this.#floorRayCast.p2.y) {
            this.#floorRayCast.p2.y = this.#floorRayCast.p1.y - 50;
        } else {
            this.#floorRayCast.p1.y = this.#floorRayCast.p2.y - 50;
        }
        return this.#floorRayCast;
    }

    isMovingUp() { return this.#vy < 0; }
    isMovingDown() { return this.#vy > 0; }
    isMovingLeft() { return this.#vx < 0; }
    isMovingRight() { return this.#vx > 0; }

    moveRel(delta) {
        this._pos.add(delta);
    }

    getPreviousBotTip() {
        this.#previousBotTip.x = this.#previousPos.x + this.#vSegment.p2.x;
        this.#previousBotTip.y = this.#previousPos.y + this.#vSegment.p2.y;
        return this.#previousBotTip;
    }

    #revisePosWithWalls() {
        const characterSegment = this.getHSegmentAbs();
        for (const [id, wall] of this.#walls) {
            const wallSegment = wall.getSegment();
            const dx = this._pos.x - wallSegment.p1.x;
            if (id === -1 && dx < 0) {  // Left camera wall trespass
                this._pos.x = wallSegment.p1.x + 1;
            }
            if (id === -2 && dx > 0) {  // Right camera wall trespass
                this._pos.x = wallSegment.p1.x - 1;
            }
            if (dx * dx > 90000) {  // Collision ignored if character distance to wall is greater than 300px
                continue;
            }
            if (!Segment.doIntersect(wallSegment, characterSegment)) {
                continue;
            }
            const intersection = Segment.pointIntersection(characterSegment, wallSegment);

            if (intersection.x > this._pos.x) {
                // Player must not pass to the right, so it must be moved to the left accordingly
                this._pos.x += intersection.x - this._pos.x - this.#hSegment.p2.x;  // right tip
            } else {
                this._pos.x += intersection.x - this._pos.x - this.#hSegment.p1.x;  // left tip
            }
            return;
        }
    }

    update() {
        this.#revisePosWithWalls();
        this._states[this._states.currentState].update();

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
                this.#faceDirection = this._facingDirection;  // this.#vx > 0 ? "right" : "left";
                this.#previousFaceDirection = this.#faceDirection;
            } else {
                this.#faceDirection = this._facingDirection;  // this.#previousFaceDirection;
            }
        }
        if (this.#lookingUp && !this.#crouched && this.#faceDirection !== "up") {
            if (this.#vx != 0) {
                this.#previousFaceDirection = this._facingDirection;  // this.#vx > 0 ? "right" : "left";
            } else {
                this.#previousFaceDirection = this._facingDirection;  // this.#faceDirection;
            }
            this.#faceDirection = "up";
        }

        this.#previousVy = this.#vy;
        this.#vy += this.#ay;
        if (this.#previousVy > this.#maxVy) { this.#previousVy = this.#maxVy; }
        if (this.#previousVy < -this.#maxVy) { this.#previousVy = -this.#maxVy; }
        if (this.#vy > this.#maxVy) { this.#vy = this.#maxVy; }
        if (this.#vy < -this.#maxVy) { this.#vy = -this.#maxVy; }

        this.#previousPos.x = this._pos.x;
        this.#previousPos.y = this._pos.y;
        this._pos.x += this.#vx;
        this._pos.y += this.#vy;


        // if (this.#vy >= 0 && this.#previousVy < 0) {
        if (this.#vy <= 0) {
            // Starting to fall after jumping
            this.updateAvailablePlatforms();
        }

        this.#botTip.x = this._pos.x + this.#vSegment.p2.x;
        this.#botTip.y = this._pos.y + this.#vSegment.p2.y;
        if (this.#platforms.get(this.#lastPlatformTouchedId)?.mayFallOutside(this.#botTip) && this.#finishedJumping) {
            // Falling from platform without jumping (just going beyond its lateral limits)
            const nearestPointLimit = this.#platforms.get(this.#lastPlatformTouchedId).getNearestPointLimit(this.#botTip);
            this.#botTip.x = nearestPointLimit.x;
            this.#botTip.y = nearestPointLimit.y;
            // const yLimit = this.#platforms.get(this.#lastPlatformTouchedId).getYFromLimit(this.#botTip);
            const margin = 25;
            const yLimit = this.#botTip.y - margin;
            this.updateAvailablePlatforms(yLimit, this.#botTip.x);
            const platformIdxToIgnore = this.#availablePlatformIds.indexOf(this.#lastPlatformTouchedId);
            // if (platformIdxToIgnore >= 0) {
            //     this.#availablePlatformIds.splice(platformIdxToIgnore, 1);
            // }
            this.#lastPlatformTouchedId = null;
        }
        // Attaching to current platform if not jumping
        const withinPlatformBounds = this.#platforms.get(this.#lastPlatformTouchedId)?.isWithinXBounds(this._pos.x);
        if (this.#finishedJumping && withinPlatformBounds) {
            const segmentY = this.#platforms.get(this.#lastPlatformTouchedId)?.getYFromX(this._pos.x);
            this._pos.y = segmentY - this.#vSegment.p2.y + 1;  // +1 para que el personaje pueda intersecar con la plataforma
        }

        // if (!this._pos.equals(this.#previousPos)) {
        //     this.#tracePoints.push(this.getFloorRayCast().p2.clone());
        // }
    }

    getTracePoints() {
        return this.#tracePoints;
    }

    setPlatforms(platforms) {
        this.#platforms = platforms;
    }

    setWalls(walls) {
        this.#walls = walls;
    }

    updateAvailablePlatforms(yLimit = null, xCorrection = null) {
        this.#availablePlatformIds = [];
        this.#botTip.x = this._pos.x + this.#vSegment.p2.x;
        this.#botTip.y = this._pos.y + this.#vSegment.p2.y;
        if (yLimit === null && xCorrection === null) {
            this.#botTip.y -= 50;
        }
        if (yLimit !== null && this.#botTip.y > yLimit) {
            this.#botTip.y = yLimit;
        }
        if (xCorrection !== null) {
            this.#botTip.x = xCorrection;
        }
        for (const [id, platform] of this.#platforms) {
            if (platform.isPointAbovePlatform(this.#botTip)) {
                this.#availablePlatformIds.push(id);
            }
        }
    }

    getAvailablePlatformIds() {
        return this.#availablePlatformIds;
    }

    getLastPlatformTouchedId() {
        return this.#lastPlatformTouchedId;
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

    isJumping() {
        return !this.#finishedJumping;
    }

    /**
     * Returns true if segment collides the character.
     * @param {Segment} segment 
     */
    getsHitBySegment(segment) {
        const hitEllipse = this.#crouched ? this._hitEllipseCrouched : this._hitEllipseStraight;
        const hitPoints = segment.getDiscretePoints();
        for (const hitPoint of hitPoints) {
            if (hitEllipse.isPointInside(hitPoint)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns true if circle collides the character
     * @param {Circle} circle 
     * @returns 
     */
    getsHitByCircle(circle) {
        const hitEllipse = this.#crouched ? this._hitEllipseCrouched : this._hitEllipseStraight;
        const hitPoints = circle.getDiscretePoints();
        for (const hitPoint of hitPoints) {
            if (hitEllipse.isPointInside(hitPoint)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns true if discretized points from geometric entity hit the character.
     * Recommended over getsHitBySegment or getsHitByCircle as it does not have to
     * recalculate the hitPoints for each character.
     * @param {[Point]} hitPoints 
     */
    getsHitByPoints(hitPoints) {
        const hitEllipse = this.#crouched ? this._hitEllipseCrouched : this._hitEllipseStraight;
        for (const hitPoint of hitPoints) {
            if (hitEllipse.isPointInside(hitPoint)) {
                return true;
            }
        }
        return false;
    }

    inflictDamage(damage) {
        if (this._states.currentState != "ALIVE") {
            return;
        }
        this._health -= damage;
    }

    draw(ctx, cameraPos) {
        if (this._pos.distanceFromPoint(cameraPos) > GameScreen.drawDistance) {
            return;
        }
        // Debugging...
        // // Cross
        // ctx.beginPath();
        // const vSegmentAbs = this.getVSegmentAbs();
        // ctx.moveTo(vSegmentAbs.p1.x + GameScreen.width / 2 - cameraPos.x, vSegmentAbs.p1.y + GameScreen.height / 2 - cameraPos.y);
        // ctx.lineTo(vSegmentAbs.p2.x + GameScreen.width / 2 - cameraPos.x, vSegmentAbs.p2.y + GameScreen.height / 2 - cameraPos.y);
        // const hSegmentAbs = this.getHSegmentAbs();
        // ctx.moveTo(hSegmentAbs.p1.x + GameScreen.width / 2 - cameraPos.x, hSegmentAbs.p1.y + GameScreen.height / 2 - cameraPos.y);
        // ctx.lineTo(hSegmentAbs.p2.x + GameScreen.width / 2 - cameraPos.x, hSegmentAbs.p2.y + GameScreen.height / 2 - cameraPos.y);
        
        // ctx.strokeStyle = "blue";
        // ctx.lineWidth = 5;
        // ctx.stroke();

        // if (this.#tracePoints.length > 0) {
        //     for (let i = 1; i < this.#tracePoints.length; ++i) {
        //         ctx.moveTo(this.#tracePoints[i - 1].x + GameScreen.width / 2 - cameraPos.x, this.#tracePoints[i -1].y + GameScreen.height / 2 - cameraPos.y);
        //         ctx.lineTo(this.#tracePoints[i].x + GameScreen.width / 2 - cameraPos.x, this.#tracePoints[i].y + GameScreen.height / 2 - cameraPos.y);
        //         ctx.moveTo(this.#tracePoints[i].x + GameScreen.width / 2 - cameraPos.x, this.#tracePoints[i].y + GameScreen.height / 2 - cameraPos.y);
        //     }
        //     ctx.strokeStyle = "green";
        //     ctx.lineWidth = 2;
        //     ctx.stroke();
        // }


        const currentSprite = this._sprites[this.getCurrentSprite()];
        // currentSprite.setStepsPerFrame(1);  // No creo que las animaciones se vayan a acelerar
        currentSprite.resume();
        currentSprite.draw(this._pos.x, this._pos.y + (this.#vSegment.p1.y + this.#vSegment.p2.y) / 2, cameraPos);

        // Hit Ellipse
        // const hitEllipse = this.#crouched ? this._hitEllipseCrouched : this._hitEllipseStraight;
        // hitEllipse.draw(ctx, cameraPos);
    }
}