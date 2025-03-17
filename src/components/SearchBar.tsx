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
  const handleSearch = () => {
    const filtered = data.filter(
      (driver) =>
        driver.driverID.toString().includes(searchTerm) ||
        driver.surname.toLowerCase().includes(searchTerm) ||
        driver.forename.toLowerCase().includes(searchTerm) ||
        driver.vehicleRegistration.toLowerCase().includes(searchTerm)
    );
    setSearchData((prev) => filtered);
  };

  return (
    <div className="flex items-center justify-center p-4 w-full">
      <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-sm w-full max-w-md">
        <input
          type="text"
          placeholder="Search by driver name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-full outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
