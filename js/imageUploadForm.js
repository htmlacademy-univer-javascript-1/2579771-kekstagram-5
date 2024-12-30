const uploadInput = document.querySelector(".img-upload__input");
const uploadOverlay = document.querySelector(".img-upload__overlay");
const uploadCancel = document.querySelector(".img-upload__cancel");
const body = document.body;
const previewImage = document.querySelector(".img-upload__preview img");
const effectsPreviews = document.querySelectorAll(".effects__preview");

let escapeHandler;

/**
 * Показывает форму редактирования изображения, добавляет соответствующие обработчики событий.
 */
const showEditForm = () => {
  uploadOverlay.classList.remove("hidden");
  body.classList.add("modal-open");

  uploadCancel.addEventListener("click", closeEditForm);

  escapeHandler = (event) => {
    if (event.key === "Escape" && !uploadOverlay.classList.contains("hidden")) {
      closeEditForm();
    }
  };
  document.addEventListener("keydown", escapeHandler);
};

/**
 * Закрывает форму редактирования изображения, удаляет соответствующие обработчики событий и сбрасывает поле загрузки.
 */
export function closeEditForm() {
  uploadOverlay.classList.add("hidden");
  body.classList.remove("modal-open");
  uploadInput.value = "";

  // Удаление обработчиков событий
  uploadCancel.removeEventListener("click", closeEditForm);
  document.removeEventListener("keydown", escapeHandler);
  escapeHandler = null;
}

/**
 * Обработчик изменения значения input для загрузки изображения.
 * Загружает файл, отображает его в предварительном просмотре и показывает форму редактирования.
 */
uploadInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      previewImage.src = fileReader.result;

      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url("${fileReader.result}")`;
      });
      showEditForm();
    };

    fileReader.readAsDataURL(file);
  }
});
