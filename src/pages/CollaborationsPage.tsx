import { useState } from 'react';
import { Card } from '../components/common/Card';
import { Table } from '../components/common/Table';
import { mockCollaborations } from '../data/mockContent';

export function CollaborationsPage() {
  const [collaborations] = useState(mockCollaborations);

  const columns = [
    { key: 'brandName', header: 'Brand' },
    { key: 'influencerName', header: 'Influencer' },
    { key: 'productName', header: 'Product' },
    {
      key: 'budget',
      header: 'Budget',
      render: (collab: any) => `$${collab.budget.toLocaleString()}`
    },
    { key: 'startDate', header: 'Start Date' },
    { key: 'endDate', header: 'End Date' },
    {
      key: 'status',
      header: 'Status',
      render: (collab: any) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          collab.status === 'approved'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : collab.status === 'pending'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {collab.status}
        </span>
      )
    }
  ];

  const stats = {
    total: collaborations.length,
    approved: collaborations.filter(c => c.status === 'approved').length,
    pending: collaborations.filter(c => c.status === 'pending').length,
    totalBudget: collaborations.reduce((acc, c) => acc + c.budget, 0)
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Brand Collaborations</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage brand partnerships and sponsored content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.total}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.approved}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{stats.pending}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Budget</p>
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-2">
              ${stats.totalBudget.toLocaleString()}
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <Table data={collaborations} columns={columns} />
      </Card>
    </div>
  );
}
