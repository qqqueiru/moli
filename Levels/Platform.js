class Platform {
    #id;
    #segment;  // floor
    #vx;
    #vy;
    constructor(id, segment) {
        this.#id = id;
        this.#segment = segment;
        // Por 
        this.#vx = 0;
        this.#vy = 0;
    }
    setVx(newVx) {
        this.#vx = newVx;
    }
    setVy(newVy) {
        this.#vy = newVy;
    }
    update() {
        this.#segment.p1.add({x: this.#vx, y: this.#vy});
        this.#segment.p2.add({x: this.#vx, y: this.#vy});
    }
    getDeltaPos() {
        return new Point(this.#vx, this.#vy);
    }
    getId() {
        return this.#id;
    }
    getSegment() {
        return this.#segment;
    }
    draw(ctx) {
        // Dibujado del segmento del suelo
        ctx.beginPath();
        ctx.moveTo(this.#segment.p1.x, this.#segment.p1.y);
        ctx.lineTo(this.#segment.p2.x, this.#segment.p2.y);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.stroke();
    }
    isPointAbovePlatform(p) {
        return this.#segment.isPointAbove(p);
    }

    mayFallOutside(p) {
        const outLeft = p.x < this.#segment.getMinX();
        const outRight = p.x > this.#segment.getMaxX();
        return outLeft || outRight;
    }

    getNearestXLimit(x) {
        const dp1 = Math.abs(x - this.#segment.p1.x);
        const dp2 = Math.abs(x - this.#segment.p2.x);
        if (dp1 > dp2) {
            return this.#segment.p2.x;
        } else {
            return this.#segment.p1.x;
        }
    }

    getNearestPointLimit(p) {
        const dp1 = p.distanceFromPoint(this.#segment.p1);
        const dp2 = p.distanceFromPoint(this.#segment.p2);
        if (dp1 > dp2) {
            return this.#segment.p2;
        } else {
            return this.#segment.p1;
        }
    }

    getYFromLimit(p) {
        let yLimit = null;
        if (p.x <= this.#segment.p1.x && this.#segment.p1.x <= this.#segment.p2.x) {
            yLimit = this.#segment.p1.y;
        }
        if (p.x >= this.#segment.p2.x && this.#segment.p1.x <= this.#segment.p2.x) {
            yLimit = this.#segment.p2.y;
        }
        if (p.x >= this.#segment.p1.x && this.#segment.p1.x >= this.#segment.p2.x) {
            yLimit = this.#segment.p1.y;
        }
        if (p.x <= this.#segment.p2.x && this.#segment.p1.x >= this.#segment.p2.x) {
            yLimit = this.#segment.p2.y;
        }
        return yLimit;
    }

    isWithinXBounds(x) {
        let withinBounds = false;
        if (x >= this.#segment.p1.x && this.#segment.p1.x <= this.#segment.p2.x) {
            withinBounds = true;
        }
        if (x <= this.#segment.p2.x && this.#segment.p1.x <= this.#segment.p2.x) {
            withinBounds = true;
        }
        if (x <= this.#segment.p1.x && this.#segment.p1.x >= this.#segment.p2.x) {
            withinBounds = true;
        }
        if (x >= this.#segment.p2.x && this.#segment.p1.x >= this.#segment.p2.x) {
            withinBounds = true;
        }
        return withinBounds;
    }

    getYFromX(x) {
        return this.#segment.getY(x);
    }
}