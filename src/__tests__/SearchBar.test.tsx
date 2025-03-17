import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import { Driver } from "../types/driver";

// Mock driver data
const mockDrivers: Driver[] = [
  {
    driverID: 10862555,
    surname: "Scrivenor",
    forename: "Casey",
    vehicleRegistration: "PC21VXS",
    traces: [],
  },
  {
    driverID: 51256058,
    surname: "Wright",
    forename: "Jonathon",
    vehicleRegistration: "EB16FXW",
    traces: [],
  },
];

describe("SearchBar Component", () => {
  it("renders the search input correctly", () => {
    const setSearchTerm = jest.fn();
    const setSearchData = jest.fn();

    render(
      <SearchBar
        data={mockDrivers}
        searchTerm=""
        setSearchTerm={setSearchTerm}
        setSearchData={setSearchData}
      />
    );

    const inputElement = screen.getByPlaceholderText(
      "Search by driver name..."
    );
    expect(inputElement).toBeInTheDocument();
  });

  it("updates the search term and filters data correcyly on input change", () => {
    const setSearchTerm = jest.fn();
    const setSearchData = jest.fn();

    render(
      <SearchBar
        data={mockDrivers}
        searchTerm=""
        setSearchTerm={setSearchTerm}
        setSearchData={setSearchData}
      />
    );

    // Simulate typing in the input field
    const inputElement = screen.getByPlaceholderText(
      "Search by driver name..."
    );
    fireEvent.change(inputElement, { target: { value: "Casey" } });

    // Check if setSearchTerm is called with the correct value
    expect(setSearchTerm).toHaveBeenCalledWith("Casey");

    // // Check if setSearchData is called with the filtered data
    const expectedFilteredData = mockDrivers.filter(
      (driver) =>
        driver.driverID.toString().includes("Casey") ||
        driver.surname.toLowerCase().includes("Casey") ||
        driver.forename.toLowerCase().includes("Casey") ||
        driver.vehicleRegistration.toLowerCase().includes("Casey")
    );

    expect(setSearchData).toHaveBeenCalledWith(expectedFilteredData);
  });
});
