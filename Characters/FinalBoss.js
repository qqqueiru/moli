class FinalBoss extends NPC {
    constructor(pos) {
        super(pos);
        this._health = 100;

        this._sprites = {
            blank: new AnimatedSprite("final_boss_blank", 1, 1, 1, 1, ctx),
            right: new AnimatedSprite("final_boss_right", 1, 1, 1, 1, ctx),
            left: new AnimatedSprite("final_boss_left", 1, 1, 1, 1, ctx),
            crouch_right: new AnimatedSprite("final_boss_crouch_right", 1, 1, 1, 1, ctx),
            crouch_left: new AnimatedSprite("final_boss_crouch_left", 1, 1, 1, 1, ctx),
            up: new AnimatedSprite("final_boss_up", 1, 1, 1, 1, ctx),
            dead_right: new AnimatedSprite("final_boss_dead_right", 1, 1, 1, 1, ctx),
            dead_left: new AnimatedSprite("final_boss_dead_left", 1, 1, 1, 1, ctx),
            dead_crouch_right: new AnimatedSprite("final_boss_dead_crouch_right", 1, 1, 1, 1, ctx),
            dead_crouch_left: new AnimatedSprite("final_boss_dead_crouch_left", 1, 1, 1, 1, ctx),
            dying_right: new AnimatedSprite("final_boss_dying_right", 1, 5, 1, 10, ctx),
            dying_left: new AnimatedSprite("final_boss_dying_left", 1, 5, 1, 10, ctx),
            dying_crouch_right: new AnimatedSprite("final_boss_dying_crouch_right", 1, 5, 1, 10, ctx),
            dying_crouch_left: new AnimatedSprite("final_boss_dying_crouch_left", 1, 5, 1, 10, ctx),
        };

        this._safetyDistance = 330;
        this._jumpingDiffToPlayer = 0;
        this._maxSpeedX = 7;
        this._shootRate = 750;
        this._grenadeRate = 3000;
        this._jumpRate = 2000;
    }
}