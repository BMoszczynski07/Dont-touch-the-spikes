import Game from "./Game";
import spike from "./img/spike.png";

class Spike {
  x: number;
  y: number;
  game: Game;
  img: HTMLImageElement = new Image();
  width: number;
  height: number;
  type: "normal" | "flipped";

  constructor(
    x: number,
    y: number,
    game: Game,
    width: number,
    height: number,
    type: "normal" | "flipped" = "normal"
  ) {
    this.x = x;
    this.y = y;
    this.game = game;
    this.img.src = spike;
    this.width = width;
    this.height = height;
    this.type = type;
  }

  detectCollision = (
    objX: number,
    objY: number,
    objWidth: number,
    objHeight: number
  ) => {
    if (this.type === "normal") {
      return (
        objX < this.x + this.width &&
        objX + objWidth > this.x &&
        objY < this.y + this.height &&
        objY + objHeight > this.y
      );
    }

    return (
      objX < this.x + this.width &&
      objX + objWidth > this.x &&
      objY < this.y + this.height &&
      objY + objHeight > this.y
    );
  };

  draw = () => {
    const ctx = this.game.home.ctx;

    ctx.save(); // Save the context state

    if (this.type === "flipped") {
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.scale(-1, 1);
      ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
    }

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    ctx.restore(); // Restore the context state
  };

  update = () => {
    this.draw();
  };
}

export default Spike;
