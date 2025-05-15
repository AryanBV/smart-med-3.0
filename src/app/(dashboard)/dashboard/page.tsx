import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { RefreshCw } from 'lucide-react';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  // Sample data - in a real app, this would come from your database
  const dashboardData = {
    familyMembers: 4,
    documents: 5,
    appointments: 0,
    activeAlerts: 0,
    familyHealth: [
      { 
        name: 'David Anderson', 
        age: 38, 
        diabetesType: 'Not specified', 
        bloodPressure: 'N/A', 
        bloodGlucose: 'N/A mg/dL', 
        hbA1c: 'N/A%',
        lastUpdated: '2/5/2025, 4:22:44 PM'
      },
      { 
        name: 'Michael Anderson', 
        age: 0, 
        diabetesType: 'Not specified', 
        bloodPressure: 'N/A', 
        bloodGlucose: 'N/A mg/dL', 
        hbA1c: 'N/A%',
        lastUpdated: '2/4/2025, 10:36:07 PM'
      },
      { 
        name: 'Emma Anderson', 
        age: 0, 
        diabetesType: 'Not specified', 
        bloodPressure: 'N/A', 
        bloodGlucose: 'N/A mg/dL', 
        hbA1c: 'N/A%',
        lastUpdated: '2/4/2025, 3:23:27 PM'
      },
      { 
        name: 'Sarah Anderson', 
        age: 0, 
        diabetesType: 'Not specified', 
        bloodPressure: 'N/A', 
        bloodGlucose: 'N/A mg/dL', 
        hbA1c: 'N/A%',
        lastUpdated: '2/4/2025, 8:38:07 PM'
      }
    ]
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button className="flex items-center gap-2 px-3 py-2 bg-white rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50">
          <RefreshCw size={18} />
          <span>Refresh Data</span>
        </button>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Family Members" value={dashboardData.familyMembers} />
        <StatCard title="Documents" value={dashboardData.documents} />
        <StatCard title="Appointments" value={dashboardData.appointments} />
        <StatCard title="Active Alerts" value={dashboardData.activeAlerts} />
      </div>
      
      {/* Family Health Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Family Health Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dashboardData.familyHealth.map((member, index) => (
            <div key={index} className="bg-white p-5 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.age} years | {member.diabetesType}</p>
                </div>
                <span className="text-gray-700">0</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-blue-500">??</span>
                    <span className="text-sm text-gray-500">Blood Pressure</span>
                  </div>
                  <p className="text-sm font-medium">{member.bloodPressure}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-green-500">??</span>
                    <span className="text-sm text-gray-500">Blood Glucose</span>
                  </div>
                  <p className="text-sm font-medium">{member.bloodGlucose}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-purple-500">??</span>
                    <span className="text-sm text-gray-500">HbA1c</span>
                  </div>
                  <p className="text-sm font-medium">{member.hbA1c}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-gray-500 text-xs">
                <span>??</span>
                <span>Last updated: {member.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string, value: number }) {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200">
      <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
