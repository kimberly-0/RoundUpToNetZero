export function convertToDecimalNum(num) {
    return num.toFixed().substring(0, num.toFixed().length-2) + "." + num.toFixed().substring(num.toFixed().length - 2);
}