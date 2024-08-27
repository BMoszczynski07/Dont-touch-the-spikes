import EndPage from "./EndPage";
import Game from "./Game";
import MainPage from "./MainPage";

import hover from "./audio/hover.wav";
import click from "./audio/click.wav";

class Home {
  isMuted: boolean = false;
  isGameStarted: boolean | null = null;

  mainPage: MainPage | null = null;
  game: Game | null = null;
  endPage: EndPage | null = null;

  canvas = document.querySelector("canvas") as HTMLCanvasElement;
  ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

  constructor() {
    const btns = document.querySelectorAll("button");

    for (const btn of btns) {
      btn.addEventListener("mouseenter", () => {
        if (!this.isMuted) {
          const hoverAudio = new Audio();
          hoverAudio.src = hover;

          hoverAudio.play();
        }
      });

      btn.addEventListener("click", () => {
        if (!this.isMuted) {
          const clickAudio = new Audio();
          clickAudio.src = click;

          clickAudio.play();
        }
      });
    }

    this.canvas.width = 1020;
    this.canvas.height = 1600;

    this.mainPage = new MainPage(this);
    this.game = new Game(this);
  }
}

export default Home;
