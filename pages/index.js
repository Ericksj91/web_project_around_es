//Clases importadas
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImages } from "../components/PopupWithImages.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

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
const editAvatarForm = document.querySelector("#edit-avatar-form");
const avatarEditButton = document.querySelector(".profile__avatar-edit-button");

//Instancias
const imagePopup = new PopupWithImages("#image-popup");
const editPopupForm = new PopupWithForm("#edit-popup", handleEditSubmit);
const updateUserAvatar = new PopupWithForm("#avatar-popup", handleAvatarSubmit);
const newCardPopupForm = new PopupWithForm(
  "#new-card-popup",
  handleCardFormSubmit,
);
const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__description",
  avatarElement: ".profile__image",
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

const validatorAvatar = new FormValidator(config, editAvatarForm);
validatorAvatar.setEventListeners();

const section = new Section(
  {
    items: [],
    renderer(card) {
      const cardItem = new Card(
        card,
        "#card-template",
        handleImageClick,
        handleLikeButton,
        handleDelete,
      );
      const cardElement = cardItem.buildCard();
      section.addItem(cardElement);
    },
  },
  ".cards__list",
);

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "b3797ff0-4b6a-4f12-8303-1c35135ad6a7",
    "Content-Type": "application/json",
  },
});

const popupWithConfirmation = new PopupWithConfirmation("#delete-popup");

//Promise.all()
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    const data = {
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    };
    userInfo.setUserInfo(data);

    section.renderItems(cards);
    //console.log(userData);
    //console.log(cards);
  })
  .catch((err) => {
    console.log(err);
  });

//Funciones
function fillProfileForm() {
  const userData = userInfo.getUserInfo();

  inputName.value = userData.name;
  inputDescription.value = userData.job;
}

function handleCardFormSubmit(data) {
  api
    .addCard(data)
    .then((res) => {
      const card = new Card(
        res,
        "#card-template",
        handleImageClick,
        handleLikeButton,
        handleDelete,
      );
      const cardElement = card.buildCard();
      section.addItem(cardElement);

      newCardPopupForm.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleEditSubmit(data) {
  api
    .updateUserInfo(data)
    .then((res) => {
      const editData = {
        name: res.name,
        job: res.about,
        avatar: res.avatar,
      };
      userInfo.setUserInfo(editData);
      editPopupForm.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleLikeButton(cardId, isLiked, cardInstance) {
  if (isLiked) {
    api
      .removeLike(cardId)
      .then((data) => {
        cardInstance.updateLike(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .addLike(cardId)
      .then((data) => {
        cardInstance.updateLike(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleDelete(cardId, cardInstance) {
  popupWithConfirmation.setAction(() => {
    api
      .deleteCard(cardId)
      .then((res) => {
        cardInstance.removeCard();
        popupWithConfirmation.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  popupWithConfirmation.open();
}

function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

function handleAvatarSubmit(data) {
  api
    .updateUserAvatar(data.link)
    .then((res) => {
      document.querySelector(".profile__image").src = res.avatar;
      updateUserAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    });
}
//SetEventListeners
editProfile.addEventListener("click", () => {
  editPopupForm.open();
  fillProfileForm();
});

addProfile.addEventListener("click", () => {
  newCardPopupForm.open();
});

avatarEditButton.addEventListener("click", () => {
  updateUserAvatar.open();
});

editPopupForm.setEventListeners();
newCardPopupForm.setEventListeners();
imagePopup.setEventListeners();
popupWithConfirmation.setEventListeners();
updateUserAvatar.setEventListeners();
