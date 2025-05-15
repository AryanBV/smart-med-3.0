'use client';

import { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom node for family members
const FamilyMemberNode = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-[#24E5C6] min-w-[150px]">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${data.gender === 'Male' ? 'bg-blue-100 text-blue-500' : 'bg-pink-100 text-pink-500'}`}>
          {data.gender === 'Male' ? '?' : '?'}
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{data.name}</div>
          <div className="text-gray-500 text-sm">{data.dob}</div>
        </div>
      </div>
    </div>
  );
};

export function FamilyTreeVisualization({ familyData }) {
  // Convert family data to nodes
  const initialNodes = familyData.map((member) => ({
    id: member.id.toString(),
    type: 'familyMember',
    position: { x: 100 + Math.random() * 400, y: 100 + Math.random() * 400 },
    data: {
      ...member,
    },
  }));

  // Create edges for parent-child relationships
  const initialEdges = [];
  familyData.forEach((member) => {
    if (member.parents && member.parents.length > 0) {
      member.parents.forEach((parentId) => {
        initialEdges.push({
          id: `e${parentId}-${member.id}`,
          source: parentId.toString(),
          target: member.id.toString(),
          animated: false,
          style: { stroke: '#24E5C6', strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.Arrow,
            color: '#24E5C6',
          },
        });
      });
    }
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({
      ...params,
      style: { stroke: '#24E5C6', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.Arrow,
        color: '#24E5C6',
      },
    }, eds)),
    [setEdges]
  );

  // Define nodeTypes object
  const nodeTypes = {
    familyMember: FamilyMemberNode,
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background color="#f8f8f8" gap={16} />
      </ReactFlow>
    </div>
  );
}
