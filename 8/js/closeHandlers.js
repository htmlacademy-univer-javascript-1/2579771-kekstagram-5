/**
 * Добавляет слушатели для закрытия окна.
 * @param {Element} bigPicture - Элемент окна.
 * @param {Element} body - Элемент body для класса modal-open.
 */
export function addCloseListeners(bigPicture, body) {
  const closeButton = bigPicture.querySelector(".big-picture__cancel");
  closeButton.addEventListener("click", () => closeBigPicture(bigPicture, body));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeBigPicture(bigPicture, body);
    }
  });
}

/**
 * Закрывает полноэкранное окно.
 * @param {Element} bigPicture - Элемент окна.
 * @param {Element} body - Элемент body.
 */
function closeBigPicture(bigPicture, body) {
  bigPicture.classList.add("hidden");
  body.classList.remove("modal-open");
}
