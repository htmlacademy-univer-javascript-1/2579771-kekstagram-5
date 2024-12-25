/**
 * Прямой доступ к глобальному объекту Pristine
 * @type {Object}
 */
const Pristine = window.Pristine;

/** Максимальное количество хэш-тегов */
const MAX_HASHTAG_COUNT = 5;
/** Максимальная длина комментария */
const MAX_COMMENT_LENGTH = 140;

/**
 * Инициализация валидации формы с использованием Pristine.
 * @param {HTMLFormElement} uploadForm - Форма загрузки изображения.
 * @returns {Object} - Экземпляр Pristine для валидации.
 */
export function initializeValidation(uploadForm) {
  const pristine = new Pristine(uploadForm, {
    classTo: "img-upload__field-wrapper",
    errorTextParent: "img-upload__field-wrapper",
    errorTextClass: "img-upload__error",
  });

  pristine.addValidator(
    document.querySelector(".text__hashtags"),
    validateHashtags,
    getHashtagsErrorMessage,
    1,
    true
  );

  pristine.addValidator(
    document.querySelector(".text__description"),
    validateComment,
    getCommentErrorMessage,
    1,
    true
  );

  return pristine;
}

/**
 * Проверка валидности хэш-тегов.
 * @param {string} value - Значение поля хэш-тегов.
 * @returns {boolean} - Результат проверки (валиден или нет).
 */
function validateHashtags(value) {
  if (!value) {
    return true;
  }
  const hashtags = value.toLowerCase().trim().split(/\s+/);
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/;

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    return false;
  }
  for (let i = 0; i < hashtags.length; i++) {
    if (!hashtagRegex.test(hashtags[i]) || hashtags.indexOf(hashtags[i]) !== i) {
      return false;
    }
  }
  return true;
}

/**
 * Сообщение об ошибке для хэш-тегов.
 * @param {string} value - Значение поля хэш-тегов.
 * @returns {string} - Текст ошибки (если есть).
 */
function getHashtagsErrorMessage(value) {
  const hashtags = value.toLowerCase().trim().split(/\s+/);
  if (hashtags.length > MAX_HASHTAG_COUNT) {
    return `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэш-тегов.`;
  }
  const invalidTag = hashtags.find((tag) => !/^#[a-zа-яё0-9]{1,19}$/.test(tag));
  if (invalidTag) {
    return `Хэш-тег "${invalidTag}" некорректен.`;
  }
  const duplicateTag = hashtags.find((tag, index) => hashtags.indexOf(tag) !== index);
  if (duplicateTag) {
    return `Хэш-тег "${duplicateTag}" используется более одного раза.`;
  }
  return "";
}

/**
 * Проверка валидности комментария.
 * @param {string} value - Значение поля комментария.
 * @returns {boolean} - Результат проверки (валиден или нет).
 */
function validateComment(value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

/**
 * Сообщение об ошибке для комментария.
 * @returns {string} - Текст ошибки для комментария.
 */
function getCommentErrorMessage() {
  return `Комментарий не должен превышать ${MAX_COMMENT_LENGTH} символов.`;
}
