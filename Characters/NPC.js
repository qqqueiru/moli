class NPC extends Character {
    #activated = true;
    _safetyDistance = 0;
    _jumpingDiffToPlayer = 200;
    _shootRate = 2000;  // ms. When ai is updated, npc will shoot at this rate
    _grenadeRate = -1;  // ms. When ai is updated, npc will throw grenades at this rate
    _jumpRate = 3000;  // ms. When ai is updated, npc will jump at this rate
    constructor(pos) {
        super(pos);
        this._sprites = {
            blank: new AnimatedSprite("npc_blank", 1, 1, 1, 1, ctx),
            right: new AnimatedSprite("npc_right", 1, 1, 1, 1, ctx),
            left: new AnimatedSprite("npc_left", 1, 1, 1, 1, ctx),
            crouch_right: new AnimatedSprite("npc_crouch_right", 1, 1, 1, 1, ctx),
            crouch_left: new AnimatedSprite("npc_crouch_left", 1, 1, 1, 1, ctx),
            up: new AnimatedSprite("npc_up", 1, 1, 1, 1, ctx),
            dead_right: new AnimatedSprite("npc_dead_right", 1, 1, 1, 1, ctx),
            dead_left: new AnimatedSprite("npc_dead_left", 1, 1, 1, 1, ctx),
            dead_crouch_right: new AnimatedSprite("npc_dead_crouch_right", 1, 1, 1, 1, ctx),
            dead_crouch_left: new AnimatedSprite("npc_dead_crouch_left", 1, 1, 1, 1, ctx),
            dying_right: new AnimatedSprite("npc_dying_right", 1, 5, 1, 10, ctx),
            dying_left: new AnimatedSprite("npc_dying_left", 1, 5, 1, 10, ctx),
            dying_crouch_right: new AnimatedSprite("npc_dying_crouch_right", 1, 5, 1, 10, ctx),
            dying_crouch_left: new AnimatedSprite("npc_dying_crouch_left", 1, 5, 1, 10, ctx),
        };

        this._hitEllipseCrouched = new Ellipse(this._pos, 40, 55);
        this._hitEllipseStraight = new Ellipse(this._pos, 40, 110, 0, -20);

        this._maxSpeedX = 4 + 2 * PseudoRandom.get();
        this._safetyDistance = 200 + 500 * PseudoRandom.get();
        this._jumpingDiffToPlayer = 200;
        this._shootRate = 2000 + 2000 * PseudoRandom.get();
        this._grenadeRate = -1;
        this._jumpRate = 3000 + 3000 * PseudoRandom.get();
    }

    getShootRate() {
        return this._shootRate;
    }

    getGrenadeRate() {
        return this._grenadeRate;
    }

    getJumpRate() {
        return this._jumpRate;
    }

    getJumpingDiffToPlayer() {
        return this._jumpingDiffToPlayer;
    }

    getSafetyDistance() {
        return this._safetyDistance;
    }

    checkCloseToPlayer(playerPos) {
        if (playerPos.distanceFromPoint(this._pos) < 1920) {
            this.#activated = true;
            return true;
        }
        return false;
    }

    onlyActivateUntilCloseToPlayer() {
        this.#activated = false;
    }

    isActivated() {
        return this.#activated;
    }
}