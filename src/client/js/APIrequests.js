// Personal API Key for GeoNames Web Service
const geonamesBaseURL = "http://api.geonames.org/searchJSON?formatted=true&q=";
const geonamesUsername = "petya";

const weatherbitBaseURL = "https://api.weatherbit.io/v2.0/current?city=";
const weatherbitAPIKey = "b221ade3027d4921a2ff592b6372af95";

const pixabayURL = "https://pixabay.com/api/";
const pixabayAPIKey = "16258949-243f4ab8f7fb0f7d91fa289fd";

const getGeoData = async (city) => {
  if (!city) alert("You must enter a city");
  const geonamesEndpoint = `${geonamesBaseURL}${city}&username=${geonamesUsername}`;
  try {
    const response = await fetch(geonamesEndpoint);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const getWeatherData = async (city) => {
  if (!city) alert("You must enter a city");
  const weatherbitEndpoint = `${weatherbitBaseURL}${city}&key=${weatherbitAPIKey}`;
  try {
    const response = await fetch(weatherbitEndpoint);
    if (response) return response.json();
  } catch (error) {
    console.error(error);
  }
};

const getPixabayImage = async (location) => {
  try {
    const pixabayEndpoint = `${pixabayURL}?key=${pixabayAPIKey}&q=${location}&image_type=photo&pretty=true&category=places`;
    let response = await fetch(pixabayEndpoint);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const getTrips = async () => {
  try {
    const trips = await fetch("http://127.0.0.1:8000/trips");
    return trips.json();
  } catch (error) {
    console.error(error);
  }
};

const postTrip = async (trip) => {
  try {
    const trips = await fetch("http://127.0.0.1:8000/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ trip }),
    });
    return trips.json();
  } catch (error) {
    console.error(error);
  }
};

const deleteTrip = async (tripId) => {
  try {
    const trips = await fetch(`http://127.0.0.1:8000/trips/${tripId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return trips.json();
  } catch (error) {
    console.error(error);
  }
};

export {
  getGeoData,
  getWeatherData,
  getPixabayImage,
  getTrips,
  postTrip,
  deleteTrip,
};
