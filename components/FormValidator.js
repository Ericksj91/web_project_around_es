export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  _toggleButtonState() {
    const inputList = this._form.querySelectorAll(this._config.inputSelector);
    const buttonElement = this._form.querySelector(this._config.inputButton);
    const allValid = Array.from(inputList).every(
      (input) => input.validity.valid,
    );
    buttonElement.disabled = !allValid;
  }

  setEventListeners() {
    const inputList = this._form.querySelectorAll(this._config.inputSelector);
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        if (!input.validity.valid) {
          this._showInputError(input, input.validationMessage);
        } else {
          this._hideInputError(input);
        }
        this._toggleButtonState();
      });
    });

    this._form.addEventListener("submit", (e) => {
      let formValid = true;
      inputList.forEach((input) => {
        if (!input.validity.valid) {
          this._showInputError(input, input.validationMessage);
          formValid = false;
        }
      });
      if (!formValid) {
        e.preventDefault();
      }
    });
    this._toggleButtonState();
  }
}
