class PauseMenu extends GameScreen {
    #score;
    #scoreRomanNumeral;
    #menus;
    #t = 0;
    #selectionSquareX;

    constructor(score) {
        super();
        this.name = "PauseMenu";
        AudioManager.playLoop("menu");
        this.#score = score;
        this.#scoreRomanNumeral = romanize(score);
        this.#menus = {
            currentMenu: "mainMenu",
            mainMenu: {
                currentOptionIndex: 0,
                drawHandle: (optIdx)=>{this.#drawMainMenu(optIdx)},
                options: [
                    {
                        name: "RESUME",
                        updateHandle: ()=>{this.#resumeGame()},
                    },
                    {
                        name: "RESTART",
                        updateHandle: ()=>{this.#openRestartMenu()},
                    },
                    {
                        name: "START MENU",
                        updateHandle: ()=>{this.#openStartMenuConfirmation()},
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
            restartMenu: {
                currentOptionIndex: 0,
                drawHandle: (optIdx)=>{this.#drawRestartMenu(optIdx)},
                options: [
                    {
                        name: "YES",
                        updateHandle: ()=>{this.#restartGame()},
                    },
                    {
                        name: "NO",
                        updateHandle: ()=>{this.#backToMainMenu()},
                    },
                ],
            },
            startMenuConfirmation: {
                currentOptionIndex: 0,
                drawHandle: (optIdx)=>{this.#drawStartMenuConfirmation(optIdx)},
                options: [
                    {
                        name: "YES",
                        updateHandle: ()=>{this.#openStartMenu()},
                    },
                    {
                        name: "NO",
                        updateHandle: ()=>{this.#backToMainMenu()},
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

    #resumeGame() {
        AudioManager.playSoundEffect("enter");
        GameScreen.currentScreen = GameScreen.previousScreen;
        AudioManager.stopLoop("menu");
    }

    #openRestartMenu() {
        AudioManager.playSoundEffect("enter");
        this.#menus.currentMenu = "restartMenu";
        this.#menus[this.#menus.currentMenu].currentOptionIndex = 0;
    }

    #openStartMenuConfirmation() {
        AudioManager.playSoundEffect("enter");
        this.#menus.currentMenu = "startMenuConfirmation";
        this.#menus[this.#menus.currentMenu].currentOptionIndex = 0;
    }

    #openHelpMenu() {
        AudioManager.playSoundEffect("enter");
        this.#menus.currentMenu = "helpMenu";
    }

    #openAboutMenu() {
        AudioManager.playSoundEffect("enter");
        this.#menus.currentMenu = "aboutMenu";
    }

    #restartGame() {
        AudioManager.playSoundEffect("enter");
        GameScreen.currentScreen = new Level1();
        AudioManager.stopLoop("menu");
    }

    #openStartMenu() {
        AudioManager.playSoundEffect("enter");
        GameScreen.currentScreen = new StartMenu();
        // AudioManager.stopLoop("menu");
    }

    #backToMainMenu() {
        AudioManager.playSoundEffect("back");
        this.#menus.currentMenu = "mainMenu";
    }

    #drawMainMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = GameScreen.fontColor;
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = `bold ${Math.floor(0.055 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(TR.PAUSE[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.35));
        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        const optionsHeight = 0.45;
        const optionsSpacing = 0.07;
        const options = [TR.RESUME[lang], TR.RESTART[lang], TR.START_MENU[lang], TR.HELP[lang], TR.ABOUT[lang]];
        for (let i = 0; i < options.length; ++i) {
            GameScreen.ctx.fillText(options[i], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * i)));    
        }

        // Text Highlighting
        let { width } = ctx.measureText(options[currentOptionIndex]);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) + 10, width, 10);
    }

    #drawRestartMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = GameScreen.fontColor;
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = `bold ${Math.floor(0.055 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(TR.RESTART[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.35));
        GameScreen.ctx.font = `bold ${Math.floor(0.04 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(TR.RESTART_CONFIRMATION[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.5));

        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        const optionsHeight = 0.6;
        const optionsSpacing = 0.07;
        const options = [TR.YES[lang], TR.NO[lang]];
        for (let i = 0; i < options.length; ++i) {
            GameScreen.ctx.fillText(options[i], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * i)));
        }

        // Text Highlighting
        let { width } = ctx.measureText(options[currentOptionIndex]);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) + 10, width, 10);
    }

    #drawStartMenuConfirmation(currentOptionIndex) {
        GameScreen.ctx.fillStyle = GameScreen.fontColor;
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = `bold ${Math.floor(0.04 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(TR.START_MENU_CONFIRMATION[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.5));

        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        const optionsHeight = 0.6;
        const optionsSpacing = 0.07;
        const options = [TR.YES[lang], TR.NO[lang]];
        for (let i = 0; i < options.length; ++i) {
            GameScreen.ctx.fillText(options[i], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * i)));
        }

        // Text Highlighting
        let { width } = ctx.measureText(options[currentOptionIndex]);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) + 10, width, 10);
    }

    #drawHelpMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = GameScreen.fontColor;
        GameScreen.ctx.textAlign = "center";

        GameScreen.ctx.font = `bold ${Math.floor(0.025 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(
            TR.help0[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.55)
        );
        GameScreen.ctx.fillText(
            TR.help1[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.6)
        );
        GameScreen.ctx.fillText(
            TR.help2[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.65)
        );
        const optionsHeight = 0.73;
        const optionsSpacing = 0.04;
        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(TR.BACK[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));

        // Text Highlighting
        let { width } = ctx.measureText(TR.BACK[lang]);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)) + 20, width, 10);

        ctx.drawImage(
            ImageManager.getImage("controls_compacted"),
            500,
            270
        )
        GameScreen.ctx.fillText(
            TR.shoot[lang],
            955, 420
        );
        GameScreen.ctx.fillText(
            TR.jump[lang],
            1175, 475
        );
        GameScreen.ctx.fillText(
            TR.luck[lang],
            1400, 525
        );
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
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.51)
        );
        GameScreen.ctx.fillText(
            TR.about2[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.57)
        );

        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        const optionsHeight = 0.70;
        const optionsSpacing = 0.04;
        GameScreen.ctx.fillText(TR.BACK[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));

        // Text Highlighting
        let { width } = ctx.measureText(TR.BACK[lang]);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)) + 20, width, 10);
    }

    handleInputs() {

    }

    update() {
        this.#selectionSquareX = Math.floor(GameScreen.width * (0.4 + 0.01 * Math.sin(this.#t)));

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

        this.#t += 0.15;
    }

    draw() {
        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            Math.floor(0.2 * GameScreen.width), Math.floor(0.2 * GameScreen.height),
            Math.floor(0.6 * GameScreen.width), Math.floor(0.6 * GameScreen.height)
        );
        GameScreen.ctx.fillStyle = GameScreen.color.red;
        GameScreen.ctx.fill();

        // GameScreen.ctx.strokeStyle = GameScreen.fontColor;
        // GameScreen.ctx.lineWidth = GameScreen.imgScale * 2;
        // GameScreen.ctx.stroke();

        const currentMenu = this.#menus.currentMenu;
        const drawHandleFunction = this.#menus[currentMenu].drawHandle;
        const currentOptionIndex = this.#menus[currentMenu].currentOptionIndex;
        drawHandleFunction(currentOptionIndex);
    }
}
