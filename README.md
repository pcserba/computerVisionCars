# computerVisionCars
AI powered visualization of passenger cars data from European Environment Agency (EEA)
## Intro
The aim is to be able to 'scan' cars in the street and give some basic info on them from data provided by EEA.
## Building blocks
### Main page
Initial landing page + handling of user input (mobile: picture from the webcam; desktop: local file)
### Layout and style (card.css)
Handles the display, colors, general styling etc...
### Carnet AI (cURL.php)
The online AI to be connected to (carnet.ai). It expects a picture and returns the cars make and model. 
We save the file on a server and then pass-through the file to the AI
### Webcam (webcam.js)
Calls uploader+AI, and passes make and model parameters to  discodata
### Rendering (updateUI.js)
Renders the display with the data from carnetAI and updates the layout
### Charts (chartjs-graphs.js/charts.min.js)
Displays additional data as charts for the manufacturer or the vehicle model, using a local copy of chartjs.org
### Discodata (part of webcam.js)
The EEA's data provider. Queries are written in plain SQL on https://discodata.eea.europa.eu/ then we export the generated URL (to be used in webcam.js) and replace the model/make parameters with the values coming from the AI
### Images (img folder)
Holds design elements and the files uploaded by user that are then analysed by the AI
