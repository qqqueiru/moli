class Circle {
    /**
     * 
     * @param {Point} centerPoint
     * @param {number} radius
     */
    constructor(centerPoint, radius) {
        this.centerPoint = centerPoint;
        this.radius = radius;
    }
    getDiscretePoints() {
        const segment_0 = new Segment(
            this.centerPoint.addConst(new Point(this.radius, 0)),
            this.centerPoint.addConst(new Point(-this.radius, 0)),
        );
        const segment_1 = new Segment(
            this.centerPoint.addConst(new Point(this.radius * 0.7071, this.radius * 0.7071)),
            this.centerPoint.addConst(new Point(-this.radius * 0.7071, -this.radius * 0.7071)),
        );
        const segment_2 = new Segment(
            this.centerPoint.addConst(new Point(0, this.radius)),
            this.centerPoint.addConst(new Point(0, -this.radius)),
        );
        const segment_3 = new Segment(
            this.centerPoint.addConst(new Point(-this.radius * 0.7071, this.radius * 0.7071)),
            this.centerPoint.addConst(new Point(this.radius * 0.7071, -this.radius * 0.7071)),
        );

        const discretePoints = [];
        discretePoints.push(segment_0.getDiscretePoints());
        discretePoints.push(segment_1.getDiscretePoints());
        discretePoints.push(segment_2.getDiscretePoints());
        discretePoints.push(segment_3.getDiscretePoints());

        return discretePoints;
    }
}
