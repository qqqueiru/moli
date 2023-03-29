class Collectable {
    #pos;
    #imgId;
    #sprite;
    constructor(pos, imgId) {
        this.#pos = pos;
        this.#imgId = imgId;
    }

    setSprite(sprite) {
        this.#sprite = sprite;
    }

    update() {
        // NOP
    }

    checkHit(character, states) {
        if (!states.includes(character.getCurrentState())) {
            return;
        }
        if (character.getPos().distanceFromPoint(this.#pos) < 100) {
            AudioManager.playSoundEffect("reward");
            return true;
        } else {
            return false;
        }
    }

    draw(ctx, cameraPos) {
        this.#sprite.draw(cameraPos);
    }
}