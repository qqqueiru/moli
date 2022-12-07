class Play extends GameScreen {
    #dificulty = 1.5;  // Cuanto más alto, más difícil
    constructor() {
        super();
        AudioManager.stopLoop("menu");
        this.state = {
            moli: new Moli(0.156 * GameScreen.width, 0.833 * GameScreen.height, GameScreen.ctx, this.#dificulty),
            villain: new Villain(GameScreen.ctx, this.#dificulty),
            fallingItems: [],
            difficulty: 0,
            score: 0,
            backgroundImg: ImageManager.getImage("background"),
            foregroundImg: ImageManager.getImage("foreground"),
        };
        // this.backgroundMusic = AudioManager.getAudio("background_music_1");
        // this.backgroundMusic.loop = true;
        // this.backgroundMusic.currentTime = 0;
        // this.backgroundMusic.play();
    }

    handleInputs() {

    }

    update() {
        if (GameScreen.inputs.get("ArrowLeft")?.consumeIfActivated()) {
            this.state.moli.commandToDirection("left");
        }
        if (GameScreen.inputs.get("ArrowRight")?.consumeIfActivated()) {
            this.state.moli.commandToDirection("right");
        }
    
        // Actualización de entidades
        this.state.moli.updatePos();
        const newFallingItem = this.state.villain.update();
        if (newFallingItem) {
            this.state.fallingItems.push(newFallingItem);
        }
        for (let i = 0; i < this.state.fallingItems.length; ++i) {
            this.state.fallingItems[i].updatePos();
        }
    
        // Eliminación de objetos que se pueden eliminar
        for (let i = (this.state.fallingItems.length - 1); i >= 0; --i) {
            const [x, y] = this.state.fallingItems[i].getPoint();
            const isInside = this.state.moli.catchesGoody(x, y);
            if (isInside) {
                this.state.fallingItems[i].canBeDeleted = true;
                this.state.score++;
                AudioManager.playSoundEffect("reward");
            }
    
            if (this.state.fallingItems[i].fallen) {
                AudioManager.playSoundEffect("back");
                GameScreen.currentScreen = new GameOver(this.state.score);
                // this.backgroundMusic.pause();
            }
    
            if (this.state.fallingItems[i].canBeDeleted) {
                this.state.fallingItems.splice(i, 1);
            }
        }
    }

    draw() {
        GameScreen.ctx.beginPath();

        GameScreen.ctx.drawImage(this.state.backgroundImg, 0, 0, GameScreen.width, GameScreen.height);

        // GameScreen.ctx.clearRect(0, 0, GameScreen.width, GameScreen.height);
        // GameScreen.ctx.rect(0, 0, GameScreen.width, GameScreen.height);
        // GameScreen.ctx.fillStyle = "rgb(150, 150, 150)";
        // GameScreen.ctx.fill();
    
        // const p = new Path2D('m 32.423215,101.64019 17.226952,-34.041938 40.65784,-0.107456 14.574913,33.595634 5.69533,-33.778278 9.57132,-29.303957 17.40239,18.23567 8.70119,-1.966633 L 119.79987,14.366847 103.67653,41.180492 43.336938,37.059475 19.922809,60.216901 41.754898,49.8471 Z');
        // ctx.stroke(p);
    
        this.state.moli.draw();
        // this.state.moli.drawDebugGoodBounding();
        this.state.villain.draw();

        GameScreen.ctx.drawImage(this.state.foregroundImg, 0, 0, GameScreen.width, GameScreen.height);
        
        this.#drawScore();

        for (let i = 0; i < this.state.fallingItems.length; ++i) {
            this.state.fallingItems[i].draw();
            // this.state.fallingItems[i].drawDebugPoint();
        }
    }

    #drawScore() {
        if (this.state.score == 0) {
            return;
        }
        const romanNumeral = romanize(this.state.score);
        const scorePos = {x: 0.50 * GameScreen.width, y: 0.40 * GameScreen.height};
        const rectSize = {
            w: Math.floor((romanNumeral.length * 0.020 + 0.015) * GameScreen.width),
            h: Math.floor(0.080 * GameScreen.height),
        };
        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            Math.floor(scorePos.x - rectSize.w / 2), 
            Math.floor(scorePos.y - rectSize.h / 2),
            Math.floor(rectSize.w), 
            Math.floor(rectSize.h)
        );
        GameScreen.ctx.fillStyle = "#fee9b2";
        GameScreen.ctx.fill();

        GameScreen.ctx.strokeStyle = "#bb9679";
        GameScreen.ctx.lineWidth = GameScreen.imgScale * 2;
        GameScreen.ctx.stroke();

        GameScreen.ctx.font = `bold ${Math.floor(0.055 * GameScreen.height)}px TimesNewRoman`;
        GameScreen.ctx.fillStyle = "#bb9679";
        GameScreen.ctx.fillText(
            romanNumeral,
            Math.floor(scorePos.x), 
            Math.floor(scorePos.y + 0.020 * GameScreen.height)
        );
    }
}