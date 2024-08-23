import Game from "./Game";

class Bird {
  x: number;
  y: number;
  width: number;
  height: number;
  game: Game;
  img: HTMLImageElement = new Image();

  constructor(x: number, y: number, width: number, height: number, game: Game) {
    this.x = x;
    this.y = y;
    this.game = game;
    this.width = width;
    this.height = height;
    this.img.src = "./src/img/bird-default.png";
  }

  draw = () => {
    const ctx = this.game.home.ctx;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };

  update = () => {
    this.draw();
  };
}

export default Bird;
