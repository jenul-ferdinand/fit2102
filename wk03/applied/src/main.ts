/**
 * Please have a look at the README file before attempting these exercises.
 *
 * You must make all the tests pass, indicated by a green ✓, and
 * follow all the instructions given in the code file for each exercise.
 *
 * The code must compile with no Typescript warnings or errors.
 *
 * * Must use Observables and Observable operators. Using `addEventListener`
 * * or similar will result in 0 marks unless explicitly required.
 *
 * Marks are only awarded for correct understanding of the question
 * and demonstration of concepts.
 *
 * Completing the tasks with correctly compiling code does not guarantee
 * full marks.
 *
 * Make sure you understand the question and your solution.
 *
 * Ask a tutor if in doubt!
 *
 * **There are hints throughout these exercises encoded in base64.**
 * You can use online tools such as https://www.base64decode.org/
 * to decode them.
 *
 * **Reminders**
 *
 * You must **not** use for-loops, while-loops, or similar imperative
 * techniques in these exercises unless explicitly approved, required,
 * or provided.
 *
 * * All code outside of the `subscribe` callback must be pure and
 * * values immutable.
 *
 * This means declaring variables with `const`, using `Readonly` and
 * `... as const` to ensure immutable types, and avoiding using mutating
 * methods such as `Array.prototype.push()`.
 *
 * * Code inside the `subscribe` may have side effects (e.g. updating DOM), but
 * * **must not** mutate values.
 */

import "./style.css";

import { fromFetch } from "rxjs/fetch";

import {
    concat,
    concatMap,
    delay,
    filter,
    fromEvent,
    interval,
    map,
    merge,
    of,
    scan,
    switchMap,
    takeUntil,
    timer,
    zip,
    partition,
    type Observable,
} from "rxjs";

// Stub value to indicate an implementation
const IMPLEMENT_THIS: any = undefined;
type IMPLEMENT_THIS = any;

type RectProps = Readonly<{
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
}>;

const SVG_WIDTH = 600;
const SVG_HEIGHT = 600;

const startProps = {
    x: 100,
    y: 70,
    width: 120,
    height: 80,
    fill: "#95B3D7",
} as RectProps;

const initialiseRect = (props: RectProps, id: string) => {
    // get the svg canvas element
    const svg = document.getElementById(id)!;
    svg.setAttribute("height", String(SVG_HEIGHT));
    svg.setAttribute("width", String(SVG_WIDTH));
    const rect = document.createElementNS(svg.namespaceURI, "rect");
    Object.entries(props).forEach(([key, val]) =>
        rect.setAttribute(key, String(val)),
    );
    svg.appendChild(rect);

    return rect;
};

/*****************************************************************
 * Exercise 1
 *
 * Display the mouse cursor position.
 *
 * Iff the x value is > 400, attach the "highlight" class.
 *
 * Parts of the implementation have been filled in for you.
 *
 * see: https://tgdwyer.github.io/functionalreactiveprogramming/#a-user-interface-example
 */

/**
 * An example of traditional event driven programming style - this is what we are
 * replacing with observable.
 * The following adds a listener for the mouse event handler,
 * sets p and adds or removes a highlight depending on x position
 */
function mousePosEvents() {
    const pos = document.getElementById("pos_event")!;

    document.addEventListener("mousemove", ({ clientX, clientY }) => {
        const p = clientX + ", " + clientY;
        pos.textContent = p;
        if (clientX > 400) {
            pos.classList.add("highlight");
        } else {
            pos.classList.remove("highlight");
        }
    });
}

/**
 * Reimplement mousePosEvents using observables.
 */
function mousePosObservable() {
    // The ! tells Typescript this is a non-null value
    const elem = document.getElementById("pos_obs")!;

    /** Write your code after here */

    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
    const source$ = fromEvent<MouseEvent>(document, "mousemove");

    source$
        .pipe(
            map(({ pageX, pageY }) => ({
                text: `${pageX}, ${pageY}`,
                highlight: pageX > 400
            }))
        ) // This must be pure
        .subscribe(({ text, highlight }) => {
            elem.textContent = text
            elem.classList.toggle('highlight', highlight)
        }); // Side effects should be contained here
}

/*****************************************************************
 * Exercise 2
 *
 * Demonstrates the interval method.
 *
 * Animate a rectangle that moves in the x direction and stops.
 *
 * We want to choose an interval so the rectangle animates smoothly
 * and terminates after 1 second (1000 milliseconds).
 *
 * Do NOT use Element.getAttribute as that is using the DOM to store
 * state. Impure accumulation of state will result in 0 marks.
 *
 * Parts of the implementation have been filled in for you.
 *
 * /Hint/: Have a look through the operators we covered in the
 *  readings.
 *
 * see: https://tgdwyer.github.io/functionalreactiveprogramming/#observable-cheatsheet
 */

function animatedRect() {
    const rect = initialiseRect(startProps, "animatedRect");

    /** Write your code after here */

    const source$ = interval(30);

    // Movement
    const moveRight$ = source$
        .pipe(
            takeUntil(timer(1000)),
            scan(((total, n) => total + n)),
        )
        .subscribe((newX: any) => 
            // Update the x pos of the rectangle
            rect.setAttribute("x", String(newX)),
        );
}

