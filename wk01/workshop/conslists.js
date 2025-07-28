// Stub value to indicate an implementation
const IMPLEMENT_THIS = undefined;

//Warm up - demonstrated activity:
// Recall simple linked-list data structures that you have undoubtedly
// seen in the past in various languages.
// Typically, each node in the list has two properties:
// one that stores the data value associated with the node
// one that stores a pointer to the next node in the list
//                    or null if we are at the end of the list
// In JS we can represent a list node with a simple object with two
// properties {value:theData, next:thePointer}
// a list containing the values 1,2 and 3, would look like:
// {value: 1, next: {value: 2, next: {value: 3, next:null}}}
// we can make a function to construct a linked list node like so:
function ll(head, rest = null) {
    return { 
        value: head, 
        next: rest 
    }
}

// now we can make a list using this function:
const linkedList = ll(1, ll(2, ll(3)));

// we can also make accessor functions to get values out of the list:
function lHead(l) {
    return l.value;
}
function lRest(l) {
    return l.next;
}

// and now functions to traverse the list:
function lForEach(f, l) {
    if (l) {
        f(lHead(l));
        lForEach(f, lRest(l));
    }
}

lForEach(console.log, linkedList);

/*****************************************************************
 * The Cons list is a simple immutable data structure composed
 * only with functions, using closures to capture data.
 * see also: https://tgdwyer.github.io/functionaljavascript/#computation-with-pure-functions
 *
 * This is essentially equivalent to linked lists.
 *
 * Implement the following functions to define a Cons list.
 */

/**
 * Cons "constructs" a list node, if no second argument is specified it is the last node in the list
 *
 * @param head Head of cons list, the value to be stored
 * @param rest Tail of cons list, reference to the rest of the cons list
 * @returns Cons list, function in closure
 */
function cons(head, rest = null) {
    return (selector) => selector(head, rest);
}

/**
 * Head selector
 *
 * @param list Non-empty cons list, remember this is a function!
 * @returns First element in cons list
 */
function head(list) {
    return list((head, rest) => head);
}

/**
 * Rest selector
 *
 * @param list Non-empty cons list, remember this is a function!
 * @returns Rest of the cons list
 */
function rest(list) {
    return list((head, rest) => rest);  
}

/*****************************************************************
 * Higher order functions are applicable on any data type we can think of.
 * This, of course, also applies to the Cons list.
 *
 * Implement the following higher order functions for Cons lists.
 */

/**
 * Use this as an example for other functions!
 *
 * @param f Function to use for each element
 * @param list Cons list
 */
function forEach(f, list) {
    if (list) {
        f(head(list))
        forEach(f, rest(list))
    }
}

/**
 * Map for cons list
 *
 * @param f Function to apply
 * @param list Cons list to map
 * @returns New cons list with f applied to elements
 */
function map(f, list) {
    return cons(f(head(list)), map(f, rest(list)))
}

/**
 * Reduce for cons list
 *
 * @param {(acc, val) => any} f Reducing function, this combines 
 * the accumulator with the current value. Note that the 
 * accumulator value is the first parameter, and the current 
 * value is the second parameter.
 * 
 * @param acc Accumulated value, initial value
 * @param list Cons list to reduce
 * 
 * @returns New cons list with f applied to elements
 */
function reduce(f, acc, list) {
    return IMPLEMENT_THIS;
}

/**
 * Filter for cons list
 *
 * @param f Function to accept or reject values
 * @param list Cons list to filter
 * @returns New cons list with only accepted values
 */
function filter(f, list) {
    return IMPLEMENT_THIS;
}
