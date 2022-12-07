class Villain {
    #dificulty;
    constructor(ctx, dificulty) {
        this.ctx = ctx;
        this.#dificulty = dificulty;
        const w = ctx.canvas.width;
        this.xLimits = [0.15 * w, 0.85 * w];
        this.x = this.xLimits[1];
        this.y = undefined;  // Lo calculamos luego según los coeficientes de la trayectoria
        {
            // Parabola: y = A*x^2 + B*x + C
            const a = 0.00015;
            const xOffset = 0.6 * w;
            const h = 0.35 * ctx.canvas.height;
            const A = a;
            const B = - 2 * a * xOffset;
            const C = a * xOffset + h;
            this.yCurveCoeffs = [A, B, C];  // Coeficientes de una curva polinomial tal que y(x) = this.yCurveCoeffs[0] * x^2 + this.yCurveCoeffs[1] * x + this.yCurveCoefs[2] ...
        }
        this.allowedSpeeds = [-0.0052 * w, -0.0026 * w, 0, 0.0026 * w, 0.0052 * w];
        this.vx = this.allowedSpeeds[0];
        this.framesUntilNextSpeedChange = 100;
        this.framesUntilNextItemDrop = 100;
        this.framesUntilNextDropHiatus = 1000;
        this.sprites = {
            right:  new AnimatedSprite("villain_right", GameScreen.imgScale, 2, 1, 10, ctx),
            left:  new AnimatedSprite("villain_left", GameScreen.imgScale, 2, 1, 10, ctx),
            idle:  new AnimatedSprite("villain_idle", GameScreen.imgScale, 2, 1, 10, ctx),
        }
        this.currentSprite = "left";
    }

    #computeY(x) {
        let y = 0;
        for (let i = 0; i < this.yCurveCoeffs.length; ++i) {
            y = y * x + this.yCurveCoeffs[i];
        }
        return y;
    }

    #changeSpeed() {
        this.vx = this.allowedSpeeds[parseInt(Math.random() * this.allowedSpeeds.length)] * this.#dificulty;
        if (this.vx == 0) {
            this.currentSprite = "idle";
        } else if (this.vx < 0) {
            this.currentSprite = "left";
        } else if (this.vx > 0) {
            this.currentSprite = "right";
        }
    }

    update() {
        this.framesUntilNextSpeedChange--;
        if (this.framesUntilNextSpeedChange <= 0) {
            this.#changeSpeed();
            this.framesUntilNextSpeedChange = 30 + Math.random() * 20;
        }

        let fallingItem;
        this.framesUntilNextItemDrop--;
        if (this.framesUntilNextItemDrop <= 0) {
            const vy = GameScreen.height * (0.0065 + 0.0035 * Math.random()) * this.#dificulty;
            fallingItem = new FallingItem(this.x, this.y, vy, this.ctx);
            this.framesUntilNextItemDrop = 15 + Math.random() * 30;
        }

        // Pausa en la descarga de objetos
        this.framesUntilNextDropHiatus--;
        if (this.framesUntilNextDropHiatus <= 0) {
            this.framesUntilNextItemDrop = 300;
            this.framesUntilNextDropHiatus = 2000 + Math.random() * 500;
        }

        this.x += this.vx;
        if (this.x <= this.xLimits[0]) {
            this.x = this.xLimits[0];
            this.framesUntilNextSpeedChange = 0;
        }
        if (this.x >= this.xLimits[1]) {
            this.x = this.xLimits[1];
            this.framesUntilNextSpeedChange = 0;
        }
        this.y = this.#computeY(this.x);

        return fallingItem;
    }

    drawDebugPoint() {
        if (this.ctx) {
            this.ctx.beginPath();
            this.ctx.ellipse(Math.floor(this.x), Math.floor(this.y), 15, 15, 0, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'rgb(0, 0, 0)';
            this.ctx.fill();
        }
    }

    draw() {
        this.ctx.beginPath();
        this.sprites[this.currentSprite].draw(this.x, this.y);
    }
}