/*****************************************************************
 * Exercise 3
 *
 * Keeping track of multi-value state.
 *
 * Animate the rectangle so that it moves diagonally down-right
 * for 1.41s.
 *
 * Do NOT use Element.getAttribute as that is using the DOM to store
 * state. Impure accumulation of state will result in 0 marks.
 *
 * /Hint/: How did we keep track of the x value in Exercise 2?
 *
 * /Hint 2/: What can we use to store more than 1 value?
 *
 * see: https://tgdwyer.github.io/functionalreactiveprogramming/#observable-streams
 */
function animatedRect2() {
    const rect = initialiseRect(startProps, "animatedRect2");

    /** Write your code after here */

    const moveDownRight$ = interval(10)
        .pipe(
            // Stop taking values after some amount of time
            takeUntil(timer(700)),

            // Update position of rectangle
            scan((total, n) => total + n),

            // Map to two values
            map(x => ({ x: x/2, y: x/2 }))
        )
        .subscribe(({ x, y }: any) => {
            rect.setAttribute("x", String(x));
            rect.setAttribute("y", String(y));
        });
}

/*****************************************************************
 * Exercise 4
 *
 * Create and control a rectangle using the keyboard!
 *
 *
 * /Challenge/: Try to make the rectangle move smoothly! This may
 *  require some research and changing the way we implement movement.
 */
function keyboardControl() {
    const rect = initialiseRect(startProps, "moveableRect");

    /** Write your code after here */

    const key$ = fromEvent<KeyboardEvent>(document, "keydown");

    interface Mover {
        axis: 'x' | 'y'
        amount: number
    }

    /**
     * Create an observable for a particular keypress.
     *
     * Reference for KeyBoard events https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
     *
     * @param keyCode
     * @param IMPLEMENT_THIS Add as many properties as you want to
     * identify the keypress and the associated change in state.
     * @returns Observable stream that indicates changes in state for
     *  the particular keypress
     */
    const fromKey = (keyCode: string, move: Mover) =>
        key$.pipe(
            filter(({ code }) => code === keyCode),
            map((event) => { 
                scan((total: number, _) => {
                    return total + move.amount
                })
            }),
        );

    /**
     * /Hint/: QW4gb2JqZWN0IGxpa2UgeyBheGlzOiAneCcgfCAneScsIGFtb3VudDogaW50IH0gY2FuIGJlIHVzZWQgdG8gcmVwcmVzZW50IGEgcGFydGljdWxhciBrZXlwcmVzcy4gRS5nLiBQcmVzc2luZyBLZXlBIG1pZ2h0IHByb2R1Y2UgeyBheGlzOiAneCcsIGFtb3VudDogLTEwIH0=
     */

    /** Decrease x */
    const left$ = fromKey("KeyA", IMPLEMENT_THIS);
    /** Decrease y */
    const up$ = fromKey("KeyW", IMPLEMENT_THIS);
    /** Increase x */
    const right$ = fromKey("KeyD", IMPLEMENT_THIS);
    /** Increase y */
    const down$ = fromKey("KeyS", IMPLEMENT_THIS);

    /**
     * /Hint/: What operator can we use to merge observables?
     *         Have a look through the operators we covered in the
     *         readings.
     *
     * /Hint 2/: This should make use of the scan function
     */

    IMPLEMENT_THIS(left$, down$, up$, right$)
        .pipe()
        .subscribe(({ x, y }: IMPLEMENT_THIS) => {
            rect.setAttribute("x", String(x));
            rect.setAttribute("y", String(y));
        });
}

/*****************************************************************
 * Exercise 5
 *
 * Add some code which looks at the data.csv file
 * This code shall console.log a string (second column)
 * after a specified delay (first column)
 *
 * You must use observables for this, and do not use setTimeout.
 *
 * The expected order of the output in the developer console would be:
 * Apple (after 1 second)
 * Cherry (after another second, two in total)
 * Banana (after another second, three in total)
 * Another Banana (after seven more seconds, 10 in total)
 *
 * This does not match up with the order from the csv, as the delays
 * are absolute from starting the stream
 *
 * WARNING: This question is a step up in difficulty compared to previous,
 * and is heavily related to your assignment in idea.
 *
 * This question will likely be a challenge, and may require reading some
 * documentation for possible ideas.
 *
 * The teaching team will not provide too many tips, apart from clarifying the
 * question. Try to explore ideas on how you could approach this.
 *
 * If you cannot complete, the question, leave a comment explaining what you
 * tried, and you will get full marks.
 */

function printWithDelay() {
    // This fetches the csv from your computer and converts it to a string
    const { protocol, hostname, port } = new URL(import.meta.url);
    const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ""}`;

    fromFetch(`${baseUrl}/src/data.csv`)
        .pipe(
            switchMap(response => {
                if (!response.ok) throw new Error("Failed to fetch CSV");
                return response.text();
            }),
        )
        .subscribe(console.log);
}
/**
 * Do Not Modify
 */
document.addEventListener("DOMContentLoaded", () => {
    mousePosEvents();
    mousePosObservable();

    animatedRect();
    animatedRect2();

    keyboardControl();
    printWithDelay();
});
