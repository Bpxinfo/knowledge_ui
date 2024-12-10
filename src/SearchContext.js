import React, { createContext, useState } from "react";

// Create the Context
export const SearchContext = createContext();

// Create a Provider Component
export const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState({
    column: "",
    operation: "",
    value: "",
  });

  return (
    <SearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};
