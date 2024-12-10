import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const UploadExcelFile = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [sheets, setSheets] = useState([]);
  const [columns, setColumns] = useState([]);
  const [metadata, setMetadata] = useState("");
  const [selectedSheet, setSelectedSheet] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const handleFileUpload = async (event) => {
    event.preventDefault();
    if (!uploadedFile) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.sheets) {
        setSheets(result.sheets);
      } else {
        alert(result.error || "Error uploading file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchColumns = async () => {
    if (!selectedSheet || !uploadedFile) return;

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("sheet_name", selectedSheet);

    try {
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:5000/get_columns", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.columns) {
        setColumns(result.columns);
      } else {
        alert(result.error || "Error fetching columns");
      }
    } catch (error) {
      console.error("Error fetching columns:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();
  const fetchColumnData = async () => {
    if (!selectedSheet || !metadata || selectedColumns.length === 0 || !uploadedFile) return;

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("sheet_name", selectedSheet);
    formData.append("metadata", metadata);
    formData.append("column_names", JSON.stringify(selectedColumns));

    try {
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:5000/get_column_data", {
        method: "POST",
        body: formData,
      });

      if (response.status === 201 || response.status === 202) { 
        alert("Change Name: The request was accepted and is being processed."); 
        setIsLoading(false); // Stop loading as the operation is complete 
        return;
     }
      const result = await response.json();
      console.log(result);
      console.log(result.data);

      if (result.data) {
        // Uncomment and use this line if you need to set table data for UI
        // setTableData(result.data);
  
        // Navigate to the appropriate page with table name
        const locationPage = `/home?tablename=${encodeURIComponent(result.data)}`;
        navigate(locationPage);
      } else {
        navigate('/total_data'); // Navigate to /total_data in the else block
        // alert(result.error || "No data available.");
      }
    } catch (error) {
      console.error("Error fetching column data:", error);
      alert("An error occurred while fetching the column data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Upload an Excel File
        </h1>

        <form onSubmit={handleFileUpload} className="flex flex-col space-y-4">
          <label className="text-gray-700 font-semibold">
            Choose an Excel file:
          </label>
          <input
            type="file"
            accept=".xls, .xlsx"
            onChange={(e) => setUploadedFile(e.target.files[0])}
            required
            className="file-input border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
          <button
            onClick={() => (window.location.href = `/total_data`)} // Replace with the actual route
           className="bg-gray-800 text-white font-bold py-2 rounded-lg hover:bg-gray-600 transition duration-200"
           >
            Back
        </button>
        </form>

        {sheets.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Sheets:
            </h2>
            <select
              onChange={(e) => setSelectedSheet(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Sheet</option>
              {sheets.map((sheet) => (
                <option key={sheet} value={sheet}>
                  {sheet}
                </option>
              ))}
            </select>
            <button
              onClick={fetchColumns}
              className="bg-green-500 text-white font-bold py-3 rounded-lg mt-4 hover:bg-green-600 transition duration-200"
            >
              {isLoading ? "Fetching Columns..." : "Get Columns"}
            </button>
            <button
            onClick={() => (window.location.href = `/total_data`)} // Replace with the actual route
             className="bg-gray-800 text-white font-bold py-2 rounded-lg hover:bg-gray-600 transition duration-200"
           >
            Back
        </button>
          </>
        )}

        {columns.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Columns:
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {columns.map((column) => (
                <div key={column}>
                  <input
                    type="checkbox"
                    value={column}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedColumns((prev) => [...prev, column]);
                      } else {
                        setSelectedColumns((prev) =>
                          prev.filter((col) => col !== column)
                        );
                      }
                    }}
                  />
                  <label className="ml-2">{column}</label>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Select Metadata:
            </h2>
            <select
              onChange={(e) => setMetadata(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Column</option>
              {columns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>

            <button
              onClick={fetchColumnData}
              className="bg-green-500 text-white font-bold py-2 rounded-lg mt-4 hover:bg-green-600 transition duration-200 w-full"
            >
              {isLoading ? "Processing... This may take a couple of minutes. Please wait." : "Proceed"}
            </button>

            <button
                  onClick={() => (window.location.href = `/total_data`)} // Replace with the actual route
                  className="bg-gray-800 text-white font-bold py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                >
                  Back
                </button>
          </>
        )}

        {tableData.length > 0 && (
          <div className="mt-8">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  {Object.keys(tableData[0]).map((header) => (
                    <th
                      key={header}
                      className="border border-gray-300 p-2 bg-gray-100"
                    >
                      {header.replace(/_/g, " ").toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    {Object.keys(row).map((key) => (
                      <td
                        key={key}
                        className="border border-gray-300 p-2"
                      >
                        {row[key] || ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadExcelFile;
