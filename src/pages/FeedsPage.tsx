import { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Table } from '../components/common/Table';
import { Modal } from '../components/common/Modal';
import { mockFeeds } from '../data/mockFeeds';
import { Check, X, Heart, MessageCircle, Eye } from 'lucide-react';

export function FeedsPage() {
  const [feeds, setFeeds] = useState(mockFeeds);
  const [selectedFeed, setSelectedFeed] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const viewFeed = (feed: any) => {
    setSelectedFeed(feed);
    setIsModalOpen(true);
  };

  const approveFeed = (id: number) => {
    setFeeds(feeds.map(feed =>
      feed.id === id ? { ...feed, status: 'approved' } : feed
    ));
    setIsModalOpen(false);
  };

  const rejectFeed = (id: number) => {
    setFeeds(feeds.map(feed =>
      feed.id === id ? { ...feed, status: 'rejected' } : feed
    ));
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'userName', header: 'User' },
    {
      key: 'caption',
      header: 'Caption',
      render: (feed: any) => (
        <div className="max-w-md truncate">{feed.caption}</div>
      )
    },
    {
      key: 'tags',
      header: 'Tags',
      render: (feed: any) => (
        <div className="flex gap-1 flex-wrap">
          {feed.tags.slice(0, 2).map((tag: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
          {feed.tags.length > 2 && (
            <span className="text-xs text-gray-500">+{feed.tags.length - 2}</span>
          )}
        </div>
      )
    },
    {
      key: 'likes',
      header: 'Likes',
      render: (feed: any) => (
        <div className="flex items-center gap-1">
          <Heart className="w-4 h-4 text-red-500" />
          <span>{feed.likes}</span>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (feed: any) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          feed.status === 'approved'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : feed.status === 'rejected'
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        }`}>
          {feed.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (feed: any) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => viewFeed(feed)}
        >
          <Eye className="w-4 h-4 mr-1" />
          View
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Feed Review</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Review and moderate user-submitted content
        </p>
      </div>

      <Card>
        <Table data={feeds} columns={columns} />
      </Card>

      {/* Feed Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Feed Details"
        size="lg"
      >
        {selectedFeed && (
          <div className="space-y-4">
            <img
              src={selectedFeed.image}
              alt="Feed content"
              className="w-full h-96 object-cover rounded-lg"
            />
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {selectedFeed.userName}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedFeed.status === 'approved'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : selectedFeed.status === 'rejected'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {selectedFeed.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {selectedFeed.caption}
              </p>

              <div className="flex gap-2 flex-wrap mb-3">
                {selectedFeed.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{selectedFeed.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{selectedFeed.comments}</span>
                </div>
              </div>
            </div>

            {selectedFeed.status === 'pending' && (
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="success"
                  className="flex-1"
                  onClick={() => approveFeed(selectedFeed.id)}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="danger"
                  className="flex-1"
                  onClick={() => rejectFeed(selectedFeed.id)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
