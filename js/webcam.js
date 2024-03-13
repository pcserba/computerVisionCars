function convertBlob() {

document.getElementById('loading').style.opacity=1;

canvas.toBlob((blob) => {
  var data = new FormData();
  data.append("up", f);

fetch('../GoCard/php/cURL.php', {method: 'POST', body: data})

       .then(res => res.text())
	.then(res =>
		{
		carnet = JSON.parse(res);
		if (typeof carnet["detections"] === "undefined" || carnet["detections"].length==0 || carnet["detections"][0]["mmg"][0]["make_name"]=="undefined")
			{
			e = "true";
			error_msg="Cannot detect vehicle. Please try again.";
			console.log(e);
			console.log(error_msg);
			res = undefined;
			showData(res)
			}
		else
		{


//remap some manufacturers and models
switch(carnet["detections"][0]["mmg"][0]["make_name"]) {
	case "MINI":
		carnet["detections"][0]["mmg"][0]["make_name"]="BMW";
		carnet["detections"][0]["mmg"][0]["model_name"]="MINI";
	break;
	case "JEEP":
		carnet["detections"][0]["mmg"][0]["make_name"]="CHRYSLRER";
	break;
	case "smart":
		carnet["detections"][0]["mmg"][0]["make_name"]="MERCEDES-BENZ AG";
	break;
	case "Rolls-Royce":
		carnet["detections"][0]["mmg"][0]["make_name"]="ROLLS ROYCE";
	case "Vauxhall":
		carnet["detections"][0]["mmg"][0]["make_name"]="OPEL";
	break;
	}

switch(carnet["detections"][0]["mmg"][0]["model_name"]) {
	case "2121 (4x4)":
		carnet["detections"][0]["mmg"][0]["model_name"]="4x4";
	break;
	case "E-mehari":
		carnet["detections"][0]["mmg"][0]["make_name"]="Bluecar";
	break;
	case "Pilot":
		carnet["detections"][0]["mmg"][0]["model_name"]="Jazz";
	break;

}
//for better results, we need to remap the Manufacturer to the Mh used in EEA database
//Stellantis excluding DS automobiles

if (carnet["detections"][0]["mmg"][0]["make_name"]=='Peugeot' || carnet["detections"][0]["mmg"][0]["make_name"]=='Citroen' || carnet["detections"][0]["mmg"][0]["make_name"]=='Opel' || carnet["detections"][0]["mmg"][0]["make_name"]=='Lancia')
{
var discomap1="https://discodata.eea.europa.eu/sql?query=SELECT%20%0D%0A%20%20%20%20Cn_short%0D%0A%20%20%20%20%2Cyear%0D%0A%20%20%20%20%2CISNULL(round(avg(EWLTP)%2C0)%2C0)%20as%20avgEWLTP%0D%0A%20%20%20%20%2CISNULL(round(avg(Ec)%2C0)%2C0)%20as%20avgEc%0D%0A%20%20%20%20%2Cround(avg(Ep)%2C0)%20as%20avgEp%0D%0A%20%20%20%20%2Cround(avg(M)%2C0)%20as%20avgM%0D%0A%20%20%20%20%2Ccount(distinct%20ID)%20as%20countVIN%0D%0A%20%20%20%20FROM%20%0D%0A%20%20%20%20%20%20%20%20(%0D%0A%20%20%20%20%20%20%20%20Select%20Mh%0D%0A%20%20%20%20%20%20%20%20%2C%27"+carnet["detections"][0]["mmg"][0]["model_name"]+"%27%20as%20Cn_short%0D%0A%20%20%20%20%20%20%20%20%2Cyear%0D%0A%20%20%20%20%20%20%20%20%2CID%0D%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5Bec%20(cm3)%5D%20as%20integer)%20as%20Ec%0D%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5Bep%20(KW)%5D%20as%20integer)%20as%20Ep%0D%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5BEwltp%20(g%2Fkm)%5D%20as%20integer)%20as%20EWLTP%0D%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5BM%20(kg)%5D%20as%20integer)%20as%20M%0D%0A%20%20%20%20%20%20%20%20from%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%0D%0A%20%20%20%20%20%20%20%20WHERE%20REPLACE(Cn%2C%27%20%27%2C%27%27)%20%20LIKE%20%27%25%27%2BREPLACE(%27"+carnet["detections"][0]["mmg"][0]["model_name"]+"%27%2C%27%20%27%2C%27%27)%2B%27%25%27%0D%0A%20%20%20%20%20%20%20%20AND%20(Mh%20LIKE%20%27%25"+carnet["detections"][0]["mmg"][0]["make_name"]+"%25%27%0D%0A%20%20%20%20%20%20%20%20%20OR%20Mh%20LIKE%20%27%25STELLANTIS%25%27%0D%0A%20%20%20%20%20%20%20%20%20OR%20Mh%20LIKE%20%27%25PSA%25%27%0D%0A%20%20%20%20%20%20%20%20%20)AND%20year%3D2022%0D%0A%09%20%20%20%20)%20as%20a%0D%0AGROUP%20BY%20CN_short%2Cyear&p=1&nrOfHits=100&mail=null&schema=null";
}
//DS automobiles
else if (carnet["detections"][0]["mmg"][0]["make_name"]=='DS')
{
var discomap1="https://discodata.eea.europa.eu/sql?query=SELECT%20%0A%20%20%20%20Cn_short%0A%20%20%20%20%2Cyear%0A%20%20%20%20%2Cround(avg(EWLTP)%2C0)%20as%20avgEWLTP%0A%20%20%20%20%2Cround(avg(Ec)%2C0)%20as%20avgEc%0A%20%20%20%20%2Cround(avg(Ep)%2C0)%20as%20avgEp%0A%20%20%20%20%2Cround(avg(M)%2C0)%20as%20avgM%0A%20%20%20%20%2Ccount(distinct%20ID)%20as%20countVIN%0A%20%20%20%20FROM%20%0A%20%20%20%20%20%20%20%20(%0A%20%20%20%20%20%20%20%20Select%20Mh%0A%20%20%20%20%20%20%20%20%2C%27"+carnet["detections"][0]["mmg"][0]["model_name"]+"%27%20as%20Cn_short%0A%20%20%20%20%20%20%20%20%2Cyear%0A%20%20%20%20%20%20%20%20%2CID%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5Bec%20(cm3)%5D%20as%20numeric(10%2C0))%20as%20Ec%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5Bep%20(KW)%5D%20as%20numeric(10%2C0))%20as%20Ep%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5BEwltp%20(g%2Fkm)%5D%20as%20numeric(10%2C0))%20as%20EWLTP%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5BM%20(kg)%5D%20as%20numeric(10%2C0))%20as%20M%0A%20%20%20%20%20%20%20%20from%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%0A%20%20%20%20%20%20%20%20WHERE%20REPLACE(Cn%2C%27%20%27%2C%27%27)%20LIKE%20%27%25%27%2BREPLACE(%27DS"+carnet["detections"][0]["mmg"][0]["model_name"]+"%27%2C%27%20%27%2C%27%27)%2B%27%25%27%0A%20%20%20%20%20%20%20%20AND%20(Mh%20LIKE%20(%27Stellantis%25%27)%20OR%20Mh%20LIKE%20%27Automobiles%25%27%20OR%20MH%20Like%27PSA%27)%0A%20%20%20%20%20%20%20%20AND%20year%3D2022%0A%20%20%20%20%20%20%20%20)%20as%20a%0A%20%20%20%20GROUP%20BY%20Cn_short%2Cyear&p=1&nrOfHits=100&mail=null&schema=null";
}


/*else if (carnet["detections"][0]["mmg"][0]["make_name"]=='BMW')
{
var discomap1="https://discodata.eea.europa.eu/sql?query=SELECT%20%0A%20%20%20%20Cn_short%0A%20%20%20%20%2Cyear%0A%20%20%20%20%2Cround(avg(EWLTP)%2C0)%20as%20avgEWLTP%0A%20%20%20%20%2Cround(avg(Ec)%2C0)%20as%20avgEc%0A%20%20%20%20%2Cround(avg(Ep)%2C0)%20as%20avgEp%0A%20%20%20%20%2Cround(avg(M)%2C0)%20as%20avgM%0A%20%20%20%20%2Ccount(distinct%20ID)%20as%20countVIN%0A%20%20%20%20FROM%20%0A%20%20%20%20%20%20%20%20(%0A%20%20%20%20%20%20%20%20Select%20Mh%0A%20%20%20%20%20%20%20%20%2C%27"+carnet["detections"][0]["mmg"][0]["model_name"]+"%27%20as%20Cn_short%0A%20%20%20%20%20%20%20%20%2Cyear%0A%20%20%20%20%20%20%20%20%2CID%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5Bec%20(cm3)%5D%20as%20numeric(10%2C0))%20as%20Ec%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5Bep%20(KW)%5D%20as%20numeric(10%2C0))%20as%20Ep%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5BEwltp%20(g%2Fkm)%5D%20as%20numeric(10%2C0))%20as%20EWLTP%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5BM%20(kg)%5D%20as%20numeric(10%2C0))%20as%20M%0A%20%20%20%20%20%20%20%20from%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%0A%20%20%20%20%20%20%20%20WHERE%20Cn%20LIKE%20%27%25%27%2BREPLACE(%27"+carnet["detections"][0]["mmg"][0]["model_name"]+"%27%2C%27%20series%27%2C%27%27)%2B%27%25%27%0A%20%20%20%20%20%20%20%20AND%20Mh%20LIKE%20%27%25BMW%25%27%0A%20%20%20%20%20%20%20%20AND%20year%3D2022%0A%20%20%20%20%20%20%20%20)%20as%20a%0A%20%20%20%20GROUP%20BY%20Cn_short%2Cyear&p=1&nrOfHits=100&mail=null&schema=null";
}*/
else
{
var discomap1="https://discodata.eea.europa.eu/sql?query=SELECT%20%0D%0A%20%20%20%20Cn_short%0D%0A%20%20%20%20%2Cyear%0D%0A%20%20%20%20%2CISNULL(round(avg(EWLTP)%2C0)%2C0)%20as%20avgEWLTP%0D%0A%20%20%20%20%2CISNULL(round(avg(Ec)%2C0)%2C0)%20as%20avgEc%0D%0A%20%20%20%20%2Cround(avg(Ep)%2C0)%20as%20avgEp%0D%0A%20%20%20%20%2Cround(avg(M)%2C0)%20as%20avgM%0D%0A%20%20%20%20%2Ccount(distinct%20ID)%20as%20countVIN%0D%0A%20%20%20%20FROM%20%0D%0A%20%20%20%20%20%20%20%20(%0D%0A%20%20%20%20%20%20%20%20Select%20Mh%0D%0A%20%20%20%20%20%20%20%20%2C%27"+carnet["detections"][0]["mmg"][0]["model_name"]+"%27%20as%20Cn_short%0D%0A%20%20%20%20%20%20%20%20%2Cyear%0D%0A%20%20%20%20%20%20%20%20%2CID%0D%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5Bec%20(cm3)%5D%20as%20integer)%20as%20Ec%0D%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5Bep%20(KW)%5D%20as%20integer)%20as%20Ep%0D%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5BEwltp%20(g%2Fkm)%5D%20as%20integer)%20as%20EWLTP%0D%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5BM%20(kg)%5D%20as%20integer)%20as%20M%0D%0A%20%20%20%20%20%20%20%20from%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%0D%0A%20%20%20%20%20%20%20%20WHERE%20REPLACE(Cn%2C%27%20%27%2C%27%27)%20%20LIKE%20%27%25%27%2BREPLACE(%27"+carnet["detections"][0]["mmg"][0]["model_name"]+"%27%2C%27%20%27%2C%27%27)%2B%27%25%27%0D%0A%20%20%20%20%20%20%20%20AND%20Mh%20LIKE%20%27%25"+carnet["detections"][0]["mmg"][0]["make_name"]+"%25%27%0D%0A%20%20%20%20%20%20%20%20%20AND%20year%3D2022%0D%0A%09%20%20%20%20)%20as%20a%0D%0AGROUP%20BY%20CN_short%2Cyear&p=1&nrOfHits=100&mail=null&schema=null";
}
console.log(discomap1);
const fetchReq1 = fetch(discomap1).then(res=>res.json());

const allData = Promise.all([fetchReq1]);
// attach then() handler to the allData Promise
allData.then((res) => {
	showData(res)});
}
 });
});
  }
