const request = require("request");

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=9152849ab35309ade422048f5eb3c5d4&query=${lat},${lng}`;
  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect to weather stack server", undefined);
    } else if (res.body.error) {
      callback(res.body.error.info, undefined);
    } else {
      callback(undefined, res.body.current);
    }
  });
};

const forecastPromise = (lat, lng) => {
  const url = `http://api.weatherstack.com/current?access_key=9152849ab35309ade422048f5eb3c5d4&query=${lat},${lng}`;
  return new Promise((resolve, reject) => {
    request({ url, json: true }, (err, res) => {
      if (err) {
        return reject("Unable to connect to weather stack server");
      } else if (res.body.error) {
        return reject(res.body.error.info);
      } else {
        return resolve(res.body.current);
      }
    });
  });
};

module.exports = { forecast, forecastPromise };
