import {
  getGeoData,
  getWeatherData,
  getPixabayImage,
  getTrips,
  postTrip,
  deleteTrip,
} from "./APIrequests";

const getUserInput = () => {
  const city = document.getElementById("city").value.toLowerCase();
  const startDate = document.getElementById("startDate").value.split("-");

  const endDate = document.getElementById("endDate").value.split("-");

  return {
    city,
    startDate,
    endDate,
  };
};

const buildTripObject = (geoData, weatherData, imagesData) => {
  let tripObject = {};
  tripObject.city = geoData.geonames[0].toponymName;
  tripObject.country = geoData.geonames[0].countryName;
  tripObject.countryCode = geoData.geonames[0].countryCode;
  tripObject.lat = geoData.geonames[0].lat;
  tripObject.lng = geoData.geonames[0].lng;
  tripObject.population = geoData.geonames[0].population;
  tripObject.weather = weatherData.data[0].weather;
  tripObject.weather.temp = weatherData.data[0].temp;
  tripObject.image = imagesData.hits[0].largeImageURL;

  return tripObject;
};

const requestDataFromAPIs = async (city) => {
  const geoData = await getGeoData(city);

  if (!geoData.totalResultsCount) {
    return alert("Please enter a valid city!");
  }

  let [weatherData, imagesData] = await Promise.all([
    getWeatherData(city),
    getPixabayImage(city),
  ]);

  if (!imagesData.totalHits) {
    imagesData = await getPixabayImage(geoData.geonames[0].countryName);
  }

  return { geoData, weatherData, imagesData };
};

const setLocalTrips = (trips) => {
  localStorage.setItem("trips", JSON.stringify(trips));
};

const getLocalTrips = () => {
  return JSON.parse(localStorage.getItem("trips"));
};

export {
  getUserInput,
  buildTripObject,
  requestDataFromAPIs,
  setLocalTrips,
  getLocalTrips,
};
