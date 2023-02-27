class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    add(p) {
        this.x += p.x;
        this.y += p.y;
    }
    substract(p) {
        this.x -= p.x;
        this.y -= p.y;
    }
    clone() {
        return new Point(this.x, this.y);
    }
    // Const porque JavaScript no me deja sobrecargar operadores +, - ...
    addConst(p) {
        return new Point(this.x + p.x, this.y + p.y);
    }
    substractConst(p) {
        return new Point(this.x - p.x, this.y - p.y);
    }

    distanceFromPoint(p) {
        return Math.sqrt((this.x - p.x) * (this.x - p.x) + (this.y - p.y) * (this.y - p.y))
    }

    equals(p) {
        return this.x === p.x && this.y === p.y;
    }

    /**
     * Returns following values:
     * 0 --> p1, p2 and p3 are collinear
     * 1 --> Clockwise
     * 2 --> Counterclockwise 
     * @param {Point} p1 
     * @param {Point} p2 
     * @param {Point} p3 
     * @returns 
     */
    static orientation(p1, p2, p3) {
        const val = (p2.y - p1.y) * (p3.x - p2.x) -
            (p2.x - p1.x) * (p3.y - p2.y);
    
        if (val == 0) return 0;  // Collinear
        return (val > 0)? 1: 2;  // Clock or counterclock wise
    }
}
