import React from 'react';
import { ForceGraph2D } from 'react-force-graph';

const KnowledgeGraph = () => {
  const graphData = {
    nodes: [
      { id: "Alice", group: "Person" },
      { id: "Bob", group: "Person" },
      { id: "CompanyX", group: "Company" },
      { id: "ProjectY", group: "Project" },
    ],
    links: [
      { source: "Alice", target: "CompanyX", label: "works at" },
      { source: "Bob", target: "CompanyX", label: "works at" },
      { source: "Alice", target: "ProjectY", label: "leads" },
    ],
  };

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ForceGraph2D
        graphData={graphData}
        nodeAutoColorBy="group"
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        nodeLabel={(node) => `${node.id}`}
        linkLabel={(link) => `${link.label}`}
        linkWidth={2}
        linkColor={() => "gray"}
      />
    </div>
  );
};

export default KnowledgeGraph;
