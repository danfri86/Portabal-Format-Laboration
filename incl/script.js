// Denna fil innehåller alla script som behövs

// Kör alla funktioner när sidan har laddats
window.onload = function() {
	traningtotal();
	karta();
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
	
	xmlhttp.open("GET","incl/G1.TCX",false);
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
	
	var maxhastighettxt = document.createTextNode(parseFloat(maxhastighet).toFixed(2)+" km/h");
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
	var points = [
		new google.maps.LatLng(59.4111992, 13.5304104),
		new google.maps.LatLng(59.4193453, 13.5311650),
		new google.maps.LatLng(59.4232704, 13.5318187),
		new google.maps.LatLng(59.4245685, 13.5335306),
		new google.maps.LatLng(59.4252481, 13.5342259),
		new google.maps.LatLng(59.4269343, 13.5346784),
		new google.maps.LatLng(59.4285858, 13.5314505),
		new google.maps.LatLng(59.4124066, 13.5303183)
	];
	
	var myLatlng = points[2];
	var myOptions = {
		zoom: 13,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	
	var path = new google.maps.Polyline({
		path: points,
		strokeColor: "#FF0000",
		strokeOpacity: 1.0,
		strokeWeight: 4
	});
	
	path.setMap(map);
}
/*-----------------------
SLUT
------------------------*/