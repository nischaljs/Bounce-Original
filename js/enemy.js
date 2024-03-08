class Enemy extends Entity {
    constructor(game, x, y, d, dist) {
        super(game, x, y);
        this.width = Tile.size * 2;
        this.height = Tile.size * 2;
        this.sprite = 'throne';
        this.vel = 1;
        this.directionY = 1;
        this.directionX = 1;
        this.sideways = d;
        this.distance = this.sideways ? dist : 4;
        this.orgY = this.y;
        this.orgX = this.x;
        this.destY = this.y + Tile.size * this.distance;
        this.destX = this.x + Tile.size * this.distance;
    }

    moveAxis(current, destination, direction, axis) {
        if (current < destination && direction === 1) {
            current += this.vel;
            if (current === destination) {
                direction = 0;
            }
        } else if (current > this[`org${axis.toUpperCase()}`] && direction === 0) {
            current -= this.vel;
            if (current === this[`org${axis.toUpperCase()}`]) {
                direction = 1;
            }
        }
        return [current, direction];
    }

    move() {
        if (!this.sideways) {
            [this.y, this.directionY] = this.moveAxis(this.y, this.destY, this.directionY, 'y');
        } else {
            [this.x, this.directionX] = this.moveAxis(this.x, this.destX, this.directionX, 'x');
        }
    }

    update() {
        this.move();
        for (const entity of this.game.level.entities) {
            if (entity instanceof Player && this.hasCollided(entity)) {
                entity.kill();
                return;
            }
        }
    }

    draw() {
        this.game.canvas.drawSprite(this.x, this.y, this.sprite);
    }
}
