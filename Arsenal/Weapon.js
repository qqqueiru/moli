class Weapon {
    name = "NONE";  // pistol, machine-gun, shotgun
    ammoLeft = -1;  // -1: infinite
    ammoWhenFound = 20;
    character;
    rate = 10;  // Tasa máxima de disparo en ms (no se podrá disparar a mayor frecuencia)
    static projectileStartingPoint = new Point(0, 0);

    #lastShootingTime = 0;
    constructor(character) {
        this.character = character;
    }

    shoot() {
        alert("Método shoot de la clase base Weapon...");
    }

    checkIfCanShootSinceLastShooting() {
        let canShoot = false;
        if (Date.now() - this.#lastShootingTime > this.rate) {
            canShoot = true;
            this.#lastShootingTime = Date.now();
        }
        return canShoot;
    }
}