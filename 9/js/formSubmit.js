import { closeEditForm } from "./imageUploadForm.js";

/**
 * Элемент кнопки отправки формы
 * @type {HTMLButtonElement}
 */
const submitButton = document.querySelector(".img-upload__submit");

/**
 * Шаблон сообщения об успешной отправке
 * @type {HTMLElement}
 */
const successTemplate = document.querySelector("#success").content.querySelector(".success");

/**
 * Шаблон сообщения об ошибке отправки
 * @type {HTMLElement}
 */
const errorTemplate = document.querySelector("#error").content.querySelector(".error");

/**
 * Обработчик отправки формы.
 * Проверяет данные с помощью Pristine, отправляет их на сервер и обрабатывает результат.
 * @param {HTMLFormElement} uploadForm - Форма загрузки изображения.
 * @param {Object} pristine - Экземпляр Pristine для валидации формы.
 */
export function handleSubmit(uploadForm, pristine) {
  uploadForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    if (!pristine.validate()) {
      console.log("Форма содержит ошибки");
      return;
    }

    const formData = new FormData(uploadForm);
    submitButton.disabled = true;

    sendData(formData)
      .then(() => {
        showMessage(successTemplate);
        closeEditForm();
        uploadForm.reset();
      })
      .catch(() => {
        showMessage(errorTemplate);
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  });
}

/**
 * Отправка данных формы на сервер.
 * @async
 * @param {FormData} data - Данные формы для отправки.
 * @returns {Promise<void>} Промис, который выполняется при успешной отправке данных.
 * @throws {Error} Ошибка отправки данных.
 */
async function sendData(data) {
  const response = await fetch("https://29.javascript.htmlacademy.pro/kekstagram", {
    method: "POST",
    body: data,
  });

  if (!response.ok) {
    throw new Error("Ошибка отправки данных");
  }
}

/**
 * Отображение сообщения об успешной или неудачной отправке.
 * @param {HTMLElement} template - Шаблон сообщения (успех или ошибка).
 */
function showMessage(template) {
  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const button = message.querySelector("button");
  const onEscKey = (evt) => evt.key === "Escape" && closeMessage();
  const onOutsideClick = (evt) =>
    !message.querySelector("div").contains(evt.target) && closeMessage();

  function closeMessage() {
    message.remove();
    document.removeEventListener("keydown", onEscKey);
    document.removeEventListener("click", onOutsideClick);
  }

  button.addEventListener("click", closeMessage);
  document.addEventListener("keydown", onEscKey);
  document.addEventListener("click", onOutsideClick);
}
