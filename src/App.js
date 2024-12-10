import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import KnowledgeGraph from './pages/KnowledgeGraph';
import Network from './pages/Network';
import UploadExcelFile from './pages/UploadExcelFile';
import TotalDataUploaded from './pages/TotalDataUploaded';
import Test from './pages/Test';
// import NetworkGraph from './components/NetworkGraph';
// import KnowledgeGraph from './components/KnowledgeGraph';

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/test" element={<Test />} />
      <Route path="/total_data" element={<TotalDataUploaded />} />
      <Route path="/upload-excel" element={<UploadExcelFile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
      <Route path="/network-graph" element={<Network />} />
      {/* <Route path="/network-graph" element={<NetworkGraph />} />
      <Route path="/knowledge-graph" element={<KnowledgeGraph />} /> */}
    </Routes>
    </>
  );
};

export default App;
