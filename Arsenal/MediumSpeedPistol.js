class MediumSpeedPistol extends Weapon {
    name = "mediumspeedpistol";
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

        Weapon.projectileStartingPoint.x = this.character.getPos().x;
        Weapon.projectileStartingPoint.y = this.character.getPos().y + this.character.getShootingHeight();
        return new Projectile(
            1,  // damage
            30,  // speed
            direction,  // direction
            Weapon.projectileStartingPoint,  // startingPosition
            1920,  // maxDistance
            animatedSprite,
        );
    }
}