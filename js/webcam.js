var webkam = {
  // (A) INITIALIZE
  hVid : null, hSnaps :null, hTake : null, hSave : null,
  init : () => {
    // (A1) GET HTML ELEMENTS
    webkam.hVid = document.getElementById("kam-live"),
    webkam.hTake = document.getElementById("kam-take"),

    // (A2) GET USER PERMISSION TO ACCESS CAMERA
    navigator.mediaDevices.getUserMedia({ video: true })
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
    let canvas = webkam.hVid.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        vWidth = webkam.hVid.videoWidth,
        vHeight = webkam.hVid.videoHeight;

    // (B2) CAPTURE VIDEO FRAME TO CANVAS
    canvas.width = vWidth;
    canvas.height = vHeight;
    ctx.drawImage(webkam.hVid, 0, 0, vWidth, vHeight);
	webkam.hVid.pause();
	webkam.hVid.removeAttribute('src'); // empty source
	webkam.hVid.load();
    
// (B3) DONE
    return canvas;
  },

  // (C) TAKE A SNAPSHOT - PUT CANVAS INTO <DIV> WRAPPER
  take : () => {
    webkam.hVid.appendChild(webkam.snap());
  },

 };
window.addEventListener("load", webkam.init);
