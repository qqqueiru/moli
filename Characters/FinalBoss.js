class FinalBoss extends NPC {
    constructor(pos) {
        super(pos);
        this._health = 100;

        this._safetyDistance = 330;
        this._jumpingDiffToPlayer = 0;
        this._maxSpeedX = 7;
        this._shootRate = 750;
        this._grenadeRate = 3000;
        this._jumpRate = 2000;
    }
}