import React, { useState } from "react";
import driversData from "../data/drivers.json";
import DriverRow from "./Driver/DriverRow";
import { Driver } from "../types/driver";
import SearchBar from "./SearchBar";
import { activityTypes } from "../types/activitytypes";

function DriverInfo() {
  const [searchData, setSearchData] = useState<Driver[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const drivers: Driver[] = driversData.data ?? [];

  const weekday = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];

  return (
    <div className="w-full">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        data={drivers}
        setSearchData={setSearchData}
      />
      <table className="border border-neutral-300 shadow  w-[100%] pr-10 justify-center items-center">
        <th>Name</th> <th> Vehicle regsitration</th> <th>Activity duration</th>
        {activityTypes.map((type) => (
          <th>{type}</th>
        ))}
        {weekday.map((day) => (
          <th className="text-sm text-neutral-400 text-center">{day}</th>
        ))}
        <tbody>
          {searchTerm && searchData.length === 0 ? (
            <tr>
              <td colSpan={10} className="text-center p-4 text-gray-500">
                No results found
              </td>
            </tr>
          ) : (
            (searchTerm ? searchData : drivers).map((driver) => (
              <DriverRow key={driver.driverID} driver={driver} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DriverInfo;
