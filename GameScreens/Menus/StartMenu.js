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
                drawHandle: (optIdx)=>{this.#drawMainMenu(optIdx)},
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
                drawHandle: (optIdx)=>{this.#drawHelpMenu(optIdx)},
                options: [
                    {
                        name: "BACK",
                        updateHandle: ()=>{this.#backToMainMenu()},
                    },
                ],
            },
            aboutMenu: {
                currentOptionIndex: 0,
                drawHandle: (optIdx)=>{this.#drawAboutMenu(optIdx)},
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

    #drawMainMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = GameScreen.fontColor;
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = `bold ${Math.floor(0.055 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(TR.MOLI[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.4));
        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        const optionsHeight = 0.54;
        const optionsSpacing = 0.04;
        GameScreen.ctx.fillText(TR.START[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));
        GameScreen.ctx.fillText(TR.HELP[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 1)));
        GameScreen.ctx.fillText(TR.ABOUT[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 2)));

        // Rectangulito para indicar seleccion actual
        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            this.#selectionSquareX, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02)),
            Math.floor(GameScreen.width * 0.01), Math.floor(GameScreen.height * 0.02)
        );
        GameScreen.ctx.fillStyle = GameScreen.fontColor;
        GameScreen.ctx.fill();
    }

    #drawHelpMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = GameScreen.fontColor;
        GameScreen.ctx.textAlign = "center";

        GameScreen.ctx.font = `bold ${Math.floor(0.100 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText("⬅ 🐴 ➡", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.4));
        GameScreen.ctx.font = `bold ${Math.floor(0.025 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(
            TR.help0[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.5)
        );
        GameScreen.ctx.fillText(
            TR.help1[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.55)
        );
        GameScreen.ctx.fillText(
            TR.help2[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.6)
        );
        const optionsHeight = 0.70;
        const optionsSpacing = 0.04;
        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(TR.BACK[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));

        // Rectangulito para indicar seleccion actual
        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            this.#selectionSquareX, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02)),
            Math.floor(GameScreen.width * 0.01), Math.floor(GameScreen.height * 0.02)
        );
        GameScreen.ctx.fillStyle = GameScreen.fontColor;
        GameScreen.ctx.fill();
    }

    #drawAboutMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = GameScreen.fontColor;
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = `bold ${Math.floor(0.050 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(
            TR.MOLI[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.35)
        );
        GameScreen.ctx.font = `bold ${Math.floor(0.030 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(
            TR.about0[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.45)
        );
        GameScreen.ctx.fillText(
            TR.about1[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.50)
        );
        GameScreen.ctx.fillText(
            TR.about2[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.55)
        );

        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        const optionsHeight = 0.70;
        const optionsSpacing = 0.04;
        GameScreen.ctx.fillText(TR.BACK[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));

        // Rectangulito para indicar seleccion actual
        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            this.#selectionSquareX, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02)),
            Math.floor(GameScreen.width * 0.01), Math.floor(GameScreen.height * 0.02)
        );
        GameScreen.ctx.fillStyle = GameScreen.fontColor;
        GameScreen.ctx.fill();
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

    #drawFadeIn() {
        const maxDim = Math.max(GameScreen.width, GameScreen.height);
        if (this.#fadeInCircleRadius < maxDim) {
            GameScreen.ctx.beginPath();
            GameScreen.ctx.rect(0, 0, GameScreen.width, GameScreen.height);
            GameScreen.ctx.arc(GameScreen.width / 2, GameScreen.height / 2, this.#fadeInCircleRadius, 0, 2 * Math.PI);
            GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
            GameScreen.ctx.fill("evenodd");
            this.#fadeInCircleRadius += 50;
        }
    }

    draw() {
        this.#selectionSquareX = Math.floor(GameScreen.width * (0.4 + 0.01 * Math.sin(this.#t)));

        GameScreen.ctx.beginPath();
        GameScreen.ctx.clearRect(0, 0, GameScreen.width, GameScreen.height);
        GameScreen.ctx.rect(0, 0, GameScreen.width, GameScreen.height);
        GameScreen.ctx.fillStyle = GameScreen.fontColor;  // "#775c9f";  // "#fdf5e6";
        GameScreen.ctx.fill();

        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            Math.floor(GameScreen.width / 4), Math.floor(GameScreen.height / 4),
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height / 2)
        );
        GameScreen.ctx.fillStyle = "#ffdddd";
        GameScreen.ctx.fill();

        GameScreen.ctx.strokeStyle = GameScreen.fontColor;
        GameScreen.ctx.lineWidth = GameScreen.imgScale * 2;
        GameScreen.ctx.stroke();

        const currentMenu = this.#menus.currentMenu;
        const drawHandleFunction = this.#menus[currentMenu].drawHandle;
        const currentOptionIndex = this.#menus[currentMenu].currentOptionIndex;
        drawHandleFunction(currentOptionIndex);

        this.#drawFadeIn();  // Transición desde la pantalla PressAnyKey

        this.#t += 0.15;
    }
}
