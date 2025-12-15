import { Users, UserCheck, Image, Hash } from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { Card } from '../components/common/Card';
import { mockDashboardStats, mockRecentActivities } from '../data/mockDashboard';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Overview of your K-Fashion platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Users"
          value={mockDashboardStats.activeUsers.toLocaleString()}
          change={mockDashboardStats.activeUsersChange}
          icon={Users}
          iconColor="bg-blue-500"
        />
        <StatCard
          title="Influencers"
          value={mockDashboardStats.influencers.toLocaleString()}
          change={mockDashboardStats.influencersChange}
          icon={UserCheck}
          iconColor="bg-purple-500"
        />
        <StatCard
          title="Total Feeds"
          value={mockDashboardStats.totalFeeds.toLocaleString()}
          change={mockDashboardStats.totalFeedsChange}
          icon={Image}
          iconColor="bg-green-500"
        />
        <StatCard
          title="Popular Tags"
          value={mockDashboardStats.popularTags.toLocaleString()}
          change={mockDashboardStats.popularTagsChange}
          icon={Hash}
          iconColor="bg-orange-500"
        />
      </div>

      {/* Recent Activities */}
      <Card title="Recent Activities" subtitle="Latest updates from your platform">
        <div className="space-y-4">
          {mockRecentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
