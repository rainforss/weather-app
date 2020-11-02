const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicmFpbmZvcnNzIiwiYSI6ImNrZ3ptem8xdDA3MWwycm1rcjU5ZGhucG0ifQ.PpZogJH-BOGJvA3mnl-whg`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect to map services!", undefined);
    } else if (res.body.message) {
      callback(res.body.message);
    } else if (res.body.features.length === 0) {
      callback("Place not found", undefined);
    } else {
      callback(undefined, {
        lng: res.body.features[0].center[0],
        lat: res.body.features[0].center[1],
        location: res.body.features[0].place_name,
      });
    }
  });
};

const geocodePromise = (address) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicmFpbmZvcnNzIiwiYSI6ImNrZ3ptem8xdDA3MWwycm1rcjU5ZGhucG0ifQ.PpZogJH-BOGJvA3mnl-whg`;
  return new Promise((resolve, reject) => {
    request({ url, json: true }, (err, res) => {
      if (err) {
        return reject("Unable to connect to map services!");
      } else if (res.body.message) {
        return reject(res.body.message);
      } else if (res.body.features.length === 0) {
        return reject("Place not found");
      } else {
        return resolve({
          lng: res.body.features[0].center[0],
          lat: res.body.features[0].center[1],
          location: res.body.features[0].place_name,
        });
      }
    });
  });
};

module.exports = { geocode, geocodePromise };
