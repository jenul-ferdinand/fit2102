import { describe, it, expect } from "vitest";
import { map, head, concatMap, len, toArray } from "../src/conslists";
import { concatSolution, concatMapSolution, deck, parseNumber, nonZero, reciprocal, maybeCalculate } from "../src/conslistexperiments";

describe("conslistexperiments", () => {
    it("should concat two cons lists correctly", () => {
        expect(concatSolution).toEqual(42);
    });

    it("concatMap solution", () => {
        const expected = ['A1','B1','C1','D1','E1','A2','B2','C2','D2','E2','A3','B3','C3','D3','E3','A4','B4','C4','D4','E4'];
        expect(toArray(concatMapSolution)).toEqual(expected);
    });

    it("should create a deck of cards", () => {
        expect(len(deck)).toBe(52);
    });

    it("maybeCalculateSteps", () => {
        const parsed = parseNumber("0.5");
        expect(parsed).not.toBeNull();
        const nz = concatMap(nonZero)(parsed!);
        const recip = map(reciprocal)(nz!)!;
        expect(head(recip)).toBe(2);
    });
    it("maybeCalculate returns reciprocal for valid non-zero string", () => {
        const result = maybeCalculate("2");
        expect(result).not.toBeNull();
        expect(head(result!)).toBe(0.5);
    });
    it("maybeCalculate returns Nothing for non-number string", () => {
        expect(maybeCalculate("hi")).toBeNull();
    });
    it("maybeCalculate returns Nothing for zero string", () => {
        expect(maybeCalculate("0")).toBeNull();
    });
});
