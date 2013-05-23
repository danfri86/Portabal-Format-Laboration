// Denna fil innehåller alla script som behövs

/*-----------------------
Hämta datum då träningen utfördes
------------------------*/
if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();  //Ajaxanrop
} else { // code for IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.open("GET","G1.TCX",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;

//var datum = xmlDoc.getElementsByTagName("Id")[0].childNodes[0].nodeValue;
var datum = xmlDoc.getElementsByTagName("Id")[0].childNodes[0].nodeValue.split("T")[0];

document.write("Datum: "+ datum);
//document.write("Datum: "+ datum.substring(0,10));
/*-----------------------
SLUT
------------------------*/