const Decimal = require('decimal.js');

function minus(x,y,decimal = 8) {
    x = x.toFixed(decimal);
    y = y.toFixed(decimal);
    let x1 = new Decimal(x);
    let y1 = new Decimal(y);
    let z = x1.minus(y1);
    return parseFloat(z.toFixed(decimal));
}

function add(x,y,decimal = 8) {
    x = x.toFixed(decimal);
    y = y.toFixed(decimal);
    let x1 = new Decimal(x);
    let y1 = new Decimal(y);
    let z = x1.plus(y1);
    return parseFloat(z.toFixed(decimal));
}

function parse(x,decimal = 8) {
    return parseFloat(x.toFixed(decimal));
}

function countDecimalPlaces(x) {
    if (Math.floor(x.valueOf()) === x.valueOf()) {return 0;}

    let str = x.toString();
    if (str.indexOf('.') !== -1 && str.indexOf('-') !== -1) {
        return str.split('-')[1] || 0;
    } else if (str.indexOf('.') !== -1) {
        return str.split('.')[1].length || 0;
    }
    return str.split('-')[1] || 0;
}

module.exports = {
    minus,
    add,
    parse,
    countDecimalPlaces,
};