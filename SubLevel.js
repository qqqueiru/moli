class SubLevel {
    #platforms;
    #topSegments;
    #leftSegments;
    #rightSegments;
    #player;
    #cameraPos;
    #lastIntersection;  // TODO depurando...
    constructor() {
        this.#platforms = new Map();  // Characters can walk over these segments
        this.#topSegments = [];  // Characters can't go above these segments
        this.#leftSegments = [];  // blablabla
        this.#rightSegments = [];
        this.#player = new Character();  // TODO planteamiento
        this.#cameraPos = new Point(0, 0);

        // Debugging...
        let i = 0;
        this.#platforms.set(i, new Platform(i, new Segment({x: 200, y: 900}, {x: 1700, y: 700})));
        ++i;
        this.#platforms.set(i, new Platform(i, new Segment({x: 200, y: 500}, {x: 1700, y: 600})));
        ++i;

        this.#player.setPlatforms(this.#platforms);
        this.#player.updateAvailablePlatforms();
    }
    #reviseCharacterPosWithPlatforms(character) {
        let intersection = null;
        let lastPlatformTouchedId = null;
        const characterSegment = character.getVSegmentAbs();
        const availablePlatformIds = character.getAvailablePlatformIds();
        for (const availablePlatformId of availablePlatformIds) {
            const platform = this.#platforms.get(availablePlatformId);
            const bottomSegment = platform.getSegment();
            if (!Segment.doIntersect(characterSegment, bottomSegment)) {
                continue;
            }
            intersection = Segment.pointIntersection(characterSegment, bottomSegment);
            lastPlatformTouchedId = availablePlatformId;
            if (intersection === null) {continue;}
            break;
        }
        if (intersection === null) {
            // Hay que ver si interseca la interpolación
            const lerpSegment = character.getBotTipLerpSegment();  // Quizás la interpolación sea más segura haciéndola entre centros directamente
            for (const availablePlatformId of availablePlatformIds) {
                const platform = this.#platforms.get(availablePlatformId);
                const bottomSegment = platform.getSegment();
                if (!Segment.doIntersect(lerpSegment, bottomSegment)) {
                    continue;
                }
                intersection = Segment.pointIntersection(lerpSegment, bottomSegment);
                lastPlatformTouchedId = availablePlatformId;
                alert("OJO interseccion de interpolacion con bottip!");
                break;
            }
        }
        if (intersection !== null) {
            this.#lastIntersection = intersection;
            if (!character.isMovingDown()) { return; }

            const delta = intersection.substractConst(characterSegment.p2);
            character.moveRel(delta);
            character.setLastPlatformTouchedId(lastPlatformTouchedId);
            this.#player.setVy(0);
        }
    }

    update() {
        this.#player.setVx(0);
        // this.#player.setVy(0);
        if (inputs.get("ArrowLeft")?.isPressed()) {
            this.#player.setVx(-10);
        }
        if (inputs.get("ArrowRight")?.isPressed()) {
            this.#player.setVx(10);
        }
        if (inputs.get("ArrowUp")?.isPressed()) {
            this.#player.setVy(-15);
        }
        if (inputs.get("ArrowDown")?.isPressed()) {
            this.#player.setVy(10);
        }
        this.#player.update();
        this.#reviseCharacterPosWithPlatforms(this.#player);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.clearRect(0, 0, GameScreen.width, GameScreen.height);
        ctx.rect(0, 0, GameScreen.width, GameScreen.height);
        ctx.fillStyle = "grey";
        ctx.fill();

        this.#player.draw(ctx, this.#cameraPos);

        // Dibujado de los segmentos del suelo
        ctx.beginPath();
        for (const [id, platform] of this.#platforms) {
            const segment = platform.getSegment();
            ctx.moveTo(segment.p1.x, segment.p1.y);
            ctx.lineTo(segment.p2.x, segment.p2.y);
        }
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.stroke();

        // Dibujando el último punto de intersección
        if (this.#lastIntersection) {
            ctx.beginPath();
            ctx.rect(this.#lastIntersection.x-5, this.#lastIntersection.y-5, 10, 10);
            ctx.fillStyle = "green";
            ctx.fill();
        }

    }
}