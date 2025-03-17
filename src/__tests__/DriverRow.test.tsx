import React from "react";
import { render, screen } from "@testing-library/react";
import DriverRow from "../components/Driver/DriverRow";
import { Driver } from "../types/driver";

// Mock driver data
const mockDriver: Driver = {
  driverID: 10862555,
  surname: "Scrivenor",
  forename: "Casey",
  vehicleRegistration: "PC21VXS",
  traces: [
    {
      date: "2021-02-01",
      activity: [
        { startTime: "09:00", type: "drive", duration: 62 },
        { startTime: "10:02", type: "rest", duration: 20 },
      ],
    },
    {
      date: "2021-02-03",
      activity: [
        { startTime: "13:00", type: "available", duration: 10 },
        { startTime: "13:10", type: "drive", duration: 13 },
      ],
    },
  ],
};

describe("DriverRow Component", () => {
  it("renders driver information correctly", () => {
    render(
      <table>
        <tbody>
          <DriverRow driver={mockDriver} />
        </tbody>
      </table>
    );

    // Check if the driver's name and registration are displayed
    expect(
      screen.getByText(`${mockDriver.forename} ${mockDriver.surname}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockDriver.vehicleRegistration)
    ).toBeInTheDocument();
  });

  it("displays the total activity time correctly", () => {
    render(
      <table>
        <tbody>
          <DriverRow driver={mockDriver} />
        </tbody>
      </table>
    );

    // Calculate the expected total time
    const totalTime = mockDriver.traces.reduce((outerAcc, trace) => {
      return (
        outerAcc +
        trace.activity.reduce((innerAcc, curr) => innerAcc + curr.duration, 0)
      );
    }, 0);

    // Check if the total time is displayed correctly
    expect(screen.getByText(totalTime.toString())).toBeInTheDocument();
  });

  it("displays the activity totals correctly", () => {
    render(
      <table>
        <tbody>
          <DriverRow driver={mockDriver} />
        </tbody>
      </table>
    );

    // Calculate the expected activity totals
    const activityTotals = {
      drive: 75, // 62 + 13
      work: 0,
      rest: 20,
      available: 10,
    };

    // Check if the activity totals are displayed correctly
    expect(
      screen.getByText(activityTotals.drive.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(activityTotals.work.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(activityTotals.rest.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(activityTotals.available.toString())
    ).toBeInTheDocument();
  });

  it("highlights the correct days of the week based on traces", () => {
    render(
      <table>
        <tbody>
          <DriverRow driver={mockDriver} />
        </tbody>
      </table>
    );

    // Days of the week
    const week = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];

    // Check each day's indicator
    week.forEach((day, i) => {
      const dayElement = screen.getByTestId(`day-${i}`);
      const hasTrace = mockDriver.traces.some((trace) => {
        const traceDate = new Date(trace.date);
        const traceDay = traceDate.getDay();
        return week[traceDay] === day;
      });

      if (hasTrace) {
        expect(dayElement).toHaveClass("bg-green-500"); // Highlighted day
      } else {
        expect(dayElement).toHaveClass("bg-gray-200"); // Non-highlighted day
      }
    });
  });
});
