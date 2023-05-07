class StartMenu extends GameScreen {
    #menus;
    #fadeInCircleRadius = 0;
    #t = 0;
    #selectionSquareX;
    constructor() {
        super();
        this.name = "StartMenu";
        AudioManager.playLoop("menu");
        this.#menus = {
            currentMenu: "mainMenu",
            mainMenu: {
                currentOptionIndex: 0,
                drawHandle: (ctx, optIdx)=>{this.#drawMainMenu(ctx, optIdx)},
                options: [
                    {
                        name: "PLAY",
                        updateHandle: ()=>{this.#openPreStartMenu()},
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
            preStartMenu: {
                currentOptionIndex: 0,
                drawHandle: (ctx, optIdx)=>{this.#drawPreStartMenu(ctx, optIdx)},
                options: [
                    {
                        name: "START",
                        updateHandle: ()=>{this.#startGame()},
                    },
                    {
                        name: "BACK",
                        updateHandle: ()=>{this.#backToMainMenu()},
                    }
                ]
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

    #openPreStartMenu() {
        AudioManager.playSoundEffect("enter");
        this.#menus.currentMenu = "preStartMenu";
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

    #backToMainMenu() {
        AudioManager.playSoundEffect("back");
        this.#menus.currentMenu = "mainMenu";
    }

    #drawMainMenu(ctx, currentOptionIndex) {
        ctx.rect(0, 0, GameScreen.width, GameScreen.height);
        ctx.fillStyle = GameScreen.color.blue;
        ctx.fill();

        ctx.fillStyle = GameScreen.fontColor;
        ctx.textAlign = "center";

        // ctx.font = `bold ${Math.floor(0.055 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        // ctx.fillText(TR.MOLI[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.4));

        ctx.font = `${Math.floor(0.1 * GameScreen.height)}px ${GameScreen.fontFamily}`;

        const optionsHeight = 0.3;
        const optionsSpacing = 0.25;
        const options = [TR.PLAY[lang], TR.HELP[lang], TR.ABOUT[lang]];
        for (let i = 0; i < options.length; ++i) {
            ctx.fillText(options[i], Math.floor(0.3 * GameScreen.width), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * i)));
        }

        // Text Highlighting
        // if (PseudoDate.now() % 1500 < 1000) {
            let { width } = ctx.measureText(options[currentOptionIndex]);
            width += 50;
            ctx.fillRect(Math.floor(0.3 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) + 20, width, 20);
            ctx.fillRect(Math.floor(0.3 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 160, width, 20);
            ctx.fillRect(Math.floor(0.3 * GameScreen.width) - width / 2 - 15, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 160, 20, 200);
            ctx.fillRect(Math.floor(0.3 * GameScreen.width) + width / 2 - 15, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 160, 20, 200);
        // }
        ctx.drawImage(
            ImageManager.getImage("white_silhouette_moli"),
            1116,
            157
        )
    }

    #drawPreStartMenu(ctx, currentOptionIndex) {
        ctx.rect(0, 0, GameScreen.width, GameScreen.height);
        ctx.fillStyle = GameScreen.color.green;
        ctx.fill();

        ctx.fillStyle = GameScreen.fontColor;
        ctx.textAlign = "center";

        ctx.drawImage(
            ImageManager.getImage("controls"),
            370,
            249
        )        

        ctx.font = `${Math.floor(0.04 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        ctx.fillText(TR.shoot[lang], 1033, 421);
        ctx.fillText(TR.jump[lang], 1275, 480);
        ctx.fillText(TR.luck[lang], 1538, 535);

        ctx.font = `${Math.floor(0.1 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        ctx.fillText(TR.START[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.7));
        if (currentOptionIndex === 0) {
            let { width } = ctx.measureText(TR.START[lang]);
            width += 50;
            ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * 0.7) + 20, width, 20);
            ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * 0.7) - 160, width, 20);
            ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2 - 15, Math.floor(GameScreen.height * 0.7) - 160, 20, 200);
            ctx.fillRect(Math.floor(0.5 * GameScreen.width) + width / 2 - 15, Math.floor(GameScreen.height * 0.7) - 160, 20, 200);
        }

        ctx.font = `${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        ctx.fillText(TR.BACK[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.9));
        if (currentOptionIndex === 1) {
            let { width } = ctx.measureText(TR.BACK[lang]);
            width += 40;
            ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * 0.9) + 20, width, 10);
            ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * 0.9) - 60, width, 10);
            ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2 - 5, Math.floor(GameScreen.height * 0.9) - 60, 10, 90);
            ctx.fillRect(Math.floor(0.5 * GameScreen.width) + width / 2 - 5, Math.floor(GameScreen.height * 0.9) - 60, 10, 90);
        }
    }

    #drawHelpMenu(ctx, currentOptionIndex) {
        ctx.rect(0, 0, GameScreen.width, GameScreen.height);
        ctx.fillStyle = GameScreen.color.pink;
        ctx.fill();

        ctx.fillStyle = GameScreen.fontColor;
        ctx.textAlign = "center";

        ctx.font = `${Math.floor(0.100 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        ctx.fillText("HELP", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.2));
        ctx.font = `${Math.floor(0.05 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        ctx.fillText(
            TR.help0[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.4)
        );
        ctx.fillText(
            TR.help1[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.5)
        );
        ctx.fillText(
            TR.help2[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.6)
        );

        const optionsHeight = 0.9;
        const optionsSpacing = 0.04;
        ctx.font = `${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        ctx.fillText(TR.BACK[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));

        // Text Highlighting
        let { width } = ctx.measureText(TR.BACK[lang]);
        width += 40;
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) + 20, width, 10);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 60, width, 10);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2 - 5, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 60, 10, 90);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) + width / 2 - 5, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 60, 10, 90);
    }

    #drawAboutMenu(ctx, currentOptionIndex) {
        ctx.rect(0, 0, GameScreen.width, GameScreen.height);
        ctx.fillStyle = GameScreen.color.red;
        ctx.fill();

        ctx.fillStyle = GameScreen.fontColor;
        ctx.textAlign = "center";
        ctx.font = `${Math.floor(0.1 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        ctx.fillText(
            TR.MOLI[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.2)
        );
        ctx.font = `${Math.floor(0.050 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        ctx.fillText(
            TR.about0[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.4)
        );
        ctx.fillText(
            TR.about1[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.50)
        );
        ctx.fillText(
            TR.about2[lang],
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.6)
        );

        ctx.font = `${Math.floor(0.028 * GameScreen.height)}px ${GameScreen.fontFamily}`;
        const optionsHeight = 0.9;
        const optionsSpacing = 0.04;
        ctx.fillText(TR.BACK[lang], Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));

        // Text Highlighting
        let { width } = ctx.measureText(TR.BACK[lang]);
        width += 40;
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) + 20, width, 10);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 60, width, 10);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) - width / 2 - 5, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 60, 10, 90);
        ctx.fillRect(Math.floor(0.5 * GameScreen.width) + width / 2 - 5, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex)) - 60, 10, 90);
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
            ctx.fillStyle = GameScreen.color.red;
            ctx.fill("evenodd");
            this.#fadeInCircleRadius += 50;
        }
    }

    draw() {
        const ctx = GameScreen.ctx;
        this.#selectionSquareX = Math.floor(GameScreen.width * (0.4 + 0.01 * Math.sin(this.#t)));

        ctx.beginPath();

        const currentMenu = this.#menus.currentMenu;
        const drawHandleFunction = this.#menus[currentMenu].drawHandle;
        const currentOptionIndex = this.#menus[currentMenu].currentOptionIndex;
        drawHandleFunction(ctx, currentOptionIndex);
        this.#drawFadeIn(ctx);  // Transición desde la pantalla PressAnyKey

        this.#t += 0.15;
    }
}
