class Circle {
    #fourDiscreteSegments = [
        new Segment(new Point(0, 0), new Point(0, 0)),
        new Segment(new Point(0, 0), new Point(0, 0)),
        new Segment(new Point(0, 0), new Point(0, 0)),
        new Segment(new Point(0, 0), new Point(0, 0)),
    ];
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
        this.#fourDiscreteSegments[0].p1.x = this.centerPoint.x + this.radius;
        this.#fourDiscreteSegments[0].p1.y = this.centerPoint.y;
        this.#fourDiscreteSegments[0].p2.x = this.centerPoint.x - this.radius;
        this.#fourDiscreteSegments[0].p2.y = this.centerPoint.y;

        this.#fourDiscreteSegments[1].p1.x = this.centerPoint.x + this.radius * 0.7071;
        this.#fourDiscreteSegments[1].p1.y = this.centerPoint.y + this.radius * 0.7071;
        this.#fourDiscreteSegments[1].p2.x = this.centerPoint.x - this.radius * 0.7071;
        this.#fourDiscreteSegments[1].p2.y = this.centerPoint.y - this.radius * 0.7071;

        this.#fourDiscreteSegments[2].p1.x = this.centerPoint.x;
        this.#fourDiscreteSegments[2].p1.y = this.centerPoint.y + this.radius;
        this.#fourDiscreteSegments[2].p2.x = this.centerPoint.x;
        this.#fourDiscreteSegments[2].p2.y = this.centerPoint.y - this.radius;

        this.#fourDiscreteSegments[3].p1.x = this.centerPoint.x - this.radius * 0.7071;
        this.#fourDiscreteSegments[3].p1.y = this.centerPoint.y + this.radius * 0.7071;
        this.#fourDiscreteSegments[3].p2.x = this.centerPoint.x + this.radius * 0.7071;
        this.#fourDiscreteSegments[3].p2.y = this.centerPoint.y - this.radius * 0.7071;

        const discretePoints = [];
        // discretePoints.push(...this.#fourDiscreteSegments[0].getFourDiscretePoints());
        // discretePoints.push(...this.#fourDiscreteSegments[1].getFourDiscretePoints());
        // discretePoints.push(...this.#fourDiscreteSegments[2].getFourDiscretePoints());
        // discretePoints.push(...this.#fourDiscreteSegments[3].getFourDiscretePoints());

        discretePoints.push(...this.#fourDiscreteSegments[0].getDiscretePoints(64));
        discretePoints.push(...this.#fourDiscreteSegments[1].getDiscretePoints(64));
        discretePoints.push(...this.#fourDiscreteSegments[2].getDiscretePoints(64));
        discretePoints.push(...this.#fourDiscreteSegments[3].getDiscretePoints(64));

        return discretePoints;
    }
}
