// Denna fil innehåller alla script som behövs

// Kör alla funktioner när sidan har laddats
window.onload = function() {
	traningtotal();
	karta();
	canvasApp();
}

/*-----------------------
Hämta total data om träningen
------------------------*/
function traningtotal() {
	
	// Startkod för att kunna hämta data
	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();  //Ajaxanrop
	} else { // code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.open("GET","incl/G2.TCX",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML;
	
	/*
	Datum då träningen genomfördes
	*/
	var datumbox = document.getElementById("traningsdatum");
		
	// Hämta datum från .tcx filen
	var datum = xmlDoc.getElementsByTagName("Id")[0].childNodes[0].nodeValue.split("T")[0];
	
	var datumtxt = document.createTextNode(datum);
	datumbox.appendChild(datumtxt);
	
	/*
	Total träningstid
	*/
	var tidbox = document.getElementById("totaltid");
		
	// Hämta traningstid från .tcx filen
	var tid = xmlDoc.getElementsByTagName("TotalTimeSeconds")[0].childNodes[0].nodeValue;
	
	var tidint = parseInt(tid)/60;
	var tidtxt = document.createTextNode(parseInt(tidint)+" min");
	tidbox.appendChild(tidtxt);
	
	/*
	Total distans
	*/
	var distansbox = document.getElementById("distans");
		
	// Hämta distans från .tcx filen
	var distans = xmlDoc.getElementsByTagName("DistanceMeters")[0].childNodes[0].nodeValue;
	
	var distanskm = distans/1000;
	var distanstxt = document.createTextNode(distanskm.toFixed(2)+" km");
	distansbox.appendChild(distanstxt);
	
	/*
	Avg puls
	*/
	var avgpulsbox = document.getElementById("avgpuls");
		
	// Hämta distans från .tcx filen
	var avgpuls = xmlDoc.getElementsByTagName("AverageHeartRateBpm")[0];
	var avgpulsvalue = avgpuls.getElementsByTagName("Value")[0].childNodes[0].nodeValue;
	
	var avgpulstxt = document.createTextNode(avgpulsvalue+" bpm");
	avgpulsbox.appendChild(avgpulstxt);
	
	/*
	Max puls
	*/
	var maxpulsbox = document.getElementById("maxpuls");
		
	// Hämta distans från .tcx filen
	var maxpuls = xmlDoc.getElementsByTagName("MaximumHeartRateBpm")[0];
	var maxpulsvalue = maxpuls.getElementsByTagName("Value")[0].childNodes[0].nodeValue;
	
	var maxpulstxt = document.createTextNode(maxpulsvalue+" bpm");
	maxpulsbox.appendChild(maxpulstxt);
	
	/*
	Max hastighet
	*/
	var maxhastighetbox = document.getElementById("maxhastighet");
		
	// Hämta distans från .tcx filen
	var maxhastighet = xmlDoc.getElementsByTagName("MaximumSpeed")[0].childNodes[0].nodeValue;
	
	var maxhastighettxt = document.createTextNode(parseFloat(maxhastighet*3.6).toFixed(2)+" km/h");
	maxhastighetbox.appendChild(maxhastighettxt);
	
	/*
	Avg hastighet
	*/
	var avghastighetbox = document.getElementById("avghastighet");
		
	// Hämta distans från .tcx filen
	var avghastighet = distanskm/(tidint/60);
	
	var avghastighettxt = document.createTextNode(avghastighet.toFixed(2)+" km/h");
	avghastighetbox.appendChild(avghastighettxt);
}
/*-----------------------
SLUT
------------------------*/

