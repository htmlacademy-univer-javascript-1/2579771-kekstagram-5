/**
 * Генерация случайного целого числа в заданном диапазоне.
 * @param {number} min - Минимальное значение.
 * @param {number} max - Максимальное значение.
 * @returns {number} - Случайное целое число от min до max (включительно).
*/
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

