import { submitForm, removeTrip, addTrip } from "../client/js/app";

describe("Test that the functions are defined", () => {
  test("submitForm should be defined", async () => {
    expect(submitForm).toBeDefined();
  });
  test("removeTrip should be defined", async () => {
    expect(removeTrip).toBeDefined();
  });
  test("addTrip should be defined", async () => {
    expect(addTrip).toBeDefined();
  });
});
