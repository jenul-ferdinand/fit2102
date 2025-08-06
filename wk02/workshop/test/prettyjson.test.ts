import { describe, expect, it } from "vitest";
import { prettifyJson } from "../src/prettyjson";

describe("prettyjson suite", () => {
    describe("Base cases", () => {
        it("null", () => {
            expect(prettifyJson(null)).is.equal("null");
        });
        it("string", () => {
            expect(prettifyJson("hello")).is.equal("hello");
        });
        it("number", () => {
            expect(prettifyJson(0)).is.equal("0");
            expect(prettifyJson(-1)).is.equal("-1");
            expect(prettifyJson(123)).is.equal("123");
        });
        it("boolean", () => {
            expect(prettifyJson(false)).is.equal("false");
            expect(prettifyJson(true)).is.equal("true");
        });
    });
    const strip = (s: string) => s.replace(/\s/g, "");
    describe("Arrays", () => {
        it("simple array", () => {
            expect(strip(prettifyJson([1, 2, 3, 4]))).is.equal("[1,2,3,4]");
        });
    });
    describe("Objects", () => {
        it("simple object", () => {
            expect(strip(prettifyJson({ a: 1 }))).is.equal("{a:1}");
        });
        it("complex object", () => {
            const str = `{
        unit: FIT2102,
        year: 2021,
        semester: S2,
        active: true,
        assessments: {
          week1: null,
          week2: Tutorial 1 Exercise,
          week3: Tutorial 2 Exercise
        },
        languages: [
          Javascript,
          Typescript,
          Haskell,
          Minizinc
        ]
      }`;
            expect(strip(prettifyJson(str))).equal(strip(str));
        });
    });
});
