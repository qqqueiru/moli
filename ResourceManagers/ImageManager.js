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

        ImageManager.loadImage("player_blank", "./img/player/player_blank.png");
        ImageManager.loadImage("player_right", "./img/player/player_right.png");
        ImageManager.loadImage("player_left", "./img/player/player_left.png");
        ImageManager.loadImage("player_up", "./img/player/player_up.png");
        ImageManager.loadImage("player_crouch_right", "./img/player/player_crouch_right.png");
        ImageManager.loadImage("player_crouch_left", "./img/player/player_crouch_left.png");
        ImageManager.loadImage("player_dead_right", "./img/player/player_dead_right.png");
        ImageManager.loadImage("player_dead_left", "./img/player/player_dead_left.png");
        ImageManager.loadImage("player_dying_right", "./img/player/player_dying_right.png");
        ImageManager.loadImage("player_dying_left", "./img/player/player_dying_left.png");

        // Test NPC
        ImageManager.loadImage("npc_blank", "./img/npcs/test/npc_blank.png");
        ImageManager.loadImage("npc_right", "./img/npcs/test/npc_right.png");
        ImageManager.loadImage("npc_left", "./img/npcs/test/npc_left.png");
        ImageManager.loadImage("npc_up", "./img/npcs/test/npc_up.png");
        ImageManager.loadImage("npc_crouch_right", "./img/npcs/test/npc_crouch_right.png");
        ImageManager.loadImage("npc_crouch_left", "./img/ncps/test/npc_crouch_left.png");
        ImageManager.loadImage("npc_dead_right", "./img/npcs/test/npc_dead_right.png");
        ImageManager.loadImage("npc_dead_left", "./img/npcs/test/npc_dead_left.png");
        ImageManager.loadImage("npc_dying_right", "./img/npcs/test/npc_dying_right.png");
        ImageManager.loadImage("npc_dying_left", "./img/npcs/test/npc_dying_left.png");

        ImageManager.loadImage("background_test_00", "./img/background/background_test_00.png");
        ImageManager.loadImage("sublevel1_1", "./img/background/sublevel1_1.png");

        ImageManager.loadImage("grenade_explosion", "./img/grenades/grenade_explosion.png");

        // Loop Sprites
        ImageManager.loadImage("energy_drink", "./img/loop_sprites/energy_drink.png");
        ImageManager.loadImage("agua_lavadero", "./img/loop_sprites/agua_lavadero.png");
        ImageManager.loadImage("moscas", "./img/loop_sprites/moscas.png");

        // Static Sprites
        ImageManager.loadImage("casa_moli", "./img/static_sprites/casa_moli.png");
        ImageManager.loadImage("terraza_caserio", "./img/static_sprites/terraza_caserio.png");

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
