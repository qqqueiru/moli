class Segment {
    /**
     * @param {Point} p1 
     * @param {Point} p2 
     */
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
    /**
     * Checks if point is on the segment
     * @param {Point} p 
     * @returns 
     */
    onSegment(p) {
        return (p.x <= Math.max(this.p1.x, this.p2.x) && p.x >= Math.min(this.p1.x, this.p2.x) &&
            p.y <= Math.max(this.p1.y, this.p2.y) && p.y >= Math.min(this.p1.y, this.p2.y));
    }
    /**
     * Returns true if two segments intersect
     * @param {Segment} s1
     * @param {Segment} s2
     */
    static doIntersect(s1, s2) {
        // Find the four orientations needed for general and
        // special cases
        let o1 = Point.orientation(s1.p1, s1.p2, s2.p1);
        let o2 = Point.orientation(s1.p1, s1.p2, s2.p2);
        let o3 = Point.orientation(s2.p1, s2.p2, s1.p1);
        let o4 = Point.orientation(s2.p1, s2.p2, s1.p2);
        
        // General case
        if (o1 != o2 && o3 != o4) {
            return true;
        }
            

        // Special Cases
        if (o1 == 0 && s1.onSegment(s2.p1)) { return true; }
        if (o2 == 0 && s1.onSegment(s2.p2)) { return true; }
        if (o3 == 0 && s2.onSegment(s1.p1)) { return true; }
        if (o4 == 0 && s2.onSegment(s1.p2)) { return true; }

        return false; // Doesn't fall in any of the above cases
    }
    /**
     * Returns the Point intersection of two segments.
     * It assumes the segments do intersect.
     * @param {Segment} s1
     * @param {Segment} s2
     */
    static pointIntersection(s1, s2) {
        // Calculate the coefficients of the equation for the first line
        const a1 = s1.p2.y - s1.p1.y;
        const b1 = s1.p1.x - s1.p2.x;
        const c1 = a1 * s1.p1.x + b1 * s1.p1.y;

        // Calculate the coefficients of the equation for the second line
        const a2 = s2.p2.y - s2.p1.y;
        const b2 = s2.p1.x - s2.p2.x;
        const c2 = a2 * s2.p1.x + b2 * s2.p1.y;

        // Calculate the intersection point
        const determinant = a1 * b2 - a2 * b1;

        if (determinant === 0) {
            // The lines are parallel, so they don't intersect
            return null;  // There should be no collision in this case
        } else {
            const x = (b2 * c1 - b1 * c2) / determinant;
            const y = (a1 * c2 - a2 * c1) / determinant;
            return new Point(x, y);
        }
    }
    isPointAbove(p) {
        if (this.p2.x == this.p1.x) { return false; }
        const yOfSegment = this.getY(p.x);
        return p.y <= yOfSegment;
    }

    getY(x) {
        // y = a * x + b
        const a = (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);
        const b = this.p1.y - a * this.p1.x;
        return a * x + b;
    }

    getMinX() { return Math.min(this.p1.x, this.p2.x); }
    getMaxX() { return Math.max(this.p1.x, this.p2.x); }
    getMinY() { return Math.min(this.p1.y, this.p2.y); }
    getMaxY() { return Math.max(this.p1.y, this.p2.y); }

    /**
     * 
     * @param {number} n Number of divisions of the segment
     * @returns 
     */
    getDiscretePoints(n = -1) {
        const deltaX = this.p2.x - this.p1.x;
        const deltaY = this.p2.y - this.p1.y;
        if (n <= 0) {
            const d = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const minDist = 1;  // Minimum distance between discrete points
            n = d / minDist;
        }
        n = Math.ceil(n);

        const discretePoints = [];
        // discretePoints.reserve(n);
        discretePoints.push(this.p1);
        for (let i = 1; i < n; ++i) {
            const previousX = discretePoints[i - 1].x;
            const previousY = discretePoints[i - 1].y;
            const newX = previousX + deltaX / n;
            const newY = previousY + deltaY / n;
            discretePoints.push(new Point(newX, newY));
        }
        discretePoints.push(this.p2);  // Same as end point for numeric stability

        return discretePoints;
    }

    getCenter() {
        const midX = (this.p1.x + this.p2.x) / 2;
        const midY = (this.p1.y + this.p2.y) / 2;
        return new Point(midX, midY);
    }
}
