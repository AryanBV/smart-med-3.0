'use client';

import { useState } from 'react';
import { Plus, Minus, Maximize, Lock } from 'lucide-react';
import { FamilyTreeVisualization } from '@/components/family-tree/family-tree-visualization';

export default function FamilyTreePage() {
  // In a real app, this data would come from your API
  const familyData = [
    { id: 1, name: 'David Anderson', gender: 'Male', dob: 'Jul 3, 1986' },
    { id: 2, name: 'Sarah Anderson', gender: 'Female', dob: 'Feb 7, 2025' },
    { id: 3, name: 'Michael Anderson', gender: 'Male', dob: 'Feb 7, 2025', parents: [1, 2] },
    { id: 4, name: 'Emma Anderson', gender: 'Female', dob: 'Feb 1', parents: [1, 2] }
  ];
  
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Family Tree</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Reset Layout
          </button>
          <button 
            className="px-4 py-2 bg-[#24E5C6] text-white rounded-md hover:bg-[#20c9ad]"
            onClick={() => setShowAddMemberModal(true)}
          >
            Add Family Member
          </button>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg min-h-[600px] relative">
        {/* Tree visualization instructions */}
        <div className="absolute top-4 left-4 p-4 bg-white border border-gray-200 rounded-md shadow-sm z-10">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">• Click nodes to view details</li>
            <li className="flex items-center gap-2">• Right-click nodes for actions</li>
            <li className="flex items-center gap-2">• Drag nodes to reposition</li>
            <li className="flex items-center gap-2">• Connect nodes to create relationships</li>
          </ul>
        </div>
        
        {/* Family Tree visualization */}
        <FamilyTreeVisualization familyData={familyData} />
      </div>
      
      {/* Add Family Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">Add Family Member</h2>
                  <p className="text-gray-500">Add a new family member and define their relationship.</p>
                </div>
                <button 
                  onClick={() => setShowAddMemberModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ×
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Date of Birth</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Relationship Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Son</option>
                    <option>Daughter</option>
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Sibling</option>
                    <option>Spouse</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">First Parent</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Select first parent</option>
                    {familyData.map(member => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddMemberModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#24E5C6] text-white rounded-md hover:bg-[#20c9ad]"
                  >
                    Add Member
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
