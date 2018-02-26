import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
//import 'p5/lib/addons/p5.dom';
class Spot {
	constructor(x=100,y=100,hf=100,r=1,g=1,b=1,roundOver=10,colorDecay = 1) {
		this.x = x;
		this.y = y;
		this.halfLife = hf;
		this.red = r;
		this.green = g;
		this.blue = b;
		this.r = roundOver;
		this.colorDecay = colorDecay;
	}
	get isDead() {
		return this.halfLife <= 0 || (this.red+this.green+this.blue) <= 3;
	}

	update(micLvl=0) {
		this.red = Math.max(0, this.red-this.colorDecay);
		this.green = Math.max(0,this.green-this.colorDecay);
		this.blue = Math.max(0,this.blue-this.colorDecay);
		this.halfLife -= micLvl;
		return this.isDead;
	}

	draw(p,step) {
		p.fill(p.color(this.red,this.green,this.blue));
		p.rect(this.x           ,this.y             ,step,step,this.r);
		p.rect(p.width - this.x ,this.y             ,step,step,this.r);
		p.rect(p.width - this.x ,p.height - this.y  ,step,step,this.r);
		p.rect(p.width - this.x ,this.y             ,step,step,this.r);
		p.rect( this.x          ,p.height - this.y  ,step,step,this.r);
	}
}
class Pattern {
	constructor(p,micLvl = 1) {
		this.spots = [];
		this.step = p.map(micLvl,0,1,10,100);
	}
	addSpot(p,micLvl,waveForm=[0,0,0]) {
		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		let x = p.width/2;
		let y = p.height/2;
		let roundOver = this.step;
		if(this.spots.length>0){
			x = (p.width + this.spots[0].x + getRandomInt(-1, 1) * this.step) % p.width;
			y = (p.height + this.spots[0].y + getRandomInt(-1, 1) * this.step) % p.height;
		}
		const newSpot = new Spot(x,y,waveForm[0],waveForm[1],waveForm[2],roundOver);
		this.spots.splice(0,0,newSpot)
	}
	update(p,micLvl,waveForm) {
		this.step = p.map(micLvl,0,1,10,100);
		for(let i = this.spots.length-1;i>=0;i--) {
			if(this.spots[i].update(micLvl)) { //remove if dead
				this.spots.splice(i,1);
			}
		}
		if(this.spots.length <= 0) {
			this.addSpot(p,micLvl,waveForm);
		}
	}
	draw(p,i) {
		if(i< this.spots.length) {
			let c = p.color(this.spots[0].red, this.spots[0].green, this.spots[0].blue);
			p.stroke(c);
			p.strokeWeight(1);
			p.rectMode(p.CENTER);

			this.spots[i].draw(p, this.step);
		}
	}

}
function sketch (p) {
	window.p5a = p5;
	let mic;
	let fft;
	let currentWave;


	let c;
	let ai = 0;
	window.settings = {
		setupDone: false,
		micAccess: false,
		fullScreen: false,
		aspectRatio: 800/600,
		colors: {
			base: {
				r: 255,
				g: 0,
				b:0
			},
			mids: {
				r: 255,
				g: 0,
				b:0
			},
			highs: {
				r: 255,
				g: 0,
				b:0
			}
		}
	};
	window.controlFunctions = {
		fullScreen: function (isFullScreen) {
			window.settings.isFullScreen = isFullScreen;
			p.fullscreen(isFullScreen);
			window.spotsArray[ai].reset(true);
		},
		reset: function () {
			console.log('re-setting');
			if(mic === undefined) {
				window.settings.micAccess = true;
				mic = new window.p5a.AudioIn();
				mic.start(()=>{},(error) => {
						window.settings.micAccess = false;
					}
				);
				if(!window.settings.micAccess) {return}
			}
			window.patterns = []
			//window.spotsArray[ai].reset(true);
		}
	};
	window.Patters = [];
	window.spotsArray = [
		{
			//Squares
			past: [],
			step: 10,
			wave: [0,0,0,0,0],
			fft:undefined,
			c: undefined,
			draw: function() {
				if(window.spotsArray[0].fft) {
					window.spotsArray[0].fft.analyze();
					window.spotsArray[0].wave = [
						window.spotsArray[0].fft.getEnergy("bass"),
						window.spotsArray[0].fft.getEnergy("mid"),
						window.spotsArray[0].fft.getEnergy("treble")
					];
				}
				window.spotsArray[0].c = buildColorFromWave(0,0,0);

				for(let i = window.spotsArray[0].past.length-1; i >= 0; i--) {
					window.spotsArray[0].past[i] = window.spotsArray[0].updateSpot(window.spotsArray[0].past[i]);
					if(window.spotsArray[0].past[i] === undefined) {
						window.spotsArray[0].past.splice(i,1);
					}
				}
				for(let i = 0; i < window.spotsArray[0].past.length-1; i++) {
					window.spotsArray[0].drawSpot(window.spotsArray[0].past[i]);
				}
				window.spotsArray[0].step = p.map(mic.getLevel(),0,1,10,100);
				if(window.spotsArray[0].past.length <= 0) {
					window.spotsArray[0].reset(true);
				} else if (window.spotsArray[0].past.length < 300) {
					for(let i = 0; i < p.map(mic.getLevel(),0,1,1,12); i++) {
						window.spotsArray[0].past.push(window.spotsArray[0].newSpot(window.spotsArray[0].past[window.spotsArray[0].past.length - 1]));
					}
				}
			},
			updateSpot: function(spot) {
				const micLvl =  p.map(mic.getLevel(),0,1,1,8);
				const r = p.red(spot.c);
				const g = p.green(spot.c);
				const b = p.blue(spot.c);
				spot.c.setRed(Math.max(0,r-1));
				spot.c.setGreen(Math.max(0,g-1));
				spot.c.setBlue(Math.max(0,b-1));

				spot.halfLife -= micLvl;
				if(spot.halfLife <=0 || r+g+b <= 3) { return undefined;}
				return spot;
			},
			drawSpot: function(spot) {
				p.fill(spot.c);
				p.stroke(window.spotsArray[0].c);
				p.strokeWeight(1);
				p.rectMode(p.CENTER);
				p.rect(spot.x,spot.y,window.spotsArray[0].step,window.spotsArray[0].step,spot.r);
				p.rect(p.width - spot.x,spot.y,window.spotsArray[0].step,window.spotsArray[0].step,spot.r);
				p.rect(p.width - spot.x,p.height - spot.y,window.spotsArray[0].step,window.spotsArray[0].step,spot.r);
				p.rect(p.width - spot.x,spot.y,window.spotsArray[0].step,window.spotsArray[0].step,spot.r);
				p.rect( spot.x,p.height - spot.y,window.spotsArray[0].step,window.spotsArray[0].step,spot.r);
			},
			reset: function(resize) {
				console.log('re-setting ');
				if(mic === undefined) {
					window.settings.micAccess = true;
					mic = new window.p5a.AudioIn();
					mic.start(()=>{},(error) => {
						window.settings.micAccess = false;
					}
						);

					if(!window.settings.micAccess) {return}
				}
				let s = {
					x:p.width/2,
					y:p.height/2,
					r:0,
					halfLife: 256,
					c:p.color(128)};
				window.spotsArray[0].past = [];
				window.spotsArray[0].past.push(s);

				window.spotsArray[0].fft = new window.p5a.FFT();
				window.spotsArray[0].fft.setInput(mic);
				if(resize) {
					if(window.settings.isFullScreen) {
						p.resizeCanvas(800, 600);
						document.getElementById('defaultCanvas0').classList.add('full-screen-canvas');
						document.getElementById('defaultCanvas0').classList.remove('small-screen-canvas');
						document.getElementById('defaultCanvas0').style.width = '100vw';
						document.getElementById('defaultCanvas0').style.height= '100vh';
					} else {
						p.resizeCanvas(800, 600);
						document.getElementById('defaultCanvas0').classList.add('small-screen-canvas');
						document.getElementById('defaultCanvas0').classList.remove('full-screen-canvas');
						document.getElementById('defaultCanvas0').style.width = '';
						document.getElementById('defaultCanvas0').style.height = '';
					}
				}
			},
			newSpot: function(lastSpot) {
				let m = mic.getLevel();
				m = p.map(m, 0, 1, 0, window.spotsArray[0].step);
				let newSpot = {
					x: (p.width + lastSpot.x + getRandomInt(-1, 1) * window.spotsArray[0].step) % p.width,
					y: (p.height + lastSpot.y + getRandomInt(-1, 1) * window.spotsArray[0].step) % p.height,
					c: buildColorFromWave(0,0,0),
					halfLife: 256,
					r: m
				};
				return newSpot;
			}
		}
	];


	p.preload = function() {
	};

	p.setup = function() {
		p.createCanvas(800,800);
		p.colorMode(p.RGB);
		c = p.color(0);


		window.controlFunctions.reset();

	};

	p.draw = function() {
		p.clear();
		p.background(c);
		if(window.settings.micAccess) {
			let micLvl = mic.getLevel();
			if(fft !== undefined) {
				fft.analyze();
				currentWave = [
					fft.getEnergy("bass"),
					fft.getEnergy("mid"),
					fft.getEnergy("treble")
				];
			} else {
				fft = new window.p5a.FFT();
				fft.setInput(mic);
			}
			if(window.patterns.length <= 0) {
				window.controlFunctions.reset();
				window.patterns.push(new Pattern(p,micLvl))
			}
			window.spotsArray[ai].draw();
			let maxI = window.patterns[0].spots.length;
			for(let pat of window.patterns) {
				pat.update(p,micLvl)
				maxI = Math.max(maxI,pat.spots.length);
			}
			for(let i = maxI-1; i>=0; i--) {
				for(let pat of window.patterns) {
					pat.draw(p,i);
				}
			}

		} else {
			p.fill('#fff');
			p.textAlign(p.CENTER,p.CENTER);
			p.text("Please Allow mic access and reload to use visualizer.",p.width/2,p.height/2);
			console.log('width/2',p.width/2,p.height/2)
		}
	};
	p.windowResized = function() {
		window.spotsArray[ai].reset(true);
	};
	p.mouseReleased = function() {
		//window.spotsArray[ai].reset(true);
	};
	p.keyReleased = function () {
		if(p.keyCode === 27 && window.settings.isFullScreen) {
			document.getElementById('fullscreen-btn').click();
		}
	};
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function buildColorFromWave(r=255,g,b) {
		return  p.color(
			Math.abs(r-window.spotsArray[0].wave[0]),
			0*Math.abs(g-window.spotsArray[0].wave[1]),
			0*Math.abs(b-window.spotsArray[0].wave[2]));
	}
};
export default function addSketch(){
	new p5(sketch,'Visualizer2D');
};