import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__button");
    this._buttonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll("input");
    const values = {};

    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Guardando....";
    } else {
      this._submitButton.textContent = this._buttonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputValues = this._getInputValues();
      this.setLoading(true);
      this._handleFormSubmit(inputValues).finally(() => {
        this.setLoading(false);
      });
    });
  }

  open() {
    super.open();
    this._submitButton.textContent = this._buttonText;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
