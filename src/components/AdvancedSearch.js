import React, { useState } from "react";

const AdvancedSearch = ({ columns, onSearchResults,tablename }) => {
  const [searchData, setSearchData] = useState({
    column: "",
    table_name: tablename || sessionStorage.getItem('tablename'),
    value: "",
  });
  

  sessionStorage.setItem('adsearchcolumn', columns);
  sessionStorage.setItem('adsearchvalue', onSearchResults);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  const handleSearch = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      onSearchResults(result.data || []);
    } catch (error) {
      console.error('Error during search:', error);
      onSearchResults([]);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg w-full">
      <h2 className="text-lg font-bold mb-4">Advanced Search</h2>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-col">
          <label htmlFor="column" className="text-gray-700 font-medium">
            Select Column
          </label>
          <select
            id="column"
            name="column"
            value={searchData.column}
            onChange={handleInputChange}
            className="p-2 border rounded-md w-40"
          >
            <option value="">--Select Column--</option>
            {columns.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="flex flex-col">
          <label htmlFor="operation" className="text-gray-700 font-medium">
            Operation
          </label>
          <select
            id="operation"
            name="operation"
            value={searchData.operation}
            onChange={handleInputChange}
            className="p-2 border rounded-md w-40"
          >
            <option value="is equal">is equal</option>
            <option value="like">%Like</option>
          </select>
        </div> */}

        <div className="flex flex-col flex-grow">
          <label htmlFor="value" className="text-gray-700 font-medium">
            Value
          </label>
          <input
            id="value"
            name="value"
            type="text"
            value={searchData.value}
            onChange={handleInputChange}
            placeholder="Enter value"
            className="p-2 border rounded-md w-full"
          />
        </div>

        <div>
          <button
            type="button"
            onClick={handleSearch}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
