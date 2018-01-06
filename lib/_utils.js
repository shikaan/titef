const TEXT_FORMAT = {
    RED: "\x1b[31m",
    GREEN: "\x1b[32m",
    YELLOW: "\x1b[33m",
    RESET: "\x1b[0m",
    BOLD: "\x1b[1m"
}

const isNumber = (value) => Object.prototype.toString.call(value) === '[object Number]';
const isFunction = (value) => Object.prototype.toString.call(value) == '[object Function]';
const print = (...args) => console.log(...args, TEXT_FORMAT.RESET);
const getName = (value) => isFunction(value) ? value.name : String(value);

module.exports = {
    isNumber,
    isFunction,
    getName,
    print,
    TEXT_FORMAT
}