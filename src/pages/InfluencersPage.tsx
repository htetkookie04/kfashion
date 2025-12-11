import { useState } from 'react';
import { Card } from '../components/common/Card';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { mockInfluencers } from '../data/mockUsers';
import { BadgeCheck, TrendingUp, CheckCircle, XCircle } from 'lucide-react';

export function InfluencersPage() {
  const [influencers, setInfluencers] = useState(mockInfluencers);

  const toggleVerification = (id: number) => {
    setInfluencers(influencers.map(influencer => 
      influencer.id === id 
        ? { ...influencer, verified: !influencer.verified }
        : influencer
    ));
  };

  const columns = [
    {
      key: 'avatar',
      header: 'Avatar',
      render: (influencer: any) => (
        <img src={influencer.avatar} alt={influencer.name} className="w-10 h-10 rounded-full" />
      )
    },
    { 
      key: 'name', 
      header: 'Name',
      render: (influencer: any) => (
        <div className="flex items-center gap-2">
          <span>{influencer.name}</span>
          {influencer.verified && (
            <BadgeCheck className="w-4 h-4 text-blue-500" />
          )}
        </div>
      )
    },
    { key: 'email', header: 'Email' },
    { key: 'category', header: 'Category' },
    {
      key: 'followers',
      header: 'Followers',
      render: (influencer: any) => influencer.followers.toLocaleString()
    },
    {
      key: 'engagementRate',
      header: 'Engagement',
      render: (influencer: any) => (
        <div className="flex items-center gap-2">
          <span>{influencer.engagementRate}%</span>
          <TrendingUp className="w-4 h-4 text-green-500" />
        </div>
      )
    },
    {
      key: 'verified',
      header: 'Status',
      render: (influencer: any) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          influencer.verified
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {influencer.verified ? 'Verified' : 'Pending'}
        </span>
      )
    },
    { key: 'joinDate', header: 'Join Date' },
    {
      key: 'actions',
      header: 'Actions',
      render: (influencer: any) => (
        influencer.verified ? (
          <Button
            size="sm"
            variant="secondary"
            disabled
            className="opacity-50 cursor-not-allowed"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Verified
          </Button>
        ) : (
          <Button
            size="sm"
            variant="success"
            onClick={() => toggleVerification(influencer.id)}
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Verify
          </Button>
        )
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Influencers</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage verified influencers and their performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Influencers
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {influencers.length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Verified
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              {influencers.filter(i => i.verified).length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Avg Engagement
            </p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
              {(influencers.reduce((acc, i) => acc + i.engagementRate, 0) / influencers.length).toFixed(1)}%
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <Table data={influencers} columns={columns} />
      </Card>
    </div>
  );
}
