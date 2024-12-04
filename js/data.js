import { getRandomInt } from "./utils.js";
import { MESSAGES, DESCRIPTIONS, NAMES} from "./constants.js";

/**
 * Генерация случайных комментариев для фотографии.
 * Количество комментариев выбирается случайным образом (от 0 до 30).
 * Каждый комментарий состоит из уникального id, сообщений, имени отправителя и аватарки отправителя.
 * @returns {Array} - Массив объектов комментариев.
*/
function generateComments() {
  const commentsCount = getRandomInt(0, 30);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    const messagesCount = getRandomInt(1, 3);
    const randomMessages = [];

    for(let j = 0; j < messagesCount; j++) {
      const randomMessage = MESSAGES[getRandomInt(0, MESSAGES.length - 1)];
      randomMessages.push(randomMessage);
    }

    const randomName = NAMES[getRandomInt(0, NAMES.length - 1)];
    const avatarNumber = getRandomInt(1, 6);
    comments.push({
      id: i + 1,
      avatar: `img/avatar-${avatarNumber}.svg`,
      message: randomMessages.join("\n"),
      name: randomName
    });
  }

  return comments;
}

/**
 * Генерация одного объекта фотографии.
 * Каждая фотография имеет уникальный id, url, описание, количество лайков и случайные комментарии.
 * @param {number} id - Идентификатор фотографии.
 * @returns {Object} - Объект, представляющий фотографию с уникальными аттрибутами.
*/
function generatePhoto(id) {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInt(15, 200),
    comments: generateComments()
  };
}

/**
 * Генерация массива из 25 фотографий.
 * Каждая фотография представляет собой объект с уникальным id, url, описанием, лайками и комментариями.
 * @returns {Array} - Массив из 25 объектов фотографий.
*/
export function generatePhotos() {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    photos.push(generatePhoto(i));
  }
  return photos;
}
