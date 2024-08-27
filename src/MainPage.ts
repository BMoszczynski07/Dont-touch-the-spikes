import Home from "./Home";
import "./scss/mainpage.scss";

class MainPage {
  home: Home;

  disappear = () => {
    const mainPage = document.querySelector(".main") as HTMLDivElement;
    mainPage.classList.remove("main--visible");
    mainPage.classList.add("main--invisible");
  };

  constructor(home: Home) {
    this.home = home;

    // main page appears
    const mainPage = document.querySelector(".main") as HTMLDivElement;

    mainPage.classList.remove("main--invisible");
    mainPage.classList.add("main--visible");

    const bestScore = document.querySelector(
      ".main__best-score"
    ) as HTMLElement;

    if (localStorage.getItem("best-score")) {
      const best = localStorage.getItem("best-score") as string;

      bestScore.textContent = `Best score: ${
        parseInt(best) < 10 ? 0 + best : best
      }`;
    } else {
      bestScore.textContent = "Best score: 00";
    }

    const muteBtn = document.querySelector(
      ".site__mute-btn"
    ) as HTMLButtonElement;
    const mute = document.querySelector(".site__mute") as HTMLElement;

    muteBtn.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault(); // Zapobiega domyślnemu kliknięciu przyciskiem
      }
    });

    muteBtn.addEventListener("click", () => {
      this.home.isMuted = !this.home.isMuted;

      if (this.home.isMuted) {
        mute.classList.remove("fa-volume-high");
        mute.classList.add("fa-volume-mute");

        return;
      }

      mute.classList.add("fa-volume-high");
      mute.classList.remove("fa-volume-mute");
    });
  }
}

export default MainPage;
