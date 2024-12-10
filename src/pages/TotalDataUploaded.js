import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TotalDataUploaded = () => {
  const navigate=useNavigate()
  const [data, setData] = useState(null); // Set initial state to `null` to detect if no data is fetched.
  

  // Function to fetch API data
  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get-sheet-names"); // Replace with your actual API endpoint
      const result = await response.json();

      if (result && result.data && Array.isArray(result.data)) {
        setData(result.data);
        
      } else {
        setData([]); // Set an empty array if the API returns an invalid response
        console.error("Invalid API response");
      }
    } catch (error) {
      setData([]); // Set an empty array if there is an error
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component loads
  useEffect(() => {
    fetchData();
  }, []);

  // Render cards or fallback message based on the fetched data
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">EISAI Data Analysis - Data</h1>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
            onClick={() =>(window.location.href = "/upload-excel")}
          >
            Upload Data
          </button>
        </div>

        {/* Grid Container or Fallback */}
        {data === null ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : data.length === 0 ? (
          <p className="text-center text-red-500">No data available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => {
               const formattedDate = new Date(item.date).toLocaleDateString("en-GB");
               return(
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {item.sheetname || "No Table Name"}
                </h2>
                Date : {formattedDate}
                <p>status : {item.status}</p>

                <button
                   onClick={() => {
                    localStorage.setItem("tablename", JSON.stringify(item));
                  //   localStorage.setItem("tablename", item); // Store tablename in localStorage
                    navigate(`/home?tablename=${item.sheetname}`); // Navigate to the home route
                  }}
                // disabled={item.status === "in_progress"}
                  className={`${item.status === "in_progress" ? "bg-gray-500" : "bg-blue-500 "} text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300`}
                >
                  Go to
                </button>
               
              </div>
               )
})}
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalDataUploaded;
