function showData(res) {
document.getElementById('loading').style.opacity=0;
	//update the text
	//build the string

//full dataset (for backlink to EEA)
var discomapFull = "https://discodata.eea.europa.eu/sql?query=%20%20%20%20%20%20%20%20Select%20*%0D%0A%20%20%20%20%20%20%20%20from%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%0D%0A%20%20%20%20%20%20%20%20WHERE%20REPLACE(Cn%2C%27%20%27%2C%27%27)%20%20LIKE%20%27%25%27%2BREPLACE(%27"+carnet["detections"][0]["mmg"][0]["model_name"]+"%27%2C%27%20%27%2C%27%27)%2B%27%25%27%0D%0A%20%20%20%20%20%20%20%20AND%20Mh%20not%20in%20(%27AA-IVA%27%2C%27AA-NSS%27%2C%27DUPLICATE%27%2C%27UNKNOWN%27%2C%27OUT%20OF%20SCOPE%27)%0D%0A%20%20%20%20%20%20%20%20--AND%20status%3D%27P%27%0D%0A%20%20%20%20%20%20%20%20AND%20year%3D2020%0D%0A%09AND%20MS%20NOT%20IN%20(%27UK%27%2C%27NO%27%2C%27IS%27)%20&p=1&nrOfHits=100&mail=null&schema=null"


if (typeof res === "undefined")
		{
		document.getElementById('summary').innerHTML="<P style=text-align:right; top: 0px; margin-right:0px;><a href=https://darwah-group.com/GoCard><img src=img/close-window.png width=40px></a><P style=margin-right:40px;>"+error_msg;
		document.getElementById('summary').classList.toggle('show');
		}
		else
		{
		if (res[0].results.length == 0)
			{
			console.log(res[0].results.length);
			e = "true";
			console.log(e);
		document.getElementById('summary').innerHTML='<div style="padding: 0; width:98%; background-color:#FFFFFF; text-align:center; left: 0; right:0;"><table><TR><TD>We detected a <C style=color:#00786C; font-weight: bold;>' + carnet["detections"][0]["mmg"][0]["make_name"] + ' </C> <C style=color:#00786C;font-weight: bold;>'+ carnet["detections"][0]["mmg"][0]["model_name"]+'</C> but could not match it in the EEA database. <TD><a href=https://darwah-group.com/GoCard><img src=img/close-window.png width=40px></a></TD><TR><TD>You can browse [<a href=http://co2cars.apps.eea.europa.eu/ target=_blank>the database</A>] manually or [<a href=https://darwah-group.com/GoCard>try another vehicle</a>]<TD>';
		document.getElementById('summary').classList.toggle('show');
		}
		else
		{


txt = '<div style="padding: 0; width:98%; background-color:#FFFFFF; text-align:center; left: 0; right:0;"><table class=table1><TR><TD style="width:30px; vertical-align: middle;";"><a href=https://darwah-group.com/GoCard><img src=img/close-window.png width=40px></a></TD><TD style="vertical-align: middle;">'+carnet["detections"][0]["mmg"][0]["make_name"]+'</table></div><div style="padding: 0; width:98%; text-align:center; left: 0; right:0;"><table class="table2"><TR><TD style="width:33%;">'

//badges
if (res[0].results[0].avgM>2000)
	{
	txt = txt + '<img src=img/badge-high-weight.png width=100% height=100%>';
	}

if (res[0].results[0].avgM<1000)
	{
	txt = txt + '<img src=img/badge-low-weight.png width=100% height=100%>';
	}


txt = txt + '</TD><TD style="width:33%;">';

if (res[0].results[0].countVIN<1000)
	{
	txt = txt + '<img src=img/badge-rare.png width=100% height=100%>';
	}


txt = txt + '</TD><TD style="width:33%;">';

//display badges depending on extreme values
if (res[0].results[0].avgEWLTP>150)
	{
	txt = txt + '<img src=img/badge-high-emitter.png width=100% height=100%>';
	}

if (res[0].results[0].avgEWLTP<95)
	{
	txt = txt +'<img src=img/badge-low-emitter.png width=100% height=100%>';
	}

txt = txt + '</table></div><div style="position:absolute; bottom: 10%;left: 0; right:0; width:98%; background-color:#FFFFFF; text-align:center;"><div style="font-size:x-large; font-weight:bold;">'+res[0].results[0].Cn_short+'</div><table><TR><TD><B>Recognition confidence (%):</B><TD>'+Math.round(carnet["detections"][0]["mmg"][0]["probability"]*100)+'</C></TD><TR><TD><B>Registrations EU ('+res[0].results[0].year+'):</B><TD>'+(res[0].results[0].countVIN).toLocaleString()+'</C></TD><TR><TD><B>gCO<sub>2</sub>/km</B></TD><TD>'+res[0].results[0].avgEWLTP+' </C></TD><TR><TD><B>ccm</B></TD><TD>'+(res[0].results[0].avgEc).toLocaleString()+'</C></TD><TR><TD><B>kW</B></TD><TD>'+(res[0].results[0].avgEp).toLocaleString()+'<TR><TD><B>kg</B></TD><TD>'+(res[0].results[0].avgM).toLocaleString()+'</TD><TR><TD>Data from: <a href=http://co2cars.apps.eea.europa.eu/ target=_blank>[European Environment Agency]</A><TD></table></div>';

document.getElementById('summary').innerHTML=txt;


	//transition opacity
	document.getElementById('summary').classList.toggle('show');
	document.getElementById('canvas').style.height = c.height;
	}
}

	};


