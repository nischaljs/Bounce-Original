class Entity {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
    }

    draw() {}

    update() {}

    kill() {
        return false;
    }

    getCorners() {
        const offset = 1;
        const xs = [this.x + offset, this.x + this.width - offset];
        const ys = [this.y, this.y + this.height - offset];

        const corners = [];
        for (const yCoord of ys) {
            for (const xCoord of xs) {
                corners.push([xCoord, yCoord]);
            }
        }

        return corners;
    }

    getTouchedTiles() {
        const touchedTiles = [];
        const corners = this.getCorners();

        for (const [x, y] of corners) {
            touchedTiles.push({
                x,
                y,
                tile: this.game.level.getTile(x, y)
            });
        }

        return touchedTiles;
    }

    clipped(direction) {
        const tiles = this.getTouchedTiles();

        for (const { tile } of tiles) {
            if (tile === 'P' || tile === 'O') {
                this.game.isBig = true;
            } else if (tile === 'D' || tile === '%') {
                this.game.isBig = false;
            } else if (tile === 'I') {
                this.game.canBounce = true;
            }
        }

        const mapping = {
            up: [tiles[0].tile, tiles[1].tile],
            down: [tiles[2].tile, tiles[3].tile],
            left: [tiles[0].tile, tiles[2].tile],
            right: [tiles[1].tile, tiles[3].tile]
        };

        if (this.game.isBig && this.game.floatUp && (mapping.up[0] === 'B' || mapping.up[1] === 'B')) {
            this.game.floatUp = false;
        } else if (!this.game.floatUp && (mapping.up[0] !== 'B' && mapping.up[1] !== 'B')) {
            this.game.floatUp = true;
        }

        return mapping[direction].map(Tile.isSolid).reduce((acc, cur) => acc || cur);
    }

    static pointInRect(x, y, rect) {
        return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
    }

    pointCollision(x, y) {
        return Entity.pointInRect(x, y, this);
    }

    hasCollided(entity) {
        return (
            this.x < entity.x + entity.width &&
            this.x + this.width > entity.x &&
            this.y < entity.y + entity.height &&
            this.y + this.height > entity.y
        );
    }
}
