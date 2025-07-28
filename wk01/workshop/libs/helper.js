/* Simple hash function from https://gist.github.com/iperelivskiy/4110988
   Not meant to be particularly secure, just easier for you to solve the problem than reverse the hash
   */
function hash(s) {
    let a = 1,
        c = 0,
        h,
        o;
    if (s) {
        a = 0;
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            a = ((a << 6) & 268435455) + o + (o << 14);
            c = a & 266338304;
            a = c !== 0 ? a ^ (c >> 21) : a;
        }
    }
    return String(a);
}

class Rectangle {
    constructor(svgRect) {
        this.svgRect = svgRect;
        ["x", "y", "width", "height"].forEach(
            (p) => (this[p] = this.getNumberAttribute(p)),
        );
    }
    setFill(colour) {
        this.svgRect.setAttribute("style", "fill:" + colour);
        return this;
    }
    getNumberAttribute(name) {
        return Number(this.svgRect.getAttribute(name));
    }
    get X() {
        return this.x + this.width;
    }
    get Y() {
        return this.y + this.height;
    }
}

window.onload = function () {
    const { bounds, rects } = getGeometry();
    mocha.run();
};

function getGeometry() {
    const svgRects = [].slice.call(document.getElementsByTagName("rect")),
        normalRects = svgRects.filter((r) => r.id != "boundingRect"),
        boundingRect = svgRects.filter((r) => r.id == "boundingRect")[0],
        makeRect = (r) => new Rectangle(r);
    return {
        bounds: makeRect(boundingRect),
        rects: normalRects.map(makeRect),
    };
}
