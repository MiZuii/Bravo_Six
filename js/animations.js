//VARIABLES
	//adjustable-----------
	var radius_a = 5;
	var r1_a = 1;
	var r2_a = 1;
	var m1_a = 2;
	var m2_a = 2;
	var g_a = 10;
	var scale_a = 25;
	var a1_a = Math.PI/1.5;
	var a2_a = 0;
	var op_a = 0;
	//adjustable-----------
	
	//----------canvas properties
	var middle;
	var k;
	var middle_2;
	//----------canvas properties
	
	var radius = 5;
	var r1 = 1;
	var r2 = 1;
	var m1 = 2;
	var m2 = 2;
	var g = 10;
	var scale = 25;
	var a1 = 0;
	var a2 = 0;
	var op = 1;
	
	var v1 = 0;
	var v2 = 0;
	var aa1 = 0;
	var aa2 = 0;

	var x1 = 0;
	var y1 = 0;
	var x2 = 0;
	var y2 = 0;
	
	//button state
	var pause = true;
	var restart = true;
	var clear = true;
	var line_draw = true;
	var fade = true;
	//-------------
	
	//canvas mirror
	var fade_x = [];
	var fade_y = [];
	var fade_length = 2;
	var opacity;
	//------------
//VARIABLES





//FUNCTIONS

//button animation
var pause_color_on = function () {
	document.getElementById("pause").style.background = "#DE4136";
}

var line_draw_color_on = function () {
	document.getElementById("line_draw").style.background = "#DE4136";
}

var fade_color_on = function () {
	document.getElementById("fade").style.background = "#DE4136";
}

var pause_color_off = function () {
	document.getElementById("pause").style.background = "#444444";
}

var line_draw_color_off = function () {
	document.getElementById("line_draw").style.background = "#444444";
}

var fade_color_off = function () {
	document.getElementById("fade").style.background = "#444444";
}
//----------------

//button state--------------
var pausef = function () {
	if (pause) {
		pause = false;
		pause_color_on();
		return 0;
	}
	if (!pause) {
		pause = true;
		animate();
		pause_color_off();
	}
}

var restartf = function () {
	
	if (restart) {
		restart = false;
		return 0;
	}
	if (!restart) {
		restart = true;
		animate();
	}
}

var clearf = function () {
	
	if (clear) {
		clear = false;
		return 0;
	}
	if (!clear) {
		clear = true;
	}
	
}

var line_drawf = function () {
	
	if (line_draw) {
		line_draw = false;
		line_draw_color_on();
		return 0;
	}
	if (!line_draw) {
		line_draw = true;
		line_draw_color_off();
	}
	
}

var fadef = function () {
	
	if (fade) {
		fade = false;
		fade_length = 60;
		
		for (var i=fade_x.length - 1; i>=0; i--) {	//
			fade_x.pop();						//	clearing arrays
			fade_y.pop();						//
		}										//
		fade_color_on();
		return 0;
	}
	if (!fade) {
		fade = true;
		fade_length = 2;
		
		var canvas_m = document.getElementById("animation_window_mirror");		// mirror canvas ini
		var ctx_m = canvas_m.getContext("2d");									// canvas 2d context ini
		ctx_m.clearRect(0, 0, canvas_m.width, canvas_m.height);					// canvas clear
		
		for (var i=fade_x.length - 1; i>=0; i--) {		//
			fade_x.pop();							//	clearing arrays
			fade_y.pop();							//
		}											//
		fade_color_off();
	}
	
}
//-------------------------

//slider controll functions---------------------------------

var radiusf = function () {
	radius_a = document.getElementById("radius").value;
	document.getElementById("radius_v").innerHTML = radius_a;
}

var r1f = function () {
	r1_a = document.getElementById("r1").value;
	document.getElementById("r1_v").innerHTML = r1_a;
}

var r2f = function () {
	r2_a = document.getElementById("r2").value;
	document.getElementById("r2_v").innerHTML = r2_a;
}

var m1f = function () {
	m1_a = document.getElementById("m1").value;
	document.getElementById("m1_v").innerHTML = m1_a;
}

var m2f = function () {
	m2_a = document.getElementById("m2").value;
	document.getElementById("m2_v").innerHTML = m2_a;
}

var gf = function () {
	g_a = document.getElementById("g").value;
	document.getElementById("g_v").innerHTML = g_a;
}

var scalef = function () {
	scale_a = document.getElementById("scale").value;
	document.getElementById("scale_v").innerHTML = scale_a;
}

var a1f = function () {
	a1_a = document.getElementById("a1").value;
	document.getElementById("a1_v").innerHTML = a1_a;
}

var a2f = function () {
	a2_a = document.getElementById("a2").value;
	document.getElementById("a2_v").innerHTML = a2_a;
}

var opf = function () {
	op_a = document.getElementById("op").value;
	document.getElementById("op_v").innerHTML = op_a;
}

//------------------------------------------------------


//default animation settings----------------------
var set_default = function() {
	
	document.getElementById("radius").value = "5";
	document.getElementById("r1").value = "1";
	document.getElementById("r2").value = "1";
	document.getElementById("m1").value = "1";
	document.getElementById("m2").value = "1";
	document.getElementById("g").value = "10";
	document.getElementById("scale").value = "25";
	document.getElementById("a1").value = "1.047";
	document.getElementById("a2").value = "0.1";
	document.getElementById("op").value = "100";
	
	//making default values visible
	r1f();
	r2f();
	m1f();
	m2f();
	gf();
	scalef();
	radiusf();
	a1f();
	a2f();
	opf();
	//------------
	
	radius_a = 5;
	r1_a = 1;
	r2_a = 1;
	m1_a = 1;
	m2_a = 1;
	g_a = 10;
	scale_a = 25;
	a1_a = 1.047;
	a2_a = 0;
	
	x1 = r1 * Math.sin(a1) * scale;
	y1 = r1 * Math.cos(a1) * scale;
	
	x_line = x1 + r2 * Math.sin(a2) * scale;
	y_line = y1 + r2 * Math.cos(a2) * scale;
	
}
//-------------------------------------------



