import { useState } from 'react';
import { Card } from '../components/common/Card';

export function AIRecommendationsPage() {
  const [settings, setSettings] = useState({
    userBehavior: 70,
    contentSimilarity: 60,
    trendingWeight: 50,
    personalizedTags: true,
    autoUpdate: true
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Recommendation Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Configure AI-powered content recommendation settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Algorithm Weights" subtitle="Adjust the importance of each factor">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  User Behavior
                </label>
                <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                  {settings.userBehavior}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.userBehavior}
                onChange={(e) => setSettings({ ...settings, userBehavior: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Content Similarity
                </label>
                <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                  {settings.contentSimilarity}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.contentSimilarity}
                onChange={(e) => setSettings({ ...settings, contentSimilarity: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Trending Weight
                </label>
                <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                  {settings.trendingWeight}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.trendingWeight}
                onChange={(e) => setSettings({ ...settings, trendingWeight: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
          </div>
        </Card>

        <Card title="Feature Toggles" subtitle="Enable or disable AI features">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Personalized Tags</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Show AI-generated tag suggestions</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.personalizedTags}
                  onChange={(e) => setSettings({ ...settings, personalizedTags: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Auto Update</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Automatically update recommendations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoUpdate}
                  onChange={(e) => setSettings({ ...settings, autoUpdate: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Performance Metrics" subtitle="AI recommendation statistics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Click-Through Rate</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">12.5%</p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Engagement Rate</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">8.3%</p>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">User Satisfaction</p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">87%</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
