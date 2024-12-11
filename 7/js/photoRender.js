import {openBigPicture} from "./photoFullsizeRender.js";

/**
 * Функция, которая рендерит список фотографий в контейнер pictures.
 *
 * @param {Array} photoList - Массив объектов фотографий. Каждый объект должен содержать `url`, `description`, `likes` и `comments`.
 */
export function renderPhotos(photoList) {
  const picturesContainer = document.querySelector(".pictures");
  const fragment = document.createDocumentFragment();

  photoList.forEach((photo) => {
    const template = document.querySelector("#picture");
    const pictureElement = template.content.cloneNode(true);

    const imgElement = pictureElement.querySelector(".picture__img");
    const likesElement = pictureElement.querySelector(".picture__likes");
    const commentsElement = pictureElement.querySelector(".picture__comments");

    imgElement.src = photo.url;
    imgElement.alt = photo.description;
    likesElement.textContent = photo.likes;
    commentsElement.textContent = photo.comments.length;

    pictureElement.querySelector("a").addEventListener("click", (event) => {
      event.preventDefault();
      openBigPicture(photo);
    });

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
}
