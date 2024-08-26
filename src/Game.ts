import Bird from "./Bird";
import Home from "./Home";
import Spike from "./Spike";
import Wall from "./Wall";
import birdDefault from "./img/bird-default.png";
import birdDead from "./img/bird-dead.png";

import "./scss/game.scss";

class Game {
  home: Home;
  bird: Bird | null = null;
  spikes: Spike[] = [];
  spikeAppearingBaseChance = 0.75;

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
          // game over

          this.home.isGameStarted = false;

          this.birdParameters.imgSrc = birdDead;

          if (this.bird) {
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

            this.bird.dx = 0;
          }

          this.bird?.flipHorizontally();
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

      if (leftCollision) {
        if (this.bird) {
          this.bird.flipHorizontally();
        }
      } else if (rightCollision) {
        if (this.bird) {
          this.bird.flipHorizontally();
        }
      }
    }
  };

  constructor(home: Home) {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key !== " " || this.home.isGameStarted === false) return;

      this.home.isGameStarted = true;

      this.bird?.jump();
    });

    this.home = home;

    const main = document.querySelector(".main") as HTMLDivElement;

    main.addEventListener("click", () => {
      if (this.home.isGameStarted === false) return;

      this.home.isGameStarted = true;
      this.bird?.jump();

      this.home.canvas.addEventListener("click", () => {
        this.bird?.jump();
      });
    });

    this.birdParameters = {
      x: this.home.canvas.width / 3,
      y: this.home.canvas.height / 2,
      dx: 15,
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
