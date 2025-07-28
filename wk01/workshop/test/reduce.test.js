describe("Do everything with reduce", function () {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    it("length", function () {
        expect(length(arr)).to.equal(arr.length);
    });
    it("copy", function () {
        expect(copy(arr)).to.deep.equal(arr);
    });
    it("reverse", function () {
        expect(reverse(arr)).to.deep.equal(arr.reverse());
    });
    it("map", function () {
        expect(map(arr, (x) => x + 1)).to.deep.equal(arr.map((x) => x + 1));
    });
    it("filter", function () {
        expect(filter(arr, (x) => x % 2 === 0)).to.deep.equal(
            arr.filter((x) => x % 2 === 0),
        );
    });
});

window.onload = function () {
    mocha.run();
};
