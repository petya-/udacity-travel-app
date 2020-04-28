import {
  getUserInput,
  buildTripObject,
  buildTripsView,
  buildAddTripView,
  requestDataFromAPIs,
  getLocalTrips,
  setLocalTrips,
} from "./helpers";
import { getTrips, postTrip, deleteTrip } from "./APIrequests";

let tripData = {};

// Request user trips on page load
const onPageLoad = async () => {
  document.addEventListener("DOMContentLoaded", async function () {
    const trips = await getTrips();
    if (trips.length) {
      setLocalTrips(trips);
      buildTripsView();
    }
  });
};

/* Function called by event listener */
const submitForm = async (event) => {
  event.preventDefault();

  const { city, startDate, endDate } = getUserInput();
  const { geoData, weatherData, imagesData } = await requestDataFromAPIs(city);

  tripData = buildTripObject(geoData, weatherData, imagesData);
  buildAddTripView(tripData);
};

// delete trip
const removeTrip = async (event) => {
  event.preventDefault();
  const trips = await deleteTrip(event.target.id);
  setLocalTrips(trips);
  buildTripsView();
};

const addTrip = async (event) => {
  const updatedTrips = await postTrip(tripData);
  setLocalTrips(updatedTrips);
  buildTripsView();
};

export { submitForm, removeTrip, addTrip, onPageLoad };
