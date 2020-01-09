import {
	randomInt, randomByte, randomColor,
	prettyClose, neatlySpaced, wayLarger, convertToRange
} from '../../src/helpers.js'

describe("Helpers", () => {
	
	describe("{string}.toDecimal", () => {
		it("converts a hexstring to its decimal equivalent (or undefined if n/a)", () => {
			expect('ff'.toDecimal()).toEqual(255)
		})
	
		it("works with or without the hash at the beginning", () => {
			expect('#c3'.toDecimal()).toEqual(195)
		})
	})
	
	describe("randomColor", () => {
		it("generates a 6-digit random color code", () => {
			expect(randomColor()).toMatch(/^#([0-9a-f]{2}){3}$/)
		})
	})
	
	describe("randomInt", () => {
		it("generates a random integer between 'min' and 'max'", () => {
			const rnd10 = randomInt()
			expect(rnd10).toBeLessThanOrEqual(10)
			expect(rnd10).toBeGreaterThanOrEqual(0)

			const rnd37 = randomInt(3, 7)
			expect(rnd37).toBeLessThanOrEqual(7)
			expect(rnd37).toBeGreaterThanOrEqual(3)
		})
	})

	describe("randomByte", () => {
		it("generates a random 2-digit byte", () => {
			expect(randomByte()).toMatch(/^[0-9a-f]{2}$/)
		})
	})

	describe("convertToRange", () => {
		it("converts a value to its equivalent in another range", () => {
			expect(convertToRange(255, 0, 255, 0, 9)).toEqual(9)
			expect(convertToRange(35, 0, 255, 0, 9)).toEqual(1)
			expect(convertToRange(120, 0, 255, 0, 9)).toEqual(4)
		})	
	})

	describe("prettyClose", () => {
		it("checks to see if two values are 'almost' equal", () => {
			expect(prettyClose(24, 25)).toBeTruthy()
			expect(prettyClose(22, 25)).toBeFalsy()
		})
	})

	describe("wayLarger", () => {
		it("checks to see if one value is 'much' larger than another", () => {
			expect(wayLarger(20, 2)).toBeTruthy()
			expect(wayLarger(16, 14)).toBeFalsy()
		})
	})

	describe("neatlySpaced", () => {
		it("checks to see if one value is kinda in the middle between two others", () => {
			expect(neatlySpaced(0, 5, 10)).toBeTruthy()
			expect(neatlySpaced(10, 6, 0)).toBeTruthy()
			expect(neatlySpaced(10, 0, 5)).toBeTruthy()
		
			expect(neatlySpaced(10, 12, 30)).toBeFalsy()
		})
	})
})
