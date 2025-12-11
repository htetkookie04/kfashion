import { useState } from 'react';
import { Card } from '../components/common/Card';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { mockNotices } from '../data/mockContent';
import { Plus } from 'lucide-react';

export function NoticesPage() {
  const [notices, setNotices] = useState(mockNotices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', priority: 'medium' });

  const handleCreate = () => {
    const notice = {
      id: notices.length + 1,
      ...newNotice,
      type: 'announcement',
      publishedAt: new Date().toISOString(),
      isActive: true
    };
    setNotices([notice, ...notices]);
    setIsModalOpen(false);
    setNewNotice({ title: '', content: '', priority: 'medium' });
  };

  const columns = [
    { key: 'title', header: 'Title' },
    {
      key: 'type',
      header: 'Type',
      render: (notice: any) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {notice.type}
        </span>
      )
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (notice: any) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          notice.priority === 'high'
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            : notice.priority === 'medium'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {notice.priority}
        </span>
      )
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (notice: any) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          notice.isActive
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {notice.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'publishedAt',
      header: 'Published',
      render: (notice: any) => new Date(notice.publishedAt).toLocaleDateString()
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notices</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Create and manage platform announcements
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Notice
        </Button>
      </div>

      <Card>
        <Table data={notices} columns={columns} />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Notice"
      >
        <div className="space-y-4">
          <Input
            label="Title"
            value={newNotice.title}
            onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={4}
              value={newNotice.content}
              onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Priority
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={newNotice.priority}
              onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex gap-4 mt-6">
            <Button variant="primary" className="flex-1" onClick={handleCreate}>
              Create Notice
            </Button>
            <Button variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
