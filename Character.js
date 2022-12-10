/**
 * Base class for player or NPCs
 */
class Character {
    //      |1
    //  1---------2  // hSegment
    //      |
    //      |
    //      |2  // vSegment
    #hSegment = new Segment({x: -60, y: -50}, {x: 60, y: -50});  // Relativo a #pos
    #vSegment = new Segment({x: 0, y: -110}, {x: 0, y: 60});  // Relativo a #pos
    #leftRayCastSegment = new Segment({x: -40, y: 20}, {x: -40, y: 60});  // Relativo a #pos (Creo que lo más sencillo es hacer la plataforma más grande...)
    #rightRayCastSegment = new Segment({x: 40, y: 20}, {x: 40, y: 60});  // Relativo a #pos
    #previousPos = new Point(0, 0);
    #previousVy = 0;    
    #pos = new Point(500, 500);
    #vx = 0;  // TODO establecer un máximo
    #vy = 0;
    #jumpVy = -200;
    #maxVy = 10;
    #ay = 1;
    #platforms = [];
    #availablePlatformIds = [];
    #lastPlatformTouchedId = null;
    #canJump = false;
    #iterationsToBeJumped = 0;
    #maxIterationsJumped = 20;
    #crouched = false;
    #lookingUp = false;
    #coyoteIterations = 0;
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
    }

    setLookingUp(lookUp) {
        this.#lookingUp = lookUp;
    }

    dontMove() {
        this.#vx = 0;
    }

    moveRight() {
        this.#vx = this.#crouched ? 4 : 10;
    }

    moveLeft() {
        this.#vx = this.#crouched ? -4 : -10;
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
            this.#hSegment = new Segment({x: -60, y: 0}, {x: 60, y: 0});  // Relativo a #pos
            this.#vSegment = new Segment({x: 0, y: -60}, {x: 0, y: 60});  // Relativo a #pos
        } else {
            this.#hSegment = new Segment({x: -60, y: -50}, {x: 60, y: -50});  // Relativo a #pos
            this.#vSegment = new Segment({x: 0, y: -110}, {x: 0, y: 60});  // Relativo a #pos
        }
    }

    setCoyoteIterations(coyoteIterations) {
        this.#coyoteIterations = coyoteIterations;
    }

    getCoyoteIterations() {
        return this.#coyoteIterations;
    }

    getHSegmentAbs() {
        return new Segment(this.#pos.addConst(this.#hSegment.p1), this.#pos.addConst(this.#hSegment.p2));
    }
    getVSegmentAbs() {
        return new Segment(this.#pos.addConst(this.#vSegment.p1), this.#pos.addConst(this.#vSegment.p2));
    }
    getLeftRayCastSegmentAbs() {
        return new Segment(this.#pos.addConst(this.#leftRayCastSegment.p1), this.#pos.addConst(this.#leftRayCastSegment.p2));
    }
    getRightRayCastSegmentAbs() {
        return new Segment(this.#pos.addConst(this.#rightRayCastSegment.p1), this.#pos.addConst(this.#rightRayCastSegment.p2));
    }

    isMovingUp() { return this.#vy < 0; }
    isMovingDown() { return this.#vy > 0; }
    isMovingLeft() { return this.#vx < 0; }
    isMovingRight() { return this.#vx > 0; }

    moveRel(delta) {
        this.#pos.add(delta);
    }

    getBotTipLerpSegment() {
        return new Segment(this.#pos.addConst(this.#vSegment.p2), this.#previousPos.addConst(this.#vSegment.p2));
    }
    getTopTipLerpSegment() {
        return new Segment(this.#pos.addConst(this.#vSegment.p1), this.#previousPos.addConst(this.#vSegment.p1));
    }
    getLeftTipLerpSegment() {
        return new Segment(this.#pos.addConst(this.#hSegment.p1), this.#previousPos.addConst(this.#hSegment.p1));
    }
    getRightTipLerpSegment() {
        return new Segment(this.#pos.addConst(this.#hSegment.p2), this.#previousPos.addConst(this.#hSegment.p2));
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

        this.#previousVy = this.#vy;
        this.#vy += this.#ay;
        if (this.#previousVy > this.#maxVy) { this.#previousVy = this.#maxVy; }
        if (this.#previousVy < -this.#maxVy) { this.#previousVy = -this.#maxVy; }
        if (this.#vy > this.#maxVy) { this.#vy = this.#maxVy; }
        if (this.#vy < -this.#maxVy) { this.#vy = -this.#maxVy; }

        this.#previousPos = this.#pos;
        this.#pos.x += this.#vx;
        this.#pos.y += this.#vy;

        if (this.#vy >= 0 && this.#previousVy < 0) {
            // Starting to fall after jumping
            this.updateAvailablePlatforms();
        }

        const botTip = this.#pos.addConst(this.#vSegment.p2);
        if (this.#platforms.get(this.#lastPlatformTouchedId)?.mayFallOutside(botTip)) {
            // Falling from platform without jumping (just going beyond its lateral limits)
            this.updateAvailablePlatforms();
        }
    }

    setPlatforms(platforms) {
        this.#platforms = platforms;
    }

    updateAvailablePlatforms() {
        this.#availablePlatformIds = [];
        const botTip = this.#pos.addConst(this.#vSegment.p2);
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

    draw(ctx, cameraPos) {
        // Por ahora me da igual cameraPos
        // Debugging...
        ctx.beginPath();
        const vSegmentAbs = this.getVSegmentAbs();
        ctx.moveTo(vSegmentAbs.p1.x, vSegmentAbs.p1.y);
        ctx.lineTo(vSegmentAbs.p2.x, vSegmentAbs.p2.y);
        const hSegmentAbs = this.getHSegmentAbs();
        ctx.moveTo(hSegmentAbs.p1.x, hSegmentAbs.p1.y);
        ctx.lineTo(hSegmentAbs.p2.x, hSegmentAbs.p2.y);
        // const leftRayCastSegmentAbs = this.getLeftRayCastSegmentAbs();
        // ctx.moveTo(leftRayCastSegmentAbs.p1.x, leftRayCastSegmentAbs.p1.y);
        // ctx.lineTo(leftRayCastSegmentAbs.p2.x, leftRayCastSegmentAbs.p2.y);
        // const rightRayCastSegmentAbs = this.getRightRayCastSegmentAbs();
        // ctx.moveTo(rightRayCastSegmentAbs.p1.x, rightRayCastSegmentAbs.p1.y);
        // ctx.lineTo(rightRayCastSegmentAbs.p2.x, rightRayCastSegmentAbs.p2.y);

        ctx.strokeStyle = "blue";
        ctx.lineWidth = 5;
        ctx.stroke();

    }
}