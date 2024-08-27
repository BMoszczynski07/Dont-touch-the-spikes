import Home from "./Home";
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

    setTimeout(() => {
      end.style.display = "none";
    }, 600);
  };

  constructor(home: Home) {
    this.home = home;

    const end = document.querySelector(".end") as HTMLDivElement;
    end.style.display = "flex";

    const playAgainButton = document.querySelector(
      ".end__play-again-btn"
    ) as HTMLButtonElement;
    playAgainButton.addEventListener("click", () => {
      this.disappear();
    });
  }
}

export default EndPage;
