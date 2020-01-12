let img = el("ii");
let right = el("imgolder");
let left = el("imgnewer");

img.addEventListener("click", mc);
img.addEventListener("mousemove", mm);
img.addEventListener("mouseout", mo);

function mm(e) {
	let xx = e.offsetX;
	let ww = e.target.width;
	let opa = Math.round(xx/ww);
	right.style.opacity = opa;
	left.style.opacity = opa?0:1;
}

function mo(e) {
	right.style.opacity = left.style.opacity = 0;
}

function mc(e) {
	let xx = e.offsetX;
	let ww = e.target.width;
	window.location = `/${index-Math.round(xx/ww)*2+1}`;
}