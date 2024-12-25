// loadImages.js

/**
 * Функция для загрузки изображений с сервера.
 * @async
 * @returns {Promise<Array|undefined>} Массив объектов изображений при успешной загрузке, иначе undefined.
 */
export async function fetchImages() {
  const URL = "https://29.javascript.htmlacademy.pro/kekstagram/data";

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Ошибка загрузки данных");
    }
    const images = await response.json();
    return images;
  } catch (error) {
    showError("Не удалось загрузить изображения. Пожалуйста, обновите страницу.");
    console.error(error);
  }
}

/**
 * Функция отображения сообщения об ошибке.
 * @param {string} message - Текст сообщения об ошибке.
 */
function showError(message) {
  const errorBlock = document.createElement("div");
  errorBlock.textContent = message;
  errorBlock.style.position = "fixed";
  errorBlock.style.top = "0";
  errorBlock.style.left = "0";
  errorBlock.style.right = "0";
  errorBlock.style.backgroundColor = "red";
  errorBlock.style.color = "white";
  errorBlock.style.padding = "10px";
  errorBlock.style.textAlign = "center";
  errorBlock.style.zIndex = "1000";
  document.body.appendChild(errorBlock);
}
