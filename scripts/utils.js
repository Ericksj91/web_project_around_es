export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  resetValidation(popup);
  closeWindows(popup);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

function resetValidation(popup) {
  const errorsSpan = popup.querySelectorAll(".popup__form__input-error");
  errorsSpan.forEach((errorSpan) => {
    errorSpan.textContent = "";
  });
  const formulario = popup.querySelector(".popup__form");
  formulario.reset();
  const buttonDisabled = popup.querySelector(".popup__button");
  buttonDisabled.disabled = true;
}

function closeWindows(popup) {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closeModal(popup);
    }
  });
}

export function keyCloseWindow(e) {
  if (e.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

//addeventListeners
export function setEventListeners({
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
}) {
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

  document.addEventListener("keydown", keyCloseWindow);
}
