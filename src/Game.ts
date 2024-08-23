import Bird from "./Bird";
import Home from "./Home";
import Spike from "./Spike";
import Wall from "./Wall";

class Game {
  home: Home;
  bird: Bird | null = null;
  spike: Spike | null = null;

  leftWall: Wall | null = null;
  rightWall: Wall | null = null;

  birdParameters: {
    x: number;
    y: number;
    width: number;
    height: number;
    game: Game;
  };

  animate = () => {
    requestAnimationFrame(this.animate);

    this.home.ctx.clearRect(
      0,
      0,
      this.home.canvas.width,
      this.home.canvas.height
    );

    this.home.ctx.fillStyle = "#fad4d4";
    this.home.ctx.fillRect(
      0,
      0,
      this.home.canvas.width,
      this.home.canvas.height
    );

    this.leftWall?.update();

    this.bird?.update();

    this.rightWall?.update();
  };

  constructor(home: Home) {
    this.home = home;

    this.birdParameters = {
      x: this.home.canvas.width / 3,
      y: this.home.canvas.height / 2,
      width: 615 / 4,
      height: 418 / 4,
      game: this,
    };

    this.leftWall = new Wall(0, 0, this);

    this.bird = new Bird(
      this.birdParameters.x,
      this.birdParameters.y,
      this.birdParameters.width,
      this.birdParameters.height,
      this.birdParameters.game
    );

    this.rightWall = new Wall(this.home.canvas.width - 30, 0, this);

    this.animate();
  }
}

export default Game;
