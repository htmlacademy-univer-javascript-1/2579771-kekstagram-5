// Массив с сообщениями для комментариев
const messages = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];

// Массив c описаниями фотографии
const descriptions = [
  "Фото сделано в самом центре города, когда солнце только начало садиться.",
  "Прекрасный момент, пойманный на природе, с солнечными лучами, пробивающимися через деревья.",
  "Эта фотография была сделана во время путешествия по горам. Вечер, туман и немного мистики.",
  "Отличный кадр с друзьями на празднике! Эмоции переполняют.",
  "Удивительный вид на город с высоты птичьего полета. Горы, дома и небо в одном кадре.",
  "Момент из отпуска, когда мы катались на лодке по реке. Спокойствие и умиротворение.",
];

// Массив с именами пользователей
const names = [
  "Артём", "Мария", "Иван", "Светлана", "Никита", "Елена", "Дмитрий", "Ольга", "Максим", "Александра"
];

/**
 * Генерация случайного целого числа в заданном диапазоне.
 * @param {number} min - Минимальное значение.
 * @param {number} max - Максимальное значение.
 * @returns {number} - Случайное целое число от min до max (включительно).
*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
      const randomMessage = messages[getRandomInt(0, messages.length - 1)];
      randomMessages.push(randomMessage);
    }

    const randomName = names[getRandomInt(0, names.length - 1)];
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
    description: descriptions[getRandomInt(0, descriptions.length - 1)],
    likes: getRandomInt(15, 200),
    comments: generateComments()
  };
}

/**
 * Генерация массива из 25 фотографий.
 * Каждая фотография представляет собой объект с уникальным id, url, описанием, лайками и комментариями.
 * @returns {Array} - Массив из 25 объектов фотографий.
*/
function generatePhotos() {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    photos.push(generatePhoto(i));
  }
  return photos;
}

const generatedPhotos = generatePhotos();
console.log(generatedPhotos);
