import React, { useState } from "react";
import { usePokeContext } from "../context/PokeContext";
import { X } from "react-feather";

const PokeSearch: React.FC = () => {
  const { searchPokemon } = usePokeContext();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
    searchPokemon(value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    searchPokemon("");
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-700">
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchQuery}
        onChange={handleSearchChange}
        className="flex-1 bg-gray-800 text-white rounded-md py-2 px-3 focus:outline-none"
      />
      {searchQuery && (
        <button type="button" title="Clear search" onClick={handleClearSearch} className="ml-2 focus:outline-none">
          <X className="h-5 w-5 text-white" />
        </button>
      )}
    </div>
  );
};

export default PokeSearch;
