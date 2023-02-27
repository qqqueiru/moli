class LocationTrigger {
    #character;
    #ellipseTarget;
    #triggerHandle;
    constructor(character, ellipseTarget, triggerHandle) {
        this.#character = character;
        this.#ellipseTarget = ellipseTarget;
        this.#triggerHandle = triggerHandle;
    }

    update() {
        if (this.isDone()) {
            this.#triggerHandle();
        }
    }

    isDone() {
        return this.#ellipseTarget.isPointInside(this.#character.getPos());
    }

    draw(ctx, cameraPos) {
        this.#ellipseTarget.draw(ctx, cameraPos);
    }
}