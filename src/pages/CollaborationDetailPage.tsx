import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Toast } from '../components/common/Toast';
import { enhancedMockCollaborations } from '../data/mockCollaborationsEnhanced';
import { 
  ArrowLeft, CheckCircle, XCircle, Clock, Calendar, 
  DollarSign, Target, TrendingUp, MessageSquare,
  EyeOff, Trash2, Hash
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export function CollaborationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const collabId = parseInt(id || '0');
  
  const [collaboration, setCollaboration] = useState(
    enhancedMockCollaborations.find(c => c.id === collabId) || null
  );
  const [adminNotes, setAdminNotes] = useState(collaboration?.adminNotes || '');
  const [scheduledDate, setScheduledDate] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);

  if (!collaboration) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Collaboration not found</p>
        <Button onClick={() => navigate('/collaborations')} className="mt-4">
          Back to Collaborations
        </Button>
      </div>
    );
  }

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToast({ message, type });
  };

  const approveCollaboration = () => {
    setCollaboration({ ...collaboration, status: 'approved' });
    showToast('Collaboration approved successfully', 'success');
  };

  const rejectCollaboration = () => {
    setCollaboration({ ...collaboration, status: 'rejected' });
    showToast('Collaboration rejected', 'warning');
  };

  const setPending = () => {
    setCollaboration({ ...collaboration, status: 'pending' });
    showToast('Collaboration status set to pending', 'info');
  };

  const saveNotes = () => {
    setCollaboration({ ...collaboration, adminNotes });
    showToast('Notes saved successfully', 'success');
  };

  const updateSchedule = () => {
    if (scheduledDate) {
      showToast(`Campaign scheduled for ${new Date(scheduledDate).toLocaleDateString()}`, 'success');
    }
  };

  const hidePost = () => {
    showToast('Post hidden from feed', 'warning');
  };

  const deletePost = () => {
    if (confirm('Are you sure you want to delete this sponsored post?')) {
      showToast('Post deleted successfully', 'success');
    }
  };

  const approvePost = () => {
    showToast('Post approved and published', 'success');
  };

  // Mock performance data for charts
  const performanceData = [
    { name: 'Week 1', reach: 25000, engagement: 1500 },
    { name: 'Week 2', reach: 42000, engagement: 2800 },
    { name: 'Week 3', reach: 58000, engagement: 4200 },
    { name: 'Week 4', reach: 92000, engagement: 5701 }
  ];

  const engagementData = [
    { name: 'Likes', value: collaboration.performance.likes },
    { name: 'Comments', value: collaboration.performance.comments },
    { name: 'Shares', value: collaboration.performance.shares }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/collaborations')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {collaboration.campaignName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {collaboration.collaborationId} • Created {new Date(collaboration.dateCreated).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={collaboration.status === 'approved' ? 'secondary' : 'success'}
            onClick={approveCollaboration}
            disabled={collaboration.status === 'approved'}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Approve
          </Button>
          <Button
            variant={collaboration.status === 'rejected' ? 'secondary' : 'danger'}
            onClick={rejectCollaboration}
            disabled={collaboration.status === 'rejected'}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </Button>
          <Button
            variant="outline"
            onClick={setPending}
            disabled={collaboration.status === 'pending'}
          >
            <Clock className="w-4 h-4 mr-2" />
            Set Pending
          </Button>
        </div>
      </div>

      {/* Status Badge */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Status</p>
            <span className={`px-4 py-2 rounded-full text-sm font-medium inline-block capitalize ${
              collaboration.status === 'approved'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : collaboration.status === 'rejected'
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {collaboration.status}
            </span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {new Date(collaboration.lastUpdated).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Brand Info */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Brand Information</h2>
            <div className="flex items-start gap-4">
              <img
                src={collaboration.brandLogo}
                alt={collaboration.brandName}
                className="w-20 h-20 rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {collaboration.brandName}
                </h3>
                <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>📧 {collaboration.brandContact.email}</p>
                  <p>📱 {collaboration.brandContact.phone}</p>
                  <p>🌐 {collaboration.brandContact.website}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Campaign Info */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Campaign Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Description</p>
                <p className="text-gray-900 dark:text-white mt-1">{collaboration.campaignDescription}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Start Date
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {new Date(collaboration.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> End Date
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {new Date(collaboration.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" /> Budget
                </p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  ${collaboration.budget.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          {/* Content Details */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Content Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {collaboration.contentDetails.posts}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Posts</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {collaboration.contentDetails.images}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Images</p>
                </div>
                <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                    {collaboration.contentDetails.videos}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Videos</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1">
                  <Hash className="w-4 h-4" /> Hashtags
                </p>
                <div className="flex flex-wrap gap-2">
                  {collaboration.contentDetails.hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Content Plan</p>
                <p className="text-gray-900 dark:text-white mt-1">{collaboration.contentDetails.description}</p>
              </div>

              {/* Post Actions */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Sponsored Post Actions:</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="success" onClick={approvePost}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Post
                  </Button>
                  <Button variant="secondary" onClick={hidePost}>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hide Post
                  </Button>
                  <Button variant="danger" onClick={deletePost}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Post
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Performance Analytics */}
          {collaboration.status === 'approved' && collaboration.performance.totalReach > 0 && (
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Campaign Performance
              </h2>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Reach</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {collaboration.performance.totalReach.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Engagement</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {collaboration.performance.engagement.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">CTR</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {collaboration.performance.ctr}%
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Likes</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {collaboration.performance.likes.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Reach & Engagement Chart */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Reach & Engagement Over Time</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="reach" stroke="#ec4899" strokeWidth={2} name="Reach" />
                    <Line type="monotone" dataKey="engagement" stroke="#8b5cf6" strokeWidth={2} name="Engagement" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Engagement Breakdown */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Engagement Breakdown</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#ec4899" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Influencer Info */}
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Influencer</h3>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={collaboration.influencer.avatar}
                alt={collaboration.influencer.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {collaboration.influencer.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {collaboration.influencer.email}
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {collaboration.influencer.followers.toLocaleString()}
              </p>
            </div>
          </Card>

          {/* Target Metrics */}
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Target Metrics
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Min Reach</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {collaboration.targetMetrics.minReach.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Min Engagement</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {collaboration.targetMetrics.minEngagement.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Expected CTR</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {collaboration.targetMetrics.expectedCTR}%
                </p>
              </div>
            </div>
          </Card>

          {/* Schedule */}
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Schedule Campaign
            </h3>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-3"
            />
            <Button variant="primary" className="w-full" onClick={updateSchedule}>
              Update Schedule
            </Button>
          </Card>

          {/* Admin Notes */}
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Admin Notes
            </h3>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={6}
              placeholder="Add internal notes about this collaboration..."
            />
            <Button variant="primary" className="w-full mt-3" onClick={saveNotes}>
              Save Notes
            </Button>
          </Card>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
