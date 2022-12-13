# computerVisionCars
AI powered visualization of passenger cars data from European Environment Agency (EEA)
## Intro
Provide a playful access point to data available on http://co2cars.apps.eea.europa.eu/ to the general public. 

The user 'scans' cars in the street and get back some basic info (most notably: Co2 emissions) for similar cars from the EEA dataset above.

Due to different namings of companies/models in the 2 components, the figures might be slightly less reliable than the full dataset, but the aim is to play and experiment. Target audience: 7 year old boys.

## Building blocks
### Layout and style (card.css)
Handles the display, colors, general styling etc...
### Main page
Initial landing page + handling of user input (mobile: picture from the webcam; desktop: local file). The file is displayed on the canvas before being sent further.
### Webcam (webcam.js)
Reads picture from the canvas, calls uploader+AI, and passes 'make' and 'model' parameters to discodata
  #### Carnet AI (cURL.php)
  The online AI to be connected to (carnet.ai). It expects a picture and returns the cars make and model. 
  We save the file on a server and then pass-through the file to the AI. A key from carnet.ai is needed to run the API (redacted in the file)
  #### Discodata (part of webcam.js)
  The EEA's data provider. Queries are written in plain SQL on https://discodata.eea.europa.eu/ then we export the generated URL (to be used in webcam.js) and replace    the model/make parameters with the values coming from the AI
### Rendering (updateUI.js)
Renders the display with the data from carnetAI and updates the layout. Provides links to additional visualizations
### Charts (chartjs-graphs.js/charts.min.js)
Displays additional data as charts for the vehicle model (by year, by country), using a local copy of chartjs.org
### Images (img folder)
Holds design elements and the files uploaded by user that are then analysed by the AI
## Credits
AI by [Carnet.ai](https://www.carnet.ai)

Charts rendering with [ChartJS](www.chartjs.org) library

Data from [European Environment Agency](www.eea.europa.eu)

Imagined and put together by [Peter Cserba](https://www.darwah-group.com/)/2022 
