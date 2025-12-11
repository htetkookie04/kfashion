import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Toast } from '../components/common/Toast';
import { enhancedMockCollaborations, contentTypeOptions, collaborationStatusOptions } from '../data/mockCollaborationsEnhanced';
import { Eye, CheckCircle, XCircle } from 'lucide-react';

export function CollaborationsPageEnhanced() {
  const [collaborations, setCollaborations] = useState(enhancedMockCollaborations);
  const [searchTerm, setSearchTerm] = useState('');
  const [contentTypeFilter, setContentTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCollabs, setSelectedCollabs] = useState<number[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);
  const navigate = useNavigate();

  // Filtered collaborations
  const filteredCollaborations = useMemo(() => {
    return collaborations.filter(collab => {
      const matchesSearch = 
        collab.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collab.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collab.influencer.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = contentTypeFilter === 'all' || collab.contentType === contentTypeFilter;
      const matchesStatus = statusFilter === 'all' || collab.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [collaborations, searchTerm, contentTypeFilter, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = collaborations.length;
    const pending = collaborations.filter(c => c.status === 'pending').length;
    const approved = collaborations.filter(c => c.status === 'approved').length;
    const rejected = collaborations.filter(c => c.status === 'rejected').length;
    const totalBudget = collaborations.reduce((acc, c) => acc + c.budget, 0);
    return { total, pending, approved, rejected, totalBudget };
  }, [collaborations]);

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToast({ message, type });
  };

  const viewDetails = (id: number) => {
    navigate(`/collaborations/${id}`);
  };

  const quickApprove = (id: number) => {
    setCollaborations(collaborations.map(c =>
      c.id === id ? { ...c, status: 'approved' } : c
    ));
    showToast('Collaboration approved', 'success');
  };

  const quickReject = (id: number) => {
    setCollaborations(collaborations.map(c =>
      c.id === id ? { ...c, status: 'rejected' } : c
    ));
    showToast('Collaboration rejected', 'warning');
  };

  const toggleSelectCollab = (id: number) => {
    setSelectedCollabs(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedCollabs.length === filteredCollaborations.length) {
      setSelectedCollabs([]);
    } else {
      setSelectedCollabs(filteredCollaborations.map(c => c.id));
    }
  };

  // Batch actions
  const batchApprove = () => {
    setCollaborations(collaborations.map(c =>
      selectedCollabs.includes(c.id) ? { ...c, status: 'approved' } : c
    ));
    showToast(`${selectedCollabs.length} collaborations approved`, 'success');
    setSelectedCollabs([]);
  };

  const batchReject = () => {
    setCollaborations(collaborations.map(c =>
      selectedCollabs.includes(c.id) ? { ...c, status: 'rejected' } : c
    ));
    showToast(`${selectedCollabs.length} collaborations rejected`, 'warning');
    setSelectedCollabs([]);
  };

  const columns = [
    {
      key: 'select',
      header: (
        <input
          type="checkbox"
          checked={selectedCollabs.length === filteredCollaborations.length && filteredCollaborations.length > 0}
          onChange={toggleSelectAll}
          className="w-4 h-4 rounded border-gray-300"
        />
      ),
      render: (collab: any) => (
        <input
          type="checkbox"
          checked={selectedCollabs.includes(collab.id)}
          onChange={() => toggleSelectCollab(collab.id)}
          className="w-4 h-4 rounded border-gray-300"
        />
      )
    },
    { key: 'collaborationId', header: 'ID' },
    {
      key: 'brandName',
      header: 'Brand',
      render: (collab: any) => (
        <div className="flex items-center gap-2">
          <img src={collab.brandLogo} alt={collab.brandName} className="w-8 h-8 rounded" />
          <span className="font-medium">{collab.brandName}</span>
        </div>
      )
    },
    {
      key: 'campaignName',
      header: 'Campaign',
      render: (collab: any) => (
        <div className="max-w-xs truncate" title={collab.campaignName}>
          {collab.campaignName}
        </div>
      )
    },
    {
      key: 'contentType',
      header: 'Type',
      render: (collab: any) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 capitalize">
          {collab.contentType}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (collab: any) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          collab.status === 'approved'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : collab.status === 'rejected'
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        }`}>
          {collab.status}
        </span>
      )
    },
    {
      key: 'influencer',
      header: 'Influencer',
      render: (collab: any) => (
        <div className="flex items-center gap-2">
          <img src={collab.influencer.avatar} alt={collab.influencer.name} className="w-6 h-6 rounded-full" />
          <span className="text-sm">{collab.influencer.name}</span>
        </div>
      )
    },
    {
      key: 'budget',
      header: 'Budget',
      render: (collab: any) => `$${collab.budget.toLocaleString()}`
    },
    {
      key: 'dateCreated',
      header: 'Created',
      render: (collab: any) => new Date(collab.dateCreated).toLocaleDateString()
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (collab: any) => (
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => viewDetails(collab.id)}
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Button>
          {collab.status === 'pending' && (
            <>
              <Button
                size="sm"
                variant="success"
                onClick={() => quickApprove(collab.id)}
                title="Quick Approve"
              >
                <CheckCircle className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => quickReject(collab.id)}
                title="Quick Reject"
              >
                <XCircle className="w-3 h-3" />
              </Button>
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Brand Collaborations</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage brand partnerships and sponsored content
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.total}</p>
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
            <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.approved}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">{stats.rejected}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Budget</p>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-2">
              ${stats.totalBudget.toLocaleString()}
            </p>
          </div>
        </Card>
      </div>

      <Card>
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            placeholder="Search by campaign, brand, or influencer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={contentTypeFilter}
            onChange={(e) => setContentTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {contentTypeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {collaborationStatusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Batch Actions */}
        {selectedCollabs.length > 0 && (
          <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-between">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              {selectedCollabs.length} collaboration{selectedCollabs.length > 1 ? 's' : ''} selected
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="success" onClick={batchApprove}>
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve All
              </Button>
              <Button size="sm" variant="danger" onClick={batchReject}>
                <XCircle className="w-4 h-4 mr-1" />
                Reject All
              </Button>
            </div>
          </div>
        )}

        <Table data={filteredCollaborations} columns={columns} />
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
