/**
 * Class for the player character
 */
class Player extends Character {
    constructor(pos) {
        super(pos);
        this.immuneToDamage = false;
        this._sprites = {
            blank: new AnimatedSprite("player_blank", 1, 1, 1, 1, ctx),
            right: new AnimatedSprite("player_right", 1, 1, 1, 1, ctx),
            left: new AnimatedSprite("player_left", 1, 1, 1, 1, ctx),
            crouch_right: new AnimatedSprite("player_crouch_right", 1, 1, 1, 1, ctx),
            crouch_left: new AnimatedSprite("player_crouch_left", 1, 1, 1, 1, ctx),
            up: new AnimatedSprite("player_up", 1, 1, 1, 1, ctx),
            dead_right: new AnimatedSprite("player_dead_right", 1, 1, 1, 1, ctx),
            dead_left: new AnimatedSprite("player_dead_left", 1, 1, 1, 1, ctx),
            dead_crouch_right: new AnimatedSprite("player_dead_crouch_right", 1, 1, 1, 1, ctx),
            dead_crouch_left: new AnimatedSprite("player_dead_crouch_left", 1, 1, 1, 1, ctx),
            dying_right: new AnimatedSprite("player_dying_right", 1, 5, 1, 10, ctx),
            dying_left: new AnimatedSprite("player_dying_left", 1, 5, 1, 10, ctx),
            dying_crouch_right: new AnimatedSprite("player_dying_crouch_right", 1, 5, 1, 10, ctx),
            dying_crouch_left: new AnimatedSprite("player_dying_crouch_left", 1, 5, 1, 10, ctx),
        };

        this._hitEllipseCrouched = new Ellipse(this._pos, 15, 40);
        this._hitEllipseStraight = new Ellipse(this._pos, 15, 80, 0, -20);

        this._shootingHeightUp = -57;
    }

    respawn() {
        AudioManager.playSoundEffect("player_respawn");
        this.reset();
        this._pos.y -= 500;
        this.updateAvailablePlatforms(this._pos.y + 50, this._pos.x);
        this.setLastPlatformTouchedId(null);
        this._states.currentState = "ALIVE";
    }

    inflictDamage(damage) {
        const currentState = this._states.currentState;
        if (currentState === "ALIVE" && this.immuneToDamage) {
            return;
        }
        super.inflictDamage(damage);
    }

    update() {
        super.update();
        const currentState = this._states.currentState;
        this.immuneToDamage = currentState === "ALIVE" && this._states[currentState].getCurrentFrame() < 60 * 4;
    }

    draw(ctx, cameraPos) {
        super.draw(ctx, cameraPos);

        const currentState = this._states.currentState;
        if (currentState === "ALIVE" && this.immuneToDamage) {
            // Debug
            ctx.beginPath();
            ctx.rect(this._pos.x + GameScreen.width / 2 - cameraPos.x, this._pos.y + GameScreen.height / 2 - cameraPos.y, 20, 20);
            ctx.fillStyle = "white";
            ctx.fill();
        }
    }
}