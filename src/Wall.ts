import Game from "./Game";

class Wall {
  x: number;
  y: number;
  type: "left" | "right";
  game: Game;
  wallWidth: number = 30;

  constructor(x: number, y: number, type: "left" | "right", game: Game) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.game = game;
  }

  detectCollision = (objX: number, width: number): boolean => {
    switch (this.type) {
      case "left":
        return objX <= this.x + this.wallWidth;
      case "right":
        return objX + width >= this.x;
    }
  };

  draw = () => {
    const canvas = this.game.home.canvas;
    const ctx = this.game.home.ctx;

    ctx.fillStyle = "#454545";
    ctx.fillRect(this.x, this.y, this.wallWidth, canvas.height);
  };

  update = () => {
    this.draw();
  };
}

export default Wall;
