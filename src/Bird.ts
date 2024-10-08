import Game from "./Game";
import Random from "./Random";
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

    if (this.game.level % 10 === 0) {
      const themes = ["--blue", "--green", "--cyan", "--purple", "--orange"];

      const rand = Math.floor(new Random().getInt(0, themes.length));

      const chosenTheme = themes[rand];

      console.log(chosenTheme);

      const canvasContainer = document.querySelector(
        ".site__canvas-container"
      ) as HTMLElement;

      canvasContainer.classList.forEach((className) => {
        if (className !== "site__canvas-container")
          canvasContainer.classList.remove(className);
      });

      canvasContainer.classList.add(`site__canvas-container${chosenTheme}`);
    }

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

    let spikesQty = 0;

    for (let i = 0; i < 9; i++) {
      if (spikesQty === 8) {
        this.game.spikes = [];

        let randNoSpikePosition = Math.floor(new Random().getInt(0, 7));

        for (let i = 0; i < 9; i++) {
          if (i === randNoSpikePosition) continue;

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

      const isSpikeAppearing =
        Math.random() < this.game.spikeAppearingBaseChance;

      this.game.spikeAppearingBaseChance += 0.001;

      if (isSpikeAppearing) {
        if (this.flipped) {
          spikesQty++;
          spike = new Spike(0, 160 * i, this.game, 80, 160);
        } else {
          spikesQty++;
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
      if (this.dx > 0 && this.dx < 30) this.dx += 0.002;
      else if (this.dx < 0 && this.dx > -30) this.dx -= 0.002;
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
      if (this.game.home.isGameStarted === true) this.game.gameover();
      this.y = this.game.home.canvas.height - this.height;
    }

    this.draw();
  };

  update = () => {
    this.draw();
  };
}

export default Bird;
