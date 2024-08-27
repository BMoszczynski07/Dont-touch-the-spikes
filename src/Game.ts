import Bird from "./Bird";
import Home from "./Home";
import Spike from "./Spike";
import Wall from "./Wall";
import birdDefault from "./img/bird-default.png";
import birdDead from "./img/bird-dead.png";
import lose from "./audio/lose.wav";

import "./scss/game.scss";
import EndPage from "./EndPage";

class Game {
  home: Home;
  bird: Bird | null = null;
  spikes: Spike[] = [];
  spikeAppearingBaseChance = 0.05;
  level = 0;

  leftWall: Wall | null = null;
  rightWall: Wall | null = null;

  birdParameters: {
    x: number;
    y: number;
    dx: number;
    dy: number;
    width: number;
    height: number;
    game: Game;
    imgSrc: string;
  };

  gameover = () => {
    navigator.vibrate([500]);

    setTimeout(() => {
      this.home.endPage = new EndPage(this.home);
    }, 1000);

    if (!this.home.isMuted) {
      const loseAudio = new Audio();
      loseAudio.src = lose;
      loseAudio.volume = 0.3;

      loseAudio.play();
    }

    this.home.isGameStarted = false;

    this.birdParameters.imgSrc = birdDead;

    if (this.bird) {
      const wasFlipped = this.bird.flipped; // Zachowaj stan odwrócenia

      this.bird = new Bird(
        this.bird.x,
        this.bird.y,
        this.bird.dx,
        this.bird.dy,
        this.bird.width,
        this.bird.height,
        this.bird.game,
        this.birdParameters.imgSrc
      );

      this.bird.flipped = wasFlipped; // Przywróć stan odwrócenia
      this.bird.dx = 0;
    }
  };

  animate = () => {
    requestAnimationFrame(this.animate);

    this.home.ctx.clearRect(
      0,
      0,
      this.home.canvas.width,
      this.home.canvas.height
    );

    let detectCollision = false;

    for (const spike of this.spikes) {
      spike.update();

      if (this.home.isGameStarted === true) {
        if (this.bird)
          detectCollision = spike.detectCollision(
            this.bird.x,
            this.bird.y,
            this.bird.width,
            this.bird.height
          );

        if (detectCollision) {
          this.gameover();
        }
      }
    }

    this.leftWall?.update();

    if (this.home.isGameStarted === true) {
      this.bird?.fly();
    } else if (this.home.isGameStarted === null) {
      this.bird?.update();
    } else if (this.home.isGameStarted === false) {
      this.bird?.fall();
    }

    this.rightWall?.update();

    if (this.home.isGameStarted === true) {
      const leftCollision: boolean | undefined = this.leftWall?.detectCollision(
        this.bird?.x ?? 0,
        this.birdParameters.width
      );

      const rightCollision: boolean | undefined =
        this.rightWall?.detectCollision(
          this.bird?.x ?? 0,
          this.birdParameters.width
        );

      if ((leftCollision || rightCollision) && this.bird) {
        console.log("collision");

        this.bird.flipHorizontally();
      }
    }
  };

  constructor(home: Home) {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key !== " " || this.home.isGameStarted === false) return;

      if (this.home.isGameStarted === null) this.home.mainPage?.disappear();

      this.home.mainPage?.disappear();

      this.home.isGameStarted = true;

      this.bird?.jump();
    });

    this.home = home;

    const main = document.querySelector(".main") as HTMLDivElement;

    main.addEventListener("touchstart", () => {
      if (this.home.isGameStarted === false) return;

      if (this.home.isGameStarted === null) this.home.mainPage?.disappear();

      this.home.isGameStarted = true;
      this.bird?.jump();

      this.home.canvas.addEventListener("click", () => {
        this.bird?.jump();
      });
    });

    this.birdParameters = {
      x: this.home.canvas.width / 3,
      y: this.home.canvas.height / 2,
      dx: 14,
      dy: 0,
      width: 615 / 4,
      height: 418 / 4,
      game: this,
      imgSrc: birdDefault,
    };

    this.leftWall = new Wall(0, 0, "left", this);

    this.bird = new Bird(
      this.birdParameters.x,
      this.birdParameters.y,
      this.birdParameters.dx,
      this.birdParameters.dy,
      this.birdParameters.width,
      this.birdParameters.height,
      this.birdParameters.game,
      this.birdParameters.imgSrc
    );

    this.rightWall = new Wall(this.home.canvas.width - 30, 0, "right", this);

    this.animate();
  }
}

export default Game;
