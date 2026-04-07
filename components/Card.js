export class Card {
  constructor(data, CardSelector, ImageClickHandler) {
    this._name = data.name;
    this._link = data.link;
    this._CardSelector = CardSelector;
    this._ImageClickHandler = ImageClickHandler;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._CardSelector)
      .content.querySelector(".card");
    const cardElement = cardTemplate.cloneNode(true);
    return cardElement;
  }

  _handleLikeClick() {
    this._likeBtn.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleImageClick() {
    this._ImageClickHandler(this._name, this._link);
  }

  _setEventListeners() {
    this._likeBtn = this._element.querySelector(".card__like-button");
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._deleteBtn = this._element.querySelector(".card__delete-button");
    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._imageElement = this._element.querySelector(".card__image");
    this._imageElement.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  buildCard() {
    this._element = this._getTemplate();
    this._titleElement = this._element.querySelector(".card__title");
    this._imageElement = this._element.querySelector(".card__image");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
