import React from "react";
import { Driver } from "../../types/driver";
import { Activity } from "../../types/activity";

export const calculateTotalTime = (driver: Driver) => {
  const totalMinutes = driver.traces.reduce((outerAcc, trace) => {
    const innerSum = trace.activity.reduce(
      (innerAcc, curr) => innerAcc + curr.duration,
      0
    );

    return outerAcc + innerSum;
  }, 0);

  return totalMinutes;
};

export const calculateActivityTotals = (driver: Driver) => {
  const initialTotals = {
    drive: 0,
    work: 0,
    rest: 0,
    available: 0,
  };

  const totals = driver.traces.reduce((acc, trace) => {
    trace.activity.forEach((activity: Activity) => {
      const type = activity.type as keyof typeof acc;
      acc[type] += activity.duration;
    });
    return acc;
  }, initialTotals);

  return initialTotals;
};

const DriverRow = ({ driver }: { driver: Driver }) => {
  const totalTime = calculateTotalTime(driver);

  const activityTimes = calculateActivityTotals(driver);

  const week: string[] = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];

  return (
    <tr className="border-b border-gray-300">
      {/* Driver Info */}
      <td className="p-3 font-semibold text-purple-500 ">
        {driver.forename} {driver.surname}
      </td>
      <td className="p-3 text-center">{driver.vehicleRegistration}</td>
      <td className="p-3 text-center">{totalTime}</td>

      <td className="text-center"> {activityTimes["drive"]}</td>
      <td className="text-center"> {activityTimes["work"]}</td>
      <td className="text-center"> {activityTimes["rest"]}</td>
      <td className="text-center"> {activityTimes["available"]}</td>

      {/* Weekly Activity Indicator */}
      {week.map((day, i) => (
        <td key={i} className="p-2 text-center">
          <div
            data-testid={`day-${i}`}
            className={`w-6 h-6 mx-auto border rounded-full ${
              driver.traces.some((trace) => {
                const traceDate = new Date(trace.date);
                const traceDay = traceDate.getDay();
                return week[traceDay] === day;
              })
                ? "bg-green-500"
                : "bg-gray-200"
            }`}
          />
        </td>
      ))}
    </tr>
  );
};

export default DriverRow;
