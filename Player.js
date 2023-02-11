/**
 * Class for the player character
 */
class Player extends Character {
    constructor() {
        super();
        this._sprites = {
            right: new AnimatedSprite("player_right", 1, 1, 1, -1, ctx),
            left: new AnimatedSprite("player_left", 1, 1, 1, -1, ctx),
            crouch_right: new AnimatedSprite("player_crouch_right", 1, 1, 1, -1, ctx),
            crouch_left: new AnimatedSprite("player_crouch_left", 1, 1, 1, -1, ctx),
            up: new AnimatedSprite("player_up", 1, 1, 1, -1, ctx),
        };
    }
}