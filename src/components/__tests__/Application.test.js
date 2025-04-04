import React from "react";

import { fireEvent, render, getByText, findByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, findAllByAltText } from "@testing-library/react";
import "@testing-library/jest-dom";
import Application from "../Application";
import axios from "axios";
jest.mock("axios");

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { queryByText, findByText } = render(<Application />);

  return findByText("Monday").then(() => {
    fireEvent.click(queryByText("Tuesday"));
    expect(queryByText("Leopold Silvers")).toBeInTheDocument();
  });
});

// Integration Testing
it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container } = render(<Application />);

  // Await for confirmation that the data has loaded
  await findByText(container, "Archie Cohen");

  // Find the appointment that is empty
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  // New text field should show
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" },
  });

  // Interviewer list should show
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  // Save button should show
  fireEvent.click(getByText(appointment, "Save"));

  // Check that the text "Saving" is displayed
  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  // Wait until the text "Lydia Miller-Jones" is displayed
  await findByText(appointment, "Lydia Miller-Jones");

  // Check that the number of spots remaining for Monday is 0
  const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.
  await findByText(container, "Archie Cohen");
  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find((appointment) =>
    queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(getByAltText(appointment, "Delete"));
  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm"));
  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  // 7. Wait until the element with the "Add" button is displayed.
  await findAllByAltText(appointment, "Add");
  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.
  await findByText(container, "Archie Cohen");
  // 3. Click the "Edit" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find((appointment) =>
    queryByText(appointment, "Archie Cohen")
  );
  fireEvent.click(getByAltText(appointment, "Edit"));
  // 4. Edit Details
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" },
  });
  // 5. Select Interviewer
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  // 6. Click the "Save" button on the confirmation.
  fireEvent.click(getByText(appointment, "Save"));
  // 7. Check that the element with the text "Saving" is displayed.
  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  // 8. Wait for new details to show
  await findByText(appointment, "Lydia Miller-Jones");
  // 9. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
  const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));

  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
});

// Save error test
it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();
})
// Delete error test
it("shows the delete error when failing to delete an appointment", async () => {
  axios.delete.mockRejectedValueOnce();
})

describe("Appointment", ()=> {
  it("renders without crashing", () => {
    render
  });
});