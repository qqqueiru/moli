class Ellipse {
    /**
     * 
     * @param {Point} centerPoint passed as a reference
     * @param {number} a semi-major axis
     * @param {number} b semi-minor axis
     * @param {number} offX offset x to center
     * @param {number} offY offset y to center
     */
    constructor(centerPoint, a, b, offX = 0, offY = 0) {
        this.centerPoint = centerPoint;
        this.a = a;
        this.b = b;
        this.offX = offX;
        this.offY = offY;
    }
    /**
     * 
     * @param {Point} pointToCheck 
     * @returns true if pointToCheck is inside the ellipse
     */
    isPointInside(pointToCheck) {
        const cx = this.centerPoint.x + this.offX;
        const cy = this.centerPoint.y + this.offY;
        const distance =
            (cx - pointToCheck.x) * (cx - pointToCheck.x) / (this.a * this.a) +
            (cy - pointToCheck.y) * (cy - pointToCheck.y) / (this.b * this.b);
        return distance <= 1;
    }
    draw(ctx, cameraPos) {
        const cx = this.centerPoint.x + this.offX + GameScreen.width / 2 - cameraPos.x;
        const cy = this.centerPoint.y + this.offY + GameScreen.height / 2 - cameraPos.y;
        ctx.beginPath();
        ctx.ellipse(
            Math.floor(cx),
            Math.floor(cy),
            Math.floor(this.a),
            Math.floor(this.b),
            0,
            0,
            2 * Math.PI
        );
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}
