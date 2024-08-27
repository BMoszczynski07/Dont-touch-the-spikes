import Game from "./Game";
import Spike from "./Spike";
import beep from "./audio/beep.mp3";

class Bird {
  x: number;
  y: number;
  dx: number;
  dy: number;
  width: number;
  height: number;
  game: Game;
  img: HTMLImageElement = new Image();
  flipped: boolean = false;

  constructor(
    x: number,
    y: number,
    dx: number,
    dy: number,
    width: number,
    height: number,
    game: Game,
    imgSrc: string
  ) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.game = game;
    this.width = width;
    this.height = height;
    this.img.src = imgSrc;
  }

  draw = () => {
    const ctx = this.game.home.ctx;

    ctx.save(); // Zapisz aktualny stan kontekstu

    if (this.flipped) {
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2); // Przenieś środek kontekstu na środek obrazka
      ctx.scale(-1, 1); // Odbij obrazek w poziomie
      ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2)); // Przesuń kontekst z powrotem
    }

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    ctx.restore(); // Przywróć stan kontekstu sprzed transformacji
  };

  flipHorizontally = () => {
    if (!this.game.home.isMuted) {
      const beepAudio = new Audio();
      beepAudio.src = beep;
      beepAudio.volume = 0.15;

      beepAudio.play();
    }

    this.game.level++;

    const levelElement = document.querySelector(".game__score") as HTMLElement;
    levelElement.textContent = `${
      this.game.level >= 10 ? this.game.level : `0${this.game.level}`
    }`;

    levelElement.style.fontSize = `${
      this.game.level.toString().length > 2
        ? 42 / this.game.level.toString().length + 20
        : 42
    }px`;

    this.dx = -this.dx;
    this.flipped = !this.flipped; // Zmień stan flagi odbicia

    this.game.spikes = [];

    let spike;

    for (let i = 0; i < 10; i++) {
      const isSpikeAppearing =
        Math.random() < this.game.spikeAppearingBaseChance;

      this.game.spikeAppearingBaseChance += 0.001;

      if (isSpikeAppearing) {
        if (this.flipped) {
          spike = new Spike(0, 160 * i, this.game, 80, 160);
        } else {
          spike = new Spike(
            this.game.home.canvas.width - 80,
            160 * i,
            this.game,
            80,
            160,
            "flipped"
          );
        }

        this.game.spikes.push(spike);
      }
    }

    if (this.game.spikes.length === 0) {
      console.log("length - 0");

      const spikePossiblePositions = [];

      for (let i = 0; i < 10; i++) {
        spikePossiblePositions.push(160 * i);
      }

      const randomSpikePositionIndex = Math.floor(
        Math.random() * (spikePossiblePositions.length - 1)
      );

      const randomSpikePosition =
        spikePossiblePositions[randomSpikePositionIndex];

      if (this.flipped) {
        spike = new Spike(0, randomSpikePosition, this.game, 80, 160);
      } else {
        spike = new Spike(
          this.game.home.canvas.width - 80,
          randomSpikePosition,
          this.game,
          80,
          160,
          "flipped"
        );
      }
      this.game.spikes.push(spike);
    }
  };

  jump = () => {
    this.dy = -30;
  };

  fall = () => {
    this.fly();
  };

  fly = () => {
    if (this.game.home.isGameStarted === true) {
      if (this.dx > 0) this.dx += 0.002;
      else this.dx -= 0.002;
    }

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
