class LoopSprite extends AnimatedSprite {
    #pos;
    constructor(imgId, scale, cols, rows, stepsPerFrame, ctx, pos) {
        super(imgId, scale, cols, rows, stepsPerFrame, ctx);
        this.#pos = pos;
    }

    draw(cameraPos) {
        super.draw(this.#pos.x, this.#pos.y, cameraPos);
    }
}