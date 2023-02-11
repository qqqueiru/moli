class NPC extends Character {
    constructor(pos) {
        super();
        this._sprites = {
            right: new AnimatedSprite("npc_right", 1, 1, 1, -1, ctx),
            left: new AnimatedSprite("npc_left", 1, 1, 1, -1, ctx),
            crouch_right: new AnimatedSprite("npc_crouch_right", 1, 1, 1, -1, ctx),
            crouch_left: new AnimatedSprite("npc_crouch_left", 1, 1, 1, -1, ctx),
            up: new AnimatedSprite("npc_up", 1, 1, 1, -1, ctx),
        };
    }
}