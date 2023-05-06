class PressAnyKey extends GameScreen {
    constructor() {
        super();
        this.name = "PressAnyKey";
        AudioManager.startSilenceRoutine();
    }

    handleInputs() {

    }

    update() {
        if (GameScreen.inputs.get("AnyKey")?.consumeIfActivated()) {
            // document.documentElement.requestFullscreen();
            AudioManager.playSoundEffect("enter");
            GameScreen.currentScreen = new StartMenu();
        }
    }

    draw() {
        GameScreen.ctx.beginPath();

        GameScreen.ctx.clearRect(0, 0, GameScreen.width, GameScreen.height);
        GameScreen.ctx.rect(0, 0, GameScreen.width, GameScreen.height);
        GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
        GameScreen.ctx.fill();
    
        const fontSize = Math.floor(0.0463 * GameScreen.height);
        GameScreen.ctx.textAlign = "center";

        GameScreen.ctx.fillStyle = GameScreen.fontColor;
        // GameScreen.ctx.strokeStyle = "rgb(255, 0, 0)";
        // GameScreen.ctx.lineWidth = 1;

        GameScreen.ctx.font = `bold ${fontSize * 4}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(
            TR.MOLI[lang],
            Math.floor(GameScreen.width * 0.5),
            Math.floor(GameScreen.height * 0.45)
        );

        if (Date.now() % 1500 < 750) {
            GameScreen.ctx.font = `bold ${fontSize}px ${GameScreen.fontFamily}`;
            GameScreen.ctx.fillText(
                TR.PressAnyKey[lang], 
                Math.floor(GameScreen.width * 0.5),
                Math.floor(GameScreen.height * 0.65)
            );
        }

        GameScreen.ctx.font = `bold ${fontSize * 0.5}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(
            TR.WorkInProgress[lang],
            Math.floor(GameScreen.width * 0.5),
            Math.floor(GameScreen.height * 0.8)
        );
        GameScreen.ctx.font = `bold ${fontSize * 0.5}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(
            "© Miguel Queiruga Portela 2023",
            Math.floor(GameScreen.width * 0.5),
            Math.floor(GameScreen.height * 0.85)
        );
        // GameScreen.ctx.strokeText(`PRESS ANY KEY`, GameScreen.width / 2, GameScreen.height * 0.5);

        // ctx.endPath();
    }
}