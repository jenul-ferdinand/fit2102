// Stub value to indicate an implementation
const IMPLEMENT_THIS = undefined;

/**
 * @param (u,U) first interval
 * @param (v,V) second interval
 * @returns true if two intervals [u,U] and [v,V] overlap
 * (u,U,v and V are numbers)
 *
 * u===U
 *   v====V
 *
 *   u===U
 * v===v
 *
 * u=====U
 *  v===V
 *
 *  u===U
 * v======V
 *
 * u==U
 *      v===V
 *
 *      u===U
 * v==V
 */
const overlappingIntervals = (u, U) => (v, V) => {
    return Math.max(u, v) < Math.min(U, V)
};

/**
 * for a given:
 * @param ref reference rectangle
 * @returns a function which, for a given dimension 
 * ('x' or 'y'), returns true if the given rectangle r 
 * overlaps ref in that dimension.
 * 
 * /Hint/: use dim.toUpperCase() to get the max extent in dim
 */
function overlap(ref) {
    return (dim) => (r) => {
        return overlappingIntervals(
            ref[dim], ref[dim.toUpperCase()]
        )(
            r[dim], r[dim.toUpperCase()]
        )
    };
}

/**
 * See the web-preview:
 * - selection is the orange dotted rectangle.
 * - rects which overlap the selection are light blue.
 * - the test will turn the rectangles returned by this function orange.
 *
 * Our rectangles have the following properties:
 *   x: left side position
 *   y: top (SVG vertical coordinates increase downwards)
 *   X: right
 *   Y: bottom
 *   width: X-x
 *   height: Y-y
 *
 * (Use:
 *   [].filter(U=>boolean)
 *   overlap(dim)
 *
 * @param {a bounding rectangle} bounds
 * @param {an array of rectangles} rects
 * @returns the subset of rectangles which overlap with the specified selection from rects.
 */
function rectanglesOverlappingSelection(selection, rects) {
    return rects
        .filter(rect => 
            overlap(rect)('x')(selection) &&
            overlap(rect)('y')(selection)
        ) 
}

/**
 * @param bounds a bounding rectangle
 * @param rects an array of rectangles
 * @returns the sum of areas of rects that overlap with the specified
 * boundary without writing your own loop or conditional expressions.
 *
 * /Hint/ Use the functions:
 *   [].map(U=>V)
 *   [].reduce((V, U)=> V, V)
 */
function sumAreasOverlappingSelection(selection, rects) {
    return rectanglesOverlappingSelection(selection, rects)
        .map(r => (r.X - r.x)*(r.Y - r.y))
        .reduce((sum, area) => sum + area, 0)
}

/**
 * @param r1 first rectangle
 * @param r2 second rectangle
 * @returns a new rectangle minimally enclosing r1 and r2
 *
 * /Hint/ create the rectangle object with x,y,X,Y properties
 *        use Math.min(), Math.max() to get the extents of the given rects
 */
function boundingRect(r1, r2) {
    return {
        x: Math.min(r1.x, r2.x),
        y: Math.min(r1.y, r2.y),
        X: Math.max(r1.X, r2.X),
        Y: Math.max(r1.Y, r2.Y)
    }
}

/**
 * Putting it all together...
 * for the given:
 * @param selection the orange selection rectangle
 * @param rects the full set of rectangles
 * @returns the boundary rectangle of the subset of rects which overlap with the selection
 *
 * If you implement this correctly you will see the web page zoom to exactly fit the light blue rects.
 */
function computeBoundsRectanglesOverlappingSelection(selection, rects) {
    IMPLEMENT_THIS;
}
