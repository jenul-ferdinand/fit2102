// Warm up: compute the main operations on arrays using only Array.reduce()
// See https://tgdwyer.github.io/javascript1#reduce

const IMPLEMENT_THIS = undefined;

/**
 * @returns the length of an array
 */
function length(a) {
    return a.reduce((acc, _) => { 
        return acc + 1
    });
}

/**
 * @returns a copy of an array
 * 
 * Using the spread operator to build up a copy of the 
 * original array.
 */
function copy(a) {
    return a.reduce((acc, x) => [...acc, x], [])
}

/**
 * @returns a copy of an array in reverse order
 * 
 * Using the spread operator once again but the current 
 * value `x` comes first before the accumulator.
 */
function reverse(a) {
    return a.reduce((acc, x) => [x, ...acc], []);
}

/**
 * @returns an array of the result of applying f to each element of a
 */
function map(a, f) {
    return a.reduce((acc, x) => [...acc, f(x)], []);
}

/**
 * @returns an array containing the elements of a for which f applied to the element is true
 */
function filter(a, f) {
    return a.reduce((acc, x) => f(x) ? acc.concat(x) : acc, []);
}


