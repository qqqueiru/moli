class Input {
    #activated;
    #resetted;
    constructor(activated = true, resetted = false) {
        this.#activated = activated;
        this.#resetted = resetted;
    }

    activate() {
        this.#activated = true;
        this.#resetted = false;
    }

    consumeIfActivated() {
        let isActivated = false;
        if (this.#activated) {
            isActivated = true;
            this.#activated = false;
        }
        return isActivated;
    }

    isResetted() {
        return this.#resetted;
    }

    reset() {
        this.#resetted = true;
    }

    static anyKey = new Input();
}