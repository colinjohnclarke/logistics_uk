import React from "react";
import { Driver } from "../../types/driver";

const DriverRow = ({ driver }: { driver: Driver }) => {
  const totalMinutes = driver.traces.reduce((outerAcc, trace) => {
    const innerSum = trace.activity.reduce(
      (innerAcc, curr) => innerAcc + curr.duration,
      0
    );

    console.log(driver.forename, innerSum);
    return outerAcc + innerSum;
  }, 0);

  const week: string[] = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];

  return (
    <tr className="border-b border-gray-300">
      {/* Driver Info */}
      <td className="p-3 font-semibold text-purple-500">
        {driver.forename} {driver.surname}
      </td>
      <td className="p-3">{driver.vehicleRegistration}</td>
      <td className="p-3">{totalMinutes} mins</td>

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
