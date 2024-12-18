/**
 * Добавляет слушатели для закрытия окна.
 * @param {Element} bigPicture - Элемент окна.
 * @param {Element} body - Элемент body для класса modal-open.
 */
export function addCloseListeners(bigPicture, body, handleCommentsClick) {
  const closeButton = bigPicture.querySelector(".big-picture__cancel");

  closeButton.addEventListener("click", handleCloseButtonClick);
  document.addEventListener("keydown", handleEscapePress);

  /**
   * Обработчик нажатия на кнопку закрытия.
   */
  function handleCloseButtonClick() {
    closeBigPicture(bigPicture, body, handleCloseButtonClick, handleEscapePress, handleCommentsClick);
  }

  /**
   * Обработчик нажатия на клавишу Escape.
   * @param {KeyboardEvent} event - Событие клавиатуры.
   */
  function handleEscapePress(event) {
    if (event.key === "Escape") {
      closeBigPicture(bigPicture, body, handleCloseButtonClick, handleEscapePress, handleCommentsClick);
    }
  }
}

/**
 * Закрывает полноэкранное окно.
 * @param {Element} bigPicture - Элемент окна.
 * @param {Element} body - Элемент body.
 * @param {Function} handleCloseButtonClick - Функция-обработчик для кнопки закрытия.
 * @param {Function} handleEscapePress - Функция-обработчик для нажатия Escape.
 * @param {Function} handleCommentsClick - Функция-обработчик для клика по loader.
 */
function closeBigPicture(bigPicture, body, handleCloseButtonClick, handleEscapePress, handleCommentsClick) {
  bigPicture.classList.add("hidden");
  body.classList.remove("modal-open");

  const loader = document.querySelector(".comments-loader");
  loader.removeEventListener("click", handleCommentsClick);

  const closeButton = bigPicture.querySelector(".big-picture__cancel");
  closeButton.removeEventListener("click", handleCloseButtonClick);
  document.removeEventListener("keydown", handleEscapePress);
}
