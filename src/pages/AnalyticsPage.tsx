import { Card } from '../components/common/Card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockChartData } from '../data/mockDashboard';

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Data Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Platform insights and performance metrics
        </p>
      </div>

      <Card title="User Growth" subtitle="Monthly active users trend">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockChartData.userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#ec4899" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Feed Engagement" subtitle="Daily engagement metrics">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockChartData.feedEngagement}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="likes" fill="#3b82f6" />
            <Bar dataKey="comments" fill="#10b981" />
            <Bar dataKey="shares" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Top Tags" subtitle="Most popular hashtags">
          <div className="space-y-3">
            {mockChartData.tagTrends.map((tag, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tag.tag}</span>
                <div className="flex items-center gap-3">
                  <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(tag.count / mockChartData.tagTrends[0].count) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white w-16 text-right">
                    {tag.count.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Influencer Performance" subtitle="Top performing influencers">
          <div className="space-y-4">
            {mockChartData.influencerPerformance.map((influencer, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">{influencer.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {influencer.followers.toLocaleString()} followers
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${influencer.engagement * 10}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">
                    {influencer.engagement}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
