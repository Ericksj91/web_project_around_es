const editProfile = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const popupClose = editPopup.querySelector(".popup__close");
const inputName = editPopup.querySelector(".popup__input_type_name");
const profileTitle = document.querySelector(".profile__title");
const inputDescription = editPopup.querySelector(
  ".popup__input_type_description",
);
const profileDescription = document.querySelector(".profile__description");
const saveBtn = editPopup.querySelector(".popup__button");
const formElement = editPopup.querySelector("#edit-profile-form");

function openModal(editPopup) {
  editPopup.classList.add("popup_is-opened");
}
function closeModal(editPopup) {
  editPopup.classList.remove("popup_is-opened");
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

editProfile.addEventListener("click", handleOpenEditModal);
popupClose.addEventListener("click", (e) => {
  closeModal(editPopup);
});

formElement.addEventListener("submit", handleProfileFormSubmit);

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

initialCards.forEach(function (initialCard) {
  console.log(initialCard.name);
});
