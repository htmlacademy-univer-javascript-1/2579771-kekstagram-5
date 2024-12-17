import { setupCommentLoader } from "./comments.js";
import { addCloseListeners } from "./closeHandlers.js";

/**
 * Открывает фотографию в полноэкранном режиме.
 * @param {Object} photo - Объект фотографии.
 */
export function openBigPicture(photo) {
  const bigPicture = document.querySelector(".big-picture");
  const body = document.body;

  fillPhotoDetails(bigPicture, photo);
  setupCommentSection(photo);

  bigPicture.classList.remove("hidden");
  body.classList.add("modal-open");

  addCloseListeners(bigPicture, body);
}

/**
 * Заполняет детали фотографии: изображение, лайки и описание.
 * @param {Element} bigPicture - Элемент окна.
 * @param {Object} photo - Данные фотографии.
 */
function fillPhotoDetails(bigPicture, photo) {
  const imgElement = bigPicture.querySelector(".big-picture__img img");
  const likesElement = bigPicture.querySelector(".likes-count");
  const descriptionElement = bigPicture.querySelector(".social__caption");

  imgElement.src = photo.url;
  imgElement.alt = photo.description;
  likesElement.textContent = photo.likes;
  descriptionElement.textContent = photo.description;
}

/**
 * Настраивает секцию комментариев.
 * @param {Object} photo - Объект фотографии.
 */
function setupCommentSection(photo) {
  const commentsLoaderElement = document.querySelector(".comments-loader");
  const commentList = document.querySelector(".social__comments");

  const allComments = [...photo.comments];
  const { remainingComments } = setupCommentLoader(allComments, commentList);

  commentsLoaderElement.classList.toggle("hidden", remainingComments.length === 0);
}
