import {multiply} from '../common/lib/math/functions/Mat3Func.js';

const rad = Math.PI / 6;
const a = [ 
    Math.cos(rad), -Math.sin(rad), 0, 
    Math.sin(rad), Math.cos(rad), 0, 
    0, 0, 1];

    const b = [ 
        1, 0, 100, 
        0, 1, 50, 
        0, 0, 1];

    const c = [ 
        1.5, 0, 0, 
        0, 1.5, 0, 
        0, 0, 1];

const res = [a, b, c].reduce((a,b) => multiply([], b, a))

// https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix()
console.log('res', res);