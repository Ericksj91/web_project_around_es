//Array de Tarjetas
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

//variables de modal editar perfil
const editProfile = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const popupClose = editPopup.querySelector(".popup__close");
const inputName = editPopup.querySelector(".popup__input_type_name");
const inputDescription = editPopup.querySelector(
  ".popup__input_type_description",
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formElement = editPopup.querySelector("#edit-profile-form");

//variables de modal añadir nueva foto
const addProfile = document.querySelector(".profile__add-button");
const newCard = document.querySelector("#new-card-popup");
const popupCloseCard = newCard.querySelector(".popup__close");
const cardName = newCard.querySelector(".popup__input_type_card-name");
const cardLink = newCard.querySelector(".popup__input_type_url");
const newPlace = newCard.querySelector("#new-card-form");

//variables de modal abrir foto en ventana emergente
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const closePopup = imagePopup.querySelector(".popup__close");

//variables de template
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardList = document.querySelector(".cards__list");

//funciones
function openModal(popup) {
  popup.classList.add("popup_is-opened");
}
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}
function fillProfileForm() {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
}
function handleOpenEditModal() {
  openModal(editPopup);
  fillProfileForm();
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  const nameValue = inputName.value;
  const jobValue = inputDescription.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closeModal(editPopup);
}

function handleCardFormSubmit(e) {
  e.preventDefault();
  const cardNameValue = cardName.value;
  const linkValue = cardLink.value;

  const cardElement = getCardElement(cardNameValue, linkValue);
  cardList.prepend(cardElement);

  closeModal(newCard);
  e.target.reset();
}

function getCardElement(
  name = "Sin titulo",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.cloneNode(true);
  const titleElement = cardElement.querySelector(".card__title");
  const imageElement = cardElement.querySelector(".card__image");
  imageElement.src = link;
  imageElement.alt = name;
  titleElement.textContent = name;

  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", (e) => {
    e.target.classList.toggle("card__like-button_is-active");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", (e) => {
    cardElement.remove();
  });

  imageElement.addEventListener("click", (e) => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    imagePopup.classList.add("popup_is-opened");
  });
  return cardElement;
}

function renderCard(name, link, container) {
  const cardRender = getCardElement(name, link);
  container.prepend(cardRender);
}

//bucle foreach
initialCards.forEach(function (initialCard) {
  renderCard(initialCard.name, initialCard.link, cardList);
});

//addeventListeners
editProfile.addEventListener("click", handleOpenEditModal);
popupClose.addEventListener("click", (e) => {
  closeModal(editPopup);
});

addProfile.addEventListener("click", (e) => {
  openModal(newCard);
});

popupCloseCard.addEventListener("click", (e) => {
  closeModal(newCard);
  newPlace.reset();
});

closePopup.addEventListener("click", (e) => {
  closeModal(imagePopup);
});

formElement.addEventListener("submit", handleProfileFormSubmit);

newPlace.addEventListener("submit", handleCardFormSubmit);
