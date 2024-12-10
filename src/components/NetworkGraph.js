import React from 'react';
import { ForceGraph3D } from 'react-force-graph';

const NetworkGraph = () => {
  const graphData = {
    nodes: [
      { id: "Node1", group: 1 },
      { id: "Node2", group: 1 },
      { id: "Node3", group: 2 },
      { id: "Node4", group: 2 },
    ],
    links: [
      { source: "Node1", target: "Node2" },
      { source: "Node2", target: "Node3" },
      { source: "Node3", target: "Node4" },
    ],
  };

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ForceGraph3D
        graphData={graphData}
        nodeAutoColorBy="group"
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkWidth={1.5}
        nodeLabel={(node) => `${node.id}`}
      />
    </div>
  );
};

export default NetworkGraph;
