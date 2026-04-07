//Clases importadas
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImages } from "../components/PopupWithImages.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

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

//variables
const editProfile = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const inputName = editPopup.querySelector(".popup__input_type_name");
const inputDescription = editPopup.querySelector(
  ".popup__input_type_description",
);
const addProfile = document.querySelector(".profile__add-button");
const form = document.querySelector("#edit-profile-form");
const formPlace = document.querySelector("#new-card-form");

//Instancias
const imagePopup = new PopupWithImages("#image-popup");
const editPopupForm = new PopupWithForm("#edit-popup", handleEditSubmit);
const newCardPopupForm = new PopupWithForm(
  "#new-card-popup",
  handleCardFormSubmit,
);
const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__description",
});

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

const section = new Section(
  {
    items: initialCards,
    renderer(initialCard) {
      const card = new Card(initialCard, "#card-template", handleImageClick);
      const cardElement = card.buildCard();
      section.addItem(cardElement);
    },
  },
  ".cards__list",
);

section.renderItems();

//Funciones
function fillProfileForm() {
  const userData = userInfo.getUserInfo();

  inputName.value = userData.name;
  inputDescription.value = userData.job;
}

function handleCardFormSubmit(data) {
  const dataInfo = {
    name: data.name,
    link: data.link,
  };

  const card = new Card(dataInfo, "#card-template", handleImageClick);
  const cardElement = card.buildCard();
  section.addItem(cardElement);

  newCardPopupForm.close();
}

function handleEditSubmit(data) {
  const editData = {
    name: data.name,
    job: data.description,
  };
  userInfo.setUserInfo(editData);

  editPopupForm.close();
}

function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

//SetEventListeners
editProfile.addEventListener("click", () => {
  editPopupForm.open();
  fillProfileForm();
});

addProfile.addEventListener("click", () => {
  newCardPopupForm.open();
});

editPopupForm.setEventListeners();
newCardPopupForm.setEventListeners();
imagePopup.setEventListeners();
