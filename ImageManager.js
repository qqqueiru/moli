class ImageManager {
    constructor() {
    }
    static imgs = new Map();
    static loadImage(id, src) {
        const img = new Image();
        img.src = src;
        ImageManager.imgs.set(id, img);
    }
    static imgsLoaded() {
        const imgsCount = ImageManager.imgs.size;
        if (imgsCount == 0) {
            return 1;
        }
        let imgsLoaded = 0;
        for (const [id, img] of ImageManager.imgs) {
            imgsLoaded += img.complete;
        }
        return imgsLoaded / imgsCount;  // Número entre 0 y 1 que representa el progreso de carga
    }
    static getImage(id) {
        return ImageManager.imgs.get(id);
    }
    static loadImages() {
        ImageManager.loadImage("moli", "./img/moli.png");

        // ImageManager.loadImage("moli_idle_right", "./img/moli_idle_right.png");
        // ImageManager.loadImage("moli_idle_left", "./img/moli_idle_left.png");
        // ImageManager.loadImage("moli_walking_right", "./img/moli_walking_right.png");
        // ImageManager.loadImage("moli_walking_left", "./img/moli_walking_left.png");
        // ImageManager.loadImage("moli_jumping_right", "./img/moli_jumping_right.png");
        // ImageManager.loadImage("moli_jumping_left", "./img/moli_jumping_left.png");
        // ImageManager.loadImage("moli_dying_right", "./img/moli_dying_right.png");
        // ImageManager.loadImage("moli_dying_left", "./img/moli_dying_left.png");

        // ImageManager.loadImage("capullo_right", "./img/capullo_right.png");
        // ImageManager.loadImage("capullo_left", "./img/capullo_left.png");
        // ImageManager.loadImage("capullo_idle", "./img/capullo_idle.png");

        // ImageManager.loadImage("pedorra_right", "./img/pedorra_right.png");
        // ImageManager.loadImage("pedorra_left", "./img/pedorra_left.png");
        // ImageManager.loadImage("pedorra_idle", "./img/pedorra_idle.png");

        // ImageManager.loadImage("background_level_1", "./img/background_level_1.png");
        // ImageManager.loadImage("foreground_level_1", "./img/foreground_level_1.png");
        // ImageManager.loadImage("background_level_2", "./img/background_level_2.png");
        // ImageManager.loadImage("foreground_level_2", "./img/foreground_level_2.png");
        // ImageManager.loadImage("background_level_3", "./img/background_level_3.png");
        // ImageManager.loadImage("foreground_level_3", "./img/foreground_level_3.png");
        // ImageManager.loadImage("background_level_4", "./img/background_level_4.png");
        // ImageManager.loadImage("foreground_level_4", "./img/foreground_level_4.png");
        // ImageManager.loadImage("background_level_5", "./img/background_level_5.png");
        // ImageManager.loadImage("foreground_level_5", "./img/foreground_level_5.png");

    }

}
