import Game from "./Game";

class Wall {
  x: number;
  y: number;
  game: Game;

  constructor(x: number, y: number, game: Game) {
    this.x = x;
    this.y = y;
    this.game = game;
  }

  draw = () => {
    const canvas = this.game.home.canvas;
    const ctx = this.game.home.ctx;

    ctx.fillStyle = "#454545";
    ctx.fillRect(this.x, this.y, 30, canvas.height);
  };

  update = () => {
    this.draw();
  };
}

export default Wall;
