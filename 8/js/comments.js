/**
 * Рендерит комментарии в блок.
 * @param {Array} comments - Массив комментариев.
 * @param {Element} container - Контейнер для комментариев.
 */
export function renderComments(comments, container) {
  container.innerHTML = "";
  comments.forEach((comment) => {
    container.appendChild(createCommentElement(comment));
  });
}

/**
   * Создаёт элемент комментария.
   * @param {Object} comment - Данные комментария.
   * @returns {Element} - DOM элемент комментария.
   */
function createCommentElement(comment) {
  const li = document.createElement("li");
  li.classList.add("social__comment");
  li.innerHTML = `
        <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
        <p class="social__text">${comment.message}</p>
      `;
  return li;
}

/**
   * Настраивает загрузку комментариев по клику.
   * @param {Array} allComments - Все комментарии.
   * @param {Element} commentList - Контейнер для комментариев.
   */
export function setupCommentLoader(allComments, commentList) {
  let displayedComments = allComments.slice(0, 5);
  let remainingComments = allComments.slice(5);

  renderComments(displayedComments, commentList);
  updateCommentCount(displayedComments.length, allComments.length);

  const loader = document.querySelector(".comments-loader");
  loader.classList.toggle("hidden", remainingComments.length === 0);

  function handleCommentsClick() {
    const nextComments = remainingComments.slice(0, 5);
    displayedComments = displayedComments.concat(nextComments);
    remainingComments = remainingComments.slice(5);

    renderComments(displayedComments, commentList);
    updateCommentCount(displayedComments.length, allComments.length);

    loader.classList.toggle("hidden", remainingComments.length === 0);
  }

  loader.addEventListener("click", handleCommentsClick);

  return handleCommentsClick;
}

/**
   * Обновляет счётчик комментариев.
   * @param {number} displayed - Количество показанных комментариев.
   * @param {number} total - Общее количество комментариев.
   */
function updateCommentCount(displayed, total) {
  const commentCountElement = document.querySelector(".social__comment-count");
  const commentsCountElement = commentCountElement.querySelector(".comments-count");

  commentsCountElement.textContent = total;
  commentCountElement.firstChild.textContent = `${displayed} из `;
}
