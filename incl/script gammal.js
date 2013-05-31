// Denna fil innehåller alla script som behövs

// Kör alla funktioner när sidan har laddats
window.onload = function() {
	traningtotal();
	karta();
	pulsgraf();
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
	
	xmlhttp.open("GET","incl/G1.xml",false);
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
	
	xmlhttp.open("GET","incl/G1.xml",false);
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
GRAF MED CHART.JS
------------------------*/
function pulsgraf() {
	// Egna variabler
	var puls = xmlDoc.getElementsByTagName("HeartRateBpm");
	var str = "";
	
	for(var i=0; i<puls.length; i++) {
		str = str+puls[i].getElementsByTagName("Value")[0].childNodes[0].nodeValue;
	}
						
	// Kod för chart.js
	var data = {
		labels : ["January","February","March","April","May","June","July"],
		datasets : [
			{
				fillColor : "rgba(255,10,0,0.3)",
				strokeColor : "rgba(150,0,0,0.4)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				/*
				data : [
					28,
					48,
					40,
					19,
					96,
					27,
					100
				]
				*/
				
				data : [
					str
				]
			}
		]
	}
	
	var options = {
	
		//Boolean - If we show the scale above the chart data			
		scaleOverlay : false,
		
		//Boolean - If we want to override with a hard coded scale
		scaleOverride : false,
		
		//** Required if scaleOverride is true **
		//Number - The number of steps in a hard coded scale
		scaleSteps : null,
		//Number - The value jump in the hard coded scale
		scaleStepWidth : null,
		//Number - The scale starting value
		scaleStartValue : null,
		
		/* Egna puls-values på y-axeln. Byt ut mot ovan om det behövs
		
		//Boolean - If we want to override with a hard coded scale
		scaleOverride : true,
		
		//** Required if scaleOverride is true **
		//Number - The number of steps in a hard coded scale
		scaleSteps : 15,
		//Number - The value jump in the hard coded scale
		scaleStepWidth : 10,
		//Number - The scale starting value
		scaleStartValue : 60,
		*/
	
		//String - Colour of the scale line	
		scaleLineColor : "rgba(0,0,0,.1)",
		
		//Number - Pixel width of the scale line	
		scaleLineWidth : 1,
	
		//Boolean - Whether to show labels on the scale	
		scaleShowLabels : true,
		
		//Interpolated JS string - can access value
		scaleLabel : "<%=value%>",
		
		//String - Scale label font declaration for the scale label
		scaleFontFamily : "'Arial'",
		
		//Number - Scale label font size in pixels	
		scaleFontSize : 12,
		
		//String - Scale label font weight style	
		scaleFontStyle : "normal",
		
		//String - Scale label font colour	
		scaleFontColor : "#666",	
		
		///Boolean - Whether grid lines are shown across the chart
		scaleShowGridLines : true,
		
		//String - Colour of the grid lines
		scaleGridLineColor : "rgba(0,0,0,.05)",
		
		//Number - Width of the grid lines
		scaleGridLineWidth : 1,	
		
		//Boolean - Whether the line is curved between points
		bezierCurve : false,
		
		//Boolean - Whether to show a dot for each point
		pointDot : false,
		
		//Number - Radius of each point dot in pixels
		pointDotRadius : 3,
		
		//Number - Pixel width of point dot stroke
		pointDotStrokeWidth : 1,
		
		//Boolean - Whether to show a stroke for datasets
		datasetStroke : true,
		
		//Number - Pixel width of dataset stroke
		datasetStrokeWidth : 2,
		
		//Boolean - Whether to fill the dataset with a colour
		datasetFill : true,
		
		//Boolean - Whether to animate the chart
		animation : false,
	
		//Number - Number of animation steps
		animationSteps : 60,
		
		//String - Animation easing effect
		animationEasing : "easeOutQuart",
	
		//Function - Fires when the animation is complete
		onAnimationComplete : null
		
	}
	
	//Get the context of the canvas element we want to select
	var ctx = document.getElementById("myChart").getContext("2d");
	var myNewChart = new Chart(ctx).Line(data,options);
}
/*-----------------------
SLUT
------------------------*/

/*-----------------------
GRAF 1
------------------------*/
/*
window.addEventListener ("load", eventWindowLoaded, false);

function eventWindowLoaded(){
	canvasApp();
} 

function canvasApp (){
	
	var theCanvas = document.getElementById ("canvasOne");
	var context = theCanvas.getContext ("2d");
	
	drawScreen();

 		function drawScreen(){	

 		 var theCanvas = document.getElementById("canvasOne");
		 var x = theCanvas.width / 2;
     	 var y = theCanvas.height / 2;
     	 var radius = 100;

		//Bakgrund 	
		var backgroundImage = new Image(); 
		backgroundImage.src = 'incl/img/graf.png'; 
		context.drawImage(backgroundImage, 0, 0);
   		context.fillRect(0, 0, canvas.width, canvas.height);
		context.strokeStyle = "#ababab";
		context.lineWidth = 15;

		//cirkel under
	    context.beginPath();
	    context.arc(x, (y+20), radius, 0, Math.PI, false);
	    context.fillStyle = 'yellow';
	    context.fill();
	    context.lineWidth = 10;
	    context.strokeStyle = 'black';
	    context.stroke();
	    context.closePath();
	   	//cirkel mun
	    context.beginPath();
	    context.arc(x, (y+32), radius-50, 0, Math.PI, false);
	    context.fillStyle = 'yellow';
	    context.fill();
	    context.lineWidth = 5;
	    context.strokeStyle = 'black';
	    context.stroke();
		}						
}
*/