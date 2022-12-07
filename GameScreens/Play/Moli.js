/**
 * Clase que define una elipse simple que siempre está en horizontal
 */
class Ellipse {
    constructor(xCenter, yCenter, a, b, ctx) {
        this.x = xCenter;
        this.y = yCenter;
        this.a = a;  // Semieje mayor
        this.b = b;  // Semieje menor
        this.ctx = ctx;
    }
    isPointInsideEllipse(x, y) {
        const distance =
            (this.x - x) * (this.x - x) / (this.a * this.a) +
            (this.y - y) * (this.y - y) / (this.b * this.b);
        return distance <= 1;
    }
    setCenter(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.ellipse(
            Math.floor(this.x), 
            Math.floor(this.y),
            Math.floor(this.a),
            Math.floor(this.b),
            0,
            0,
            2 * Math.PI
        );
        this.ctx.stroke();
    }
}

/**
 * Clase que gestiona la lógica de la mula. Puede que también su dibujado.
 */
class Mula {
    #dificulty;
    constructor(x, y, ctx, dificulty) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.#dificulty = dificulty;
        this.ivx = 0;  // Número entero, que multiplicado por el incremento de velocidad debe resultar en vx
        this.vx = 0;  // Se permiten velocidades entre -this.maxSpeed y this.maxSpeed
        this.xLimits = [0.05 * ctx.canvas.width, 0.95 * ctx.canvas.width];
        this.maxISpeed = 4;
        this.maxSpeed = 0.01 * ctx.canvas.width;
        this.speedIncrement = 0.0026 * ctx.canvas.width * this.#dificulty;
        this.goodBoundingEllipse = new Ellipse(x, y, 0.1 * ctx.canvas.width, 0.09 * ctx.canvas.width, ctx);  // 200, 100 originalmente (cuando tenía 1920x1080)
        this.sprites = {
            right: new AnimatedSprite("mula_right", GameScreen.imgScale, 2, 1, -1, ctx),
            left: new AnimatedSprite("mula_left", GameScreen.imgScale, 2, 1, -1, ctx),
        }

        this.sprites.right.pause();
        this.sprites.left.pause();
        this.currentSprite = "right";
    }

    #changeAnimation() {
        if (this.ivx == 0) {
            this.sprites[this.currentSprite].pause();
        } else {
            if (this.ivx > 0) {
                this.currentSprite = "right";
            } else {
                this.currentSprite = "left";
            }
            const stepsPerFrame = 1 / Math.abs(this.ivx) * 10;  // 1 / 20 * 40
            this.sprites[this.currentSprite].setStepsPerFrame(stepsPerFrame);
            this.sprites[this.currentSprite].resume();
        }
    }

    #playCommandAudio(direction) {
        // direction debe ser "left" o "right"
        AudioManager.playSoundEffect(direction);
    }

    commandToDirection(direction) {
        const oldIvx = this.ivx;
        if (direction == "left") {
            this.ivx--;
            if (this.ivx < -this.maxISpeed)
            {
                this.ivx = -this.maxISpeed;
            }
        } else if (direction == "right") {
            this.ivx++;
            if (this.ivx > this.maxISpeed)
            {
                this.ivx = this.maxISpeed;
            }
        }
        if (this.ivx != oldIvx) {
            this.#playCommandAudio(direction);
        }
        this.#changeAnimation();
    }

    updatePos() {
        this.vx = this.ivx * this.speedIncrement;
        if (this.x >= this.xLimits[0] && this.x <= this.xLimits[1]) {
            this.x += this.vx;
        }
    
        if (this.x < this.xLimits[0]) {
            this.x = this.xLimits[0];
        }

        if (this.x > this.xLimits[1]) {
            this.x = this.xLimits[1];
        }

        this.goodBoundingEllipse.setCenter(this.x, this.y);
    }

    catchesGoody(x, y) {
        return this.goodBoundingEllipse.isPointInsideEllipse(x, y);
    }

    draw() {
        this.ctx.beginPath();
        this.sprites[this.currentSprite].draw(this.x, this.y);
    }

    drawDebugGoodBounding() {
        this.goodBoundingEllipse.draw();
    }
}