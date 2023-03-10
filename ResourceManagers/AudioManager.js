class AudioManager {
    constructor() {
    }
    static audios = new Map();
    static loadAudio(id, src, clones) {
        if (clones < 1) {
            return;
        }
        const audios = [];
        for (let i = 0; i < clones; ++i)  // Se podría optimizar, cada clon está haciendo una solicitud GET
        {
            const audio = new Audio();
            audio.src = src;
            audios.push(audio);
        }
        AudioManager.audios.set(id, {currentClone: 0, audios: audios});
    }
    static audiosLoaded() {
        const audiosCount = AudioManager.audios.size;
        if (audiosCount == 0) {
            return 1;
        }
        let audiosLoaded = 0;
        for (const [id, clonesObj] of AudioManager.audios) {
            let audioLoaded = true;
            for (const audio of clonesObj.audios) {
                audioLoaded *= audio.readyState == 4;  // HAVE_ENOUGH_DATA
            }
            audiosLoaded += audioLoaded;
        }
        return audiosLoaded / audiosCount;  // Número entre 0 y 1 que representa el progreso de carga
    }
    static getAudio(id) {
        return AudioManager.audios.get(id);
    }
    static playSoundEffect(soundId) {
        if (!AudioManager.audios.has(soundId)) {
            return;
        }
        // Como JavaScript no permite una forma fácil de reproducir el mismo sonido
        // varias veces al mismo tiempo se recurre a clones del elemento Audio
        const clonesObj = AudioManager.audios.get(soundId);
        const audioToPlay = clonesObj.audios[clonesObj.currentClone];
        clonesObj.currentClone++;
        if (clonesObj.currentClone >= clonesObj.audios.length) {
            clonesObj.currentClone = 0;
        }
        audioToPlay.pause();
        audioToPlay.currentTime = 0;
        audioToPlay.play();
    }
    static playLoop(soundId) {
        if (!AudioManager.audios.has(soundId)) {
            return;
        }
        const clonesObj = AudioManager.audios.get(soundId);
        const audioToPlay = clonesObj.audios[clonesObj.currentClone];
        audioToPlay.pause();
        audioToPlay.loop = true;
        audioToPlay.play();
    }
    static stopLoop(soundId) {
        if (!AudioManager.audios.has(soundId)) {
            return;
        }
        const clonesObj = AudioManager.audios.get(soundId);
        const audioToPlay = clonesObj.audios[clonesObj.currentClone];
        audioToPlay.pause();
        audioToPlay.currentTime = 0;
        audioToPlay.loop = true;
    }
    static startSilenceRoutine() {
        setInterval(() => {
            const silenceAudio = AudioManager.audios.get("silence").audios[0];
            const promise = silenceAudio.play();
            promise.then(_ => {
                // Se escucha silencio para mantener el audio activo siempre
            }).catch(error => {
                // No se atiende error
            });
        }, 2000);
    }
    static loadAudios() {
        AudioManager.loadAudio("selection_up", "./audio/selection_up.ogg", 10);
        AudioManager.loadAudio("selection_down", "./audio/selection_down.ogg", 10);
        AudioManager.loadAudio("enter", "./audio/enter.ogg", 10);
        AudioManager.loadAudio("back", "./audio/back.ogg", 10);
        AudioManager.loadAudio("reward", "./audio/reward.ogg", 10);
        AudioManager.loadAudio("menu", "./audio/menu.ogg", 1);
        AudioManager.loadAudio("silence", "./audio/silence.ogg", 1);

        AudioManager.loadAudio("level_1", "./audio/level_1.ogg", 1);
    }

}