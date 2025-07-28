describe("Basic cons list construction and access", function () {
    const list = () => cons(1, cons(2, cons(3, cons(4, cons(5, null)))));
    const f = (h, r, acc = []) => {
        const newAcc = acc.concat(h);
        if (r === null) {
            return newAcc;
        }
        return newAcc.concat(r(f));
    };

    describe("function `cons`", function () {
        it("exists", function () {
            expect(cons).is.a("function");
        });
        it("creates a list", function () {
            expect(list).to.not.throw();
            const data = list()(f);
            expect(data).to.deep.equal([1, 2, 3, 4, 5]);
        });
    });

    describe("function `head`", function () {
        it("exists", function () {
            expect(head).is.a("function");
        });
        expect("extracts the value of the cons list", function () {
            expect(head(list())).to.equal(1);
        });
    });

    describe("function `rest`", function () {
        it("exists", function () {
            expect(rest).is.a("function");
        });
        it("extracts the rest of the cons list", function () {
            expect(head(rest(list()))).to.equal(2);
            expect(head(rest(rest(list())))).to.equal(3);
        });
    });

    describe("function `forEach`", function () {
        it("exists", function () {
            expect(forEach).is.a("function");
        });
        it("can be used to sum a list", function () {
            forEach(console.log, list());
            let mutableSum = 0;
            function effectfulSummer(x) {
                mutableSum += x;
            }
            forEach(effectfulSummer, list());
            expect(mutableSum).to.equal(15);
        });
    });
});

describe("Operations over cons lists", function () {
    const list = () => cons(1, cons(2, cons(3, cons(4, cons(5, null)))));
    const f = (h, r, acc = []) => {
        const newAcc = acc.concat(h);
        if (r === null) {
            return newAcc;
        }
        return newAcc.concat(r(f));
    };

    describe("function `map`", function () {
        it("exists", function () {
            expect(map).is.a("function");
        });
        it("can be used to add one", function () {
            console.log(list()(f));
            expect(map((x) => x + 1, list())(f)).to.deep.equal(
                list()(f).map((x) => x + 1),
            );
        });
    });

    describe("function `reduce`", function () {
        it("exists", function () {
            expect(reduce).is.a("function");
        });
        it("can be used to calculate a sum", function () {
            expect(reduce((acc, x) => acc + x, 0, list())).to.equal(15);
        });
        it("reduces in the correct order from left to right", function () {
            expect(reduce((acc, x) => x - acc, 0, list())).to.equal(3);
        });
    });

    describe("function `filter`", function () {
        it("exists", function () {
            expect(filter).is.a("function");
        });

        it("can be used to remove odd numbers", function () {
            expect(filter((x) => x % 2 === 0, list())(f)).to.deep.equal(
                list()(f).filter((x) => x % 2 === 0),
            );
        });
    });
});
window.onload = function () {
    mocha.run();
};