//main
var draw = function () {
	
	//canvas_mirror opacity change
	
	document.getElementById("animation_window_mirror").style.opacity = op;	
	
	//--------------------------
	
	var canvas = document.getElementById("animation_window");		// canvas ini
	var ctx = canvas.getContext("2d");								// canvas 2d context ini
	
	middle_2 = canvas.height/2;		//middle shift adjustment y
	middle = canvas.width/2;		//x
	k = canvas.width/canvas.height;		//sides similarity adjustment
	
	//calculations------------------
	
		aa1 = ( (-1)*g*(2*m1+m2)*Math.sin(a1) - m2*g*Math.sin(a1-2*a2) - 2*Math.sin(a1-a2)*m2*(Math.pow(v2, 2)*r2 + Math.pow(v1, 2)*r1*Math.cos(a1 - a2) ))/( r1*( 2*m1+m2-m2*Math.cos(2*a1 - 2*a2) ) );
		
		aa2 = ( 2*Math.sin(a1 - a2)*(Math.pow(v1, 2)*r1*(m1 + m2) + g*(m1 + m2)*Math.cos(a1) + Math.pow(v2, 2)*r2*m2*Math.cos(a1 - a2)) )/( r1*( 2*m1+m2-m2*Math.cos(2*a1 - 2*a2) ) );
		
		v1 += aa1*(1/60);
		v2 += aa2*(1/60);
		a1 += v1*(1/60);
		a2 += v2*(1/60);
		
		
		x1 = r1 * Math.sin(a1) * scale;
		y1 = r1 * Math.cos(a1) * scale;
		
		x2 = x1 + r2 * Math.sin(a2) * scale;
		y2 = y1 + r2 * Math.cos(a2) * scale;
	
	//calculations------------------
	
	//main animation draw-----------------------------
	ctx.fillStyle = "rgb(233, 82, 71)";
	ctx.clearRect(0, 0, canvas.width, canvas.height);	// clear canvas
	
	ctx.fillRect(0,0, canvas.width, canvas.height);
	
	ctx.beginPath();
	
	ctx.moveTo(middle, middle_2);
	ctx.lineTo(middle + x1*k, y1 + middle_2);
	ctx.moveTo(middle + x1*k, y1 + middle_2);
	ctx.lineTo(middle + x2*k, y2 + middle_2);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.ellipse(x1*k + middle, y1 + middle_2, radius*k, radius, 0, 0, 2 * Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.ellipse(x2*k + middle, y2 + middle_2, radius*k, radius, 0, 0, 2 * Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.ellipse(middle, middle_2, 1*k , 1, 0, 0, 2 * Math.PI);
	ctx.fill();
	//------------------------------------------------------------------------------
	
	
	var canvas_m = document.getElementById("animation_window_mirror");		// mirror canvas ini
	var ctx_m = canvas_m.getContext("2d");									// mirror 2d context ini
	
	
	//line animation with fade
	
	//array adjustment------
	fade_x.unshift(x2);		// adds element to begening of the array
	fade_y.unshift(y2);		//
	
	if(fade_x.length>fade_length) {	//
		fade_x.pop();			//removes last element
	}							//
		
	if(fade_y.length>fade_length) {
		fade_y.pop();
	}
	//----------------------
	
	//
	if (!fade) {
		ctx_m.clearRect(0, 0, canvas_m.width, canvas_m.height);
	}
	//
	
	//animation draw
	for (var i=0; i<fade_x.length - 1; i++) {
		
		opacity = op*(((-1)*i)/(60) + 1);
		
		ctx_m.strokeStyle = "rgb(0, 0, 0, " + opacity + ")";
		ctx_m.beginPath();
		ctx_m.moveTo(fade_x[i]*k + middle, fade_y[i] + middle_2);
		ctx_m.lineTo(fade_x[i+1]*k + middle,fade_y[i+1] + middle_2);
		ctx_m.stroke();
		
	}
	//--------------
	
	//-----------------------
	
	
	var frameID = window.requestAnimationFrame(draw);	//requesting next frame and setting animation ID
	
	if (!line_draw) {
		ctx_m.clearRect(0, 0, canvas_m.width, canvas_m.height);
	}
	
	if (!clear) {
		ctx_m.clearRect(0, 0, canvas_m.width, canvas_m.height);
		clearf();
	}
	
	if (!pause) {
		window.cancelAnimationFrame(frameID);
	}
	
	if (!restart) {
		
		clearf();
		window.cancelAnimationFrame(frameID);
		
		radius = radius_a;
		r1 = r1_a;
		r2 = r2_a;
		m1 = parseFloat(m1_a);
		m2 = parseFloat(m2_a);
		g = g_a;
		scale = scale_a;
		a1 = parseFloat(a1_a);
		a2 = parseFloat(a2_a);
		op = op_a;
		
		v1 = 0;
		v2 = 0;
		aa1 = 0;
		aa2 = 0;

		x1 = 0;
		y1 = 0;
		x2 = 0;
		y2 = 0;
		
		for (var i=fade_x.length - 1; i>=0; i--) {
			fade_x.pop();
			fade_y.pop();
		}
		
		restartf();
	}
}

// animation ini-----
var animate = function () {
	window.requestAnimationFrame(draw);
}
// ------------------