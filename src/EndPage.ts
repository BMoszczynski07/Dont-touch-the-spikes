import Bird from "./Bird";
import Home from "./Home";
import MainPage from "./MainPage";
import birdDefault from "./img/bird-default.png";
import "./scss/endpage.scss";

class EndPage {
  home: Home;

  disappear = () => {
    const end = document.querySelector(".end") as HTMLDivElement;
    const shareBtn = document.querySelector(
      ".end__share-btn"
    ) as HTMLButtonElement;
    const playAgainButton = document.querySelector(
      ".end__play-again-btn"
    ) as HTMLButtonElement;
    const score = document.querySelector(".end__score") as HTMLElement;
    const gameover = document.querySelector(".end__game-over") as HTMLElement;

    shareBtn.classList.add("end__share-btn--invisible");
    playAgainButton.classList.add("end__play-again-btn--invisible");
    score.classList.add("end__score--invisible");
    gameover.classList.add("end__game-over--invisible");

    this.home.isGameStarted = null;

    setTimeout(() => {
      end.style.display = "none";

      shareBtn.classList.remove("end__share-btn--invisible");
      playAgainButton.classList.remove("end__play-again-btn--invisible");
      score.classList.remove("end__score--invisible");
      gameover.classList.remove("end__game-over--invisible");

      if (this.home.game) {
        const levelElement = document.querySelector(
          ".game__score"
        ) as HTMLElement;

        if (!localStorage.getItem("best-score"))
          localStorage.setItem("best-score", this.home.game.level.toString());
        else {
          const bestScore = parseInt(
            localStorage.getItem("best-score") as string
          );

          if (bestScore < this.home.game.level) {
            localStorage.setItem("best-score", this.home.game.level.toString());
          }
        }

        this.home.game.level = 0;
        this.home.game.spikeAppearingBaseChance = 0.05;

        levelElement.textContent = `${
          this.home.game.level >= 10
            ? this.home.game.level
            : `0${this.home.game.level}`
        }`;

        const birdParameters = {
          x: this.home.canvas.width / 3,
          y: this.home.canvas.height / 2,
          dx: 14,
          dy: 0,
          width: 615 / 4,
          height: 418 / 4,
          game: this.home.game,
          imgSrc: birdDefault,
        };

        this.home.game.bird = new Bird(
          birdParameters.x,
          birdParameters.y,
          birdParameters.dx,
          birdParameters.dy,
          birdParameters.width,
          birdParameters.height,
          birdParameters.game,
          birdParameters.imgSrc
        );

        this.home.game.spikes = [];
      }

      const canvasContainer = document.querySelector(
        ".site__canvas-container"
      ) as HTMLElement;

      canvasContainer.classList.forEach((className) => {
        if (className !== "site__canvas-container")
          canvasContainer.classList.remove(className);
      });

      this.home.mainPage = new MainPage(this.home);
    }, 600);
  };

  constructor(home: Home) {
    this.home = home;

    const end = document.querySelector(".end") as HTMLDivElement;
    end.style.display = "flex";

    const score = document.querySelector(".end__score") as HTMLElement;

    if (this.home.game) {
      score.textContent = `Final score: ${
        this.home.game.level >= 10
          ? this.home.game.level
          : `0${this.home.game.level}`
      }`;

      const shareAnchor = document.querySelector(".end__share") as HTMLElement;
      shareAnchor.setAttribute(
        "href",
        `https://x.com/intent/tweet?text=I reached level ${this.home.game.level} in Don't touch the spikes! Wanna give it a try? ${window.location.href}`
      );
    }

    const playAgainButton = document.querySelector(
      ".end__play-again-btn"
    ) as HTMLButtonElement;
    playAgainButton.addEventListener("click", () => {
      this.disappear();
    });
  }
}

export default EndPage;
