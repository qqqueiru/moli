class GameOverMenu extends GameScreen {
    #score;
    #scoreRomanNumeral;
    #menus;
    #t = 0;
    #selectionSquareX;

    constructor(score) {
        super();
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
                        name: "RESTART",
                        updateHandle: ()=>{this.#restartGame()},
                    },
                    {
                        name: "SHARE",
                        updateHandle: ()=>{this.#openShareMenu()},
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
            shareMenu: {
                currentOptionIndex: 0,
                drawHandle: (optIdx)=>{this.#drawShareMenu(optIdx)},
                options: [
                    {
                        name: "TWITTER",
                        updateHandle: ()=>{this.#shareTwitter()},
                    },
                    {
                        name: "FACEBOOK",
                        updateHandle: ()=>{this.#shareFacebook()},
                    },
                    {
                        name: "LINKEDIN",
                        updateHandle: ()=>{this.#shareLinkedin()},
                    },
                    // {
                    //     name: "PINTEREST",
                    //     updateHandle: ()=>{this.#sharePinterest()},
                    // },
                    {
                        name: "BACK",
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

    #restartGame() {
        AudioManager.playSoundEffect("enter");
        GameScreen.currentScreen = new StartMenu();
    }

    #openShareMenu() {
        AudioManager.playSoundEffect("enter");
        this.#menus.currentMenu = "shareMenu";
    }

    #openHelpMenu() {
        AudioManager.playSoundEffect("enter");
        this.#menus.currentMenu = "helpMenu";
    }

    #openAboutMenu() {
        AudioManager.playSoundEffect("enter");
        this.#menus.currentMenu = "aboutMenu";
    }

    #shareTwitter() {
        AudioManager.playSoundEffect("enter");
        // https://www.sharelinkgenerator.com/
        setTimeout(()=>{
            const scoreToShow = this.#score > 0 ? this.#scoreRomanNumeral : 0;
            const url = `https://twitter.com/intent/tweet?text=I%20scored%20${scoreToShow}%20point${this.#score === 1 ? "" : "s"}%20on%20Moli.%0Aqqqueiru.github.io/moli/`;
            window.open(url, '_blank').focus();
        }, 100);
        inputs.clear();
    }

    #shareFacebook() {
        AudioManager.playSoundEffect("enter");
        setTimeout(()=>{
            const url = `https://www.facebook.com/sharer/sharer.php?u=https%3A//qqqueiru.github.io/moli/`;
            window.open(url, '_blank').focus();
        }, 100);
        inputs.clear();
    }

    #shareLinkedin() {
        AudioManager.playSoundEffect("enter");
        setTimeout(()=>{
            const url = `https://www.linkedin.com/shareArticle?mini=true&url=https%3A//qqqueiru.github.io/moli/`;
            window.open(url, '_blank').focus();
        }, 100);
        inputs.clear();
    }

    #sharePinterest() {
        AudioManager.playSoundEffect("enter");
        setTimeout(()=>{
            const url = `https://pinterest.com`;
            window.open(url, '_blank').focus();
        }, 100);
        inputs.clear();
    }

    #backToMainMenu() {
        AudioManager.playSoundEffect("back");
        this.#menus.currentMenu = "mainMenu";
    }

    #drawMainMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = GameScreen.fontColor;
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = `bold ${Math.floor(0.055 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(TR.GAMEOVER[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.4));
        GameScreen.ctx.font = `bold ${Math.floor(0.037 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(
            TR.gameOver0[lang](this.#score > 0 ? this.#scoreRomanNumeral : 0),
            Math.floor(GameScreen.width / 2),
            Math.floor(GameScreen.height * 0.45)
        );
        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        const optionsHeight = 0.54;
        const optionsSpacing = 0.04;
        GameScreen.ctx.fillText(TR.RESTART[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));
        GameScreen.ctx.fillText(TR.SHARE[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 1)));
        GameScreen.ctx.fillText(TR.HELP[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 2)));
        GameScreen.ctx.fillText(TR.ABOUT[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 3)));

        // Rectangulito para indicar seleccion actual
        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            this.#selectionSquareX, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02)),
            Math.floor(GameScreen.width * 0.01), Math.floor(GameScreen.height * 0.02)
        );
        GameScreen.ctx.fillStyle = GameScreen.fontColor;
        GameScreen.ctx.fill();
    }

    #drawShareMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = GameScreen.fontColor;
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        const optionsHeight = 0.44;
        const optionsSpacing = 0.04;
        GameScreen.ctx.fillText("TWITTER", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));
        GameScreen.ctx.fillText("FACEBOOK", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 1)));
        GameScreen.ctx.fillText("LINKEDIN", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 2)));
        // GameScreen.ctx.fillText("PINTEREST", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 3)));
        GameScreen.ctx.fillText(TR.BACK[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 6)));

        // Rectangulito para indicar seleccion actual
        if (currentOptionIndex > 2) {
            currentOptionIndex = 6;
        }
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
            AudioManager.playSoundEffect("left");
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
            AudioManager.playSoundEffect("right");
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
    }
}
