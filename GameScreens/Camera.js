class Camera {
    // dead zone
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
        // TODO if point is in the dead zone, this will return

        // PID like regulation, without the integral part
        const error_0 = point.substractConst(this.#pos_0);
        const error_1 = point.substractConst(this.#pos_1);
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
        this.#pos_0 = this.#pos_0.addConst(change);

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