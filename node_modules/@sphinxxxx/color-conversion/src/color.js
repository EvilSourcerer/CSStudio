/*global String*/
/*global atob*/
String.prototype.startsWith = (String.prototype.startsWith || function(needle)   { return (this.indexOf(needle) === 0); });
String.prototype.padStart   = (String.prototype.padStart   || function(len, pad) { let str = this; while(str.length < len) { str = pad + str; }; return str; });


/*
	Code golfing:
	This is a compacted list of all 148 CSS color names (from https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json).
	Every seven characters in this array is a name and its RGB value.

		//3 chars name hash (rudimentary, but just enough to separate all unique colors),
		//based on https://stackoverflow.com/a/15710692/1869660
		hash = [].reduce.call(name.replace('ey','ay'), (h, c) => (h << 2) + c.charCodeAt(0), 0)
							.toString(36).slice(-3);

		//4 chars base64 color value. Split the hex into [R, G, B], cast to bytes and base64-encode the byte array:
		hex64 = btoa( hex.match(/../g).map(x => String.fromCharCode(parseInt(x, 16))).join('') );
*/
const colorNames = '735AACA770//Xub218Pj/mo5+uvX6mdAP//gtpf//Ur258P//q1d9fXcxop/+TEq9zAAAAqfg/+vN6m1AAD/ngoiiviqt6pSoqzyo3riHxvdX56grk1f/8Aax10mkeqts/39QxbtZJXttkb//jcyxm3BQ86rmAP//wl5AACLwqqAIuL3y8uIYLwv1qampniqAGQAns5vbdrmohiwCLw5uVWsvsdd/4wAsegmTLMqagiwAAsqi6ZZ6uz6j7yPxtzSD2Lxk3L09PudbAM7RwsolADT0kz/xSTfuhAL//vfhaWlpyuxHpD/43rsiIiwn9//rw39uIosi9bp/wD/6w73Nzc9s5+Pj/6v8/9cA3b42qUg6vxgICArmaAIAAtdfrf8vf9n8P/wek3/2m0xnczVxc3bvSwCCsdt///wrvp8OaMs5i5ub6iyk//D1e8ifPwAoui//rNpyxrdjmw9c8ICAq4i4P//mx9+vrSq8t09PTx1ukO6Qqlv/7bBuuy/6B690uILKqpfdh876sd9d4iZnehsMTe0dv///g71lAP8A4nmMs0ys9u+vDmg9d/wD/4pmgAAAcurZs2qzllAADN4lkulXT6txk3Db66qPLNxozre2juokuAPqalj3SNHMgdkxxWF60pGRlwxfl9f/6hr5/+Thx6q/+S1m85/96tutd/fXmszxgIAAe4ma44j8rl/6UAmu0/0UA8so2nDWji87uiqumqmPuY9xbr+7u4rs23CTsb8/+/V95a/9q577xzYU/78z/8DL7b53aDdsu1sODmb11gACAy5nZjOZ1so/wAAlvevI+Pn09QWnhm7ui0UT94q+oBy7ei9KRg5aqLotXad5oFItasmwMDAaihh87r9fdalrN9p9cICQ7gz//r6k5uAP9/4qhRoK01te0rSM7cwAICA91x2L/Yclr/2NHcw1QODQd6w7oLuua09d6zudh////t359fX1enn//8Ao0ims0y';
let  colorNamesDeser;


class Color {

	constructor(r, g, b, a) {

        const that = this;
		function parseString(input) {

			//HSL string. Examples:
			//	hsl(120, 60%,  50%) or 
			//	hsla(240, 100%, 50%, .7)
			if( input.startsWith('hsl') ) {
				let [h, s, l, a] = input.match(/([\-\d\.e]+)/g).map(Number);
				if(a === undefined) { a = 1; }

				h /= 360;
				s /= 100;
				l /= 100;
				that.hsla = [h, s, l, a];
			}

			//RGB string. Examples:
			//	rgb(51, 170, 51)
			//	rgba(51, 170, 51, .7)
			else if( input.startsWith('rgb') ) {
				let [r, g, b, a] = input.match(/([\-\d\.e]+)/g).map(Number);
				if(a === undefined) { a = 1; }
				
				that.rgba = [r, g, b, a];
			}

			//Hex string or color name:
			else {
				if( input.startsWith('#') ) {
					that.rgba = Color.hexToRgb(input);
				}
				else {
					that.rgba = Color.nameToRgb(input) || Color.hexToRgb(input);
				}
			}
		}
		
		
		if( r === undefined ) {
			//No color input - the color can be set later through .hsla/.rgba/.hex
		}

		//Single input - RGB(A) array
		else if( Array.isArray(r) ) {
			this.rgba = r;
		}

		//Single input - CSS string
		else if( b === undefined ) {
			const color = r && ('' + r).trim();
			if(color) {
				parseString(color.toLowerCase());
			}
		}

		else {
			this.rgba = [r, g, b, (a === undefined) ? 1 : a];
		}
	}


