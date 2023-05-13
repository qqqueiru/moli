class FinishedMenu extends GameScreen {
    #menus;
    #t = 0;
    #selectionSquareX;

    constructor(frameCount, deathCount, collectedCollectablesCount, totalCollectablesCount) {
        super();
        this.frameCount = frameCount;
        this.deathCount = deathCount;
        this.collectedCollectablesCount = collectedCollectablesCount;
        this.totalCollectablesCount = totalCollectablesCount;
        this.name = "FinishedMenu";
        AudioManager.playLoop("menu");
        this.#menus = {
            currentMenu: "mainMenu",
            mainMenu: {
                currentOptionIndex: 0,
                drawHandle: (optIdx)=>{this.#drawMainMenu(optIdx)},
                options: [
                    {
                        name: "SHARE",
                        updateHandle: ()=>{this.#openShareMenu()},
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
                        name: "SAVE REPLAY",
                        updateHandle: ()=>{this.#saveReplay()},
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

    #openShareMenu() {
        AudioManager.playSoundEffect("enter");
        this.#menus.currentMenu = "shareMenu";
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

    #saveReplay() {
        alert("TODO");
    }

    #openAboutMenu() {
        AudioManager.playSoundEffect("enter");
        this.#menus.currentMenu = "aboutMenu";
    }

    #shareTwitter() {
        AudioManager.playSoundEffect("enter");
        // https://www.sharelinkgenerator.com/
        setTimeout(()=>{
            const timeStr = getTimePassedStr(this.frameCount);
            const tweetMsg = TR.TWEET_MSG[lang](this.deathCount, this.collectedCollectablesCount, timeStr).replaceAll(" ", "%20");
            const url = `https://twitter.com/intent/tweet?text=${tweetMsg}.%0Aqqqueiru.github.io/moli/`;
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
        GameScreen.ctx.fillText(TR.THE_END[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.35));

        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        const optionsHeight = 0.45;
        const optionsSpacing = 0.07;
        const options = [TR.SHARE[lang], TR.RESTART[lang], TR.START_MENU[lang], TR.SAVE_REPLAY[lang], TR.ABOUT[lang]];
        for (let i = 0; i < options.length; ++i) {
            GameScreen.ctx.fillText(options[i], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * i)));
        }

        // Text Highlighting
        let { width } = ctx.measureText(options[currentOptionIndex]);
        width += 40;
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) + 10, width, 10);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 55, width, 10);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2 - 5, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 55, 10, 75);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) + width / 2 - 5, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 55, 10, 75);
    }

    #drawShareMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = GameScreen.fontColor;
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = `bold ${Math.floor(0.055 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(TR.SHARE[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.35));
        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        const optionsHeight = 0.45;
        const optionsSpacing = 0.07;
        const options = ["TWITTER", "FACEBOOK", "LINKEDIN", "", TR.BACK[lang]];
        for (let i = 0; i < options.length; ++i) {
            GameScreen.ctx.fillText(options[i], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * i)));
        }

        if (currentOptionIndex > 2) {
            currentOptionIndex = 4;
        }
        // Text Highlighting
        let { width } = ctx.measureText(options[currentOptionIndex]);
        // ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) + 10, width, 10);
        width += 40;
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) + 10, width, 10);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 55, width, 10);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2 - 5, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 55, 10, 75);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) + width / 2 - 5, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 55, 10, 75);

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
        // ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) + 10, width, 10);
        width += 40;
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) + 10, width, 10);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 55, width, 10);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2 - 5, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 55, 10, 75);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) + width / 2 - 5, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 55, 10, 75);

    }

    #drawStartMenuConfirmation(currentOptionIndex) {
        GameScreen.ctx.fillStyle = GameScreen.fontColor;
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = `bold ${Math.floor(0.035 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        GameScreen.ctx.fillText(TR.START_MENU_CONFIRMATION[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.45));

        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        const optionsHeight = 0.6;
        const optionsSpacing = 0.07;
        const options = [TR.YES[lang], TR.NO[lang]];
        for (let i = 0; i < options.length; ++i) {
            GameScreen.ctx.fillText(options[i], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * i)));
        }

        // Text Highlighting
        let { width } = ctx.measureText(options[currentOptionIndex]);
        // ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) + 10, width, 10);
        width += 40;
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) + 10, width, 10);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 55, width, 10);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2 - 5, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 55, 10, 75);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) + width / 2 - 5, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 55, 10, 75);
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
        // ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)) + 20, width, 10);
        width += 40;
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) + 10, width, 10);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 55, width, 10);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2 - 5, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 55, 10, 75);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) + width / 2 - 5, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 55, 10, 75);
    }

    handleInputs() {

    }

    update() {
        this.#selectionSquareX = Math.floor(GameScreen.width * (0.4 + 0.01 * Math.sin(this.#t)));

        if (
            GameScreen.inputs.get("w")?.consumeIfActivated() ||
            // GameScreen.inputs.get("a")?.consumeIfActivated() ||
            GameScreen.inputs.get("arrowup")?.consumeIfActivated() || 0
            // GameScreen.inputs.get("arrowleft")?.consumeIfActivated()
        ) {
            const currentOptionIndex = --this.#menus[this.#menus.currentMenu].currentOptionIndex;
            const optionsLength = this.#menus[this.#menus.currentMenu].options.length;
            if (currentOptionIndex < 0) {
                this.#menus[this.#menus.currentMenu].currentOptionIndex = optionsLength - 1;
            }
            AudioManager.playSoundEffect("selection_up");
        }
        if (
            GameScreen.inputs.get("s")?.consumeIfActivated() ||
            // GameScreen.inputs.get("d")?.consumeIfActivated() ||
            GameScreen.inputs.get("arrowdown")?.consumeIfActivated() || 0
            // GameScreen.inputs.get("arrowright")?.consumeIfActivated()
        ) {
            const currentOptionIndex = ++this.#menus[this.#menus.currentMenu].currentOptionIndex;
            const optionsLength = this.#menus[this.#menus.currentMenu].options.length;
            if (currentOptionIndex >= optionsLength) {
                this.#menus[this.#menus.currentMenu].currentOptionIndex = 0;
            }
            AudioManager.playSoundEffect("selection_down");
        }

        if (
            GameScreen.inputs.get("j")?.consumeIfActivated() ||
            GameScreen.inputs.get("enter")?.consumeIfActivated() ||
            GameScreen.inputs.get(" ")?.consumeIfActivated()
        ) {
            const currentMenu = this.#menus.currentMenu;
            const currentOptionIndex = this.#menus[currentMenu].currentOptionIndex;
            const updateHandleFunction = this.#menus[currentMenu].options[currentOptionIndex].updateHandle;
            updateHandleFunction();
        }

        if (
            GameScreen.inputs.get("k")?.consumeIfActivated() ||
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
