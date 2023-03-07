let formElement = document.querySelector('.popup__form');

let nameInput = formElement.querySelector('#username-input');
let jobInput = formElement.querySelector('#pofession-input');
let profileUsername = document.querySelector('.profile__username');
let profileProfession = document.querySelector('.profile__profession');

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileUsername.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    popupClose ();
}

function profilePopupValueUpdate () {
  nameInput.value = profileUsername.textContent;
  profileProfession.value = profileProfession.textContent;
}

formElement.addEventListener('submit', handleFormSubmit);

let popup = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-bnt');

function popupClose () {
  popup.classList.remove('popup_opened');
}

function popupOpen () {
  popup.classList.add('popup_opened');
  profilePopupValueUpdate ();
}

popupCloseBtn.addEventListener('click', popupClose);

let profileEditBtn = document.querySelector('.profile__edit-button');

profileEditBtn.addEventListener('click', popupOpen);

// Алерт не работающей кнопки
let cardAddBtn = document.querySelector('.profile__add-button');
let likeBtn = document.querySelectorALL('.card__like');
