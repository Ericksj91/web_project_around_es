export class Card {
  constructor(
    data,
    CardSelector,
    ImageClickHandler,
    likeHandler,
    deleteHandler,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked;
    this._id = data._id;
    this._CardSelector = CardSelector;
    this._ImageClickHandler = ImageClickHandler;
    this._likeHandler = likeHandler;
    this._deleteHandler = deleteHandler;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._CardSelector)
      .content.querySelector(".card");
    const cardElement = cardTemplate.cloneNode(true);
    return cardElement;
  }

  updateLike(data) {
    this._isLiked = data.isLiked;
    if (this._isLiked) {
      this._likeBtn.classList.add("card__like-button_is-active");
    } else {
      this._likeBtn.classList.remove("card__like-button_is-active");
    }
  }

  _handleLikeClick() {
    this._likeHandler(this._id, this._isLiked, this);
    //this._likeBtn.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteClick() {
    this._deleteHandler(this._id, this);
    //this._element.remove();
  }

  removeCard() {
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

    if (this._isLiked) {
      this._likeBtn.classList.add("card__like-button_is-active");
    }

    return this._element;
  }
}
