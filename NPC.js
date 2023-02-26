class NPC extends Character {
    constructor(pos) {
        super();
        this._sprites = {
            blank: new AnimatedSprite("npc_blank", 1, 1, 1, 1, ctx),
            right: new AnimatedSprite("npc_right", 1, 1, 1, 1, ctx),
            left: new AnimatedSprite("npc_left", 1, 1, 1, 1, ctx),
            crouch_right: new AnimatedSprite("npc_crouch_right", 1, 1, 1, 1, ctx),
            crouch_left: new AnimatedSprite("npc_crouch_left", 1, 1, 1, 1, ctx),
            up: new AnimatedSprite("npc_up", 1, 1, 1, 1, ctx),
            dead_right: new AnimatedSprite("npc_dead_right", 1, 1, 1, 1, ctx),
            dead_left: new AnimatedSprite("npc_dead_left", 1, 1, 1, 1, ctx),
            dying_right: new AnimatedSprite("npc_dying_right", 1, 5, 1, 10, ctx),
            dying_left: new AnimatedSprite("npc_dying_left", 1, 5, 1, 10, ctx),
        };

        this._hitEllipseCrouched = new Ellipse(this._pos, 40, 55);
        this._hitEllipseStraight = new Ellipse(this._pos, 40, 110, 0, -20);
    }
}