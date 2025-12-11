import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Toast } from '../components/common/Toast';
import { enhancedMockReports } from '../data/mockReportsEnhanced';
import { 
  ArrowLeft, CheckCircle, XCircle, Ban, AlertTriangle, 
  Trash2, Eye, EyeOff, MessageSquare 
} from 'lucide-react';

export function ReportDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const reportId = parseInt(id || '0');
  
  const [report, setReport] = useState(
    enhancedMockReports.find(r => r.id === reportId) || null
  );
  const [adminNotes, setAdminNotes] = useState(report?.adminNotes || '');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);

  if (!report) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Report not found</p>
        <Button onClick={() => navigate('/reports')} className="mt-4">
          Back to Reports
        </Button>
      </div>
    );
  }

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToast({ message, type });
  };

  const markAsResolved = () => {
    setReport({ ...report, status: 'resolved' });
    showToast('Report marked as resolved', 'success');
  };

  const markAsPending = () => {
    setReport({ ...report, status: 'pending' });
    showToast('Report marked as pending', 'info');
  };

  const saveNotes = () => {
    setReport({ ...report, adminNotes });
    showToast('Notes saved successfully', 'success');
  };

  // User Actions
  const suspendUser = () => {
    if (report.reportedItemType === 'user') {
      showToast(`User ${report.reportedItem.name} has been suspended`, 'warning');
    }
  };

  const reactivateUser = () => {
    if (report.reportedItemType === 'user') {
      showToast(`User ${report.reportedItem.name} has been reactivated`, 'success');
    }
  };

  const sendWarning = () => {
    showToast('Warning sent to user', 'info');
  };

  // Post Actions
  const deletePost = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      showToast('Post has been deleted', 'success');
    }
  };

  const approvePost = () => {
    showToast('Post has been approved', 'success');
  };

  const hidePost = () => {
    showToast('Post hidden from feed temporarily', 'warning');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/reports')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Report #{report.id}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Reported on {new Date(report.reportedDate).toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {report.status === 'pending' ? (
            <Button variant="success" onClick={markAsResolved}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark Resolved
            </Button>
          ) : (
            <Button variant="secondary" onClick={markAsPending}>
              <XCircle className="w-4 h-4 mr-2" />
              Reopen
            </Button>
          )}
        </div>
      </div>

      {/* Report Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Reported Item Details
          </h2>
          
          {report.reportedItemType === 'post' ? (
            <div className="space-y-4">
              <img
                src={report.reportedItem.image}
                alt="Reported post"
                className="w-full h-96 object-cover rounded-lg"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-2">Caption:</p>
                <p className="text-gray-700 dark:text-gray-300">{report.reportedItem.caption}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-2">Tags:</p>
                <div className="flex gap-2 flex-wrap">
                  {report.reportedItem.tags?.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="font-medium text-gray-900 dark:text-white mb-2">Author:</p>
                <div className="flex items-center gap-3">
                  <img
                    src={report.reportedItem.author?.avatar}
                    alt={report.reportedItem.author?.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {report.reportedItem.author?.name}
                    </p>
                    <p className="text-sm text-gray-500">{report.reportedItem.author?.email}</p>
                  </div>
                </div>
              </div>

              {/* Post Actions */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="font-medium text-gray-900 dark:text-white mb-3">Post Actions:</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="danger" onClick={deletePost}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Post
                  </Button>
                  <Button variant="success" onClick={approvePost}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Post
                  </Button>
                  <Button variant="secondary" onClick={hidePost}>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hide Temporarily
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={report.reportedItem.avatar}
                  alt={report.reportedItem.name}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {report.reportedItem.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{report.reportedItem.email}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                      {report.reportedItem.role}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      report.reportedItem.status === 'active'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {report.reportedItem.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-2">Joined:</p>
                <p className="text-gray-700 dark:text-gray-300">{report.reportedItem.joinDate}</p>
              </div>

              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-2">Recent Activity:</p>
                <div className="space-y-2">
                  {report.reportedItem.activityLog?.map((activity: any, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">{activity.action}</span>
                      <span className="text-gray-500">{activity.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Actions */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="font-medium text-gray-900 dark:text-white mb-3">User Actions:</p>
                <div className="flex flex-wrap gap-2">
                  {report.reportedItem.status === 'active' ? (
                    <Button variant="danger" onClick={suspendUser}>
                      <Ban className="w-4 h-4 mr-2" />
                      Suspend Account
                    </Button>
                  ) : (
                    <Button variant="success" onClick={reactivateUser}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Reactivate Account
                    </Button>
                  )}
                  <Button variant="secondary" onClick={sendWarning}>
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Send Warning
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Report Status */}
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Report Status</h3>
            <span className={`px-4 py-2 rounded-full text-sm font-medium inline-block ${
              report.status === 'resolved'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {report.status.toUpperCase()}
            </span>
          </Card>

          {/* Report Details */}
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Report Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                <p className="font-medium text-gray-900 dark:text-white capitalize">{report.reportType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Reason</p>
                <p className="font-medium text-gray-900 dark:text-white">{report.reportReason}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                <p className="text-gray-700 dark:text-gray-300">{report.description}</p>
              </div>
            </div>
          </Card>

          {/* Reporter Info */}
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Reporter</h3>
            <div className="space-y-2">
              <p className="font-medium text-gray-900 dark:text-white">{report.reportedBy.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{report.reportedBy.email}</p>
            </div>
          </Card>

          {/* Previous Reports */}
          {report.previousReports.length > 0 && (
            <Card>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Previous Reports ({report.previousReports.length})
              </h3>
              <div className="space-y-2">
                {report.previousReports.map((prevReport: any, index: number) => (
                  <div key={index} className="text-sm border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                    <p className="font-medium text-gray-900 dark:text-white capitalize">{prevReport.type}</p>
                    <p className="text-gray-500 dark:text-gray-400">{prevReport.date}</p>
                    <p className="text-xs text-gray-400">{prevReport.status}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Admin Notes */}
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Admin Notes</h3>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={4}
              placeholder="Add notes about your actions..."
            />
            <Button variant="primary" className="w-full mt-3" onClick={saveNotes}>
              <MessageSquare className="w-4 h-4 mr-2" />
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
