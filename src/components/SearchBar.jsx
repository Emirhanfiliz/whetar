import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-md bg-white/20 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-white/30 transition-all focus-within:bg-white/30 focus-within:shadow-xl"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city..."
        className="flex-grow bg-transparent border-none outline-none text-white placeholder-gray-200 px-2 font-medium"
      />
      <button
        type="submit"
        className="text-white hover:text-blue-200 transition-colors p-2"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
