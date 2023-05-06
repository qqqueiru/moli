class GameScreen {
    static inputs;
    static ctx;  // Por el momento todas las pantallas se dibujan en el mismo contexto
    static currentScreen;
    static width;
    static height;

    static color = {
        white: "#fff",
        black: "#000",
        red: "#f44336",
        blue: "#2196f3",
        green: "#4caf50",
        pink: "#e91e63",
    }

    // static fontColor = "#856345";
    // static fontColorLighter = "#ffdddd";
    static fontColor = "#fff";
    static fontColorRed = "#f44336";
    static fontColorContrast = "#000";
    static fontFamily = "Acme";

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
            console.warn(`draw: ${drawTime} ms, update: ${updateTime} ms, total: ${totalTime} ms. ${GameScreen.currentScreen.name}`)
        }

        PseudoDate.currentIteration++;
    }
}