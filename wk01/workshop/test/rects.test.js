function hash(v) {
    let a = 1,
        c = 0,
        h,
        o;
    let s = "" + Math.round(v);
    if (s) {
        a = 0;
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            a = ((a << 6) & 268435455) + o + (o << 14);
            c = a & 266338304;
            a = c !== 0 ? a ^ (c >> 21) : a;
        }
    }
    return a;
}

describe("overlappingIntervals", function () {
    it("left overlaps right", function () {
        expect(overlappingIntervals(1, 3)(2, 4)).to.equal(true);
    });
    it("right overlaps left", function () {
        expect(overlappingIntervals(2, 4)(1, 3)).to.equal(true);
    });
    it("first contains second", function () {
        expect(overlappingIntervals(1, 4)(2, 3)).to.equal(true);
    });
    it("second contains first", function () {
        expect(overlappingIntervals(2, 3)(1, 4)).to.equal(true);
    });
    it("left disjoint from right", function () {
        expect(overlappingIntervals(1, 2)(4, 5)).to.equal(false);
    });
    it("right disjoint from left", function () {
        expect(overlappingIntervals(4, 5)(1, 2)).to.equal(false);
    });
});
describe("overlap", function () {
    it("correctly calculates overlaps in x and y", function () {
        const expectedIds =
            "SvgjsRect1055SvgjsRect1058SvgjsRect1059SvgjsRect1060SvgjsRect1061SvgjsRect1063SvgjsRect1064SvgjsRect1065SvgjsRect1066SvgjsRect1068SvgjsRect1070SvgjsRect1071SvgjsRect1072SvgjsRect1075SvgjsRect1077SvgjsRect1079SvgjsRect1080SvgjsRect1081SvgjsRect1082SvgjsRect1086SvgjsRect1088SvgjsRect1090SvgjsRect1092SvgjsRect1094SvgjsRect1095SvgjsRect1096";
        const { bounds, rects } = getGeometry();
        const overlapSelection = overlap(bounds);
        const overlappingRects = rects
            .filter(overlapSelection("x"))
            .filter(overlapSelection("y"));
        const ids = overlappingRects.reduce(
            (s, r) => s + r.svgRect.getAttribute("id"),
            "",
        );
        expect(ids).to.equal(expectedIds);
    });
});
describe("rectanglesOverlappingSelection", function () {
    it("correct overlapping set (returned result is orange)", function () {
        const expectedIds =
            "SvgjsRect1055SvgjsRect1058SvgjsRect1059SvgjsRect1060SvgjsRect1061SvgjsRect1063SvgjsRect1064SvgjsRect1065SvgjsRect1066SvgjsRect1068SvgjsRect1070SvgjsRect1071SvgjsRect1072SvgjsRect1075SvgjsRect1077SvgjsRect1079SvgjsRect1080SvgjsRect1081SvgjsRect1082SvgjsRect1086SvgjsRect1088SvgjsRect1090SvgjsRect1092SvgjsRect1094SvgjsRect1095SvgjsRect1096";
        const { bounds, rects } = getGeometry();
        const overlappingRects = rectanglesOverlappingSelection(bounds, rects);
        overlappingRects.forEach((r) => r.setFill("orange"));
        const ids = overlappingRects.reduce(
            (s, r) => s + r.svgRect.getAttribute("id"),
            "",
        );
        expect(ids).to.equal(expectedIds);
    });
});
describe("sumAreasOverlappingSelection", function () {
    it("area correct", function () {
        const { bounds, rects } = getGeometry();
        const area = sumAreasOverlappingSelection(bounds, rects);
        expect(hash(area)).to.equal(232717087);
    });
});
describe("boundingRect", () =>
    it("boundary of selected rectangles computed correctly", function () {
        const { rects } = getGeometry();
        const bounds = rects.reduce(boundingRect);
        let sum = ["x", "y", "X", "Y"].reduce(
            (sum, p) => sum + Math.round(bounds[p]),
            0,
        );
        expect(hash(sum)).to.equal(202556113);
    }));

describe("zoom to fit", () =>
    it("if computeBoundsRectanglesOverlappingSelection worked, this will zoom to fit the highlighted rectangles...", function () {
        const { bounds, rects } = getGeometry();
        const vb = computeBoundsRectanglesOverlappingSelection(bounds, rects);
        expect(vb).to.deep.equal({
            x: 198.43663,
            y: 271.51392,
            X: 499.338965,
            Y: 439.903839,
        });
        setTimeout(function () {
            const svg = document.getElementById("svgCanvas");
            bounds.svgRect.setAttribute("visibility", "hidden");
            const animate = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "animate",
            );
            Object.entries({
                attributeName: "viewBox",
                begin: "2s",
                dur: "1s",
                to: `${vb.x} ${vb.y} ${vb.X - vb.x} ${vb.Y - vb.y}`,
                fill: "freeze",
            }).forEach(([key, val]) => animate.setAttribute(key, val));
            svg.appendChild(animate);
        }, 1000);
    }));
