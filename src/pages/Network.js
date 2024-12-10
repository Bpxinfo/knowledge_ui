// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import { useLocation } from "react-router-dom";


// const Network = () => {
//   const [storedTablename, setStoredTablename] = useState( localStorage.getItem("tablename") || "");
//   const [list, setList] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [graphName, setGraphName] = useState("");
//   const [dataSource, setDataSource] = useState("");
//   const [dataSources, setDataSources] = useState(["Source 1", "Source 2", "Source 3"]); // Example sources
//   const location = useLocation();
  
//   // Extract the query parameter
//   const queryParams = new URLSearchParams(location.search);
//   const tablename = queryParams.get("tablename");
//   console.log(tablename,'tablename network')

//   const fetchList = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/fatch_edges", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch the list");
//       }

//       const data = await response.json();
//       setList(data);
//     } catch (error) {
//       console.error("Error fetching the list:", error);
//     }
//   };

//   // Call the API to fetch edges and create a graph
//   const handleCreateGraph = async () => {
//     if (!graphName || !dataSource) {
//       alert("Please enter a name and select a data source.");
//       return;
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:5000/fatch_edges", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ sheet_name: tablename }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create graph");
//       }

//       const graphData = await response.json();
//       console.log("Graph created successfully:", graphData);

//       // Refresh the list after creating
//       setIsModalOpen(false);
//       setGraphName("");
//       setDataSource("");
//       fetchList();
//     } catch (error) {
//       console.error("Error creating graph:", error);
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <div className="flex h-screen">
//     <Navbar tablename={storedTablename}/>
//     <div className="p-8 items-center">
      
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Graph List</h1>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 item-right"
//           onClick={() => setIsModalOpen(true)}
//         >
//           Create Graph
//         </button>
//       </div>

//       {/* List Display */}
//       <div className="bg-gray-100 p-4 ml-14  rounded shadow">
//         {list.length > 0 ? (
//           <ul className="list-disc pl-5">
//             {list.map((item, index) => (
//               <li key={index} className="mb-2">
//                 {item.name} - {item.source}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No graphs available.</p>
//         )}
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-96">
//             <h2 className="text-xl font-bold mb-4">Create New Graph</h2>
//             <div className="mb-4">
//               <label className="block text-gray-700">Graph Name</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded p-2 mt-1"
//                 value={graphName}
//                 onChange={(e) => setGraphName(e.target.value)}
//                 placeholder="Enter graph name"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Data Source</label>
//               <select
//                 className="w-full border border-gray-300 rounded p-2 mt-1"
//                 value={dataSource}
//                 onChange={(e) => setDataSource(e.target.value)}
//               >
//                 <option value="">Select a source</option>
//                 {dataSources.map((source, index) => (
//                   <option key={index} value={source}>
//                     {source}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex justify-end">
//               <button
//                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 onClick={handleCreateGraph}
//               >
//                 Create
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
//   );
// };

// export default Network;


// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import { useLocation } from "react-router-dom";

// const Network = () => {
//   const [storedTablename, setStoredTablename] = useState(localStorage.getItem("tablename") || "");
//   const [list, setList] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [graphName, setGraphName] = useState("");
//   const [dataSource, setDataSource] = useState("");
//   const [dataSources, setDataSources] = useState(["Source 1", "Source 2", "Source 3"]); // Example sources
//   const location = useLocation();

//   // Extract the query parameter
//   const queryParams = new URLSearchParams(location.search);
//   const tablename = queryParams.get("tablename");
//   console.log(tablename, "tablename network");

//   // Fetch graph list
//   const fetchList = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/fatch_edges", {
//         method: "POST", // Updated to POST for this API
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ sheet_name: tablename || "default_sheet" }), // Add a default value if tablename is null
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch the graph list");
//       }

//       const data = await response.json();
//       setList(data.edges || []); // Update based on expected API response structure
//     } catch (error) {
//       console.error("Error fetching the graph list:", error);
//     }
//   };

//   // Create graph
//   // const handleCreateGraph = async () => {
//   //   if (!graphName || !dataSource) {
//   //     alert("Please enter a name and select a data source.");
//   //     return;
//   //   }

//   //   try {
//   //     const response = await fetch("http://127.0.0.1:5000/fatch_edges", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ sheet_name: tablename }),
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error("Failed to create graph");
//   //     }

