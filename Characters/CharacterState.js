class CharacterState {
    #name = "NONE";
    #framesFromStart = 0;
    #frameLength = -1;  // -1 if indefinite animation
    #updateHandle;
    #onFinishedHandle;
    #finished = false;
    constructor(name, frameLength, updateHandle, onFinishedHandle) {
        this.#name = name;
        this.#frameLength = frameLength;
        this.#updateHandle = updateHandle;
        this.#onFinishedHandle = onFinishedHandle;
    }

    update() {
        this.#framesFromStart++;

        this.#updateHandle();

        if (this.#frameLength != -1 && this.#framesFromStart >= this.#frameLength) {
            this.#finished = true;
            this.#onFinishedHandle();
        }
    }

    getName() {
        return this.#name;
    }

    getFinished() {
        return this.#finished;
    }

    getCurrentFrame() {
        return this.#framesFromStart;
    }
}