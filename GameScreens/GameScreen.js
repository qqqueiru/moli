class GameScreen {
    static inputs;
    static ctx;  // Por el momento todas las pantallas se dibujan en el mismo contexto
    static currentScreen;
    static width;
    static height;

    static fontColor = "#856345";
    static fontColorLighter = "#ffdddd";
    static fontFamily = "TimesNewRoman";

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
        this.draw();
        this.update();
    }
}