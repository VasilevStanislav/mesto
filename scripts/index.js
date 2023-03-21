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

// Переменные
const profileUsername = document.querySelector(".profile__username"); // Поле с именем пользователя
const profileProfession = document.querySelector(".profile__profession"); // Поле с профессией пользователя

// Попап редактирования профиля
const popupProfile = document.querySelector(".popup_type_profile"); // Попап редактирования профиля
const formPopupProfile = popupProfile.querySelector(".popup__form"); // Форма попапа редактирования профиля
const nameInputPopupProfile = formPopupProfile.querySelector("#username-input"); // Инпут имения пользователя попапа редактирования профиля
const professionInputPopupProfile = formPopupProfile.querySelector("#pofession-input"); // Инпут профессии пользователя попапа редактирования профиля
const profileEditBtn = document.querySelector(".profile__edit-button"); // Кнопка открытия попапа редактирования профиля
const closeBtnPopupProfile = popupProfile.querySelector(".popup__close-bnt"); // Кнопка закрытия попапа редактирования профиля

// Попап добавления карточки
const popupAddCard = document.querySelector(".popup_type_add-card"); // Попап добавления карточки
const formAddCard = popupAddCard.querySelector(".popup__form"); // Форма попапа добавления карточки
const nameInputAddCard = popupAddCard.querySelector("#place-name-input"); // Инпут имени попапа добавления карточки
const linkInputAddCard = popupAddCard.querySelector("#place-link-input"); // Инпут ссылки на изображение пользователя попапа добавления карточки
const openBtnPopupAddCard = document.querySelector(".profile__add-button"); // Кнопка открытия попапа редактирования профиля
const closeBtnPopupAddCard = popupAddCard.querySelector(".popup__close-bnt"); // Кнопка закрытия попапа добавления карточки

// Попап изображения карточки
const popupCardImage = document.querySelector(".popup_type_card-image"); // Попап добавления карточки
const popupCardImagePicture = popupCardImage.querySelector(".popup__image"); // Изображение попапа добавления карточки
const popupCardImageTitle = popupCardImage.querySelector(".popup__image-title"); // Заголовок попапа добавления карточки
const closeBtnPopupCardImage= popupCardImage.querySelector(".popup__close-bnt"); // Кнопка закрытия попапа добавления карточки

const cardsList = document.querySelector(".cards"); // Грид-контейнер для хранения карточек
const cardsTemplate = document.querySelector("#card-template").content; // Шаблон карточки

// Функции

//
function handleCardLikeBtn(evt) {
  evt.target.closest(".card__like").classList.toggle("card__like_active");
}

function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

// функция отрисовки карточки
function generateCard(cardData) {
  const initialCardsElement = cardsTemplate.cloneNode("true");
  initialCardsElement.querySelector(".card__title").textContent = cardData.name;
  initialCardsElement.querySelector(".card__image").src = cardData.link;
  initialCardsElement.querySelector(".card__image").alt = cardData.name;
  const cardLikeBtn = initialCardsElement.querySelector(".card__like");
  cardLikeBtn.addEventListener("click", handleCardLikeBtn);
  initialCardsElement.querySelector(".card__delete-btn").addEventListener("click", handleDeleteCard);
  initialCardsElement.querySelector(".card__image").addEventListener("click", handlePopupCardImageOpen);
  cardsList.prepend(initialCardsElement);
}

// Обработчик открытия попапа изображеня карточки
function handlePopupCardImageOpen(evt) {
  const currentCard = evt.target.closest(".card");
  const currentCardImg = currentCard.querySelector(".card__image");
  const currentCardTitle = currentCard.querySelector(".card__title")
  popupCardImagePicture.src = currentCardImg.src;
  popupCardImagePicture.alt = currentCardTitle.textContent;
  popupCardImageTitle.textContent = currentCardTitle.textContent;
  popupOpen(popupCardImage);
}

// Функция измнения значений профиля
function handlePopupProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUsername.textContent = nameInputPopupProfile.value;
  profileProfession.textContent = professionInputPopupProfile.value;
  popupClose(popupProfile);
}

// Функция передачи значений инпут в новую карточку
function handlePopupAddCard(evt) {
  evt.preventDefault();
  //Чтобы не создавались пустые карточки
    if (nameInputAddCard.value === "" || linkInputAddCard.value ==="") {
      formAddCard.reset();
      popupClose(popupAddCard);
      return
    }
  generateCard({ name: nameInputAddCard.value, link: linkInputAddCard.value });
  formAddCard.reset();
  popupClose(popupAddCard);
}

// Функция обновления полей value в форме редактирвоания профиля (при открытии)
function profilePopupValueUpdate() {
  nameInputPopupProfile.value = profileUsername.textContent;
  professionInputPopupProfile.value = profileProfession.textContent;
}

// Функция закрытия попап
const popupClose = (popup) => {
  popup.classList.remove("popup_opened");
};

// Функция открытия попап
const popupOpen = (popup) => {
  popup.classList.add("popup_opened");
};

// Загрузка начальных карточек
initialCards.forEach(generateCard);

// Слушатели
// Попап редактирования профиля
// Открытие попап по редактирования профиля по клику
profileEditBtn.addEventListener("click", function () {
  popupOpen(popupProfile);
  profilePopupValueUpdate;
});
// Закрытие попап по клику
closeBtnPopupProfile.addEventListener("click", function () {
  popupClose(popupProfile);
});
// Нажатие на кнопку сохранить в форме редактирования профиля
formPopupProfile.addEventListener("submit", handlePopupProfileFormSubmit);

// Попап добавления карточки
// Открытие попап добавления карточки
openBtnPopupAddCard.addEventListener("click", function () {
  popupOpen(popupAddCard);
});
// Закрытие попап по клику
closeBtnPopupAddCard.addEventListener("click", function () {
  popupClose(popupAddCard);
});
// Нажатие на кнопку сохранить в форме редактирования профиля
formAddCard.addEventListener("submit", handlePopupAddCard);

// Попап с изображение из карточки
// Закрытие попапа с изображением из карточки
closeBtnPopupCardImage.addEventListener("click", function () {
  popupClose(popupCardImage);
});
