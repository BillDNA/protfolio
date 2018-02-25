import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
//import 'p5/lib/addons/p5.dom';

function sketch (p) {
	window.myp5 = p;
	window.p5a = p5;

	let rotation = 0;

	p.setup = function () {
		p.createCanvas(600, 400, p.WEBGL);
		console.log('p',p);
		let mic = new window.p5a.AudioIn();
	};

	p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
		if (props.rotation){
			rotation = props.rotation * Math.PI / 180;
		}
	};

	p.draw = function () {
		p.background(100);
		p.noStroke();
		p.push();
		p.rotateY(rotation);
		p.box(100);
		p.pop();
	};
};
export default function addSketch(){new p5(sketch,'Visualizer2D')};