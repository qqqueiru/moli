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
    #tileVertices = new Map();  // Map( x -> Map(y -> Array[TilesToDraw]) )
    constructor() {

    }

    #addTileVertex(vertex, bgImgTile) {
        // JavaScript Set doesn't allow customizable comparison. Using Map of Maps instead.
        if (!this.#tileVertices.has(vertex.x)) {
            const yMap = new Map();
            yMap.set(vertex.y, [bgImgTile]);
            this.#tileVertices.set(vertex.x, yMap);
        } else if (!this.#tileVertices.get(vertex.x).has(vertex.y)) {
                this.#tileVertices.get(vertex.x).set(vertex.y, [bgImgTile]);
        } else {
            this.#tileVertices.get(vertex.x).get(vertex.y).push(bgImgTile);
        }
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
            const rightTopCornerPos = new Point(this.#runningX + w, this.#runningY);
            const leftBotCornerPos = new Point(this.#runningX, this.#runningY + h);
            const rightBotCornerPos = new Point(this.#runningX + w, this.#runningY + h);
            bgImgTile.setPosByLeftTopCornerPos(leftTopCornerPos);
            this.#bgImgTiles.push(bgImgTile);
            this.#runningX += w;

            // Tile Vertices
            this.#addTileVertex(leftTopCornerPos, bgImgTile);
            this.#addTileVertex(rightTopCornerPos, bgImgTile);
            this.#addTileVertex(leftBotCornerPos, bgImgTile);
            this.#addTileVertex(rightBotCornerPos, bgImgTile);            
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
        
        // for (const bgImgTile of this.#bgImgTiles) {
        //     bgImgTile.updateDistanceToCamera(cameraPos);
        // }

        // this.#bgImgTiles.sort((bgImgTile1, bgImgTile2) => {
        //     return bgImgTile1.distanceToCamera > bgImgTile2.distanceToCamera ? 1 : -1
        // });  // First bgImgTiles in the array will be the nearest to the camera

        // let bgImgTilesToDraw = 4;
        // if (this.#bgImgTiles.length < 4) {
        //     bgImgTilesToDraw = this.#bgImgTiles.length;
        // }
        // for (let i = 0; i < bgImgTilesToDraw; ++i) {
        //     this.#bgImgTiles[i].draw(ctx, cameraPos);
        // }

        let minVertexX = null;
        let minVertexY = null;
        let minDistanceSquared = Number.MAX_VALUE;
        for (const [vertexX, yMap] of this.#tileVertices) {
            for (const [vertexY, bgImgTiles] of yMap) {
                const distanceSquared = 
                    (vertexX - cameraPos.x) * (vertexX - cameraPos.x) + 
                    (vertexY - cameraPos.y) * (vertexY - cameraPos.y);
                if (distanceSquared < minDistanceSquared) {
                    minVertexX = vertexX;
                    minVertexY = vertexY;
                    minDistanceSquared = distanceSquared;
                }
            }
        }
        if (minVertexX !== null && minVertexY !== null) {
            for (const bgImgTile of this.#tileVertices.get(minVertexX).get(minVertexY)) {
                bgImgTile.draw(ctx, cameraPos);
            }
        }
    }
}