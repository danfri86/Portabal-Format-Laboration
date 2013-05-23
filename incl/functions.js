window.onload = function prepareGUI() {
	var q = document.getElementById("question");
	var p = document.getElementById("pop");
	q.onclick = function() {toggle();}
}

function toggle() {
	var p = document.getElementById("pop");

	if ((p.getAttribute("class") == "dn")) {
		showMore();
	}

	else {
		showLess();
	}

}


function showMore() {
	var p = document.getElementById("pop");
	var b = document.getElementById("bg");
	p.className = "popup";
	b.className = "db";	
}

function showLess() {
	var p = document.getElementById("pop");
	p.className = "dn";
	var b = document.getElementById("bg");
	b.className = "dn";
}


