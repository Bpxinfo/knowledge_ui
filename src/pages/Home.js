import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import AdvancedSearch from "../components/AdvancedSearch";

const Home = () => {
  // const [storedtablename, setStoredtablename] = useState(localStorage.getItem('tablename') || '');
  // console.log(storedtablename,'storedtablename local')
  const [storedtablename, setStoredtablename] = useState(() => {
    // Retrieve stored data from localStorage
    const data = localStorage.getItem('tablename');
    return data ? JSON.parse(data) : null;
  });

  console.log(storedtablename,"storedtablename")
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([]);
  console.log(columns,'columns')
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const location = useLocation();
  const navigate = useNavigate();

  // const getQueryParam = (param) => {
  //   const searchParams = new URLSearchParams(location.search);
  //   return searchParams.get(param);
  // };

  useEffect(() => {
    // const tablename = getQueryParam('tablename');
    // const id = getQueryParam('id');
    // console.log(tablename, id, 'tablename and id from query');
    if (storedtablename && storedtablename.sheetname && storedtablename.id) {
      
      fetchTableData(storedtablename);
    } else {
      navigate('/home');
      console.error('No tablename provided');
    }
  }, [ ]);
 
  

  // const fetchTableData = async (tablename) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `http://127.0.0.1:5000/data?table=${tablename}`,
  //       {
  //         method: 'GET',
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     if (data && data.data) {
  //       setTableData(data.data);
  //       setFilteredData(data.data);
  //       setColumns(Object.keys(data.data[0] || {}));
  //     } else {
  //       console.error('Invalid API response');
  //       setTableData([]);
  //       setFilteredData([]);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching table data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchTableData = async ( storedtablename ) => {
    console.log(storedtablename,'tableData')
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/fetch-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: storedtablename.id,
          sheet_name: storedtablename.sheetname,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data,'table data')
      if (data && data.data) {
        // setStoredtablename(data.data);
        setFilteredData(data.data);
        setColumns(Object.keys(data.data[0] || {}));
      } else {
        console.error('Invalid API response');
        setStoredtablename([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error('Error fetching table data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResults = (results, searchTerm) => {
    setFilteredData(results);
  
    // Store results and search term
    localStorage.setItem("searchResults", JSON.stringify(results));
    localStorage.setItem("searchTerm", searchTerm); // Save the search term
  };
  
  

  return (
    <div className="flex h-screen">
      <Navbar tablename={storedtablename}/>
      <div className="flex-grow ml-20 p-4 bg-gray-100">
        {loading ? (
          <div className="text-center py-4">
            <div className="border-t-blue-500 border-4 w-8 h-8 rounded-full animate-spin mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading data...</p>
          </div>
        ) : (
          <>
            <div className="bg-white p-4 rounded shadow mb-6">
              {/* <h3 className="text-xl font-semibold mb-4">Advanced Search</h3> */}
              <AdvancedSearch columns={columns} onSearchResults={handleSearchResults} tablename={storedtablename}/>
            </div>

            {/* <div className="bg-white p-4 rounded shadow overflow-x-auto">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    {columns.map((column) => (
                      <th key={column} className="border border-gray-300 p-2 text-left">
                        {column.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {columns.map((column) => (
                        <td key={column} className="border border-gray-300 p-2">
                          {row[column] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
   <div className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
  <table className="table-auto w-full border-collapse rounded-lg">
    <thead>
      <tr className="bg-gray-200 text-gray-800">
        {/* Display 'id' first */}
        {columns.includes('id') && (
          <th className="border border-gray-300 p-3 text-left font-semibold text-sm uppercase tracking-wider">
            ID
          </th>
        )}
        {/* Display other columns, excluding 'sheet_name_id' */}
        {columns.filter((column) => column !== 'id' && column !== 'sheet_name_id').map((column) => (
          <th key={column} className="border border-gray-300 p-3 text-left font-semibold text-sm uppercase tracking-wider">
            {column.toUpperCase()}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {filteredData.map((row, index) => (
        <tr key={index} className="hover:bg-gray-100 transition-colors duration-300">
          {/* Display 'id' first */}
          {columns.includes('id') && (
            <td className="border border-gray-300 p-3 text-sm">{row.id || '-'}</td>
          )}
          {/* Display other columns, excluding 'sheet_name_id' */}
          {columns.filter((column) => column !== 'id' && column !== 'sheet_name_id').map((column) => (
            <td key={column} className="border border-gray-300 p-3 text-sm">
              {row[column] || '-'}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>



          </>
        )}
      </div>
    </div>
  );
};

export default Home;
