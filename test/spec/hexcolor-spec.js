
import { HexColor } from '../../src/hexcolor.js'

describe("HexColor", () => {
	it("generates a random color when called with no arguments", () => {
		const random = new HexColor()
		expect(random.color).toMatch(/^#([0-9a-f]{2}){3}$/)
	})
	
	it("can take a hexcolor value", () => {
		const hexcol = new HexColor('#de345f')
		expect(hexcol.color).toEqual('#de345f')
	})

	it("can take a shortened hexcolor value", () => {
		const hexcol = new HexColor('#d39')
		expect(hexcol.color).toEqual('#dd3399')
	})
	
	it("can take a hexcolor value without the pound sign", () => {
		const hexcolor = new HexColor('314abc')
		const hexshort = new HexColor('963')
		
		expect(hexcolor.color).toEqual('#314abc')
		expect(hexshort.color).toEqual('#996633')
	})
	
	it("normalizes case to lowercase", () => {
		const hexcolor = new HexColor("#DECAF5")
		expect(hexcolor.color).toEqual('#decaf5')
	})
	
	describe("shorten", () => {
		it("reduces a 6-digit color to 3 digits", () => {
			const hexcol = new HexColor('#fdb830')
			expect(hexcol.shorten()).toEqual('#fb3')
		})
	})
	
	describe("toRGB", () => {
		it("returns the color as RGB", () => {
			const color = new HexColor('#ff8000')
			expect(color.toRGB()).toEqual([255, 128, 0])
		})
		
		it("shortens the value first if instructed to", () => {
			const color = new HexColor('#fc8802')
			expect(color.toRGB(true)).toEqual([255, 136, 0])
		})
	})
		
	describe("toHSL", () => {
		it("returns the color as HSL", () => {
			const color = new HexColor('#ff8000')
			expect(color.toHSL()).toEqual([30.12, 100, 50])
		})
	})
	
	describe("toDSLight", () => {
		it("reports the color's lightness on the 'DeSandro scale'", () => {
			const color1 = new HexColor('#ff80c0')
			const color2 = new HexColor('#806099')
			const color3 = new HexColor('#126321')

			expect(color1.toDSLight()).toEqual('light')
			expect(color2.toDSLight()).toEqual('middle')
			expect(color3.toDSLight()).toEqual('dark')
		})
	})
	
	describe("toDSSat", () => {
		it("reports the color's saturation on the 'DeSandro scale", () => {
			const color1 = new HexColor('#ff8000')
			const color2 = new HexColor('#dd8020')
			const color3 = new HexColor('#aa8055')
			const color4 = new HexColor('#808082')

			expect(color1.toDSSat()).toEqual('saturated')
			expect(color2.toDSSat()).toEqual('washed')
			expect(color3.toDSSat()).toEqual('muted')
			expect(color4.toDSSat()).toEqual('gray')
		})
	})
	
	describe("toDSHue", () => {
		it("recognizes primary colors (red, green & blue)", () => {
			const red = new HexColor('#f00')
			const green = new HexColor('#0f0')
			const blue = new HexColor('#00f')
			
			expect(red.toDSHue()).toEqual('red')
			expect(green.toDSHue()).toEqual('green')
			expect(blue.toDSHue()).toEqual('blue')
		})
		
		it("recognizes secondary colors (yellow, magenta & cyan)", () => {
			const yellow = new HexColor('#ff0')
			expect(yellow.toDSHue()).toEqual('yellow')
			
			const magenta = new HexColor('#f0f')
			expect(magenta.toDSHue()).toEqual('magenta')
			
			const cyan = new HexColor('#0ff')
			expect(cyan.toDSHue()).toEqual('cyan')
		})
		
		it("recognizes tertiary colors too (orange, chartreuse, spring green, azure, purple & rose)", () => {
			const orange = new HexColor('#f80')
			const chartreuse = new HexColor('#8f0')
			const spring = new HexColor('#0f8')
			const azure = new HexColor('#08f')
			const magenta = new HexColor('#80f')
			const rose = new HexColor('#f08')
			
			expect(orange.toDSHue()).toEqual('orange')
			expect(chartreuse.toDSHue()).toEqual('chartreuse')
			expect(spring.toDSHue()).toEqual('spring green')
			expect(azure.toDSHue()).toEqual('azure')
			expect(magenta.toDSHue()).toEqual('purple')
			expect(rose.toDSHue()).toEqual('rose')
		})
		
		it("recognizes the hue whatever the color", () => {
			const red1 = new HexColor('#f00000')
			const red2 = new HexColor('#a00203')
			const green1 = new HexColor('#090')
			const green2 = new HexColor('#03fc0d')
			const blue1 = new HexColor('#00f')
			const blue2 = new HexColor('#0314fc')

			expect(red1.toDSHue()).toEqual('red')
			expect(red2.toDSHue()).toEqual('red')
			expect(green1.toDSHue()).toEqual('green')
			expect(green2.toDSHue()).toEqual('green')
			expect(blue1.toDSHue()).toEqual('blue')
			expect(blue2.toDSHue()).toEqual('blue')
		})
	})
	
	describe("toDeSandro", () => {
		it("analyzes a color based on David DeSandro's algorithm", () => {
			const color1 = new HexColor('#d92')
			const color2 = new HexColor('#d49b25')
			expect(color1.toDeSandro()).toEqual('middle washed orange')
			expect(color2.toDeSandro()).toEqual('middle washed orange')
			
			const color3 = new HexColor('#E69DFB')
			expect(color3.toDeSandro()).toEqual('light washed magenta')
			
			const color4 = new HexColor('#3a538c')
			expect(color4.toDeSandro()).toEqual('middle muted azure')
			
			const color5 = new HexColor('#e7d40a')
			expect(color5.toDeSandro()).toEqual('middle saturated yellow')
			
			const color6 = new HexColor('#87be89')
			expect(color6.toDeSandro()).toEqual('middle muted green')
			
			const color7 = new HexColor('#3bbe28')
			expect(color7.toDeSandro()).toEqual('middle washed green')
			
			const color8 = new HexColor('#f4dd4d')
			expect(color8.toDeSandro()).withContext('#f4dd4d').toEqual('light washed yellow')
			
			const color9 = new HexColor('#fc3307')
			expect(color9.toDeSandro()).withContext('#fc3307').toEqual('middle saturated red')
			
			const colorA = new HexColor('#1452f2')
			expect(colorA.toDeSandro()).withContext('#1452f2').toEqual('middle saturated azure')
		})
		
		it("handles white & black", () => {
			const black = new HexColor('#010203')
			expect(black.toDeSandro()).withContext('#010203').toEqual('black')

			const white = new HexColor('#fffefe')
			expect(white.toDeSandro()).withContext('#fffefe').toEqual('white')
		})
		
		it("handles grays too", () => {
			const gray1 = new HexColor('#cdcdce')
			expect(gray1.toDeSandro()).toEqual('light gray')
			
			const gray2 = new HexColor('#838380')
			expect(gray2.toDeSandro()).toEqual('middle gray')
			
			const gray3 = new HexColor('#222')
			expect(gray3.toDeSandro()).toEqual('dark gray')
		})
	})
})
