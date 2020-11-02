const request = require("request");
const utils = require("./utils");
const weather = require("./forecast");

// const url =
//   "http://api.weatherstack.com/current?access_key=9152849ab35309ade422048f5eb3c5d4&query=";

// request({ url, json: true }, (err, res) => {
//   if (err) {
//     console.log("Unable to connect to weather service!");
//   } else if (res.body.error) {
//     console.log(res.body.error.info);
//   } else {
//     console.log(res.body.current);
//   }
// });

// const geoCodeUrl =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/12what.json?access_token=pk.eyJ1IjoicmFpbmZvcnNzIiwiYSI6ImNrZ3ptem8xdDA3MWwycm1rcjU5ZGhucG0ifQ.PpZogJH-BOGJvA3mnl-whg";

// request({ url: geoCodeUrl, json: true }, (err, res) => {
//   if (err) {
//     console.log("Unable to connect to map services!");
//   } else if (res.body.message) {
//     console.log(res.body.message);
//   } else if (res.body.features.length === 0) {
//     console.log("Place not found");
//   } else {
//     console.log(
//       `Lat:${res.body.features[0].center[0]}`,
//       `Lng:${res.body.features[0].center[1]}`
//     );
//   }
// });

// utils.geocode("Edmonton", (error, data) => {
//   if (error) {
//     console.log("Error:", error);
//   }
//   if (data) {
//     forecast(data.lat, data.lng, (error, data) => {
//       if (error) {
//         console.log("Error:", error);
//       }
//       if (data) {
//         console.log("Data", data);
//       }
//     });
//   }
// });

const getForecast = async (address) => {
  try {
    const geodata = await utils.geocodePromise(address);
    const weatherData = await weather.forecastPromise(geodata.lat, geodata.lng);
    console.log(weatherData);
  } catch (err) {
    console.log(err);
  }
};

getForecast("Edmonton");
