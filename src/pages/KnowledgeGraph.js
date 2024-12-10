import React, { useContext } from "react";
import Navbar from  "../components/Navbar";
import { SearchContext } from "../SearchContext";
import AdvancedSearch from "../components/AdvancedSearch";


const KnowledgeGraph = () => {
  const { searchData } = useContext(SearchContext);

  return (
    <div className="flex">
    {/* Sidebar Navbar */}
    <Navbar />

    {/* Main Content */}
    {/* <div className="flex-1 p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter data"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        className="border border-gray-400 p-2 rounded"
      />
      <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
    {submittedData && (
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Submitted Data:</h2>
        <p>{submittedData}</p>
      </div>
    )}
    </div> */}
      <div>
      <AdvancedSearch />
      </div>

      <div className="text-gray-700">
        <p>Column: {searchData.column}</p>
        <p>Operation: {searchData.operation}</p>
        <p>Value: {searchData.value}</p>
      </div>
    
  </div>
  );
};

export default KnowledgeGraph;
