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
	data = canvas.toDataURL('image/jpeg', 1.0);
	data = data.replace('data:image/jpeg;base64,','');
	console.log(data);

	canvas.toBlob((blob) => {
 	let file = new Blob(['blob'], { type: "image/jpeg" });

const data1 = JSON.stringify({
	"url": "https://api.carnet.ai/v2/mmg/detect?box_offset=0&box_min_width=180&box_min_height=180&box_min_ratio=1",
	"method": "POST",
	"params": {},
	"data": {file},
	"headers": {
		"api-key": "91761936-0b93-4f6e-919e-2a8ccc2f635d",
		"accept": "application/json",
		"Content-Type": "application/octet-stream"
	},
	"cookies": {}
});

console.log(data1);

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

//xhr.open("POST", "https://cors-proxy1.p.rapidapi.com/v1");
//xhr.setRequestHeader("content-type", "application/json");
//xhr.setRequestHeader("X-RapidAPI-Key", "8f9246e873msh085a46348edfd71p1b161cjsn82acff12e147");
//xhr.setRequestHeader("X-RapidAPI-Host", "cors-proxy1.p.rapidapi.com");

xhr.open("POST","https://corsproxy.io/?https://api.carnet.ai/v2/mmg/detect?box_offset=0&box_min_width=180&box_min_height=180&box_min_ratio=1")
xhr.setRequestHeader("content-type", "application/octet-stream");
xhr.setRequestHeader("api-key", "91761936-0b93-4f6e-919e-2a8ccc2f635d");
xhr.setRequestHeader("accept", "application/json");

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
