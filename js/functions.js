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

/**
 * Функция, которая проверяет, укладывается ли встреча в рабочий день.
 *
 * @param {string} startWork - Время начала рабочего дня в формате "часы:минуты".
 * @param {string} endWork - Время окончания рабочего дня в формате "часы:минуты".
 * @param {string} startMeeting - Время начала встречи в формате "часы:минуты".
 * @param {number} duration - Продолжительность встречи в минутах.
 * @return {boolean} Возвращает true, если встреча укладывается в рабочий день, иначе false.
 */
function isMeetingInWorkday(startWork, endWork, startMeeting, duration) {
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map((num) => parseInt(num, 10));
    return hours * 60 + minutes;
  }

  const workStart = timeToMinutes(startWork);
  const workEnd = timeToMinutes(endWork);

  const meetingStart = timeToMinutes(startMeeting);
  const meetingEnd = meetingStart + duration;

  return meetingStart >= workStart && meetingEnd <= workEnd;
}
