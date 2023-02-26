/**
 * Class for the player character
 */
class Player extends Character {
    constructor() {
        super();
        this._sprites = {
            blank: new AnimatedSprite("player_blank", 1, 1, 1, 1, ctx),
            right: new AnimatedSprite("player_right", 1, 1, 1, 1, ctx),
            left: new AnimatedSprite("player_left", 1, 1, 1, 1, ctx),
            crouch_right: new AnimatedSprite("player_crouch_right", 1, 1, 1, 1, ctx),
            crouch_left: new AnimatedSprite("player_crouch_left", 1, 1, 1, 1, ctx),
            up: new AnimatedSprite("player_up", 1, 1, 1, 1, ctx),
            dead_right: new AnimatedSprite("player_dead_right", 1, 1, 1, 1, ctx),
            dead_left: new AnimatedSprite("player_dead_left", 1, 1, 1, 1, ctx),
            dying_right: new AnimatedSprite("player_dying_right", 1, 5, 1, 10, ctx),
            dying_left: new AnimatedSprite("player_dying_left", 1, 5, 1, 10, ctx),
        };

        this._hitEllipseCrouched = new Ellipse(this._pos, 15, 40);
        this._hitEllipseStraight = new Ellipse(this._pos, 15, 80, 0, -20);
    }
}