/*-----------------------
KARTA
------------------------*/
function karta() {

	// Startkod för att kunna hämta data
	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();  //Ajaxanrop
	} else { // code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.open("GET","incl/G2.TCX",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML;

	var positions = xmlDoc.getElementsByTagName("Position");
	var i;

	var points = [];

		for (i = 0; i < positions.length-1; i++) {


		points[i] = new google.maps.LatLng(positions[i].getElementsByTagName("LatitudeDegrees")[0].childNodes[0].nodeValue, positions[i].getElementsByTagName("LongitudeDegrees")[0].childNodes[0].nodeValue);
	}
	
	var myLatlng = points[0];
	var myOptions = {
		zoom: 13,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	
	var path = new google.maps.Polyline({
		path: points,
		strokeColor: "#FF0000",
		strokeOpacity: 0.8,
		strokeWeight: 2
	});
	
	path.setMap(map);
}
/*-----------------------
SLUT
------------------------*/

/*-----------------------
GRAF 1
------------------------*/
function canvasApp (){

	var theCanvas = document.getElementById ("canvasOne");
	var context = theCanvas.getContext ("2d");
	
	//Detta sätter x och y start till bottom left, men gör också text spegelvänd. Fix nedan vid textelementen
	context.translate(0, theCanvas.height);
	context.scale(1, -1);
	
	var windowWidth = theCanvas.width;
	var windowHeight = theCanvas.height;
	
	//Bakgrund
	context.fillStyle = "#eee";
	context.fillRect(0,0,windowWidth,windowHeight);
	
	var puls = xmlDoc.getElementsByTagName("HeartRateBpm");
	
	// Ram y-axel
	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(40, 30);
	context.lineTo(40, 240 );
	context.lineJoin = 'miter';
	context.strokeStyle ="#999";
	context.stroke();
	context.closePath();
	
	// Ram x-axel
	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(40, 30);
	context.lineTo(890, 30);
	context.lineJoin = 'miter';
	context.stroke();
	context.closePath();
	
	context.lineWidth = 1;
	context.strokeStyle ="#FE4365";
	context.beginPath();
	context.moveTo(xmlDoc.getElementsByTagName("DistanceMeters")[1].childNodes[0].nodeValue/10+43, puls[0].getElementsByTagName("Value")[0].childNodes[0].nodeValue);
	//Loopa igenom alla puls- och distansdata, förutom de första, de används ovan.
	for(var i=2; i<puls.length; i++) {
		context.lineTo(xmlDoc.getElementsByTagName("DistanceMeters")[i].childNodes[0].nodeValue/10+43, puls[i].getElementsByTagName("Value")[0].childNodes[0].nodeValue);
	}
	context.lineJoin = 'miter';
	context.stroke();
	context.closePath();

	context.scale(1, -1); //För att vända texten spegelrätt
	context.fillStyle = "#333";
	context.font = "12px sans-serif";
	context.textBaseline = "top";
	context.fillText("Puls", 50, -240);
	context.scale(1, -1); //För att vända texten spegelrätt
	
	context.scale(1, -1); //För att vända texten spegelrätt
	context.fillStyle = "#333";
	context.font = "12px sans-serif";
	context.textBaseline = "top";
	context.fillText("Distans", 850, -50);
	context.scale(1, -1); //För att vända texten spegelrätt

	context.scale(1, -1); //För att vända texten spegelrätt
	context.fillStyle = "#333";
	context.font = "12px sans-serif";
	context.textBaseline = "top";
	context.fillText("0", 25, -40);
	context.scale(1, -1); //För att vända texten spegelrätt

	context.scale(1, -1); //För att vända texten spegelrätt
	context.fillStyle = "#333";
	context.font = "12px sans-serif";
	context.textBaseline = "top";
	context.fillText("0 km                        1km                         2km                         3km                         4km                         5km                        6km                         7km                        8km", 40, -22);
	context.scale(1, -1); //För att vända texten spegelrätt

	/*
		PULS
				*/

	context.scale(1, -1); //För att vända texten spegelrätt
	context.fillStyle = "#333";
	context.font = "12px sans-serif";
	context.textBaseline = "top";
	context.fillText("50", 20, -78);
	context.scale(1, -1); //För att vända texten spegelrätt

	context.scale(1, -1); //För att vända texten spegelrätt
	context.fillStyle = "#333";
	context.font = "12px sans-serif";
	context.textBaseline = "top";
	context.fillText("100", 15, -115);
	context.scale(1, -1); //För att vända texten spegelrätt

	context.scale(1, -1); //För att vända texten spegelrätt
	context.fillStyle = "#333";
	context.font = "12px sans-serif";
	context.textBaseline = "top";
	context.fillText("150", 15, -154);
	context.scale(1, -1); //För att vända texten spegelrätt

	context.scale(1, -1); //För att vända texten spegelrätt
	context.fillStyle = "#333";
	context.font = "12px sans-serif";
	context.textBaseline = "top";
	context.fillText("200", 15, -194);
	context.scale(1, -1); //För att vända texten spegelrätt
}



/*-----------------------
SLUT
------------------------*/

/*
for(var i=2; i<puls.length; i++) {
		context.lineTo(distansout.childNodes[i].nodeValue, puls[i].getElementsByTagName("Value")[0].childNodes[0].nodeValue);
	}*/
