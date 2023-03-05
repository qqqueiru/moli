class Camera {
    #deadZone = new Point(384 / 2, 108 / 2);
    #pos;  // Camera pos to return (includes shaking if applicable)
    #pos_0;  // Current pos
    #pos_1;  // Previous pos
    #kp = 0.05;
    #kd = 0.5;
    #maxChange = 1000;
    #targetPoint;  // Point to follow
    offset = new Point(0, 0);  // Useful when looking ahead or needing to look up
    #subLevelDim;
    #minBound;
    #maxBound;
    #iterationsShaking = 0;
    #iterationsToShake = 60;
    #shakeAmplitude = 100;
    constructor() {
        // NOP
    }

    setSubLevelLimits(minBound, maxBound) {
        if (minBound.x == -1) {
            minBound.x = 0;
        }
        if (minBound.y == -1) {
            minBound.y = 0;
        }
        if (maxBound.x == -1) {
            maxBound.x = this.#subLevelDim.x;
        }
        if (maxBound.y == -1) {
            maxBound.y = this.#subLevelDim.y;
        }

        this.#minBound = minBound;
        this.#maxBound = maxBound;
    }

    setSubLevelDimensions(w, h) {
        this.#subLevelDim = new Point(w, h);
        this.#minBound = new Point(0, 0);
        this.#maxBound = new Point(w, h);
    }

    setFirstPoint(point) {
        this.#pos = point.clone();
        this.#pos_0 = point.clone();
        this.#pos_1 = point.clone();
        this.setTargetPoint(point);

    }

    setTargetPoint(point) {
        this.#targetPoint = point;  // Must be a reference
    }

    update() {
        this.follow(this.#targetPoint.addConst(this.offset));
    }

    follow(point) {
        // If target position is within the dead zone, there is no need to change camera position
        const xWithinDeadZone = (point.x > (this.#pos_0.x - this.#deadZone.x)) && (point.x < (this.#pos_0.x + this.#deadZone.x));
        const yWithinDeadZone = (point.y > (this.#pos_0.y - this.#deadZone.y)) && (point.y < (this.#pos_0.y + this.#deadZone.y));

        // PID like regulation, without the integral part
        const error_0 = point.substractConst(this.#pos_0);
        if (point.x < this.#pos_0.x) { error_0.x += this.#deadZone.x; }
        if (point.x > this.#pos_0.x) { error_0.x -= this.#deadZone.x; }
        if (point.y < this.#pos_0.y) { error_0.y += this.#deadZone.y; }
        if (point.y > this.#pos_0.y) { error_0.y -= this.#deadZone.y; }

        const error_1 = point.substractConst(this.#pos_1);
        if (point.x < this.#pos_1.x) { error_1.x += this.#deadZone.x; }
        if (point.x > this.#pos_1.x) { error_1.x -= this.#deadZone.x; }
        if (point.y < this.#pos_1.y) { error_1.y += this.#deadZone.y; }
        if (point.y > this.#pos_1.y) { error_1.y -= this.#deadZone.y; }

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

        this.#limitCameraPosToBounds(this.#pos_0);

        this.#pos = this.#pos_0.clone();
        if (this.#iterationsShaking > 0) {
            const decayFactor = this.#iterationsShaking / this.#iterationsToShake * this.#iterationsShaking / this.#iterationsToShake;
            this.#pos.x += this.#shakeAmplitude * (0.5 - Math.random()) * decayFactor;
            this.#pos.y += this.#shakeAmplitude * (0.5 - Math.random()) * decayFactor;
            --this.#iterationsShaking;
            this.#limitCameraPosToBounds(this.#pos);
        }
    }

    #limitCameraPosToBounds(cameraPos) {
        // Check limits (camera must not see beyond limit bounds)
        if (cameraPos.x < this.#minBound.x + GameScreen.width / 2) { cameraPos.x = this.#minBound.x + GameScreen.width / 2; }
        if (cameraPos.y < this.#minBound.y + GameScreen.height / 2) { cameraPos.y = this.#minBound.y + GameScreen.height / 2; }
        if (cameraPos.x > this.#maxBound.x - GameScreen.width / 2) { cameraPos.x = this.#maxBound.x - GameScreen.width / 2; }
        if (cameraPos.y > this.#maxBound.y - GameScreen.height / 2) { cameraPos.y = this.#maxBound.y - GameScreen.height / 2; }
    }

    shake() {
        this.#iterationsShaking = this.#iterationsToShake;
    }

    getPos() {
        return this.#pos;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(
            GameScreen.width / 2,
            GameScreen.height / 2,
            10,
            10
        );
        ctx.fillStyle = "red";
        ctx.fill();

        ctx.beginPath();
        ctx.rect(
            GameScreen.width / 2 + this.#targetPoint.x - this.#pos.x,
            GameScreen.height / 2 + this.#targetPoint.y - this.#pos.y, 
            10, 
            10
        );
        ctx.fillStyle = "orange";
        ctx.fill();

        ctx.beginPath();
        ctx.rect(
            GameScreen.width / 2 + this.#targetPoint.x + this.offset.x - this.#pos.x,
            GameScreen.height / 2 + this.#targetPoint.y + this.offset.y - this.#pos.y,
            10,
            10
        );
        ctx.fillStyle = "yellow";
        ctx.fill();
    }
}