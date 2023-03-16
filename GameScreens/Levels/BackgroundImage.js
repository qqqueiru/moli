class BackgroundImageTile {
    #pos;  // Center Position
    #leftTopCornerPos;  // Just for precision when drawing. Background tiles must be well aligned.
    #img;  // Image class
    distanceToCamera;  // Distance from Image Center to Camera Position
    constructor(imgId) {
        this.#img = ImageManager.getImage(imgId);
    }

    setPosByLeftTopCornerPos(leftTopCornerPos) {
        this.#leftTopCornerPos = leftTopCornerPos;
        this.#pos = leftTopCornerPos.addConst(new Point(this.#img.width / 2, this.#img.height / 2));
    }

    getWidth() {
        return this.#img.width;
    }

    getHeight() {
        return this.#img.height;
    }

    updateDistanceToCamera(cameraPos) {
        this.distanceToCamera = this.#pos.distanceFromPoint(cameraPos);
    }

    draw(ctx, cameraPos) {
        const oldWay = false;
        if (oldWay) {
            ctx.drawImage(
                this.#img,
                -GameScreen.width / 2 + cameraPos.x,
                -GameScreen.height / 2 + cameraPos.y,
                GameScreen.width,
                GameScreen.height,
                0,
                0,
                GameScreen.width,
                GameScreen.height
            );
            return;
        }

        const dx = this.#leftTopCornerPos.x - cameraPos.x + GameScreen.width / 2;
        const dy = this.#leftTopCornerPos.y - cameraPos.y + GameScreen.height / 2;
        ctx.drawImage(
            this.#img,
            dx,
            dy,
        );
    }
}

class BackgroundImage {
    #runningX = 0;
    #runningY = 0;
    #bgImgTiles = [];
    constructor() {

    }

    addRow(imgIds) {
        let rowHeight = -1;
        this.#runningX = 0;
        for (const imgId of imgIds) {
            const bgImgTile = new BackgroundImageTile(imgId);
            const w = bgImgTile.getWidth();
            const h = bgImgTile.getHeight();
            if (rowHeight === -1) {
                rowHeight = h;
            }
            if (rowHeight !== h) {
                alert(`FOUND DIFFERENT HEIGHT ${h} FOR ROW IN BACKGROUND TILE ${imgId}`);
            }
            const leftTopCornerPos = new Point(this.#runningX, this.#runningY);
            bgImgTile.setPosByLeftTopCornerPos(leftTopCornerPos);
            this.#bgImgTiles.push(bgImgTile);
            this.#runningX += w;
        }
        this.#runningY += rowHeight;
    }

    getTotalWidth() {
        return this.#runningX;
    }

    getTotalHeight() {
        return this.#runningY;
    }

    draw(ctx, cameraPos) {
        // // TODO check if cameraPos needs its coordinates to be rounded
        // const cameraPosRounded = cameraPos.clone();
        // cameraPosRounded.x = Math.round(cameraPosRounded.x);
        // cameraPosRounded.y = Math.round(cameraPosRounded.y);
        for (const bgImgTile of this.#bgImgTiles) {
            bgImgTile.updateDistanceToCamera(cameraPos);
        }

        this.#bgImgTiles.sort((bgImgTile1, bgImgTile2) => {
            return bgImgTile1.distanceToCamera > bgImgTile2.distanceToCamera ? 1 : -1
        });  // First bgImgTiles in the array will be the nearest to the camera

        let bgImgTilesToDraw = 4;
        if (this.#bgImgTiles.length < 4) {
            bgImgTilesToDraw = this.#bgImgTiles.length;
        }
        for (let i = 0; i < bgImgTilesToDraw; ++i) {
            this.#bgImgTiles[i].draw(ctx, cameraPos);
        }
    }
}