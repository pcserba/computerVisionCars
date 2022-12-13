function showData(res) {
document.getElementById('loading').classList.toggle('show');
	//update the text
	//build the string

if (typeof res === "undefined")
		{
		document.getElementById('summary').innerHTML="<P style=text-align:right; top: 0px; margin-right:0px;><a href=https://darwah-group.com/computerVision><img src=img/close-window.png width=40px></a><P style=margin-right:40px;>"+error_msg;
		document.getElementById('summary').classList.toggle('show');
		}
		else
		{
		if (res[0].results.length == 0)
			{
			console.log(res[0].results.length);
			e = "true";
			console.log(e);
		document.getElementById('summary').innerHTML='<table><TR><TD>We detected a <C style=color:#00786C; font-weight: bold;>' + carnet["detections"][0]["mmg"][0]["make_name"] + ' </C> <C style=color:#00786C;font-weight: bold;>'+ carnet["detections"][0]["mmg"][0]["model_name"]+'</C> but could not match it in the EEA database. <TR><TD>You can browse [<a href=http://co2cars.apps.eea.europa.eu/ target=_blank>the database</A>] manually or [<a href=https://darwah-group.com/computerVision>try another vehicle</a>]<TD><a href=https://darwah-group.com/computerVision><img src=img/close-window.png width=40px></a></TD>';
		document.getElementById('summary').classList.toggle('show');
		}
		else
		{
//full dataset (for backlink to EEA)
var discomapFull = "https://discodata.eea.europa.eu/sql?query=%20%20%20%20%20%20%20%20Select%20*%0D%0A%20%20%20%20%20%20%20%20from%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%0D%0A%20%20%20%20%20%20%20%20WHERE%20REPLACE(Cn%2C%27%20%27%2C%27%27)%20%20LIKE%20%27%25%27%2BREPLACE(%27"+carnet["detections"][0]["mmg"][0]["model_name"]+"%27%2C%27%20%27%2C%27%27)%2B%27%25%27%0D%0A%20%20%20%20%20%20%20%20AND%20Mh%20not%20in%20(%27AA-IVA%27%2C%27AA-NSS%27%2C%27DUPLICATE%27%2C%27UNKNOWN%27%2C%27OUT%20OF%20SCOPE%27)%0D%0A%20%20%20%20%20%20%20%20--AND%20status%3D%27P%27%0D%0A%20%20%20%20%20%20%20%20AND%20year%3D2020%0D%0A%09AND%20MS%20NOT%20IN%20(%27UK%27%2C%27NO%27%2C%27IS%27)%20&p=1&nrOfHits=100&mail=null&schema=null"

if (res[0].results[0].avgEWLTP-114.7>0) {
	vsAvgText = '<B style="color: #AE3446;">('+Math.round((res[0].results[0].avgEWLTP-114.7)/114.7*1000)/10+'% above EU average)';
	}
	else 
	{
	vsAvgText = '<B style="color: #5BAA9D;">('+Math.round((res[0].results[0].avgEWLTP-114.7)/114.7*1000)/10+'% below EU average)';
	}

if (res[0].results[0].avgEWLTP == 0)
	{
	vsAvgText = '<B style="color: #5BAA9D;">(100% below EU average)';
	}


txt = '<table><TR><TD>We detected a <C style=color:#00786C; font-weight: bold;>' + carnet["detections"][0]["mmg"][0]["make_name"] + '</C> <C style=color:#00786C; font-weight: bold;>'+res[0].results[0].Cn_short+'</C> with <B>'+Math.round(carnet["detections"][0]["mmg"][0]["probability"]*100)+'%</B> confidence.</TD><TD><a href=https://darwah-group.com/computerVision><img src=img/close-window.png width=40px></a></TD><TR><TD><B>Registrations ('+res[0].results[0].year+'):</B><TD><C style=color:#00786C;font-weight: bold;> '+(res[0].results[0].countVIN).toLocaleString()+'</C> vehicles</TD><TR><TD><B>Average CO<sub>2</sub> Emissions</B> (Ewltp): </TD><TD><C style=color:#00786C;font-weight: bold;>'+res[0].results[0].avgEWLTP+' </C> g/km</TD></table><table><TR><TD colspan=2>' + vsAvgText + '</TD><TR><TD><B>Average engine capacity:</B></TD><TD> <C style=color:#00786C;font-weight: bold;>'+(res[0].results[0].avgEc).toLocaleString()+'</C> cm<sup>3</sup></TD><TR><TD><B>Average engine power:</B></TD><TD><C style=color:#00786C; font-weight: bold;>'+(res[0].results[0].avgEp).toLocaleString()+'</C> kwh</TD><TR><TD><B>Average mass:</B></TD><TD><C style=color:#00786C; font-weight: bold;>'+(res[0].results[0].avgM).toLocaleString()+'</C> kg </TD></table><table><TR><TD><TD id=t1><a href=#>[Registrations of '+ carnet["detections"][0]["mmg"][0]["make_name"] +' '+res[0].results[0].Cn_short+' by year]</A></TD><TR><TD><TR><TD><TD id=t2><a href=#>[Registrations of '+ carnet["detections"][0]["mmg"][0]["make_name"] +' '+res[0].results[0].Cn_short+' by country in 2020]</A></TD><TR><TD><TD>Source: <a href=http://co2cars.apps.eea.europa.eu/ target=_blank>[EEA]</A> || <a href='+discomapFull+' target=_blank>[dataset]</A></table>';

document.getElementById('summary').innerHTML=txt;

document.getElementById('t1').addEventListener('click', function(){
   showYear(res[2].results);  });

document.getElementById('t2').addEventListener('click', function(){
   showMS(res[1].results);  });

	//transition opacity
	document.getElementById('summary').classList.toggle('show');
	}
}

	};


function showMS(res) {
	chartByCountry(res);
	//transition opacity
	document.getElementById('BL').classList.add('show');

}

function showYear(res) {
	chartByYear(res);
	//transition opacity
	document.getElementById('BL').classList.add('show');

}

function showManufacturer(res) {
	chartByManufacturer(res);
	//transition opacity
	document.getElementById('BL').classList.add('show');

}

function showAll() {
	showData();
	showYear();	
}
