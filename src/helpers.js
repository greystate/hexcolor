function convertToRange(input, inMin = 0, inMax = 255, outMin = 0, outMax = 6) {
	const percent = (input - inMin) / (inMax - inMin)
	const output = percent * (outMax - outMin) + outMin

	return Math.round(output)
}

function prettyClose(first, second, delta = 1) {
	if (first > second) {
		[second, first] = [first, second]
	}
	
	return (second === first) || (second - first) <= delta
}

function wayLarger(first, second) {
	return first > (second * 1.5)
}

function neatlySpaced(bottom, middle, top) {
	[bottom, middle, top] = [top, middle, bottom].sort((a, b) => a - b)
	
	return (top > middle && middle > bottom) && prettyClose(top - middle, middle - bottom, 3)
}

function randomColor() {
	const r = randomByte()
	const g = randomByte()
	const b = randomByte()

	return `#${r}${g}${b}`
}

function randomInt(min = 0, max = 10) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return min + Math.floor(Math.random() * (max - min + 1))
}

function randomByte() {
	const byte = randomInt(0, 255).toString(16)
	if (byte.length === 1) {
		return `0${byte}`
	} else {
		return byte
	}
}

String.prototype.toDecimal = function() {
	const value = this.replace('#', '')
	const val = parseInt(value, 16)
	if (isNaN(val)) {
		return undefined
	} else {
		return val
	}
}

export { randomColor, randomInt, randomByte, prettyClose, neatlySpaced, wayLarger, convertToRange }
