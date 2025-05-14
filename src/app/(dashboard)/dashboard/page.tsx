import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              {session?.user?.name || 'User'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Your diabetes management system is ready to use.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Metrics</CardTitle>
            <CardDescription>Your latest health data</CardDescription>
          </CardHeader>
          <CardContent>
            <p>No health metrics recorded yet. Start tracking your health data.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
            <CardDescription>Your medical records</CardDescription>
          </CardHeader>
          <CardContent>
            <p>No documents uploaded yet. Upload your medical records.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
