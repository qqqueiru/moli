class GameScreen {
    static inputs;
    static ctx;  // Por el momento todas las pantallas se dibujan en el mismo contexto
    static currentScreen;
    static width;
    static height;

    static fontColor = "#856345";
    static fontColorLighter = "#ffdddd";
    static fontFamily = "Arial";

    constructor() {
    }

    handleInputs() {

    }

    update() {
        alert("Método update de la clase base GameScreen...");
    }

    draw() {
        alert("Método draw de la clase base GameScreen...");
    }

    runIteration() {
        const start = Date.now();
        this.draw();
        const drawTime = Date.now() - start;
        this.update();
        const updateTime = Date.now() - start - drawTime;
        const totalTime = drawTime + updateTime;
        // console.log(`draw: ${drawTime} ms, update: ${updateTime} ms, total: ${totalTime} ms.`);
        if (totalTime > 10) {
            console.warn(`draw: ${drawTime} ms, update: ${updateTime} ms, total: ${totalTime} ms.`)
        }
    }
}