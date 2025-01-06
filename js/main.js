import { renderPhotos } from "./photoRender.js";
import { fetchImages } from "./loadImages.js";
import { initializeValidation } from "./formValidation.js";
import { setupFormSubmission } from "./formSubmit.js";
import { generatePhotos } from "./data.js";

/**
 * Инициализация процесса загрузки и отображения фотографий.
 * @async
 */
async function initializePhotos() {
  try {
    const photos = await fetchImages();
    if (photos) {
      console.log("Данные подгружены");
      renderPhotos(photos);
    } else {
      console.warn("Сервер недоступен. Используем тестовые данные.");
      const testPhotos = generatePhotos();
      renderPhotos(testPhotos);
    }
  } catch (error) {
    console.error("Ошибка инициализации фотографий:", error);
  }
}

/**
 * Инициализация и удаление обработчиков событий и валидации формы загрузки.
 */
function initializeFormOnOpen() {
  const uploadForm = document.querySelector(".img-upload__form");
  const uploadOverlay = document.querySelector(".img-upload__overlay");
  const uploadFileInput = document.querySelector("#upload-file");
  const cancelButton = document.querySelector("#upload-cancel");

  let pristine = null;

  const openForm = () => {
    if (!pristine) {
      pristine = initializeValidation(uploadForm);
      setupFormSubmission(uploadForm, pristine);
      console.log("Форма загрузки и валидация инициализированы");
    }

    uploadOverlay.classList.remove("hidden");
    document.body.classList.add("modal-open");
  };

  const closeForm = () => {
    uploadOverlay.classList.add("hidden");
    document.body.classList.remove("modal-open");
    uploadFileInput.value = "";

    if (pristine) {
      uploadForm.reset();
      pristine.destroy();
      pristine = null;
      console.log("Валидация и обработчики событий удалены");
    }
  };

  uploadFileInput.addEventListener("change", openForm);
  cancelButton.addEventListener("click", closeForm);
}

/**
 * Основная инициализация приложения.
 */
function init() {
  initializePhotos();
  initializeFormOnOpen();
}

init();
