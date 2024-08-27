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
  }
}

export default MainPage;
