class HealthTrigger {
    #character;
    #healthTarget;
    #triggerHandle;
    constructor(character, healthTarget, triggerHandle) {
        this.#character = character;
        this.#healthTarget = healthTarget;
        this.#triggerHandle = triggerHandle;
    }

    update() {
        if (this.isDone()) {
            this.#triggerHandle();
        }
    }

    isDone() {
        return this.#character.getHealth() <= this.#healthTarget;
    }

    draw(ctx, cameraPos) {

    }
}