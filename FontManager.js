class FontManager {
    constructor() {
    }
    static fonts = new Map();
    static loadFont(id, src) {
        const font = new FontFace(id, `url(${src})`);
        FontManager.fonts.set(id, {font, loaded: false});
        font.load().then((loaded_face) => {
            document.fonts.add(loaded_face);
            FontManager.fonts.get(id).loaded = true;
        }).catch((error) => {
            console.error(error);
        });
    }
    static fontsLoaded() {
        const fontsCount = FontManager.fonts.size;
        if (fontsCount == 0) {
            return 1;
        }
        let fontsLoaded = 0;
        for (const [id, font] of FontManager.fonts) {
            fontsLoaded += Boolean(font.loaded);  // TODO comprobar
        }
        return fontsLoaded / fontsCount;  // Número entre 0 y 1 que representa el progreso de carga
    }
    static getFont(id) {
        return FontManager.fonts.get(id);
    }
    static loadFonts() {
        // TODO hacer aquí la carga de todas las fuentes
        // FontManager.loadFont("SigmarOne", "./fonts/SigmarOne.otf");
    }

}