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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Platform Overview">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Total Users
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {mockDashboardStats.activeUsers.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Verified Influencers
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {mockDashboardStats.influencers.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Published Feeds
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {mockDashboardStats.totalFeeds.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>

        <Card title="Quick Actions">
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
              <div className="text-center">
                <Users className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Manage Users
                </p>
              </div>
            </button>
            <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <div className="text-center">
                <Image className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Review Feeds
                </p>
              </div>
            </button>
            <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
              <div className="text-center">
                <UserCheck className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Influencers
                </p>
              </div>
            </button>
            <button className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
              <div className="text-center">
                <Hash className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Analytics
                </p>
              </div>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
