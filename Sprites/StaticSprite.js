class StaticSprite extends AnimatedSprite {
    #pos;
    constructor(imgId, scale, ctx, pos) {
        super(imgId, scale, 1, 1, 1, ctx);
        this.#pos = pos;
    }

    draw(cameraPos) {
        super.draw(this.#pos.x, this.#pos.y, cameraPos);
    }
}