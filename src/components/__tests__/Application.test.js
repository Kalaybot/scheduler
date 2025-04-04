import React from "react";

import { fireEvent, render, getByText, findByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";
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
  const appointment = getAllByTestId(container, "appointment")[0];

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

describe("Appointment", ()=> {
  it("renders without crashing", () => {
    render
  });
});