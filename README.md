# computerVisionCars
A Top Trumps card emulator aka: querying the cars data from European Environment Agency (EEA) with an AI trained to recognize cars. 

[Example](https://darwah-group.com/GoCard) (mobile device recommended)

## Intro
Provide a playful access point to data available on http://co2cars.apps.eea.europa.eu/ to the general public. 

The user 'scans' cars in the street or screen and gets back some basic info for similar cars from the EEA dataset above.

Due to different namings of companies/models in the 2 components, the figures might be slightly less reliable than the full dataset.

## Building blocks
### Layout and style (card.css)
Handles the display, colors, general styling etc...
### Main page
Initial landing page + handling of user input (mobile: picture from the webcam; desktop: local file). The file is displayed on the canvas before being sent further.
### Webcam (webcam.js)
Reads picture from the canvas, calls uploader+AI, and passes 'make' and 'model' parameters to discodata (EEA database)
  #### Carnet AI (cURL.php)
  The online AI to be connected to (carnet.ai). It expects a picture and returns the cars make and model. 
  We save the file on a server and then pass-through the file to the AI. A key from carnet.ai is needed to run the API (redacted in the github file)
  #### Discodata (part of webcam.js)
  The EEA's data provider. Queries are written in plain SQL on [EEA Discodata](https://discodata.eea.europa.eu/) then we export the generated URL (to be used in webcam.js) and replace the model/make parameters with the values coming from the AI
### Rendering (updateUI.js)
Renders the display with the data from carnetAI and updates the layout.
### Images (img folder)
Holds design elements and the files uploaded by user that are then analysed by the AI
## Credits
AI by [carnet.ai](https://carnet.ai)

Data from [European Environment Agency](http://www.eea.europa.eu)

Imagined and put together by [Peter Cserba](https://www.darwah-group.com/)/2022 
