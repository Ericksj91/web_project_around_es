export class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
    this._escHandler = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._escHandler);
  }

  close() {
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._escHandler);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closePopup = this._popup.querySelector(".popup__close");

    closePopup.addEventListener("click", (e) => {
      this.close();
    });

    this._popup.addEventListener("click", (e) => {
      if (e.target === this._popup) {
        this.close();
      }
    });
  }
}
