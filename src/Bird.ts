import Game from "./Game";

class Bird {
  x: number;
  y: number;
  dx: number;
  dy: number;
  width: number;
  height: number;
  game: Game;
  img: HTMLImageElement = new Image();
  flipped: boolean = false; // Flaga, czy obrazek jest odbity

  constructor(
    x: number,
    y: number,
    dx: number,
    dy: number,
    width: number,
    height: number,
    game: Game
  ) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.game = game;
    this.width = width;
    this.height = height;
    this.img.src = "./src/img/bird-default.png";
  }

  draw = () => {
    const ctx = this.game.home.ctx;

    ctx.save(); // Zapisz aktualny stan kontekstu

    if (this.flipped) {
      console.log("flipping");
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2); // Przenieś środek kontekstu na środek obrazka
      ctx.scale(-1, 1); // Odbij obrazek w poziomie
      ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2)); // Przesuń kontekst z powrotem
    }

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    ctx.restore(); // Przywróć stan kontekstu sprzed transformacji
  };

  flipHorizontally = () => {
    console.log("this.flipHorizontally");

    this.dx = -this.dx;
    this.flipped = !this.flipped; // Zmień stan flagi odbicia
  };

  jump = () => {
    this.dy = -30;
  };

  fly = () => {
    this.dy += 2;
    this.x += this.dx;
    if (
      this.y + this.dy >= 0 &&
      this.y + this.dy <= this.game.home.canvas.height - this.height
    )
      this.y += this.dy;
    else if (this.y + this.dy < 0) {
      this.y = 0;
    } else if (this.y + this.dy > this.game.home.canvas.height - this.height) {
      // game over
      this.y = this.game.home.canvas.height - this.height;
    }

    this.draw();
  };

  update = () => {
    this.draw();
  };
}

export default Bird;
