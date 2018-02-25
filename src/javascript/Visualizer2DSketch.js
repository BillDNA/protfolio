import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
//import 'p5/lib/addons/p5.dom';

function sketch (p) {
	window.p5a = p5;

	let mic;
	let c;
	let ai = 0;
	let A = [
		{ //Squares
			past: [],
			step: 10,
			wave: [0,0,0,0,0],
			fft:undefined,
			c: undefined,
			draw: function() {
				if(A[0].fft) {
					A[0].fft.analyze();
					A[0].wave = [
						A[0].fft.getEnergy("bass"),
						A[0].fft.getEnergy("mid"),
						A[0].fft.getEnergy("treble")
					];
				}
				A[0].c = buildColorFromWave(0,0,0);

				for(let i = A[0].past.length-1; i >= 0; i--) {
					A[0].past[i] = A[0].updateSpot(A[0].past[i]);
					if(A[0].past[i] === undefined) {
						A[0].past.splice(i,1);
					}
				}
				for(let i = 0; i < A[0].past.length-1; i++) {
					A[0].drawSpot(A[0].past[i]);
				}
				A[0].step = p.map(mic.getLevel(),0,1,10,100);
				if(A[0].past.length <= 0) {
					A[0].reset(true);
				} else if (A[0].past.length < 300) {
					for(let i = 0; i < p.map(mic.getLevel(),0,1,1,12); i++) {
						A[0].past.push(A[0].newSpot(A[0].past[A[0].past.length - 1]));
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
				if(spot.halfLife <=0 || r+g+b <= 0) { return undefined;}
				return spot;
			},
			drawSpot: function(spot) {
				p.fill(spot.c);
				p.stroke(A[0].c);
				p.strokeWeight(1);
				p.rectMode(p.CENTER);
				p.rect(spot.x,spot.y,A[0].step,A[0].step,spot.r);
				p.rect(p.width - spot.x,spot.y,A[0].step,A[0].step,spot.r);
				p.rect(p.width - spot.x,p.height - spot.y,A[0].step,A[0].step,spot.r);
				p.rect(p.width - spot.x,spot.y,A[0].step,A[0].step,spot.r);
				p.rect( spot.x,p.height - spot.y,A[0].step,A[0].step,spot.r);
			},
			reset: function(resize) {
				if(mic === undefined) {
					mic = new window.p5a.AudioIn();
					mic.start();
				}
				let s = {
					x:p.width/2,
					y:p.height/2,
					r:0,
					halfLife: 256,
					c:p.color(128)};
				A[0].past = [];
				A[0].past.push(s);

				A[0].fft = new window.p5a.FFT();
				A[0].fft.setInput(mic);

				if(resize) {
					p.resizeCanvas(p.width, p.height);
					document.getElementById('defaultCanvas0').style.width = '100%';
					document.getElementById('defaultCanvas0').style.height = '100%';
				}
			},
			newSpot: function(lastSpot) {
				let m = mic.getLevel();
				m = p.map(m, 0, 1, 0, A[0].step);
				let newSpot = {
					x: (p.width + lastSpot.x + getRandomInt(-1, 1) * A[0].step) % p.width,
					y: (p.height + lastSpot.y + getRandomInt(-1, 1) * A[0].step) % p.height,
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

		document.getElementById('defaultCanvas0').style.width = '100%';
		document.getElementById('defaultCanvas0').style.height = '100%';
		p.colorMode(p.RGB);
		c = p.color(0);
		A[ai].reset(false);
	}

	p.draw = function() {
		p.clear();
		p.background(c);
		A[ai].draw();
	}
	p.windowResized = function() {
		A[ai].reset(true);


	}
	p.mouseReleased = function() {
		A[ai].reset(true);
	}
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function buildColorFromWave(r,g,b) {
		return  p.color(
			Math.abs(r-A[0].wave[0]),
			Math.abs(g-A[0].wave[1]),
			Math.abs(b-A[0].wave[2]));
	}
};
export default function addSketch(){new p5(sketch,'Visualizer2D')};