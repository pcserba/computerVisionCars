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
 
var specUrl = 'https://petstore.swagger.io/v2/swagger.json'; // data urls are OK too 'data:application/json;base64,abc...'
//SwaggerClient.http.withCredentials = true; // this activates CORS, if necessary

var swaggerClient = new SwaggerClient(specUrl)
      .then(function (swaggerClient) {
          return swaggerClient.apis.pet.addPet({id: 1, name: "bobby"}); // chaining promises
      }, function (reason) {
         console.error("failed to load the spec" + reason);
      })
      .then(function(addPetResult) {
         console.log(addPetResult.obj);
         // you may return more promises, if necessary
      }, function (reason) {
          console.error("failed on API call " + reason);
      });


//const request = {
//  url: 'https://petstore.swagger.io/v2/swagger.json',
//  mode: 'no-cors',
//  method: 'GET',
//  headers: {
//    'Content-Type': 'application/octet-stream',
//    'api-key': '91761936-0b93-4f6e-919e-2a8ccc2f635d',
//    'accept': 'application/json',
//    'Access-Control-Allow-Origin': '*'
//  },
//};

//SwaggerClient.http(request); // => Promise(Response)
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
