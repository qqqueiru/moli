class LoadingScreen extends GameScreen {
    #progress;
    constructor() {
        super();
        this.#progress = 0;

        ImageManager.loadImages();
        AudioManager.loadAudios();
        FontManager.loadFonts();
    }

    handleInputs() {

    }

    update() {
        this.#progress =
            ImageManager.imgsLoaded() * 0.34 +
            AudioManager.audiosLoaded() * 0.33 +
            FontManager.fontsLoaded() * 0.33;
        // this.#progress += 0.01;
        if (this.#progress >= 1) {
            GameScreen.currentScreen = new PressAnyKey();
        }
    }

    draw() {
        GameScreen.ctx.beginPath();

        GameScreen.ctx.clearRect(0, 0, GameScreen.width, GameScreen.height);
        GameScreen.ctx.rect(0, 0, GameScreen.width, GameScreen.height);
        GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
        GameScreen.ctx.fill();
    
        const fontSize = 100;
        GameScreen.ctx.font = `bold ${fontSize}px Arial`;
        GameScreen.ctx.textAlign = "right";

        GameScreen.ctx.fillStyle = GameScreen.fontColorLighter;
        const percentage = Math.floor(this.#progress * 100);
        GameScreen.ctx.fillText(`${percentage} %`, GameScreen.width / 2 + 75, GameScreen.height * 0.5);

        // ctx.endPath();
    }
}