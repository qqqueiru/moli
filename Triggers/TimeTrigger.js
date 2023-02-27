class TimeTrigger {
    #currentIteration = 0;
    #totalIterations;
    #triggerHandle;
    constructor(totalIterations, triggerHandle) {
        this.#totalIterations = totalIterations;
        this.#triggerHandle = triggerHandle;
    }

    update() {
        this.#currentIteration++;
        if (this.isDone()) {
            this.#triggerHandle();
        }
    }

    isDone() {
        return this.#currentIteration >= this.#totalIterations;
    }

    draw(ctx, cameraPos) {
        
    }
}