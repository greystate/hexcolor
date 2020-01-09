import {
	randomColor, randomInt, randomByte,
	convertToRange, neatlySpaced, prettyClose, wayLarger
} from './helpers.js'

class HexColor {
	constructor(value) {
		if (typeof value !== 'string') {
			value = randomColor()
		}
		
		this.color = value.toLowerCase()
		
		if (!this.color.startsWith('#')) {
			this.color = `#${this.color}`
		}

		if (this.color.length === 4) {
			const c = this.color.split('')
			this.color = `${c[0]}${c[1]}${c[1]}${c[2]}${c[2]}${c[3]}${c[3]}`
		}
	}
	
	shorten() {
		const parts = this.color.split('')
		const filtered = parts.filter((el, idx) => idx <= 1 || idx === 3 || idx === 5)
		
		return filtered.join('')
	}
	
	toDSLight() {
		const [r, g, b] = this.toRGB(true)
		const sum = (r + g + b) / 3
		let value = 'middle'
		
		if (sum >= 170) {
			value = 'light'
		} else if (sum <= 85) {
			value = 'dark'
		}
			
		return value
	}
	
	toHSL() {
		const value = this.color.replace('#', '')
		let [red, green, blue] = this.toRGB()
		red /= 255
		green /= 255
		blue /= 255
		
		const min = Math.min(red, green, blue)
		const max = Math.max(red, green, blue)
	
		let hue = 0
		let saturation = 0
	
		// Find lightness
		const lvalue = (min + max) / 2 * 100
		const lightness = lvalue.toFixed()
	
		// Find saturation
		let svalue
		if (min !== max) {
			if (lightness < 0.5) {
				svalue = (max - min) / (max + min) * 100
			} else {
				svalue = (max - min) / (2.0 - max - min) * 100
			}
		}
		
		saturation = svalue.toFixed()

		// Find hue
		let hvalue
		
		switch (max) {
			case red :
				hvalue = (green - blue) / (max - min)
				break
			case green :
				hvalue = 2.0 + (blue - red) / (max - min)
				break
			case blue :
				hvalue = 4.0 + (red - green) / (max - min)
				break
		}
				
		hvalue *= 60
		if (hvalue < 0) {
			hvalue += 360
		}
		
		hue = hvalue.toFixed(2)
	
		// Return result
		return [Number(hue), Number(saturation), Number(lightness)]
	}
	
	toDSSat() {
		const [r, g, b] = this.toRGB(true)
		const max = Math.max(r, g, b) 
		const min = Math.min(r, g, b) 
		
		let sat = 'muted'
		
		if (r === g && g === b) {
			sat = 'gray'
		} else if (max - min > 200) {
			sat = 'saturated'
		} else if (max - min > 96) {
			sat = 'washed'
		}
		
		return sat
	}
	
	toRGB(shorten) {
		let color = this.color
		if (shorten === true) {
			color = this.shorten()
		}
		
		const value = color.replace('#', '')
		let r, g, b, red, green, blue
		
		if (shorten === true) {
			r = value.substring(0, 1).toDecimal()
			g = value.substring(1, 2).toDecimal()
			b = value.substring(2, 3).toDecimal()
			red = r * 16 + r
			green = g * 16 + g
			blue = b * 16 + b
		} else {
			red = value.substring(0, 2).toDecimal()
			green = value.substring(2, 4).toDecimal()
			blue = value.substring(4, 6).toDecimal()
		}
		
		return [red, green, blue]
	}
	
	toDSHue() {
		const max = 15
		const tolerance = 3
		const [red, green, blue] = this.toRGB(true)
		
		const r = convertToRange(red, 0, 255, 0, max)
		const g = convertToRange(green, 0, 255, 0, max)
		const b = convertToRange(blue, 0, 255, 0, max)
		
		const evenlySpaced = neatlySpaced(r, g, b)
	
		let hue = 'undetermined' // We have no idea yet
		
		// White or black?
		if (r === 0 && r === g && g === b) { return 'black' }
		if (r === max && r === g && g === b) { return 'white' }
		
		// Primary colors
		if (r > g && prettyClose(g, b, tolerance) && !evenlySpaced) { return 'red' }
		if (g > r && prettyClose(r, b, tolerance) && !evenlySpaced) { return 'green' }
		if (b > g && prettyClose(g, r, tolerance) && !evenlySpaced) { return 'blue' }
		
		// Secondary colors
		if (prettyClose(r, g, tolerance) && r > b && !evenlySpaced) { return 'yellow' }
		if (prettyClose(b, g, tolerance) && b > r && !evenlySpaced) { return 'cyan' }
		if (prettyClose(r, b, tolerance) && r > g && !evenlySpaced) { return 'magenta' }
		
		// Tertiary colors
		if (evenlySpaced && (r > g && g > b)) { return 'orange' }
		if (evenlySpaced && (g > r && r > b)) { return 'chartreuse' }
		if (evenlySpaced && (g > b && b > r)) { return 'spring green' }
		if (evenlySpaced && (b > g && g > r)) { return 'azure' }
		if (evenlySpaced && (b > r && r > g)) { return 'purple' }
		if (evenlySpaced && (r > b && b > g)) { return 'rose' }
		
		// If none of the above, see if we're close to the primaries
		if (r === max && prettyClose(g, b)) { return 'red' }
		if (g === max && prettyClose(r, b)) { return 'green' }
		if (b === max && prettyClose(r, g)) { return 'blue' }
		
		// ... or the secondaries
		if (prettyClose(r, g) && wayLarger(g, b)) { return 'yellow' }
		if (prettyClose(g, b) && wayLarger(g, r)) { return 'cyan' }
		if (prettyClose(r, b) && wayLarger(r, g)) { return 'magenta' }
		
		// ... or tertiaries
		if (wayLarger(r, g) && wayLarger(g, b)) { return 'orange' }
		if (wayLarger(g, r) && wayLarger(r, b)) { return 'chartreuse' }
		if (wayLarger(g, b) && wayLarger(b, r)) { return 'spring green' }
		if (wayLarger(b, g) && wayLarger(g, r)) { return 'azure' }
		if (wayLarger(b, g) && wayLarger(r, g)) { return 'purple' }
		if (wayLarger(r, b) && wayLarger(b, g)) { return 'rose' }
		
		// is it gray?
		if (prettyClose(r, g) && prettyClose(g, b)) { return 'gray' }
		
		return hue
	}
	
	toDeSandro() {
		const hue = this.toDSHue()
		const light = this.toDSLight()
		let deSandro = ''
		
		switch (hue) {
			case 'black':
			case 'white':
				deSandro = hue
				break
			case 'gray':
				deSandro = `${light} gray`
				break
			default:
				deSandro = `${light} ${this.toDSSat()} ${hue}`
		}
		
		return deSandro
	}
}

export { HexColor }
