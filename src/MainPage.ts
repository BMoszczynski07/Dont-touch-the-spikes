import Home from "./Home";
import "./scss/mainpage.scss";

import hover from "./audio/hover.wav";
import click from "./audio/click.wav";

class MainPage {
  home: Home;

  constructor(home: Home) {
    this.home = home;

    const btns = document.querySelectorAll("button");

    for (const btn of btns) {
      btn.addEventListener("mouseenter", () => {
        if (!this.home.isMuted) {
          const hoverAudio = new Audio();
          hoverAudio.src = hover;

          hoverAudio.play();
        }
      });

      btn.addEventListener("touchdown", () => {
        if (!this.home.isMuted) {
          const clickAudio = new Audio();
          clickAudio.src = click;

          clickAudio.play();
        }
      });
    }

    const muteBtn = document.querySelector(
      ".site__mute-btn"
    ) as HTMLButtonElement;
    const mute = document.querySelector(".site__mute") as HTMLElement;

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
