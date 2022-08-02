var webkam = {
  // (A) INITIALIZE
  hVid : null, hSnaps :null, hTake : null, hSave : null,
  init : () => {


    // (A1) GET HTML ELEMENTS
    webkam.hVid = document.getElementById("kam-live"),
    webkam.hSnaps = document.getElementById("kam-snaps"),
    webkam.hTake = document.getElementById("kam-take"),

    // (A2) GET USER PERMISSION TO ACCESS CAMERA
    navigator.mediaDevices.getUserMedia({ video: true, facingMode: { exact: "environment" }})
    .then((stream) => {
      // "LIVE FEED" WEB CAM TO <VIDEO>
      webkam.hVid.srcObject = stream;

      // ENABLE BUTTONS
      webkam.hTake.onclick = webkam.take;
      webkam.hTake.disabled = false;
    })
    .catch((err) => { console.error(err); });
  },

  // (B) HELPER - SNAP VIDEO FRAME TO CANVAS
  snap : () => {
    // (B1) CREATE NEW CANVAS
    let canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        vWidth = webkam.hVid.videoWidth,
        vHeight = webkam.hVid.videoHeight;

    // (B2) CAPTURE VIDEO FRAME TO CANVAS
    canvas.width = vWidth;
    canvas.height = vHeight;
  webkam.hVid.style.display = "none";
    ctx.drawImage(webkam.hVid, 0, 0, vWidth, vHeight);

	canvas.toBlob((blob) => {
  	let file = new File([blob], "demo.png", { type: "image/png" });
  	var data = new FormData();
  	data.append("up", file);
	//dataURL = canvas.toDataURL("image/jpeg",1.0);
	//console.log(dataURL);
 


const data1 = JSON.stringify({
	"url": "https://petstore.swagger.io/v2/swagger.json",
	"method": "GET",
	"params": {},
	"data": {},
	"cookies": {}
});


const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open("GET", "https://cors-proxy1.p.rapidapi.com/");
xhr.setRequestHeader("X-RapidAPI-Key", "8f9246e873msh085a46348edfd71p1b161cjsn82acff12e147");
xhr.setRequestHeader("X-RapidAPI-Host", "cors-proxy1.p.rapidapi.com");

xhr.send(data1);
});

    // (B3) DONE
    return canvas;
  },

  // (C) TAKE A SNAPSHOT - PUT CANVAS INTO <DIV> WRAPPER
  take : () => {
	webkam.hSnaps.appendChild(webkam.snap());
  },

};
window.addEventListener("load", webkam.init);
