import {
  getUserInput,
  buildTripObject,
  requestDataFromAPIs,
  getLocalTrips,
  setLocalTrips,
} from "./helpers";
import { getTrips, postTrip, deleteTrip } from "./APIrequests";
let tripData = {};
let trips = [];

// Request user trips on page load
document.addEventListener("DOMContentLoaded", async function () {
  trips = await getTrips();
  console.log("trips on load", trips);
  setLocalTrips(trips);
});

/* Function called by event listener */
const submitForm = async (event) => {
  event.preventDefault();

  const { city, startDate, endDate } = getUserInput();
  const { geoData, weatherData, imagesData } = await requestDataFromAPIs(city);

  tripData = buildTripObject(geoData, weatherData, imagesData);
  const newTrip = await postTrip(tripData);

  trips.push(newTrip);
  setLocalTrips(trips)s;
  buildTripsView();
};

const buildTripsView = () => {
  const trips = getLocalTrips();
  console.log("create view");
  console.log(trips);

  const tripsContainer = document.getElementById("trips__container");
  tripsContainer.textContent = "";
  const fragment = document.createDocumentFragment(); // DocumentFragment instead of a <div> for permormance

  for (let trip of trips) {
    const newElement = document.createElement("div");
    newElement.innerHTML = `<div class="trip__card">
          <p><strong>City:</strong></p> <p><span>${trip.city}</span></p>
        </div>`;

    newElement.classList.add("flex-item");
    fragment.appendChild(newElement);
  }

  tripsContainer.appendChild(fragment); // reflow and repaint once here
};

export { submitForm };
