
import React, { useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';

const Navbar = ({tablename}) => {
  console.log(tablename,'tablename navbar')
  const navigate = useNavigate();
   
  useEffect(() => {
    if (!tablename) {
      navigate("/total_data"); // Redirect to home if no table name is found
    }
  }, [tablename, navigate]);
 
  return (
    <div className="flex flex-col h-screen w-20 bg-gray-100 border-r border-gray-300 fixed">
      <h3 className="space-y-6 mt-4 ml-3 text-xl text-gray-800 group-hover:text-red-800">EISAI</h3>
      {/* Icons with Labels */}
      <div className="flex flex-col items-center mt-4 space-y-6">
        {/* Table Icon (Home) */}
        <Link to={`/home?tablename=${tablename.sheetname}`} className="flex flex-col items-center cursor-pointer group">
          <div className="flex justify-center items-center w-12 h-12 bg-blue-100 rounded-full group-hover:bg-blue-200">
            <span className="text-blue-600 text-2xl">📋</span>
          </div>
          <p className="mt-1 text-sm text-gray-600 group-hover:text-gray-800">Table</p>
        </Link>

        {/* Network Icon */}
        <Link to={`/network-graph?tablename=${tablename.sheetname}`} className="flex flex-col items-center cursor-pointer group">
          <div className="flex justify-center items-center w-12 h-12 bg-gray-100 rounded-full group-hover:bg-gray-200">
            <span className="text-gray-600 text-2xl">🌐</span>
          </div>
          <p className="mt-1 text-sm text-gray-600 group-hover:text-gray-800">Network</p>
        </Link>

        {/* Knowledge Graph Icon */}
        <Link to="/knowledge-graph" className="flex flex-col items-center cursor-pointer group">
          <div className="flex justify-center items-center w-12 h-12 bg-gray-100 rounded-full group-hover:bg-gray-200">
            <span className="text-gray-600 text-2xl">🧠</span>
          </div>
          <p className="mt-1 text-sm text-gray-600 group-hover:text-gray-800">Knowledge</p>
        </Link>

        {/* Trend Analysis Icon */}
        <Link to="/trend-analysis" className="flex flex-col items-center cursor-pointer group">
          <div className="flex justify-center items-center w-12 h-12 bg-gray-100 rounded-full group-hover:bg-gray-200">
            <span className="text-gray-600 text-2xl">📈</span>
          </div>
          <p className="mt-1 text-sm text-gray-600 group-hover:text-gray-800">Trend</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
