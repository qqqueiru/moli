class Input {
    #activated;
    #resetted;
    #pressed;
    constructor(activated = true, resetted = false) {
        this.#activated = activated;
        this.#resetted = resetted;
        this.#pressed = false;
    }

    activate() {
        this.#activated = true;
        this.#resetted = false;
        this.#pressed = true;
    }

    consumeIfActivated() {
        let isActivated = false;
        if (this.#activated) {
            isActivated = true;
            this.#activated = false;
        }
        return isActivated;
    }

    isPressed() {
        return this.#pressed;
    }

    isResetted() {
        return this.#resetted;
    }

    reset() {
        this.#resetted = true;
        this.#pressed = false;
    }

    static anyKey = new Input();
}