const availableLangs = ["en", "es", "gl", "la"];
const defaultLang = "en";
let lang = defaultLang;
const TR = {
    MOLI: {
        en: "MOLI",
        es: "MOLI",
        gl: "MOLI",
        la: "MOLI",
    },
    PressAnyKey: {
        en: "PRESS ANY KEY",
        es: "PRESIONE CUALQUIER TECLA",
        gl: "PREMA CALQUERA TECLA",
        la: "PREMET ILLE CLAVEM"
    },
    START: {
        en: "START",
        es: "JUGAR",
        gl: "XOGAR",
        la: "LUDERE",
    },
    HELP: {
        en: "HELP",
        es: "AYUDA",
        gl: "AXUDA",
        la: "AUXILIUM",
    },
    ABOUT: {
        en: "ABOUT",
        es: "ACERCA DE",
        gl: "SOBRE",
        la: "CREDIT",
    },
    BACK: {
        en: "BACK",
        es: "ATRÁS",
        gl: "ATRÁS",
        la: "RETRO",
    },
    help0: {
        en: "You command the mule to catch every item that the villain drops",
        es: "Debes dirigir a la mula para que recoja todos los objetos",
        gl: "Debes dirixir a mula para recoller todos os obxetos",
        la: "Mulum dirigere ad omnia colligenda",
    },
    help1: {
        en: "The mule is very stubborn so you better be precise about your commands",
        es: "La mula es muy terca y, por tanto, debes precisar tus comandos",
        gl: "A mula é moi teimosa e, polo tanto, debes precisar os teus comandos",
        la: "Mulus valde contumax est, ut de mandatis tuis securus esse velis",
    },
    help2: {
        en: "The game ends when you fail to collect one item",
        es: "El juego termina cuando no consigues recoger un objeto",
        gl: "O xogo remata cando non colles un elemento",
        la: "Ludum desinit cum non colliges",
    },
    about0: {
        en: "Game made by Miguel Queiruga Portela",
        es: "Juego hecho por Miguel Queiruga Portela",
        gl: "Xogo feito por Miguel Queiruga Portela",
        la: "Ludus fecit per Miguel Queiruga Portela",
    },
    about1: {
        en: "All rights reserved",
        es: "Todos los derechos reservados",
        gl: "Todos os dereitos reservados",
        la: "Omnia jura reservata",
    },
    about2: {
        en: "MMXXII Marín, SPAIN",
        es: "MMXXII Marín, ESPAÑA",
        gl: "MMXXII Marín, ESPAÑA",
        la: "MMXXII Marín, HISPANIA",
    },
    GAMEOVER: {
        en: "GAME OVER",
        es: "FIN DEL JUEGO",
        gl: "XOGO REMATADO",
        la: "FINIS LUDUM",
    },
    gameOver0: {
        en: (score) => {return `You scored ${score} point${score == "I" ? "" : "s"}`},
        es: (score) => {return `Has conseguido ${score} punto${score == "I" ? "" : "s"}`},
        gl: (score) => {return `Marcaches ${score} punto${score == "I" ? "" : "s"}`},
        la: (score) => {return `Vos laceratum ${score} punct${score == "I" ? "um" : "a"}`},
    },
    RESTART: {
        en: "RESTART",
        es: "REINICIAR",
        gl: "REINICIAR",
        la: "LUDERE",
    },
    SHARE: {
        en: "SHARE",
        es: "COMPARTIR",
        gl: "COMPARTIR",
        la: "AD PARTICIPES",
    },
};