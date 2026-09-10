'use strict';

/**
 * Возвращает глубокую копию переданного объекта.
 *
 * Внутри объекта поддерживаются следующие типы данных: number, bigint, string,
 * boolean, null, undefined, Array<*> и Plain Object. Для остальных типов данных
 * выбрасывается ошибка. Объект может быть произвольной вложенности. Не
 * поддержваются циклические ссылки.
 *
 * @param {Object} obj -- объект для глубокого копирования
 *
 * @example
 * // returns { a: 1, b: { c: 2 } }, но b -- независимая от оригинала копия
 * deepClone({ a: 1, b: { c: 2 } });
 *
 * @throws {TypeError} Если тип obj не входит в список поддерживаемых
 *
 * @returns {Object}
 */

const deepClone = (obj) => {
    const type = typeof obj;
    
    if (
        obj === null ||
        (type !== 'symbol' && type !== 'object' && type !== 'function')
    ) return obj;

    if (type === 'object') {
        if (Array.isArray(obj)) return obj.map(deepClone);
        
        if (Object.getPrototypeOf(obj) === Object.prototype)
            return Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [key, deepClone(value)])
            );
    }

    throw new TypeError('Unsupported data type object');
};
