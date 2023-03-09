// Переменные
let formElement = document.querySelector('.popup__form');

let nameInput = formElement.querySelector('#username-input');
let jobInput = formElement.querySelector('#pofession-input');

let profileUsername = document.querySelector('.profile__username');
let profileProfession = document.querySelector('.profile__profession');

let popup = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-bnt');

let profileEditBtn = document.querySelector('.profile__edit-button');

// Функции
// Функция измнения значений профиля
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileUsername.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    popupClose ();
}

// Функция обновления полей value в ворме редактирвоания профиля (при открытии)
function profilePopupValueUpdate () {
  nameInput.value = profileUsername.textContent;
  profileProfession.value = profileProfession.textContent;
}

// Функция закрытия попап
function popupClose () {
  popup.classList.remove('popup_opened');
}

// Функция открытия попап
function popupOpen () {
  popup.classList.add('popup_opened');
  profilePopupValueUpdate ();
}

// Слушатели
// Открытие попап по редактирования профиля по клику
profileEditBtn.addEventListener('click', popupOpen);

// Закрытие попап по клику
popupCloseBtn.addEventListener('click', popupClose);

// Нажатие на кнопку сохранить в форме редактирования профиля
formElement.addEventListener('submit', handleFormSubmit);

