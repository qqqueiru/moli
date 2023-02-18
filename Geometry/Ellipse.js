class Ellipse {
    /**
     * 
     * @param {Point} centerPoint 
     * @param {number} a semi-major axis
     * @param {number} b semi-minor axis
     */
    constructor(centerPoint, a, b) {
        this.centerPoint = centerPoint;
        this.a = a;
        this.b = b;
    }
    /**
     * 
     * @param {Point} pointToCheck 
     * @returns true if pointToCheck is inside the ellipse
     */
    isPointInside(pointToCheck) {
        const distance =
            (this.centerPoint.x - pointToCheck.x) * (this.centerPoint.x - pointToCheck.x) / (this.a * this.a) +
            (this.centerPoint.y - pointToCheck.y) * (this.centerPoint.y - pointToCheck.y) / (this.b * this.b);
        return distance <= 1;
    }
    draw() {
        ctx.beginPath();
        ctx.ellipse(
            Math.floor(this.centerPoint.x), 
            Math.floor(this.centerPoint.y),
            Math.floor(this.a),
            Math.floor(this.b),
            0,
            0,
            2 * Math.PI
        );
        ctx.stroke();
    }
}
