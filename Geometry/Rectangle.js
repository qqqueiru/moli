class Rectangle {
    topLeft = new Point(0, 0);
    botRight = new Point(0, 0);
    static rectIntersectionTmp = new Rectangle(new Point(0, 0), new Point(0, 0));
    constructor(topLeft, botRight) {
        this.topLeft.x = topLeft.x;
        this.topLeft.y = topLeft.y;
        this.botRight.x = botRight.x;
        this.botRight.y = botRight.y;
    }

    getWidth() {
        return this.botRight.x - this.topLeft.x;
    }

    getHeight() {
        return this.botRight.y - this.topLeft.y;
    }

    static rectIntersect(r1, r2) {
        // Assuming intersection first...
        Rectangle.rectIntersectionTmp.topLeft.x = Math.max(r1.topLeft.x, r2.topLeft.x);
        Rectangle.rectIntersectionTmp.topLeft.y = Math.max(r1.topLeft.y, r2.topLeft.y);
        Rectangle.rectIntersectionTmp.botRight.x = Math.min(r1.botRight.x, r2.botRight.x);
        Rectangle.rectIntersectionTmp.botRight.y = Math.min(r1.botRight.y, r2.botRight.y);

        let rectanglesIntersect = true;
        rectanglesIntersect &= (Rectangle.rectIntersectionTmp.topLeft.x < Rectangle.rectIntersectionTmp.botRight.x);
        rectanglesIntersect &= (Rectangle.rectIntersectionTmp.topLeft.y < Rectangle.rectIntersectionTmp.botRight.y);
        if (!rectanglesIntersect) {
            Rectangle.rectIntersectionTmp.topLeft.x = 0;
            Rectangle.rectIntersectionTmp.topLeft.y = 0;
            Rectangle.rectIntersectionTmp.botRight.x = 0;
            Rectangle.rectIntersectionTmp.botRight.y = 0;
        }
        return Rectangle.rectIntersectionTmp;
    }
}