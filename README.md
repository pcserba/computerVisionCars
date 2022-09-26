# computerVisionCars
A project to display data collected by European Environment Agency (EEA) on passenger cars on vehicles recognized by an AI.
## Intro
The aim is to be able to 'scan' cars in the street and give some basic info on them from data provided by EEA.
## Building blocks
### Layout and style (webcam.css)
Handles the display, colors etc...
### Carnet AI (cURL.php)
The online AI to be connected to (carnet.ai). It expects a picture and returns the cars make and model.
We save the file on a server and then pass-through the file to the AI
### Webcam (webcam.js)
A modified version of https://code-boxx.com/capture-photos-webcam-javascript/ that handles the display and the capture
### Rendering (updateUI.js)
Renders the display with the data from carnetAI and updates the CSS
### charts.js (chartjs-graphs.js)
Displays additional data as charts for the manufacturer or the vehicle model
### Discodata (part of webcam.js)
The EEA's data provider. Queries are written in plain SQL on https://discodata.eea.europa.eu/ then we export the generated URL (to be used in webcam.js) and replace the model/make parameters with the values coming from the AI
