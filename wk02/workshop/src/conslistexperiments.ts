import { show, IMPLEMENT_THIS, IMPLEMENT_THIS_TYPE } from "./show";
import { cons,concat,toArray,fromArray,map,forEach,concatMap,len,ConsList,head,rest,} from "./conslists";
import { flip } from "./flip";

const firstPart = cons("T",cons("h",cons("e",cons(" ",cons("a",cons("n",cons("s",cons("w",cons("e",cons("r",cons(" ",cons("t",cons("o",cons(" ",cons("t",cons("h",cons("e",cons(" ",cons("q",cons("u",cons("e",cons("s",null))))))))))))))))))))));
const secondPart = cons("t",cons("i",cons("o",cons("n",cons(" ",cons("i",cons("s",cons(" ",cons("s",cons("e",cons("v",cons("e",cons("n",cons("t",cons("y",cons(" ",cons("n",cons("i",cons("n",cons("e",null))))))))))))))))))));

const twoPartsTogether = concat(firstPart)(secondPart);

show(toArray(firstPart))("firstPart");
show(toArray(secondPart))("secondPart");
show(toArray(twoPartsTogether))("twoPartsTogether");

const concatSolution = len(twoPartsTogether);

show("The answer is " + concatSolution)("listlength");

// the following are the column and row ids for a spreadsheet
// the cells can be accessed by looking up their ids
// which are the column and row ids together: 'A1', 'B3', etc.
const columns = fromArray(["A", "B", "C", "D", "E"]);
const rows = fromArray([1, 2, 3, 4]);

/**
 * the list of indices of all cells in the given row
 */
function indices(rowId: number): ConsList<string> {
    return map((s: string) => s + String(rowId))(columns);
}

// generate all cell indices in the table
const concatMapSolution = concatMap(indices)(rows);

// place a message in every cell of the table
forEach(show("Hello"), concatMapSolution);

type Suit = string;
type Rank = number;
type Card = Readonly<{
    suit: Suit;
    rank: Rank;
}>;

const card: (suit: Suit) => (rank: Rank) => Card = suit => rank => ({
    suit,
    rank,
});

const suits: ConsList<Suit> = fromArray(["♠", "♣", "♢", "♡"]);
const ranks: ConsList<Rank> = fromArray([1,2,3,4,5,6,7,8,9,10,11,12,13]);

/** ======= EXERCISE 1 =============================
 * Create a deck of cards by combining suits and ranks.
 * /Hint/: Use `concatMap` and `map` to apply the `card` function to each suit and rank.
 * @returns a list of cards
 */
const deck : ConsList<Card>
 = IMPLEMENT_THIS;

show(
    toArray(deck)
        .map(({ suit, rank }) => suit + rank)
        .join(","),
)("carddeck");

/**
 * Applicative Functor
 * going a bit further... maybe come back and look at this after
 * we have learned about Functors, Applicative and Monad in Haskell
 */
const apply: <T, U>(
    fl: ConsList<(_: T) => U>,
) => (l: ConsList<T>) => ConsList<U> = fl => l =>
    fl ? concat(map(head(fl))(l))(apply(rest(fl))(l)) : null;

// now we can use map to create a list of partially applied card constructors for each rank
const suitCards = map(card)(suits);

// now we apply the partial card constructors to ranks
const deck2 = apply(suitCards)(ranks);

/** Functor Map and Monadic binding - adapted from Applied 2 */
type Maybe<T> = ConsList<T>;
const
    just = <T>(value: T): Maybe<T> => cons(value, null),
    nothing = null,
    then : <T>(m: Maybe<T>) => (f: (x: T) => T) => Maybe<T>
        = flip(map),
    bind : <T>(m: Maybe<T>) => (f: (x: T) => Maybe<T>) => Maybe<T>
        = flip(concatMap);

/**
 * Parses a string into a number wrapped in a `Maybe`.
 * Returns `Just<number>` if the string is a valid number, otherwise `Nothing`.
 *
 * @param str - The string to parse
 * @returns `Just<number>` if parsing succeeds, otherwise `Nothing`
 */
function parseNumber(str: string): Maybe<number> {
    const n = parseFloat(str);
    return isNaN(n) ? nothing : just(n);
}
/**
 * Calculates the reciprocal of a number (1 / n).
 *
 * @param n - A non-zero number
 * @returns The reciprocal of `n`
 */
function reciprocal(n: number): number {
    return 1 / n;
}
/**
 * Checks that a number is non-zero.
 * Returns `Just<number>` if the input is not 0, otherwise `Nothing`.
 *
 * @param n - The number to check
 * @returns `Just<number>` if `n` is not 0, otherwise `Nothing`
 */
function nonZero(n: number): Maybe<number> {
    return n === 0 ? nothing : just(n);
}

/** ======= EXERCISE 2 =============================
 * @param s - The string to parse and calculate the reciprocal
 * execute parseNumber, nonZero, and reciprocal in sequence
 * Chain them with either `concatMap` and `map` or `bind` and `then`
 * @returns `Just<number>` if all operations succeed, otherwise `Nothing`.
 */
function maybeCalculate(s: string): Maybe<number> {
    return IMPLEMENT_THIS
}

function tryShow<T>(value: Maybe<T>, id: string): void {
    show(value ? String(head(value)) : "Nothing")(id);
}

tryShow(maybeCalculate("2"),'shouldBeHalf'); // 0.5
tryShow(maybeCalculate("hi!"),'shouldBeNothing1'); // Nothing
tryShow(maybeCalculate("0"),'shouldBeNothing2'); // Nothing

export { reciprocal, parseNumber, nonZero, maybeCalculate, deck, concatSolution, concatMapSolution };

