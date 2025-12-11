import { useState } from 'react';
import { Card } from '../components/common/Card';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { mockUsers } from '../data/mockUsers';
import { Edit, CheckCircle, XCircle } from 'lucide-react';

export function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleStatus = (id: number) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const columns = [
    {
      key: 'avatar',
      header: 'Avatar',
      render: (user: any) => (
        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
      )
    },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    {
      key: 'status',
      header: 'Status',
      render: (user: any) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          user.status === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {user.status}
        </span>
      )
    },
    { key: 'joinDate', header: 'Join Date' },
    {
      key: 'actions',
      header: 'Actions',
      render: (user: any) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => openEditModal(user)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={user.status === 'active' ? 'danger' : 'success'}
            onClick={() => toggleStatus(user.id)}
          >
            {user.status === 'active' ? (
              <XCircle className="w-4 h-4" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">General Users</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage all registered users
          </p>
        </div>
      </div>

      <Card>
        <Table data={users} columns={columns} />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit User"
        size="md"
      >
        {selectedUser && (
          <div className="space-y-4">
            <Input label="Name" defaultValue={selectedUser.name} />
            <Input label="Email" type="email" defaultValue={selectedUser.email} />
            <div className="flex gap-4 mt-6">
              <Button variant="primary" className="flex-1">Save Changes</Button>
              <Button variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
