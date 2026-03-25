//Clases importadas
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal, keyCloseWindow } from "./utils.js";
import { setEventListeners } from "./utils.js";

//Array de objetos de las Tarjetas
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
const cardList = document.querySelector(".cards__list");

//variables validación editar perfil
const form = document.querySelector("#edit-profile-form");

//variables validación nuevo lugar
const formPlace = document.querySelector("#new-card-form");

//funciones
setEventListeners({
  editProfile,
  popupClose,
  addProfile,
  popupCloseCard,
  closePopup,
  formElement,
  newPlace,
  imagePopup,
  editPopup,
  newCard,
  handleOpenEditModal,
  handleProfileFormSubmit,
  handleCardFormSubmit,
  openModal,
  closeModal,
  keyCloseWindow,
});

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

  const data = {
    name: cardNameValue,
    link: linkValue,
  };
  const card = new Card(data, "#card-template", handleImageClick);
  const cardElement = card.buildCard();
  cardList.prepend(cardElement);

  closeModal(newCard);
  e.target.reset();
}

function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  imagePopup.classList.add("popup_is-opened");
}

//bucle foreach
initialCards.forEach(function (initialCard) {
  const card = new Card(initialCard, "#card-template", handleImageClick);
  const cardElement = card.buildCard();
  cardList.prepend(cardElement);
});

//instancias para validación de campos
const config = {
  inputSelector: ".popup__input",
  inputButton: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
const validator = new FormValidator(config, form);
validator.setEventListeners();

const validatorPlace = new FormValidator(config, formPlace);
validatorPlace.setEventListeners();
