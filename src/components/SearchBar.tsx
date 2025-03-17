import React from "react";
import { Driver } from "../types/driver";

interface SearchBarProps {
  data: Driver[];
  setSearchData: React.Dispatch<React.SetStateAction<Driver[]>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
}

function SearchBar({
  data,
  setSearchData,
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  const handleSearch = (e: any) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    const filtered = data.filter(
      (driver) =>
        driver.driverID.toString().includes(newSearchTerm) ||
        driver.surname.toLowerCase().includes(newSearchTerm) ||
        driver.forename.toLowerCase().includes(newSearchTerm) ||
        driver.vehicleRegistration.toLowerCase().includes(newSearchTerm)
    );
    setSearchData(filtered);
  };

  return (
    <div className="flex items-center justify-start m-2 w-full ">
      <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-sm w-full max-w-md">
        <input
          type="text"
          placeholder="Search by driver name..."
          value={searchTerm}
          onChange={(e) => handleSearch(e)}
          className="px-4 py-2 w-full outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}

export default SearchBar;
