class Canvas {
    constructor(containerId, options) {
        this.canvas = document.createElement('canvas');
        this.container = document.getElementById(containerId);
        this.options = options || {};
        this.canvas.width = this.options.width || 640;
        this.canvas.height = this.options.height || 360;
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.initGameBar();
        this.initView();
        this.initSprites();
    }

    initGameBar() {
        this.gbarLife = this.loadImage('assets/tile/gbar_life.png');
        this.gbarRing = this.loadImage('assets/tile/gbar_ring.png');

        this.gbarCanvas = document.createElement('canvas');
        this.canvas.insertAdjacentElement('afterend', this.gbarCanvas);
        this.gbarCtx = this.gbarCanvas.getContext('2d');
        this.gbarCanvas.width = 630;
        this.gbarCanvas.height = 40;
        this.gbarCanvas.classList.add('gbar');
    }

    initView() {
        this.view = {
            x: 0,
            y: 0,
            width: this.canvas.width,
            height: this.canvas.height
        };
    }

    initSprites() {
        this.sprites = {
            ball: new Sprite(99, 1),
            bigball: new Sprite(1, 1, 54, 54),
            throne: new Sprite(309, 1, 80, 80),
            B: new Sprite(85, 165),
            T: new Sprite(891, 1),
            Y: new Sprite(1, 165),
            P: new Sprite(559, 1),
            O: new Sprite(601, 1),
            S: new Sprite(517, 1),
            D: new Sprite(225, 1),
            '%': new Sprite(267, 1),
            C: new Sprite(141, 1),
            A: new Sprite(183, 1),
            L: new Sprite(391, 1),
            pop: new Sprite(58, 1),
            Z: new Sprite(127, 165),
            V: new Sprite(169, 165),
            X: new Sprite(211, 165),
            N: new Sprite(253, 165),
            I: new Sprite(43, 165),
            G: new Sprite(1, 83, 80, 80),
            '=': new Sprite(802, 83, 80, 80),
            R: new Sprite(849, 1, 40, 80),
            E: new Sprite(767, 1, 80, 40),
            Q: new Sprite(725, 1, 40, 80),
            W: new Sprite(643, 1, 80, 40),
            '0': new Sprite(295, 165),
            '6': new Sprite(475, 1),
            '7': new Sprite(433, 1),
        };
    }

    loadImage(src) {
        const image = new Image();
        image.src = src;
        return image;
    }

    setScroll(dx, dy) {
        this.view.x = dx;
        this.view.y = dy;
    }

    drawTile(tile, i, j) {
        let x = i * Tile.size;
        let y = j * Tile.size;

        if (this.sprites[tile]) {
            this.drawSprite(x, y, tile);
            return;
        }

        this.ctx.fillStyle = '#51DAFE';

        if (this.isNonDrawnTile(tile)) {
            return;
        } else {
            this.ctx.fillRect(x - this.view.x, y - this.view.y, Tile.size, Tile.size);
        }
    }

    isNonDrawnTile(tile) {
        return tile === '-' || tile === '+' || tile === '#' || tile === '*' || tile === '$';
    }

    drawSprite(x, y, sprite) {
        this.sprites[sprite].draw(this.ctx, x - this.view.x, y - this.view.y);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