//   //     const graphData = await response.json();
//   //     console.log("Graph created successfully:", graphData);

//   //     // Refresh the list after creating
//   //     setIsModalOpen(false);
//   //     setGraphName("");
//   //     setDataSource("");
//   //     fetchList();
//   //   } catch (error) {
//   //     console.error("Error creating graph:", error);
//   //   }
//   // };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <div className="flex h-screen">
//       <Navbar tablename={storedTablename} />
//       <div className="p-8 items-center">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Graph List</h1>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 item-right"
//             onClick={() => setIsModalOpen(true)}
//           >
//             Create Graph
//           </button>
//         </div>

//         {/* List Display */}
//         <div className="bg-gray-100 p-4 ml-14 rounded shadow">
//           {list.length > 0 ? (
//             <ul className="list-disc pl-5">
//               {list.map((item, index) => (
//                 <li key={index} className="mb-2">
//                   {item.name} - {item.source}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No graphs available.</p>
//           )}
//         </div>

//         {/* Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//             <div className="bg-white rounded-lg shadow-lg p-6 w-96">
//               <h2 className="text-xl font-bold mb-4">Create New Graph</h2>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Graph Name</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded p-2 mt-1"
//                   value={graphName}
//                   onChange={(e) => setGraphName(e.target.value)}
//                   placeholder="Enter graph name"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Data Source</label>
//                 <select
//                   className="w-full border border-gray-300 rounded p-2 mt-1"
//                   value={dataSource}
//                   onChange={(e) => setDataSource(e.target.value)}
//                 >
//                   <option value="">Select a source</option>
//                   {dataSources.map((source, index) => (
//                     <option key={index} value={source}>
//                       {source}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                   onClick={handleCreateGraph}
//                 >
//                   Create
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Network;

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { Network as VisNetwork } from "vis-network/standalone";

const Network = () => {
  const [storedTablename, setStoredTablename] = useState(localStorage.getItem("tablename") || "");
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const location = useLocation();

  // Extract the query parameter
  const queryParams = new URLSearchParams(location.search);
  const tablename = queryParams.get("tablename");
  console.log(tablename, "tablename network");

  // Fetch graph data
  const fetchGraphData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/fatch_edges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sheet_name: tablename || "default_sheet" }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch graph data");
      }

      const data = await response.json();
      console.log(data); // Debug API response

      // Map response to nodes and edges
      const nodes = Object.entries(data.analysis.node_degrees).map(([id, degree]) => ({
        id,
        label: id,
        value: degree, // Use `value` for size scaling in vis-network
        color: data.analysis.central_nodes[id] ? "rgb(255,99,71)" : "rgb(173,216,230)", // Highlight central nodes
      }));

      const edges = data.connections.map((connection) => ({
        from: connection.source,
        to: connection.target,
        label: connection.relationship,
        color: "gray", // Edge color
      }));

      setGraphData({ nodes, edges });
    } catch (error) {
      console.error("Error fetching the graph data:", error);
    }
  };

  // Initialize the graph
  useEffect(() => {
    if (graphData.nodes.length > 0 && graphData.edges.length > 0) {
      const container = document.getElementById("network");
      const options = {
        nodes: {
          shape: "dot",
          scaling: {
            min: 10,
            max: 30,
          },
          font: {
            size: 16,
            color: "#343434",
          },
        },
        edges: {
          arrows: "to",
          font: {
            size: 12,
            align: "middle",
          },
          color: {
            color: "gray",
          },
          smooth: true,
        },
        physics: {
          enabled: true,
          barnesHut: {
            gravitationalConstant: -2000,
            centralGravity: 0.3,
            springLength: 95,
            springConstant: 0.04,
          },
          solver: "barnesHut",
        },
        interaction: {
          hover: true,
          tooltipDelay: 200,
        },
      };

      // Create a new network instance
      new VisNetwork(container, graphData, options);
    }
  }, [graphData]);

  useEffect(() => {
    fetchGraphData();
  }, []);

  return (
    <div className="flex h-screen">
      <Navbar tablename={storedTablename} />
      <div className="p-8 items-center w-full">
        <h1 className="text-2xl font-bold mb-6">Graph Visualization</h1>
        <div id="network" style={{ height: "600px", border: "1px solid #ccc" }}></div>
      </div>
    </div>
  );
};

export default Network;

