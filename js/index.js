/*
░█▀▀▀█ ░█▀▀█ ▀▀█▀▀ ▀█▀ ░█▀▀▀█ ░█▄─░█ ░█▀▀▀█ 
░█──░█ ░█▄▄█ ─░█── ░█─ ░█──░█ ░█░█░█ ─▀▀▀▄▄ 
░█▄▄▄█ ░█─── ─░█── ▄█▄ ░█▄▄▄█ ░█──▀█ ░█▄▄▄█ 
*/

var hexagon_radius = 100;
var hexagon_max_absolute_speed = 0.9;
var hexagon_line_width = 10;
var hexagon_color = '#ff00d9';

/*
░█▀▀█ ░█▀▀▀█ ░█▀▀▄ ░█▀▀▀ 
░█─── ░█──░█ ░█─░█ ░█▀▀▀ 
░█▄▄█ ░█▄▄▄█ ░█▄▄▀ ░█▄▄▄ 
*/

var canvas, ctx;
var img, hex, text;
var hexagons = [];
var x,y,side,size;

var s3p3 = Math.sqrt(3);
side = 0;
size = 100;
function init() {
	
	canvas = document.getElementById('c');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.width = canvas.width + 'px';
	canvas.style.height = canvas.height + 'px';
	ctx = canvas.getContext('2d');
	img = document.getElementById('s');
	placeHexagon(
                (canvas.width / 2),
                (canvas.height / 2),
				{
					l: 0
				}
			);
	x = (canvas.width / 2);
    y = (canvas.height / 2);
	ctx.lineWidth = hexagon_line_width;
	loop();
	
}



function loop() {
	requestAnimFrame(loop);
	
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = "50px Arial";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();

    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillText('Coming Soon!', ((canvas.width / 2) - 170), ((canvas.height / 2) + 200));
    drawHexagonPath(0);
	ctx.shadowColor = hexagon_color;
	ctx.shadowBlur = 20;
	ctx.strokeStyle = hexagon_color;
  
    ctx.stroke();
    //ctx.fillRect (25, 25, 150, 150);
    
    ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
    for (side; side < 7; side++) {
        ctx.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
    };
    side = 0
    ctx.shadowColor = "";
    ctx.fillStyle ="#333333";
    ctx.fill();
    ctx.drawImage(img,((canvas.width / 2) - 50),((canvas.height / 2) - 50),100,100);
    ctx.fillStyle = "rgba(40,0,40,0.5)";

}

function placeHexagon(x, y, opts) {
	var l = Math.floor(Math.random() * 6),
		p = Math.random();
	
	if(!opts) opts = {};
	
	hex = ({sl: opts.l || opts.l === 0 ? opts.l : l,
		p: opts.p || opts.p === 0 ? opts.p : p,
		x: x,
		y: y,
		speed: opts.speed || opts.speed === 0 ? opts.speed : ( Math.random() * hexagon_max_absolute_speed * 2 - hexagon_max_absolute_speed )
	});
}

function drawHexagonPath(hex_index) {
	ctx.moveTo(
		hex.x + Math.cos( Math.PI / 3 * hex.sl ) * hexagon_radius + Math.cos( Math.PI / 3 * (hex.sl + 2) ) * hexagon_radius * hex.p,
		hex.y + Math.sin( Math.PI / 3 * hex.sl ) * hexagon_radius +  Math.sin( Math.PI / 3 * (hex.sl + 2) ) * hexagon_radius * hex.p
	);
	
	//ctx.moveTo(hex.x, hex.y);
	
	ctx.lineTo(
		hex.x + Math.cos( Math.PI / 3 * ( hex.sl + 1 ) ) * hexagon_radius,
		hex.y + Math.sin( Math.PI / 3 * ( hex.sl + 1 ) ) * hexagon_radius
	);
    
    ctx.lineTo(
		hex.x + Math.cos( Math.PI / 3 * ( hex.sl + 1 ) ) * hexagon_radius,
		hex.y + Math.sin( Math.PI / 3 * ( hex.sl + 1 ) ) * hexagon_radius
	);
	
	ctx.lineTo(
		hex.x + Math.cos( Math.PI / 3 * ( hex.sl + 2 ) ) * hexagon_radius,
		hex.y + Math.sin( Math.PI / 3 * ( hex.sl + 2 ) ) * hexagon_radius
	);
	
	ctx.lineTo(
		hex.x + Math.cos( Math.PI / 3 * ( hex.sl + 3 ) ) * hexagon_radius,
		hex.y + Math.sin( Math.PI / 3 * ( hex.sl + 3 ) ) * hexagon_radius
	);
	
	ctx.lineTo(
		hex.x + Math.cos( Math.PI / 3 * ( hex.sl + 3 ) ) * hexagon_radius + Math.cos( Math.PI / 3 * (hex.sl + 5) ) * hexagon_radius * hex.p,
		hex.y + Math.sin( Math.PI / 3 * ( hex.sl + 3 ) ) * hexagon_radius + Math.sin( Math.PI / 3 * (hex.sl + 5) ) * hexagon_radius * hex.p
	);
	
	hex.p += hex.speed;
	if(hex.p > 1 || hex.p < 0) {
		hex.p = hex.speed < 0 ? 1 : 0;
		hex.sl += hex.speed < 0 ? -1 : 1;
		hex.sl = hex.sl % 6;
		hex.sl = hex.sl < 0 ? 4 - hex.sl : hex.sl;
	}
	
	hexagons[hex_index] = hex;
	
}

window.onload = function() {
	init();
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 100000);
          };
})();
