import { renderPhotos } from "./photoRender.js";
import { generatePhotos } from "./data.js";

/**
 * Функция инициализации процесса генерации фотографий и добавления фотографий в DOM-дерево.
 * Процесс: Генерация данных фотографий -> Рендеринг фотографий
 * (Поиск необходимых элементов в дереве, добавление сгненрированных данных, добавлние слушателей событий для элементов)
 */
function init() {
  const photos = generatePhotos();
  renderPhotos(photos);
}

init();
