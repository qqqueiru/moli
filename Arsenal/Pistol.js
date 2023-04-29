class Pistol extends Weapon {
    name = "pistol";
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
        AudioManager.playSoundEffect("pistol_shoots");
        const direction = this.character.getFaceDirection();
        const imgId = direction === "up" ? "pistol_projectile_vertical" : "pistol_projectile_horizontal";
        const animatedSprite = new AnimatedSprite(imgId, 1, 1, 1, 1, GameScreen.ctx);

        Weapon.projectileStartingPoint.x = this.character.getPos().x;
        Weapon.projectileStartingPoint.y = this.character.getPos().y + this.character.getShootingHeight();
        return new Projectile(
            1,  // damage
            50,  // speed
            direction,  // direction
            Weapon.projectileStartingPoint,  // startingPosition
            GameScreen.width,  // maxDistance
            animatedSprite,
        );
    }
}