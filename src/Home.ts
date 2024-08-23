import EndPage from "./EndPage";
import Game from "./Game";
import MainPage from "./MainPage";

class Home {
  isMuted: boolean = false;
  isGameStarted: boolean = false;
  level = 1;

  mainPage: MainPage | null = null;
  game: Game | null = null;
  endPage: EndPage | null = null;

  canvas = document.querySelector("canvas") as HTMLCanvasElement;
  ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

  constructor() {
    this.canvas.width = 1020;
    this.canvas.height = 1600;

    this.mainPage = new MainPage(this);
    this.game = new Game(this);
  }
}

export default Home;