	/* RGBA representation */

	get rgba() {
		if(this._rgba) { return this._rgba; }
		if(!this._hsla) { throw new Error('No color is set'); }
		
		return (this._rgba = Color.hslToRgb(this._hsla));
	}
	get rgbString()  { return `rgb(${ this.rgba.slice(0, 3) })`; }
	get rgbaString() { return `rgba(${ this.rgba })`; }

	set rgba(rgb) {
		if(rgb.length === 3) { rgb[3] = 1; }
		
		this._rgba = rgb;
		this._hsla = null;
	}


	/* HSLA representation */

	get hsla() {
		if(this._hsla) { return this._hsla; }
		if(!this._rgba) { throw new Error('No color is set'); }
		
		return (this._hsla = Color.rgbToHsl(this._rgba));
	}
	get hslString() {
		const c = this.hsla;
		return `hsl(${ c[0]*360 },${ c[1]*100 }%,${ c[2]*100 }%)`;
	}
	get hslaString() {
		const c = this.hsla;
		return `hsla(${ c[0]*360 },${ c[1]*100 }%,${ c[2]*100 }%,${ c[3] })`;
	}

	set hsla(hsl) {
		if(hsl.length === 3) { hsl[3] = 1; }
		
		this._hsla = hsl;
		this._rgba = null;
	}


	/* HEX representation */

	get hex() {
		const rgb = this.rgba,
			  hex = rgb.map((x, i) => (i < 3) ? x.toString(16) 
											  : Math.round(x * 255).toString(16));

		return '#' + hex.map(x => x.padStart(2, '0')).join('');
	}
	
	set hex(hex) {
		this.rgba = Color.hexToRgb(hex);
	}



	/* Conversion utils */


	/**
	 * Normalize all hex codes (3/4/6/8 digits) to 8 digits RGBA
	 */
    static hexToRgb(input) {
		const hex = (input.startsWith('#') ? input.slice(1) : input)
			.replace(/^(\w{3})$/,          '$1F')                   //987      -> 987F
			.replace(/^(\w)(\w)(\w)(\w)$/, '$1$1$2$2$3$3$4$4')      //9876     -> 99887766
			.replace(/^(\w{6})$/,          '$1FF');                 //987654   -> 987654FF

		if(!hex.match(/^([0-9a-fA-F]{8})$/)) { throw new Error('Unknown hex color; ' + input); }

		const rgba = hex
			.match(/^(\w\w)(\w\w)(\w\w)(\w\w)$/).slice(1)  //98765432 -> 98 76 54 32
			.map(x => parseInt(x, 16));                    //Hex to decimal

		rgba[3] = rgba[3]/255;
		return rgba;
    }


	/**
	 * Get the RGB values from a CSS color name
	 */
	static nameToRgb(input) {
		//See comments on colorNames

		if(!colorNamesDeser) {
		    colorNamesDeser = {};
		    colorNames.match(/.{7}/g).forEach(x =>
				colorNamesDeser[x.slice(0, 3)] = atob(x.slice(-4)).split('').map(b => b.charCodeAt(0))
		    );
		}
		const hash = [].reduce.call(input.replace('ey', 'ay'), (h, c) => (h << 2) + c.charCodeAt(0), 0)
								.toString(36).slice(-3);

		return colorNamesDeser[hash];
	}


	/**
	 * https://gist.github.com/mjackson/5311256
	 * 
	 * Converts an RGB color value to HSL. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	 * Assumes r, g, and b are contained in the set [0, 255] and
	 * returns h, s, and l in the set [0, 1].
	 */
    static rgbToHsl([r, g, b, a]) {

        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b),
        	  min = Math.min(r, g, b);
        let h,
        	s,
        	l = (max + min) / 2;

        if(max === min){
	        h = s = 0; // achromatic
	    }
	    else {
	        const d = max - min;
	        s = (l > 0.5) ? d / (2 - max - min) 
	        			  : d / (max + min);
	        switch(max) {
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }
	        
	        h /= 6;
	    }
	    
        return [h, s, l, a];
    }


	/**
	 * https://gist.github.com/mjackson/5311256
	 * 
	 * Converts an HSL color value to RGB. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	 * Assumes h, s, and l are contained in the set [0, 1] and
	 * returns r, g, and b in the set [0, 255].
	 */
    static hslToRgb([h, s, l, a]) {

		let r, g, b;
		
		if (s === 0) {
			r = g = b = l; // achromatic
		}
		else {
			const hue2rgb = function(p, q, t) {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1/6) return p + (q - p) * 6 * t;
				if (t < 1/2) return q;
				if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			};
		
			const q = (l < 0.5) ? l * (1 + s) 
								: l + s - (l * s),
				  p = (2 * l) - q;
			
			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}
		
		const rgba = [r * 255, g * 255, b * 255].map(Math.round);
		rgba[3] = a;
		
		return rgba;
    }

}


export default Color;
