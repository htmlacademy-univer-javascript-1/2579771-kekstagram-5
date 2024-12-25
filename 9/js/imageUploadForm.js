const uploadInput = document.querySelector(".img-upload__input");
const uploadOverlay = document.querySelector(".img-upload__overlay");
const uploadCancel = document.querySelector(".img-upload__cancel");
const body = document.body;
const previewImage = document.querySelector(".img-upload__preview img");
const effectsPreviews = document.querySelectorAll(".effects__preview");

/**
 * Показывает форму редактирования изображения, добавляя соответствующие классы.
 */
const showEditForm = () => {
  uploadOverlay.classList.remove("hidden");
  body.classList.add("modal-open");
};

/**
 * Закрывает форму редактирования изображения и сбрасывает поле загрузки.
 */
export const closeEditForm = () => {
  uploadOverlay.classList.add("hidden");
  body.classList.remove("modal-open");
  uploadInput.value = "";
};

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

/**
 * Обработчик для кнопки отмены. Закрывает форму редактирования.
 */
uploadCancel.addEventListener("click", closeEditForm);

/**
 * Обработчик нажатия клавиши Escape для закрытия формы редактирования.
 */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !uploadOverlay.classList.contains("hidden")) {
    closeEditForm();
  }
});
