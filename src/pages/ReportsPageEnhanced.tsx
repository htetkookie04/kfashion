import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Toast } from '../components/common/Toast';
import { enhancedMockReports, reportTypeOptions, reportStatusOptions } from '../data/mockReportsEnhanced';
import { CheckCircle, XCircle, Eye, Trash2 } from 'lucide-react';

export function ReportsPageEnhanced() {
  const [reports, setReports] = useState(enhancedMockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReports, setSelectedReports] = useState<number[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);
  const navigate = useNavigate();

  // Filtered and searched reports
  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesSearch = 
        report.reportReason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reportedBy.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === 'all' || report.reportType === typeFilter;
      const matchesStatus = statusFilter === 'all' || report.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [reports, searchTerm, typeFilter, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const totalReports = reports.length;
    const pending = reports.filter(r => r.status === 'pending').length;
    const resolved = reports.filter(r => r.status === 'resolved').length;
    const byType = {
      spam: reports.filter(r => r.reportType === 'spam').length,
      abuse: reports.filter(r => r.reportType === 'abuse').length,
      copyright: reports.filter(r => r.reportType === 'copyright').length,
      inappropriate: reports.filter(r => r.reportType === 'inappropriate').length,
    };
    return { totalReports, pending, resolved, byType };
  }, [reports]);

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToast({ message, type });
  };

  const markAsResolved = (id: number) => {
    setReports(reports.map(report =>
      report.id === id ? { ...report, status: 'resolved' } : report
    ));
    showToast('Report marked as resolved', 'success');
  };

  const markAsPending = (id: number) => {
    setReports(reports.map(report =>
      report.id === id ? { ...report, status: 'pending' } : report
    ));
    showToast('Report reopened', 'info');
  };

  const viewDetails = (id: number) => {
    navigate(`/reports/${id}`);
  };

  const toggleSelectReport = (id: number) => {
    setSelectedReports(prev =>
      prev.includes(id) ? prev.filter(reportId => reportId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(filteredReports.map(r => r.id));
    }
  };

  // Batch actions
  const batchMarkAsResolved = () => {
    setReports(reports.map(report =>
      selectedReports.includes(report.id) ? { ...report, status: 'resolved' } : report
    ));
    showToast(`${selectedReports.length} reports marked as resolved`, 'success');
    setSelectedReports([]);
  };

  const batchDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedReports.length} reports?`)) {
      setReports(reports.filter(report => !selectedReports.includes(report.id)));
      showToast(`${selectedReports.length} reports deleted`, 'success');
      setSelectedReports([]);
    }
  };

  const columns = [
    {
      key: 'select',
      header: (
        <input
          type="checkbox"
          checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
          onChange={toggleSelectAll}
          className="w-4 h-4 rounded border-gray-300"
        />
      ),
      render: (report: any) => (
        <input
          type="checkbox"
          checked={selectedReports.includes(report.id)}
          onChange={() => toggleSelectReport(report.id)}
          className="w-4 h-4 rounded border-gray-300"
        />
      )
    },
    { key: 'id', header: 'Report ID' },
    {
      key: 'reportedItem',
      header: 'Reported Item',
      render: (report: any) => (
        <div className="flex items-center gap-2">
          {report.reportedItemType === 'user' ? (
            <>
              <img src={report.reportedItem.avatar} alt="" className="w-8 h-8 rounded-full" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{report.reportedItem.name}</div>
                <div className="text-xs text-gray-500">User</div>
              </div>
            </>
          ) : (
            <>
              <img src={report.reportedItem.image} alt="" className="w-8 h-8 rounded object-cover" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white truncate max-w-[200px]">
                  {report.reportedItem.caption}
                </div>
                <div className="text-xs text-gray-500">Post</div>
              </div>
            </>
          )}
        </div>
      )
    },
    {
      key: 'reportType',
      header: 'Type',
      render: (report: any) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          report.reportType === 'spam' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
          report.reportType === 'abuse' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
          report.reportType === 'copyright' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {report.reportType}
        </span>
      )
    },
    {
      key: 'reportReason',
      header: 'Reason',
      render: (report: any) => (
        <div className="max-w-xs truncate" title={report.reportReason}>
          {report.reportReason}
        </div>
      )
    },
    {
      key: 'reportedBy',
      header: 'Reported By',
      render: (report: any) => report.reportedBy.name
    },
    {
      key: 'reportedDate',
      header: 'Date',
      render: (report: any) => new Date(report.reportedDate).toLocaleDateString()
    },
    {
      key: 'status',
      header: 'Status',
      render: (report: any) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          report.status === 'resolved'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        }`}>
          {report.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (report: any) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => viewDetails(report.id)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          {report.status === 'pending' ? (
            <Button
              size="sm"
              variant="success"
              onClick={() => markAsResolved(report.id)}
            >
              <CheckCircle className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => markAsPending(report.id)}
            >
              <XCircle className="w-4 h-4" />
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Report History</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          View and manage content reports
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Reports</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalReports}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{stats.pending}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Resolved</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.resolved}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Spam Reports</p>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-2">{stats.byType.spam}</p>
          </div>
        </Card>
      </div>

      <Card>
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            placeholder="Search by reason, description, or reporter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {reportTypeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {reportStatusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Batch Actions */}
        {selectedReports.length > 0 && (
          <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-between">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              {selectedReports.length} report{selectedReports.length > 1 ? 's' : ''} selected
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="success" onClick={batchMarkAsResolved}>
                <CheckCircle className="w-4 h-4 mr-1" />
                Mark All Resolved
              </Button>
              <Button size="sm" variant="danger" onClick={batchDelete}>
                <Trash2 className="w-4 h-4 mr-1" />
                Delete Selected
              </Button>
            </div>
          </div>
        )}

        <Table data={filteredReports} columns={columns} />
      </Card>

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
