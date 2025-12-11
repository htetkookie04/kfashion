import { useState } from 'react';
import { Card } from '../components/common/Card';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { mockReports } from '../data/mockFeeds';
import { CheckCircle, XCircle } from 'lucide-react';

export function ReportsPage() {
  const [reports, setReports] = useState(mockReports);
  const [filter, setFilter] = useState('all');

  const markAsResolved = (id: number) => {
    setReports(reports.map(report =>
      report.id === id ? { ...report, status: 'resolved' } : report
    ));
  };

  const markAsPending = (id: number) => {
    setReports(reports.map(report =>
      report.id === id ? { ...report, status: 'pending' } : report
    ));
  };

  const filteredReports = filter === 'all' 
    ? reports 
    : reports.filter(r => r.reason === filter);

  const columns = [
    { key: 'id', header: 'Report ID' },
    {
      key: 'feedId',
      header: 'Feed ID',
      render: (report: any) => `#${report.feedId}`
    },
    { key: 'reportedBy', header: 'Reported By' },
    {
      key: 'reason',
      header: 'Reason',
      render: (report: any) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
          {report.reason}
        </span>
      )
    },
    { key: 'description', header: 'Description' },
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
      key: 'createdAt',
      header: 'Date',
      render: (report: any) => new Date(report.createdAt).toLocaleDateString()
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (report: any) => (
        <div className="flex gap-2">
          {report.status === 'pending' ? (
            <Button
              size="sm"
              variant="success"
              onClick={() => markAsResolved(report.id)}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Resolve
            </Button>
          ) : (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => markAsPending(report.id)}
            >
              <XCircle className="w-4 h-4 mr-1" />
              Reopen
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

      <Card>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Type
          </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Reports</option>
            <option value="spam">Spam</option>
            <option value="inappropriate">Inappropriate</option>
            <option value="copyright">Copyright</option>
          </select>
        </div>

        <Table data={filteredReports} columns={columns} />
      </Card>
    </div>
  );
}
