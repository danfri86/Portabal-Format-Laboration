// Denna fil innehåller alla script som behövs

// Kör alla funktioner när sidan har laddats
window.onload = function() {
	traningtotal();
}

/*-----------------------
Hämta datum då träningen utfördes
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
}
/*-----------------------
SLUT
------------------------*/
