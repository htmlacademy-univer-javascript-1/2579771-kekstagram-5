/**
 * Открывает фотографию в полноэкранном режиме.
 * Заполняет блок с фотографией и комментариями.
 *
 * @param {Object} photo - Объект фотографии.
 */
export function openBigPicture(photo) {
  const bigPicture = document.querySelector(".big-picture");
  const body = document.body;

  const imgElement = bigPicture.querySelector(".big-picture__img img");
  const likesElement = bigPicture.querySelector(".likes-count");
  const commentsElement = bigPicture.querySelector(".comments-count");
  const descriptionElement = bigPicture.querySelector(".social__caption");
  const commentsLoaderElement = bigPicture.querySelector(".comments-loader");

  imgElement.src = photo.url;
  imgElement.alt = photo.description;
  likesElement.textContent = photo.likes;
  commentsElement.textContent = photo.comments.length;
  descriptionElement.textContent = photo.description;

  const allComments = [...photo.comments];
  let displayedComments = allComments.slice(0, 5);
  let remainingComments = allComments.slice(5);

  renderComments(displayedComments);

  updateCommentCount(displayedComments.length, allComments.length);

  commentsLoaderElement.classList.toggle("hidden", remainingComments.length === 0);

  commentsLoaderElement.addEventListener("click", () => {
    const nextComments = remainingComments.slice(0, 5);
    displayedComments = displayedComments.concat(nextComments);

    remainingComments = remainingComments.slice(5);

    renderComments(displayedComments);

    updateCommentCount(displayedComments.length, allComments.length);

    commentsLoaderElement.classList.toggle("hidden", remainingComments.length === 0);
  });

  bigPicture.classList.remove("hidden");
  body.classList.add("modal-open");

  addCloseListeners(bigPicture, body);
}

/**
 * Рендерит комментарии в блок .social__comments
 *
 * @param {Array} comments - Массив комментариев.
 */
function renderComments(comments) {
  const commentList = document.querySelector(".social__comments");
  commentList.innerHTML = "";

  comments.forEach((comment) => {
    const li = document.createElement("li");
    li.classList.add("social__comment");
    li.innerHTML = `
        <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
        <p class="social__text">${comment.message}</p>
      `;
    commentList.appendChild(li);
  });
}

/**
 * Обновляет счётчик комментариев в блоке .social__comment-count.
 *
 * @param {number} displayed - Количество показанных комментариев.
 * @param {number} total - Общее количество комментариев.
 */
function updateCommentCount(displayed, total) {
  const commentCountElement = document.querySelector(".social__comment-count");
  const commentsCountElement = commentCountElement.querySelector(".comments-count");

  commentsCountElement.textContent = total;
  commentCountElement.firstChild.textContent = `${displayed} из `;
}

/**
 * Закрывает полноэкранное окно при клике на кнопку или нажатию на ESC
 *
 * @param {Element} bigPicture - Элемент окна с изображением.
 * @param {Element} body - Элемент body для удаления класса modal-open.
 */
function addCloseListeners(bigPicture, body) {
  const closeButton = bigPicture.querySelector(".big-picture__cancel");
  closeButton.addEventListener("click", () => {
    closeBigPicture(bigPicture, body);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeBigPicture(bigPicture, body);
    }
  });
}

/**
 * Закрывает полноэкранное окно фотографии.
 *
 * @param {Element} bigPicture - Элемент окна с изображением.
 * @param {Element} body - Элемент body для удаления класса modal-open.
 */
function closeBigPicture(bigPicture, body) {
  bigPicture.classList.add("hidden");
  body.classList.remove("modal-open");
}
