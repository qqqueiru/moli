class BackgroundImage {
    #backgroundImg;
    // First iteration of this class just handles one background image
    constructor(imgId) {
        this.#backgroundImg = ImageManager.getImage(imgId);
    }

    getTotalWidth() {
        return this.#backgroundImg.width;
    }

    getTotalHeight() {
        return this.#backgroundImg.height;
    }

    draw(ctx, cameraPos) {
        ctx.drawImage(
            this.#backgroundImg,
            -GameScreen.width / 2 + cameraPos.x,
            -GameScreen.height / 2 + cameraPos.y,
            GameScreen.width,
            GameScreen.height,
            0,
            0,
            GameScreen.width,
            GameScreen.height
        );
    }
}