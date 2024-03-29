class ImageManager {
    constructor() {
    }
    static imgs = new Map();
    static loadImage(id, src) {
        const img = new Image();
        img.decoded = false;
        img.src = src;
        ImageManager.imgs.set(id, img);
        const imgDecodeTry = () => {
            img.decode().then(() => {
                img.decoded = true;
            }).catch((error) => {
                // alert(`Could not load and decode img with src ${img.src}, ${error}`);
                // console.warn(error);
                console.warn("Decoding retried for", src);
                setTimeout(imgDecodeTry, 100);
                // imgDecodeTry();
            });
        }
        imgDecodeTry();  // Chrome made me do this
    }
    static imgsLoaded() {
        const imgsCount = ImageManager.imgs.size;
        if (imgsCount === 0) {
            return 1;
        }
        let imgsLoaded = 0;
        for (const [id, img] of ImageManager.imgs) {
            imgsLoaded += img.complete && img.decoded;
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
        ImageManager.loadImage("player_up_right", "./img/player/player_up_right.png");
        ImageManager.loadImage("player_up_left", "./img/player/player_up_left.png");
        ImageManager.loadImage("player_crouch_right", "./img/player/player_crouch_right.png");
        ImageManager.loadImage("player_crouch_left", "./img/player/player_crouch_left.png");
        ImageManager.loadImage("player_dead_right", "./img/player/player_dead_right.png");
        ImageManager.loadImage("player_dead_left", "./img/player/player_dead_left.png");
        ImageManager.loadImage("player_dying_right", "./img/player/player_dying_right.png");
        ImageManager.loadImage("player_dying_left", "./img/player/player_dying_left.png");
        ImageManager.loadImage("player_dead_crouch_right", "./img/player/player_dead_crouch_right.png");
        ImageManager.loadImage("player_dead_crouch_left", "./img/player/player_dead_crouch_left.png");
        ImageManager.loadImage("player_dying_crouch_right", "./img/player/player_dying_crouch_right.png");
        ImageManager.loadImage("player_dying_crouch_left", "./img/player/player_dying_crouch_left.png");
        ImageManager.loadImage("player_saluting_left", "./img/player/player_saluting_left.png");
        ImageManager.loadImage("player_saluting_right", "./img/player/player_saluting_right.png");
        ImageManager.loadImage("player_resurrects", "./img/player/player_resurrects.png");

        ImageManager.loadImage("npc_blank", "./img/npcs/guardiamarina/npc_blank.png");
        ImageManager.loadImage("npc_right", "./img/npcs/guardiamarina/npc_right.png");
        ImageManager.loadImage("npc_left", "./img/npcs/guardiamarina/npc_left.png");
        ImageManager.loadImage("npc_up", "./img/npcs/guardiamarina/npc_up.png");
        ImageManager.loadImage("npc_crouch_right", "./img/npcs/guardiamarina/npc_crouch_right.png");
        ImageManager.loadImage("npc_crouch_left", "./img/npcs/guardiamarina/npc_crouch_left.png");
        ImageManager.loadImage("npc_dead_right", "./img/npcs/guardiamarina/npc_dead_right.png");
        ImageManager.loadImage("npc_dead_left", "./img/npcs/guardiamarina/npc_dead_left.png");
        ImageManager.loadImage("npc_dying_right", "./img/npcs/guardiamarina/npc_dying_right.png");
        ImageManager.loadImage("npc_dying_left", "./img/npcs/guardiamarina/npc_dying_left.png");
        ImageManager.loadImage("npc_dead_crouch_right", "./img/npcs/guardiamarina/npc_dead_crouch_right.png");
        ImageManager.loadImage("npc_dead_crouch_left", "./img/npcs/guardiamarina/npc_dead_crouch_left.png");
        ImageManager.loadImage("npc_dying_crouch_right", "./img/npcs/guardiamarina/npc_dying_crouch_right.png");
        ImageManager.loadImage("npc_dying_crouch_left", "./img/npcs/guardiamarina/npc_dying_crouch_left.png");

        ImageManager.loadImage("final_boss_blank", "./img/npcs/final_boss/npc_blank.png");
        ImageManager.loadImage("final_boss_right", "./img/npcs/final_boss/npc_right.png");
        ImageManager.loadImage("final_boss_left", "./img/npcs/final_boss/npc_left.png");
        ImageManager.loadImage("final_boss_up", "./img/npcs/final_boss/npc_up.png");
        ImageManager.loadImage("final_boss_crouch_right", "./img/npcs/final_boss/npc_crouch_right.png");
        ImageManager.loadImage("final_boss_crouch_left", "./img/npcs/final_boss/npc_crouch_left.png");
        ImageManager.loadImage("final_boss_dead_right", "./img/npcs/final_boss/npc_dead_right.png");
        ImageManager.loadImage("final_boss_dead_left", "./img/npcs/final_boss/npc_dead_left.png");
        ImageManager.loadImage("final_boss_dying_right", "./img/npcs/final_boss/npc_dying_right.png");
        ImageManager.loadImage("final_boss_dying_left", "./img/npcs/final_boss/npc_dying_left.png");
        ImageManager.loadImage("final_boss_dead_crouch_right", "./img/npcs/final_boss/npc_dead_crouch_right.png");
        ImageManager.loadImage("final_boss_dead_crouch_left", "./img/npcs/final_boss/npc_dead_crouch_left.png");
        ImageManager.loadImage("final_boss_dying_crouch_right", "./img/npcs/final_boss/npc_dying_crouch_right.png");
        ImageManager.loadImage("final_boss_dying_crouch_left", "./img/npcs/final_boss/npc_dying_crouch_left.png");

        // Miscellaneous
        ImageManager.loadImage("still_atlantus", "./img/miscellaneous/still_atlantus.png");
        ImageManager.loadImage("white_silhouette_moli", "./img/miscellaneous/white_silhouette_moli.png");
        ImageManager.loadImage("controls", "./img/miscellaneous/controls.png");
        ImageManager.loadImage("controls_compacted", "./img/miscellaneous/controls_compacted.png");

        // Loop Sprites
        ImageManager.loadImage("atlantus", "./img/loop_sprites/atlantus.png");
        ImageManager.loadImage("agua_lavadero", "./img/loop_sprites/agua_lavadero.png");
        ImageManager.loadImage("moscas", "./img/loop_sprites/moscas.png");
        ImageManager.loadImage("eolico", "./img/loop_sprites/eolico.png");

        // Static Sprites
        ImageManager.loadImage("casa_moli", "./img/static_sprites/casa_moli.png");
        ImageManager.loadImage("torre", "./img/static_sprites/torre.png");
        ImageManager.loadImage("terraza_caserio", "./img/static_sprites/terraza_caserio.png");

        // Projectile Sprites
        ImageManager.loadImage("pistol_projectile_horizontal", "./img/projectiles/pistol_projectile_horizontal.png");
        ImageManager.loadImage("pistol_projectile_vertical", "./img/projectiles/pistol_projectile_vertical.png");
        ImageManager.loadImage("slow_pistol_projectile", "./img/projectiles/slow_pistol_projectile.png");

        // Grenade Sprites
        ImageManager.loadImage("grenade_explosion", "./img/grenades/grenade_explosion.png");
        ImageManager.loadImage("d20", "./img/grenades/d20.png");
        ImageManager.loadImage("big_water_bottle", "./img/grenades/big_water_bottle.png");

        // Background Image SubLevel1_1
        // ImageManager.loadImage("sublevel1_1", "./img/background/sublevel1_1.png");
        // ImageManager.loadImage("sublevel1_1_x00y00", "./img/background/sublevel1_1/x00y00.png");
        // ImageManager.loadImage("sublevel1_1_x01y00", "./img/background/sublevel1_1/x01y00.png");
        // ImageManager.loadImage("sublevel1_1_x02y00", "./img/background/sublevel1_1/x02y00.png");
        // ImageManager.loadImage("sublevel1_1_x03y00", "./img/background/sublevel1_1/x03y00.png");
        // ImageManager.loadImage("sublevel1_1_x04y00", "./img/background/sublevel1_1/x04y00.png");
        ImageManager.loadImage("sublevel1_1_x05y00", "./img/background/sublevel1_1/x05y00.png");
        ImageManager.loadImage("sublevel1_1_x06y00", "./img/background/sublevel1_1/x06y00.png");
        ImageManager.loadImage("sublevel1_1_x07y00", "./img/background/sublevel1_1/x07y00.png");
        ImageManager.loadImage("sublevel1_1_x08y00", "./img/background/sublevel1_1/x08y00.png");
        ImageManager.loadImage("sublevel1_1_x00y01", "./img/background/sublevel1_1/x00y01.png");
        ImageManager.loadImage("sublevel1_1_x01y01", "./img/background/sublevel1_1/x01y01.png");
        ImageManager.loadImage("sublevel1_1_x02y01", "./img/background/sublevel1_1/x02y01.png");
        ImageManager.loadImage("sublevel1_1_x03y01", "./img/background/sublevel1_1/x03y01.png");
        ImageManager.loadImage("sublevel1_1_x04y01", "./img/background/sublevel1_1/x04y01.png");
        ImageManager.loadImage("sublevel1_1_x05y01", "./img/background/sublevel1_1/x05y01.png");
        ImageManager.loadImage("sublevel1_1_x06y01", "./img/background/sublevel1_1/x06y01.png");
        ImageManager.loadImage("sublevel1_1_x07y01", "./img/background/sublevel1_1/x07y01.png");
        ImageManager.loadImage("sublevel1_1_x08y01", "./img/background/sublevel1_1/x08y01.png");
        ImageManager.loadImage("sublevel1_1_x00y02", "./img/background/sublevel1_1/x00y02.png");
        ImageManager.loadImage("sublevel1_1_x01y02", "./img/background/sublevel1_1/x01y02.png");
        ImageManager.loadImage("sublevel1_1_x02y02", "./img/background/sublevel1_1/x02y02.png");
        ImageManager.loadImage("sublevel1_1_x03y02", "./img/background/sublevel1_1/x03y02.png");
        ImageManager.loadImage("sublevel1_1_x04y02", "./img/background/sublevel1_1/x04y02.png");
        ImageManager.loadImage("sublevel1_1_x05y02", "./img/background/sublevel1_1/x05y02.png");
        ImageManager.loadImage("sublevel1_1_x06y02", "./img/background/sublevel1_1/x06y02.png");
        // ImageManager.loadImage("sublevel1_1_x07y02", "./img/background/sublevel1_1/x07y02.png");
        // ImageManager.loadImage("sublevel1_1_x08y02", "./img/background/sublevel1_1/x08y02.png");


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
