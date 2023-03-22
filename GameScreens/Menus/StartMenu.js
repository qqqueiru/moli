class StartMenu extends GameScreen {
    #menus;
    #fadeInCircleRadius = 0;
    #t = 0;
    #selectionSquareX;
    constructor() {
        super();
        AudioManager.playLoop("menu");
        this.#menus = {
            currentMenu: "mainMenu",
            mainMenu: {
                currentOptionIndex: 0,
                drawHandle: (ctx, optIdx)=>{this.#drawMainMenu(ctx, optIdx)},
                options: [
                    {
                        name: "START",
                        updateHandle: ()=>{this.#startGame()},
                    },
                    {
                        name: "HELP",
                        updateHandle: ()=>{this.#openHelpMenu()},
                    },
                    {
                        name: "ABOUT",
                        updateHandle: ()=>{this.#openAboutMenu()},
                    },
                ],
            },
            helpMenu: {
                currentOptionIndex: 0,
                drawHandle: (ctx, optIdx)=>{this.#drawHelpMenu(ctx, optIdx)},
                options: [
                    {
                        name: "BACK",
                        updateHandle: ()=>{this.#backToMainMenu()},
                    },
                ],
            },
            aboutMenu: {
                currentOptionIndex: 0,
                drawHandle: (ctx, optIdx)=>{this.#drawAboutMenu(ctx, optIdx)},
                options: [
                    {
                        name: "BACK",
                        updateHandle: ()=>{this.#backToMainMenu()},
                    },
                ],
            },
        };
    }

    #startGame() {
        AudioManager.playSoundEffect("enter");
        GameScreen.currentScreen = new Level1();
        AudioManager.stopLoop("menu");
    }

    #openHelpMenu() {
        AudioManager.playSoundEffect("enter");
        this.#menus.currentMenu = "helpMenu";
    }

    #openAboutMenu() {
        AudioManager.playSoundEffect("enter");
        this.#menus.currentMenu = "aboutMenu";
    }

    #backToMainMenu() {
        AudioManager.playSoundEffect("back");
        this.#menus.currentMenu = "mainMenu";
    }

    #drawMainMenu(ctx, currentOptionIndex) {
        ctx.fillStyle = GameScreen.fontColor;
        ctx.textAlign = "center";
        ctx.font = `bold ${Math.floor(0.055 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        ctx.fillText(TR.MOLI[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.4));

        ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        const optionsHeight = 0.54;
        const optionsSpacing = 0.04;
        ctx.fillText(TR.START[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));
        ctx.fillText(TR.HELP[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 1)));
        ctx.fillText(TR.ABOUT[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 2)));

        // Rectangulito para indicar seleccion actual
        ctx.beginPath();
        ctx.rect(
            this.#selectionSquareX, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02)),
            Math.floor(GameScreen.width * 0.01), Math.floor(GameScreen.height * 0.02)
        );
        ctx.fillStyle = GameScreen.fontColor;
        ctx.fill();
    }

    #drawHelpMenu(ctx, currentOptionIndex) {
        ctx.fillStyle = GameScreen.fontColor;
        ctx.textAlign = "center";

        ctx.font = `bold ${Math.floor(0.100 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        ctx.fillText("⬅ 🐴 ➡", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.4));
        ctx.font = `bold ${Math.floor(0.025 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        ctx.fillText(
            TR.help0[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.5)
        );
        ctx.fillText(
            TR.help1[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.55)
        );
        ctx.fillText(
            TR.help2[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.6)
        );
        const optionsHeight = 0.70;
        const optionsSpacing = 0.04;
        ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        ctx.fillText(TR.BACK[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));

        // Rectangulito para indicar seleccion actual
        ctx.beginPath();
        ctx.rect(
            this.#selectionSquareX, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02)),
            Math.floor(GameScreen.width * 0.01), Math.floor(GameScreen.height * 0.02)
        );
        ctx.fillStyle = GameScreen.fontColor;
        ctx.fill();
    }

    #drawAboutMenu(ctx, currentOptionIndex) {
        ctx.fillStyle = GameScreen.fontColor;
        ctx.textAlign = "center";
        ctx.font = `bold ${Math.floor(0.050 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        ctx.fillText(
            TR.MOLI[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.35)
        );
        ctx.font = `bold ${Math.floor(0.030 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        ctx.fillText(
            TR.about0[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.45)
        );
        ctx.fillText(
            TR.about1[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.50)
        );
        ctx.fillText(
            TR.about2[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.55)
        );

        ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        const optionsHeight = 0.70;
        const optionsSpacing = 0.04;
        ctx.fillText(TR.BACK[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));

        // Rectangulito para indicar seleccion actual
        ctx.beginPath();
        ctx.rect(
            this.#selectionSquareX, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02)),
            Math.floor(GameScreen.width * 0.01), Math.floor(GameScreen.height * 0.02)
        );
        ctx.fillStyle = GameScreen.fontColor;
        ctx.fill();
    }

    handleInputs() {

    }

    update() {
        if (
            GameScreen.inputs.get("arrowup")?.consumeIfActivated() ||
            GameScreen.inputs.get("arrowleft")?.consumeIfActivated()
        ) {
            const currentOptionIndex = --this.#menus[this.#menus.currentMenu].currentOptionIndex;
            const optionsLength = this.#menus[this.#menus.currentMenu].options.length;
            if (currentOptionIndex < 0) {
                this.#menus[this.#menus.currentMenu].currentOptionIndex = optionsLength - 1;
            }
            AudioManager.playSoundEffect("selection_up");
        }
        if (
            GameScreen.inputs.get("arrowdown")?.consumeIfActivated() ||
            GameScreen.inputs.get("arrowright")?.consumeIfActivated()
        ) {
            const currentOptionIndex = ++this.#menus[this.#menus.currentMenu].currentOptionIndex;
            const optionsLength = this.#menus[this.#menus.currentMenu].options.length;
            if (currentOptionIndex >= optionsLength) {
                this.#menus[this.#menus.currentMenu].currentOptionIndex = 0;
            }
            AudioManager.playSoundEffect("selection_down");
        }

        if (
            GameScreen.inputs.get("enter")?.consumeIfActivated() ||
            GameScreen.inputs.get(" ")?.consumeIfActivated()
        ) {
            const currentMenu = this.#menus.currentMenu;
            const currentOptionIndex = this.#menus[currentMenu].currentOptionIndex;
            const updateHandleFunction = this.#menus[currentMenu].options[currentOptionIndex].updateHandle;
            updateHandleFunction();
        }

        if (
            GameScreen.inputs.get("backspace")?.consumeIfActivated() ||
            GameScreen.inputs.get("escape")?.consumeIfActivated()
        ) {
            this.#backToMainMenu();
        }
    }

    #drawFadeIn(ctx) {
        const maxDim = Math.max(GameScreen.width, GameScreen.height);
        if (this.#fadeInCircleRadius < maxDim) {
            ctx.beginPath();
            ctx.rect(0, 0, GameScreen.width, GameScreen.height);
            ctx.arc(GameScreen.width / 2, GameScreen.height / 2, this.#fadeInCircleRadius, 0, 2 * Math.PI);
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fill("evenodd");
            this.#fadeInCircleRadius += 50;
        }
    }

    draw() {
        const ctx = GameScreen.ctx;
        this.#selectionSquareX = Math.floor(GameScreen.width * (0.4 + 0.01 * Math.sin(this.#t)));

        ctx.beginPath();
        ctx.clearRect(0, 0, GameScreen.width, GameScreen.height);
        ctx.rect(0, 0, GameScreen.width, GameScreen.height);
        ctx.fillStyle = GameScreen.fontColor;  // "#775c9f";  // "#fdf5e6";
        ctx.fill();

        ctx.beginPath();
        ctx.rect(
            Math.floor(GameScreen.width / 4), Math.floor(GameScreen.height / 4),
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height / 2)
        );
        ctx.fillStyle = "#ffdddd";
        ctx.fill();

        // ctx.strokeStyle = GameScreen.fontColor;
        // ctx.lineWidth = GameScreen.imgScale * 2;
        // ctx.stroke();

        const currentMenu = this.#menus.currentMenu;
        const drawHandleFunction = this.#menus[currentMenu].drawHandle;
        const currentOptionIndex = this.#menus[currentMenu].currentOptionIndex;
        drawHandleFunction(ctx, currentOptionIndex);
        this.#drawFadeIn(ctx);  // Transición desde la pantalla PressAnyKey

        this.#t += 0.15;
    }
}
