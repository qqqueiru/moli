class Wall {
    #id;
    #segment;
    #vx;
    #vy;
    #bouncesGrenades;
    constructor(id, segment, bouncesGrenades = false) {
        this.#id = id;
        this.#segment = segment;
        this.#vx = 0;
        this.#vy = 0;
        this.#bouncesGrenades = bouncesGrenades;
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
    bouncesGrenades() {
        return this.#bouncesGrenades;
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