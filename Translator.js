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
    WorkInProgress: {
        en: "WORK IN PROGRESS",
        es: "OBRA EN DESARROLLO",
        gl: "OBRA EN DESENVOLVEMENTO",
        la: "WORK IN PROGRESS",
    },
    PressAnyKey: {
        en: "PRESS ANY KEY",
        es: "PRESIONE CUALQUIER TECLA",
        gl: "PREMA CALQUERA TECLA",
        la: "PREMET ILLE CLAVEM",
    },
    PLAY: {
        en: "PLAY",
        es: "JUGAR",
        gl: "XOGAR",
        la: "LUDERE",
    },
    START: {
        en: "START",
        es: "INICIAR",
        gl: "INICIAR",
        la: "INITIARE",
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
        en: "Be quick",
        es: "Sé rápido",
        gl: "Sé rápido",
        la: "TODO",
    },
    help1: {
        en: "Avoid any harm",
        es: "Esquiva los ataques",
        gl: "TODO",
        la: "TODO",
    },
    help2: {
        en: "Get what you want",
        es: "Consigue lo que quieres",
        gl: "Consegue o que queres",
        la: "TODO",
    },
    about0: {
        en: "Made by Miguel Queiruga Portela",
        es: "Hecho por Miguel Queiruga Portela",
        gl: "Feito por Miguel Queiruga Portela",
        la: "Fecit per Miguel Queiruga Portela",
    },
    about1: {
        en: "All rights reserved",
        es: "Todos los derechos reservados",
        gl: "Todos os dereitos reservados",
        la: "Omnia jura reservata",
    },
    about2: {
        en: "MMXXIII Marín, SPAIN",
        es: "MMXXIII Marín, ESPAÑA",
        gl: "MMXXIII Marín, ESPAÑA",
        la: "MMXXIII Marín, HISPANIA",
    },
    shoot: {
        en: "shoot",
        es: "disparar",
        gl: "TODO",
        la: "TODO",
    },
    jump: {
        en: "jump",
        es: "saltar",
        gl: "TODO",
        la: "TODO",
    },
    luck: {
        en: "luck",
        es: "suerte",
        gl: "TODO",
        la: "TODO",
    },
    PAUSE: {
        en: "PAUSE",
        es: "PAUSA",
        gl: "PAUSA",
        la: "PAUSA",
    },
    GAMEOVER: {
        en: "GAME OVER",
        es: "FIN DEL JUEGO",
        gl: "XOGO REMATADO",
        la: "FINIS LUDUM",
    },
    gameOver0: {
        en: (score) => {return `You scored ${score} point${score === "I" ? "" : "s"}`},
        es: (score) => {return `Has conseguido ${score} punto${score === "I" ? "" : "s"}`},
        gl: (score) => {return `Marcaches ${score} punto${score === "I" ? "" : "s"}`},
        la: (score) => {return `Vos laceratum ${score} punct${score === "I" ? "um" : "a"}`},
    },
    RESUME: {
        en: "RESUME",
        es: "REANUDAR",
        gl: "RETOMAR",
        la: "RESUMO",
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