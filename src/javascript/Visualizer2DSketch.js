import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
//import 'p5/lib/addons/p5.dom';
class Spot {
	constructor(x=100,y=100,hf=100,r=1,g=1,b=1,roundOver=1,colorDecay = 1) {
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
		let roundOver = p.map(micLvl, 0, 1, 0, this.step);;
		if(this.spots.length>0){
			x = (p.width + this.spots[0].x + getRandomInt(-1, 1) * this.step) % p.width;
			y = (p.height + this.spots[0].y + getRandomInt(-1, 1) * this.step) % p.height;
		}
		const newSpot = new Spot(x,y,256,waveForm[0],waveForm[2],waveForm[4],roundOver); //TODO wave form is to be base on settings
		this.spots.splice(0,0,newSpot)
	}
	update(p,micLvl,waveForm) {
		this.step = p.map(micLvl,0,1,10,100);
		for(let i = this.spots.length-1;i>=0;i--) {
			if(this.spots[i].update(micLvl)) { //remove if dead
				this.spots.splice(i,1);
			}
		}
		if(this.spots.length <= 256) {
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
					fft.getEnergy("lowMid"),
					fft.getEnergy("mid"),
					fft.getEnergy("highMid"),
					fft.getEnergy("treble")
				];
			} else {
				fft = new window.p5a.FFT();
				fft.setInput(mic);
				fft.analyze();
				currentWave = [
					fft.getEnergy("bass"),
					fft.getEnergy("lowMid"),
					fft.getEnergy("mid"),
					fft.getEnergy("highMid"),
					fft.getEnergy("treble")
				];
			}
			if(window.patterns.length <= 0) {
				window.controlFunctions.reset();
				window.patterns.push(new Pattern(p,micLvl))
			}

			let maxI = window.patterns[0].spots.length;
			for(let pat of window.patterns) {
				pat.update(p,micLvl,currentWave);
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
		//window.spotsArray[ai].reset(true);
	};
	p.mouseReleased = function() {
		//window.spotsArray[ai].reset(true);
	};
	p.keyReleased = function () {
		if(p.keyCode === 27 && window.settings.isFullScreen) {
			document.getElementById('fullscreen-btn').click();
		}
	};
};
export default function addSketch(){
	new p5(sketch,'Visualizer2D');
};