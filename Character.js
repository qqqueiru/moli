/**
 * Base class for player or NPCs
 */
class Character {
    //      |1
    //  1---------2  // hSegment
    //      |
    //      |
    //      |2  // vSegment
    #hSegment = new Segment({x: -30, y: -20}, {x: 30, y: -20});  // Relativo a #pos
    #vSegment = new Segment({x: 0, y: -50}, {x: 0, y: 50});  // Relativo a #pos
    #previousPos = new Point(0, 0);
    #previousVy = 0;    
    #pos = new Point(500, 500);
    #vx = 0;  // TODO establecer un máximo
    #vy = 0;
    #ay = 50;
    #platforms = [];
    #availablePlatformIds = [];
    #lastPlatformTouchedId = null;
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

    getHSegmentAbs() {
        return new Segment(this.#pos.addConst(this.#hSegment.p1), this.#pos.addConst(this.#hSegment.p2));
    }
    getVSegmentAbs() {
        return new Segment(this.#pos.addConst(this.#vSegment.p1), this.#pos.addConst(this.#vSegment.p2));
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
        const deltaT = 0.01666;  // s
        this.#previousVy = this.#vy;
        // console.log(this.#previousVy);
        this.#vy += this.#ay * deltaT;  // TODO activar gravedad

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
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 5;
        ctx.stroke();

    }
}