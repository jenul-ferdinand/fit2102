import { expect } from "chai";
import { diffChars } from "diff";
import {
    anObject,
    anotherObject,
    binaryTree,
    depthBinaryTree,
    mapBinaryTree,
    naryTree,
    depthNaryTree,
    mapNaryTree,
    just,
    nothing,
    mapMaybe,
    flatMapMaybe,
    chainFunctions,
} from "../src/main.ts";

import "mocha";

mocha.setup("bdd");
describe("exercise_1_suite", () => {
    describe("anObject", () => {
        it("is an object", () => {
            expect(anObject).is.a("object");
        });
        it("has property x set to 5", () => {
            expect(anObject).to.include.keys("x");
            expect(anObject.x).equal(5);
        });
    });

    describe("anotherObject", () => {
        it("is an object", () => {
            expect(anotherObject).is.a("object");
        });
        it("has property x set to 5", () => {
            expect(anotherObject).to.include.keys("x");
            expect(anotherObject.x).equal(5);
        });
        it("has property y set to 10", () => {
            expect(anotherObject).to.include.keys("y");
            expect(anotherObject.y).equal(10);
        });
    });
});

describe("exercise_3_suite", () => {
    describe("binaryTree", () => {
        it("creates a leaf node", () => {
            expect(binaryTree(1)).to.deep.equal({
                data: 1,
                left: undefined,
                right: undefined,
            });
        });

        it("creates a node with one left child", () => {
            expect(binaryTree(1, binaryTree(2))).to.deep.equal({
                data: 1,
                left: { data: 2, left: undefined, right: undefined },
                right: undefined,
            });
        });

        it("creates a node with both children", () => {
            expect(binaryTree(1, binaryTree(2), binaryTree(3))).to.deep.equal({
                data: 1,
                left: { data: 2, left: undefined, right: undefined },
                right: { data: 3, left: undefined, right: undefined },
            });
        });
    });

    describe("depthBinaryTree", () => {
        it("computes depth correctly", () => {
            const tree = binaryTree(
                1,
                binaryTree(2, binaryTree(3)),
                binaryTree(4),
            );
            expect(depthBinaryTree(tree)).to.equal(3);
        });
    });

    describe("mapBinaryTree", () => {
        it("maps function correctly over the tree", () => {
            const tree = binaryTree(1, binaryTree(2), binaryTree(3));
            const result = mapBinaryTree(tree, x => x * 2);
            expect(result).to.deep.equal({
                data: 2,
                left: { data: 4, left: undefined, right: undefined },
                right: { data: 6, left: undefined, right: undefined },
            });
        });
    });
});

describe("exercise_4_suite", () => {
    describe("naryTree", () => {
        it("creates a node with no children", () => {
            expect(naryTree(1)).to.deep.equal({ data: 1, children: [] });
            expect(naryTree(1, [])).to.deep.equal({ data: 1, children: [] });
        });

        it("creates a node with multiple children", () => {
            expect(naryTree(1, [naryTree(2), naryTree(3)])).to.deep.equal({
                data: 1,
                children: [
                    { data: 2, children: [] },
                    { data: 3, children: [] },
                ],
            });
        });

        it("creates a nested n-ary tree", () => {
            expect(naryTree(1, [naryTree(2, [naryTree(3)])])).to.deep.equal({
                data: 1,
                children: [
                    {
                        data: 2,
                        children: [{ data: 3, children: [] }],
                    },
                ],
            });
        });
    });

    describe("depthNaryTree", () => {
        it("computes depth correctly", () => {
            const tree = naryTree(1, [
                naryTree(2),
                naryTree(3, [naryTree(4, [naryTree(5)])]),
            ]);
            expect(depthNaryTree(tree)).to.equal(4);
        });
    });

    describe("mapNaryTree", () => {
        it("maps function correctly over the tree", () => {
            const tree = naryTree(1, [naryTree(2), naryTree(3)]);
            const result = mapNaryTree(tree, x => x + "!");
            expect(result).to.deep.equal({
                data: "1!",
                children: [
                    { data: "2!", children: [] },
                    { data: "3!", children: [] },
                ],
            });
        });
    });
});

describe("exercise_5_suite", () => {
    describe("mapMaybe", () => {
        it("maps over a Just value", () => {
            const input = just(2);
            const result = mapMaybe(input, x => x * 3);
            expect(result).to.deep.equal(just(6));
        });

        it("does not map over Nothing", () => {
            const result = mapMaybe(nothing, (x: number) => x * 3);
            expect(result).to.equal(nothing);
        });
    });

    describe("flatMapMaybe", () => {
        it("flatMaps over a Just and returns another Just", () => {
            const input = just(10);
            const result = flatMapMaybe(input, x =>
                x > 0 ? just(x * 2) : nothing,
            );
            expect(result).to.deep.equal(just(20));
        });

        it("flatMaps over a Just and returns Nothing", () => {
            const input = just(0);
            const result = flatMapMaybe(input, x =>
                x === 0 ? nothing : just(x),
            );
            expect(result).to.equal(nothing);
        });

        it("does not flatMap over Nothing", () => {
            const result = flatMapMaybe(nothing, (_x: number) => just(1));
            expect(result).to.equal(nothing);
        });
    });

    describe("chainFunctions", () => {
        it("returns Just with reciprocal for valid number string", () => {
            const result = chainFunctions("4");
            expect(result).to.deep.equal(just(0.25));
        });

        it("returns Nothing for invalid number string", () => {
            const result = chainFunctions("foo");
            expect(result).to.equal(nothing);
        });

        it("returns Nothing for zero input", () => {
            const result = chainFunctions("0");
            expect(result).to.equal(nothing);
        });
    });
});
