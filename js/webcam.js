function convertBlob() {

document.getElementById('loading').classList.toggle('show');

canvas.toBlob((blob) => {
  var data = new FormData();
  data.append("up", f);

fetch('../computerVision/php/cURL.php', {method: 'POST', body: data})

       .then(res => res.text())
	.then(res =>
		{
		carnet = JSON.parse(res);
		if (typeof carnet["detections"] === "undefined" || carnet["detections"].length==0)
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
	case "Jeep":
		carnet["detections"][0]["mmg"][0]["make_name"]="CHRYSLER";
	break;
	case "smart":
		carnet["detections"][0]["mmg"][0]["make_name"]="MERCEDES-BENZ AG";
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

var discomap1="https://discodata.eea.europa.eu/sql?query=SELECT%20%0D%0A%20%20%20%20Cn_short%0D%0A%20%20%20%20%2Cyear%0D%0A%20%20%20%20%2CISNULL(round(avg(EWLTP)%2C0),0)%20as%20avgEWLTP%0D%0A%20%20%20%20%2CISNULL(round(avg(Zr)%2C0),0)%20as%20avgZr%0D%0A%20%20%20%20%2CISNULL(round(avg(Ec)%2C0),'0')%20as%20avgEc%0D%0A%20%20%20%20%2Cround(avg(Ep)%2C0)%20as%20avgEp%0D%0A%20%20%20%20%2Cround(avg(M)%2C0)%20as%20avgM%0D%0A%20%20%20%20%2Ccount(distinct%20ID)%20as%20countVIN%0D%0A%20%20%20%20FROM%20%0D%0A%20%20%20%20%20%20%20%20(%0D%0A%20%20%20%20%20%20%20%20Select%20Mh%0D%0A%20%20%20%20%20%20%20%20%2C%27"+carnet["detections"][0]["mmg"][0]["model_name"]+"%27%20as%20Cn_short%0D%0A%20%20%20%20%20%20%20%20%2Cyear%0D%0A%20%20%20%20%20%20%20%20%2CID%0D%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5Bec%20(cm3)%5D%20as%20numeric(10%2C0))%20as%20Ec%0D%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5Bep%20(KW)%5D%20as%20numeric(10%2C0))%20as%20Ep%0D%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5BEwltp%20(g%2Fkm)%5D%20as%20numeric(10%2C0))%20as%20EWLTP%0D%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5BZr%5D%20as%20numeric(10%2C0))%20as%20Zr%0D%0A%20%20%20%20%20%20%20%20%2Ccast(%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5BM%20(kg)%5D%20as%20numeric(10%2C0))%20as%20M%0D%0A%20%20%20%20%20%20%20%20from%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%0D%0A%20%20%20%20%20%20%20%20WHERE%20REPLACE(Cn%2C%27%20%27%2C%27%27)%20%20LIKE%20%27%25%27%2BREPLACE(%27"+carnet["detections"][0]["mmg"][0]["model_name"]+"%27%2C%27%20%27%2C%27%27)%2B%27%25%27%0D%0A%20%20%20%20%20%20%20%20AND%20Mh%20LIKE%20%27%25%27%20%2B%20%27"+carnet["detections"][0]["mmg"][0]["make_name"]+"%27%20%2B%27%25%27%0D%0A%20%20%20%20%20%20%20--AND%20status%3D%27P%27%0D%0A%20%20%20%20%20%20%20%20AND%20year%3D2020%0D%0A%09%20%0D%0A%20%20%20%20%20%20%20%20)%20as%20a%0D%0AGROUP%20BY%20CN_short%2Cyear&p=1&nrOfHits=100&mail=null&schema=null"

//result by country
var discomap2="https://discodata.eea.europa.eu/sql?query=SELECT%20%0D%0A%09MS%0D%0A%20%20%20%20%2C%27"+carnet["detections"][0]["mmg"][0]["model_name"]+"%27%20as%20Cn_short%0D%0A%20%20%20%20%2Cyear%0D%0A%20%20%20%20%2Ccount(distinct%20ID)%20as%20countVIN%0D%0A%20%20%20%20FROM%20%0D%0A%20%20%20%20%20%20%20%20(%0D%0A%20%20%20%20%20%20%20%20Select%20%0D%0A%20%20%20%20%20%20%20%20MS%0D%0A%20%20%20%20%20%20%20%20%2Cyear%0D%0A%20%20%20%20%20%20%20%20%2CID%0D%0A%20%20%20%20%20%20%20from%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%0D%0A%20%20%20%20%20%20%20%20WHERE%20REPLACE(Cn%2C%27%20%27%2C%27%27)%20LIKE%20%27%25%27%2B%20REPLACE(%27"+carnet["detections"][0]["mmg"][0]["model_name"]+"%27%2C%27%20%27%2C%27%27)%20%2B%27%25%27%0D%0A%20%20%20%20%20%20%20%20AND%20Mh%20LIKE%20%27%25%27%20%2B%20%27"+carnet["detections"][0]["mmg"][0]["make_name"]+"%27%20%2B%27%25%27%0D%0A%20%20%20%20%20%20%20--AND%20status%3D%27P%27%0D%0A%20%20%20%20%20%20%20%20AND%20year%3D2020%0D%0A%20%20%20%20%20%20%20%20GROUP%20BY%20MS%2Cyear%2CID)%20as%20a%0D%0AGROUP%20BY%20ms%2C%20year%0D%0A&p=1&nrOfHits=100&mail=null&schema=null";

//result by year
var discomap3="https://discodata.eea.europa.eu/sql?query=SELECT%20%0D%0A%20%20%20%20%27"+carnet["detections"][0]["mmg"][0]["model_name"]+"%27%20as%20Cn_short%0D%0A%20%20%20%20%2Cyear%0D%0A%20%20%20%20%2Ccount(distinct%20ID)%20as%20countVIN%0D%0A%20%20%20%20FROM%20%0D%0A%20%20%20%20%20%20%20%20(%0D%0A%20%20%20%20%20%20%20%20Select%20%0D%0A%20%20%20%20%20%20%20%20MS%0D%0A%20%20%20%20%20%20%20%20%2Cyear%0D%0A%20%20%20%20%20%20%20%20%2CID%0D%0A%20%20%20%20%20%20%20from%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%0D%0A%20%20%20%20%20%20%20%20WHERE%20REPLACE(Cn%2C%27%20%27%2C%27%27)%20LIKE%20%27%25%27%20%2B%20REPLACE(%27"+carnet["detections"][0]["mmg"][0]["model_name"]+"%27%2C%27%20%27%2C%27%27)%2B%27%25%27%0D%0A%20%20%20%20%20%20%20AND%20Mh%20LIKE%20%27%25%27%20%2B%20%27"+carnet["detections"][0]["mmg"][0]["make_name"]+"%27%2B%27%25%27%0D%0A%20%20%20%20%20%20%20%20--AND%20status%3D%27P%27%0D%0A%20%20%20%20%20%20%20%20AND%20year%3E2016%0D%0AGROUP%20BY%20MS%2Cyear%2CID)%20as%20a%0D%0AGROUP%20BY%20year%0D&p=1&nrOfHits=100&mail=null&schema=null"

//result by manufacturer
var discomap4 = "https://discodata.eea.europa.eu/sql?query=SELECT%20%20%20%0D%0A%20%20%20%20Mh%0D%0A%20%20%20%20%2Cround(avg(cast(%5BEWLTP%20(g%2Fkm)%5D%20as%20float))%2C3)%20as%20avgEWLTP%0D%0A%20%20%20%20%2Ccount(distinct%20ID)%20as%20countVIN%0D%0A%20%20%20%20FROM%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%0D%0A%20%20%20%20WHERE%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5BMh%5D%20in%20(%0D%0A%20%20%20%20%20%20%20%20Select%20%0D%0A%20%20%20%20%20%20%20%20DISTINCT%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D.%5BMh%5D%20as%20Mh%0D%0A%20%20%20%20%20%20%20%20from%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%0D%0A%20%20%20%20%20%20%20%20WHERE%20Mh%20LIKE%20%27%25%27%20%2B%20%27"+carnet["detections"][0]["mmg"][0]["make_name"]+"%27%20%2B%27%25%27%0D%0A%20%20%20%20%20%20%20%20AND%20year%3D2020%0D%0A%20%20%20%20%20%20%20%20--AND%20status%3D%27P%27%0D%0A%20%20%20%20%20%20%20%20)%0D%0A%20%20%20%20GROUP%20BY%20mh&p=1&nrOfHits=100&mail=null&schema=null"
console.log(discomap1)

const fetchReq1 = fetch(discomap1).then(res=>res.json());
const fetchReq2 = fetch(discomap2).then(res=>res.json());
const fetchReq3 = fetch(discomap3).then(res=>res.json());
//const fetchReq4 = fetch(discomap4).then(res=>res.json());

const allData = Promise.all([fetchReq1,fetchReq2,fetchReq3]);
// attach then() handler to the allData Promise
allData.then((res) => {
	showData(res)});
}
 });
});
  }
