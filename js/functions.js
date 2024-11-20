/**
 * Функция, которая проверяет, соответствует ли длина строки указанному максимуму.
 *
 * @param {string} str - Строка для проверки.
 * @param {number} maxLen - Максимальная допустимая длина строки.
 * @return {boolean} Возвращает true, если длина строки меньше или равна maxLen, иначе false.
*/
function checkStringLength(str, maxLen) {
  return str.length <= maxLen;
}

/**
 * Функция, которая проверяет, является ли строка палиндромом.
 * Игнорирует пробелы и регистр символов.
 *
 * @param {string} str - Строка для проверки.
 * @return {boolean} Возвращает true, если строка является палиндромом, иначе false.
*/
function isPalindrome(str) {
  const normalizedString = str.replace(/\s+/g, '').toLowerCase();
  return normalizedString === normalizedString.split('').reverse().join('');
}

/**
 * Функция, которая извлекает цифры из строки и возвращает их в виде целого числа.
 * Если входные данные являются числом, обрабатываются как строка.
 * Если цифры отсутствуют, возвращает NaN.
 *
 * @param {string|number} input - Входные данные для обработки.
 * @return {number} Целое число, если цифры найдены, иначе NaN.
*/
function extractNumbers(input) {
  if (typeof input === 'number') {
    input = Math.abs(input).toString();
  }
  const digits = input.match(/\d+/g)?.join('') || '';
  return digits ? parseInt(digits, 10) : NaN;
}
