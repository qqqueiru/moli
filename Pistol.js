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
        return new Projectile(
            1,  // damage
            50,  // speed
            this.character.getFaceDirection(),  // direction
            this.character.getPos().addConst(new Point(0, this.character.getShootingHeight())),  // startingPosition
            1920  // maxDistance
        );
    }
}