class OnceSprite extends AnimatedSprite {
    #executedDraws = 0;
    #totalDraws = 0;
    #pos;
    constructor(imgId, scale, cols, rows, stepsPerFrame, ctx, pos) {
        super(imgId, scale, cols, rows, stepsPerFrame, ctx);
        this.#pos = pos;
        this.#totalDraws = cols * rows * stepsPerFrame;

    }

    draw(cameraPos) {
        super.draw(this.#pos.x, this.#pos.y, cameraPos);
        this.#executedDraws++;
    }

    isFinished() {
        return this.#executedDraws >= this.#totalDraws;
    }
}