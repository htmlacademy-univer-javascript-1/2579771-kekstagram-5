import { renderPhotos } from "./photoRender.js";
import { fetchImages } from "./loadImages.js";
import { initializeValidation } from "./formValidation.js";
import { handleSubmit } from "./formSubmit.js";

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
      // const testPhotos = generatePhotos();
      // renderPhotos(testPhotos);
    }
  } catch (error) {
    console.error("Ошибка инициализации фотографий:", error);
  }
}

/**
 * Инициализация формы загрузки.
 */
function initializeForm() {
  const uploadForm = document.querySelector(".img-upload__form");
  const pristine = initializeValidation(uploadForm);

  handleSubmit(uploadForm, pristine);
}

/**
 * Основная инициализация приложения.
 */
function init() {
  initializePhotos();
  initializeForm();
}

init();
