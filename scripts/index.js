// Массивы
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// DOM узлы
const profileName = document.querySelector(".profile__username"); // Поле с именем пользователя
const profileProfession = document.querySelector(".profile__profession"); // Поле с профессией пользователя

const cardsList = document.querySelector(".cards"); // Грид-контейнер для хранения карточек
const cardsTemplate = document.querySelector("#card-template").content; // Шаблон карточки

// Формы
// Форма профиля
const profileForm = document.forms["profile-form"];
const profileFormInputName = profileForm.querySelector("#username-input");
const profileFormInputProfession = profileForm.querySelector("#pofession-input");
// Форма карточки
const cardForm = document.forms["card-form"];
const cardFormInputPlaceName = cardForm.querySelector('#place-name-input');
const cardFormInputImgLink = cardForm.querySelector('#place-link-input');

// Попап редактирования профиля
const popupProfile = document.querySelector(".popup_type_profile"); // Попап редактирования профиля
const profileEditBtn = document.querySelector(".profile__edit-button"); // Кнопка открытия попапа редактирования профиля

// Попап добавления карточки
const popupAddCard = document.querySelector(".popup_type_add-card"); // Попап добавления карточки
const openBtnPopupAddCard = document.querySelector(".profile__add-button"); // Кнопка открытия попапа редактирования профиля

// Попап изображения карточки
const popupCardImage = document.querySelector(".popup_type_card-image"); // Попап добавления карточки
const popupCardImagePicture = popupCardImage.querySelector(".popup__image"); // Изображение попапа добавления карточки
const popupCardImageTitle = popupCardImage.querySelector(".popup__image-title"); // Заголовок попапа добавления карточки

// Все кнопки закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close-bnt');


// Функции

//
function handleCardLikeBtn(evt) {
  evt.target.closest(".card__like").classList.toggle("card__like_active");
}

function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

// Функция создания карточки
function createCard(cardData){
  const cardElement = cardsTemplate.cloneNode("true");
  const cardElementImg = cardElement.querySelector(".card__image");
  const cardElemntTitle = cardElement.querySelector(".card__title");
  const cardElementLikeBtn = cardElement.querySelector(".card__like");
  const cardElementDltBtn = cardElement.querySelector(".card__delete-btn");
  cardElemntTitle.textContent = cardData.name;
  cardElementImg.src = cardData.link;
  cardElementImg.alt = cardData.name;
  cardElementLikeBtn.addEventListener("click", handleCardLikeBtn);
  cardElementDltBtn.addEventListener("click", handleDeleteCard);
  cardElementImg.addEventListener('click', () => handlePopupCardImageOpen(cardData));
  return cardElement;
}
// функция отрисовки карточки
function generateCard(cardData) {
  const initialCardsElement = createCard(cardData);
  cardsList.prepend(initialCardsElement);
}

// Обработчик открытия попапа изображеня карточки
function handlePopupCardImageOpen(cardData) {
  popupCardImagePicture.src = cardData.link;
  popupCardImagePicture.alt = cardData.name;
  popupCardImageTitle.textContent = cardData.name;
  openPopup(popupCardImage);
}

// Функция измнения значений профиля
function handlePopupProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileFormInputName.value;
  profileProfession.textContent = profileFormInputProfession.value;
  closePopup(popupProfile);
}

// Функция передачи значений инпут в новую карточку
function handlePopupAddCard(evt) {
  evt.preventDefault();
  //Чтобы не создавались пустые карточки
    if (cardFormInputPlaceName.value === "" || cardFormInputImgLink.value ==="") {
      cardForm.reset();
      closePopup(popupAddCard);
      return
    }
  generateCard({ name: cardFormInputPlaceName.value, link: cardFormInputImgLink.value });
  cardForm.reset();
  closePopup(popupAddCard);
}

// Функция обновления полей value в форме редактирвоания профиля (при открытии)
function updateProfilePopupValue() {
  profileFormInputName.value = profileName.textContent;
  profileFormInputProfession.value = profileProfession.textContent;
}

// Функция закрытия попап
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

// Функция открытия попап
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

// Загрузка начальных карточек
initialCards.forEach(generateCard);

// Слушатели

// Навешиваем на каждую кнопку закрытия попапа слушатель
closeButtons.forEach((button) => {
  // Близжайший к кнопке попап
  const popup = button.closest('.popup');
  // Обработчик закрытия на кнопке
  button.addEventListener('click', () => closePopup(popup));
});

// Попап редактирования профиля
// Открытие попап по редактирования профиля по клику
profileEditBtn.addEventListener("click", function () {
  openPopup(popupProfile);
  updateProfilePopupValue;
});

// Нажатие на кнопку сохранить в форме редактирования профиля
profileForm.addEventListener("submit", handlePopupProfileFormSubmit);

// Попап добавления карточки
// Открытие попап добавления карточки
openBtnPopupAddCard.addEventListener("click", function () {
  openPopup(popupAddCard);
});

// Нажатие на кнопку сохранить в форме редактирования профиля
cardForm.addEventListener("submit", handlePopupAddCard);
