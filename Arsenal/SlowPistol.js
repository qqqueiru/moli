class SlowPistol extends Weapon {
    name = "slowpistol";
    rate = 100;
    constructor(character) {
        super(character);
    }
    /**
     * 
     * @returns Podría retornar una lista (no vacía) de proyectiles, un solo proyectil o null
     */
    shoot() {
        if (!this.checkIfCanShootSinceLastShooting()) { return null; }
        // Pistol ammo is infinite
        // if (this.ammoLeft <= 0) { return null; }
        // this.ammoLeft--;
        AudioManager.playSoundEffect("slow_pistol_shoots");
        const direction = this.character.getFaceDirection();
        const imgId = "slow_pistol_projectile";
        const animatedSprite = new AnimatedSprite(imgId, 1, 2, 1, 5, GameScreen.ctx);
        return new Projectile(
            1,  // damage
            15,  // speed
            direction,  // direction
            this.character.getPos().addConst(new Point(0, this.character.getShootingHeight())),  // startingPosition
            1920,  // maxDistance
            animatedSprite,
        );
    }
}