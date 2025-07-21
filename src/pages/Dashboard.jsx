import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import SimpleChart from '../components/Charts/SimpleChart';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  BarChart3,
  PieChart,
  Activity,
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      name: 'Total Expenses',
      value: '$12,234.56',
      change: '+4.75%',
      changeType: 'increase',
      icon: TrendingDown,
      color: 'bg-red-500',
    },
    {
      name: 'Active Users',
      value: '2,350',
      change: '+12.5%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      changeType: 'decrease',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  const recentActivities = [
    { id: 1, action: 'New user registered', time: '2 minutes ago', type: 'user' },
    { id: 2, action: 'Payment received', time: '5 minutes ago', type: 'payment' },
    { id: 3, action: 'New order placed', time: '10 minutes ago', type: 'order' },
    { id: 4, action: 'System backup completed', time: '1 hour ago', type: 'system' },
    { id: 5, action: 'Monthly report generated', time: '2 hours ago', type: 'report' },
  ];

  const revenueData = [
    { label: 'Product Sales', value: 15420, change: 12.5 },
    { label: 'Services', value: 8750, change: 8.2 },
    { label: 'Subscriptions', value: 3200, change: -2.1 },
    { label: 'Licensing', value: 12000, change: 15.3 },
  ];

  const expenseData = [
    { label: 'Payroll', value: 25000, change: 3.2 },
    { label: 'Office Rent', value: 3500, change: 0 },
    { label: 'Marketing', value: 2800, change: 22.1 },
    { label: 'Technology', value: 1200, change: -5.5 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-indigo-100">Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <SimpleChart title="Revenue Breakdown" data={revenueData} />
        
        {/* Expense Chart */}
        <SimpleChart title="Expense Categories" data={expenseData} />

        {/* Recent Activities */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Activity className="h-4 w-4 text-indigo-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <PieChart className="h-8 w-8 text-indigo-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Generate Report</p>
              <p className="text-sm text-gray-500">Create monthly analytics report</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Users className="h-8 w-8 text-green-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Manage Users</p>
              <p className="text-sm text-gray-500">Add or edit user accounts</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Calendar className="h-8 w-8 text-purple-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Schedule Meeting</p>
              <p className="text-sm text-gray-500">Book a team meeting</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;