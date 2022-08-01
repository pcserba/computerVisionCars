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
 
var url = "https://api.carnet.ai/v2/mmg/detect?box_offset=0&box_min_width=180&box_min_height=180&box_min_ratio=1&box_max_ratio=3.15";

var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("accept", "application/json");
xhr.setRequestHeader("api-key", "91761936-0b93-4f6e-919e-2a8ccc2f635d");
xhr.setRequestHeader("Content-Type", "application/octet-stream");
xhr.setRequestHeader("Access-Control-Allow-Origin", "91761936-0b93-4f6e-919e-2a8ccc2f635d")

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

xhr.send();
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
