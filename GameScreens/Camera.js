class Camera {
    // Dead zone
    #deadX = 384 / 2;
    #deadY = 108 / 2;
    #pos_0;  // Current pos
    #pos_1;  // Previous pos
    #kp = 0.05;
    #kd = 0.5;
    #maxChange = 1000;
    #targetPoint;  // Point to follow
    #offset = new Point(0, -100);  // Useful when looking ahead or needing to look up
    #subLevelWidth;
    #subLevelHeight;
    constructor() {
        // NOP
    }

    setSubLevelDimensions(w, h) {
        this.#subLevelWidth = w;
        this.#subLevelHeight = h;
    }

    setFirstPoint(point) {
        this.#pos_0 = point.clone();
        this.#pos_1 = point.clone();
        this.setTargetPoint(point);

    }

    setTargetPoint(point) {
        this.#targetPoint = point;  // Must be a reference
    }

    update() {
        this.follow(this.#targetPoint.addConst(this.#offset));
    }

    follow(point) {
        // If target position is within the dead zone, there is no need to change camera position
        const xWithinDeadZone = (point.x > (this.#pos_0.x - this.#deadX)) && (point.x < (this.#pos_0.x + this.#deadX));
        const yWithinDeadZone = (point.y > (this.#pos_0.y - this.#deadY)) && (point.y < (this.#pos_0.y + this.#deadY));

        // PID like regulation, without the integral part
        const error_0 = point.substractConst(this.#pos_0);
        if (point.x < this.#pos_0.x) { error_0.x += this.#deadX; }
        if (point.x > this.#pos_0.x) { error_0.x -= this.#deadX; }
        if (point.y < this.#pos_0.y) { error_0.y += this.#deadY; }
        if (point.y > this.#pos_0.y) { error_0.y -= this.#deadY; }

        const error_1 = point.substractConst(this.#pos_1);
        if (point.x < this.#pos_1.x) { error_1.x += this.#deadX; }
        if (point.x > this.#pos_1.x) { error_1.x -= this.#deadX; }
        if (point.y < this.#pos_1.y) { error_1.y += this.#deadY; }
        if (point.y > this.#pos_1.y) { error_1.y -= this.#deadY; }

        const deltaError = error_0.substractConst(error_1);
        const changeP = error_0.multiplyConst(this.#kp);
        const changeD = deltaError.multiplyConst(this.#kd);

        const change = changeP.addConst(changeD);
        // Saturation just to be safe
        if (change.x >= this.#maxChange) { change.x = this.#maxChange; }
        if (change.x <= -this.#maxChange) { change.x = -this.#maxChange; }
        if (change.y >= this.#maxChange) { change.y = this.#maxChange; }
        if (change.y <= -this.#maxChange) { change.y = -this.#maxChange; }

        this.#pos_1 = this.#pos_0.clone();
        this.#pos_0 = this.#pos_0.clone();
        if (!xWithinDeadZone) {
            this.#pos_0.x += change.x;
        }
        if (!yWithinDeadZone) {
            this.#pos_0.y += change.y;
        }

        // Check limits (camera must not see beyond level bounds)
        if (this.#pos_0.x < GameScreen.width / 2) { this.#pos_0.x = GameScreen.width / 2; }
        if (this.#pos_0.y < GameScreen.height / 2) { this.#pos_0.y = GameScreen.height / 2; }
        if (this.#pos_0.x > this.#subLevelWidth - GameScreen.width / 2) { this.#pos_0.x = this.#subLevelWidth - GameScreen.width / 2; }
        if (this.#pos_0.y > this.#subLevelHeight - GameScreen.height / 2) { this.#pos_0.y = this.#subLevelHeight - GameScreen.height / 2; }
    }

    shake() {
        // TODO
    }

    getPos() {
        return this.#pos_0;
    }
}