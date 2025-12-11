export const enhancedMockReports = [
  {
    id: 1,
    reportedItemType: 'post',
    reportedItemId: 2,
    reportedItem: {
      id: 2,
      type: 'post',
      caption: 'Minimalist wardrobe essentials 🖤 #MinimalistFashion #Basics',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500',
      tags: ['MinimalistFashion', 'Basics', 'Style'],
      author: {
        id: 2,
        name: 'David Kim',
        email: 'david.kim@example.com',
        avatar: 'https://i.pravatar.cc/150?img=11'
      }
    },
    reportType: 'spam',
    reportReason: 'Repeated promotional content',
    description: 'User is posting the same promotional content multiple times',
    reportedBy: {
      id: 125,
      name: 'User #125',
      email: 'user125@example.com'
    },
    reportedDate: '2024-12-10T09:00:00Z',
    status: 'pending',
    adminNotes: '',
    previousReports: [
      { date: '2024-12-05', type: 'spam', status: 'resolved' },
      { date: '2024-11-28', type: 'spam', status: 'resolved' }
    ]
  },
  {
    id: 2,
    reportedItemType: 'post',
    reportedItemId: 5,
    reportedItem: {
      id: 5,
      type: 'post',
      caption: 'Check out this amazing product! 🔥',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500',
      tags: ['Product', 'Shopping'],
      author: {
        id: 5,
        name: 'Sarah Miller',
        email: 'sarah.m@example.com',
        avatar: 'https://i.pravatar.cc/150?img=5'
      }
    },
    reportType: 'inappropriate',
    reportReason: 'Inappropriate content for platform',
    description: 'Contains content that violates community guidelines',
    reportedBy: {
      id: 342,
      name: 'User #342',
      email: 'user342@example.com'
    },
    reportedDate: '2024-12-09T14:30:00Z',
    status: 'resolved',
    adminNotes: 'Reviewed and removed. Warning sent to user.',
    previousReports: []
  },
  {
    id: 3,
    reportedItemType: 'post',
    reportedItemId: 8,
    reportedItem: {
      id: 8,
      type: 'post',
      caption: 'Latest fashion trends from Paris Fashion Week',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea1c8d5a?w=500',
      tags: ['Fashion', 'PFW'],
      author: {
        id: 8,
        name: 'Marie Laurent',
        email: 'marie.l@example.com',
        avatar: 'https://i.pravatar.cc/150?img=8'
      }
    },
    reportType: 'copyright',
    reportReason: 'Unauthorized use of brand images',
    description: 'Using copyrighted images without permission from the brand',
    reportedBy: {
      id: 89,
      name: 'User #89',
      email: 'user89@example.com'
    },
    reportedDate: '2024-12-10T11:20:00Z',
    status: 'pending',
    adminNotes: '',
    previousReports: []
  },
  {
    id: 4,
    reportedItemType: 'user',
    reportedItemId: 15,
    reportedItem: {
      id: 15,
      type: 'user',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'user',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=15',
      joinDate: '2024-01-10',
      activityLog: [
        { action: 'Posted content', date: '2024-12-10' },
        { action: 'Commented on post', date: '2024-12-09' },
        { action: 'Liked 5 posts', date: '2024-12-08' }
      ]
    },
    reportType: 'abuse',
    reportReason: 'Harassment and abusive behavior',
    description: 'User is sending harassing messages to other users',
    reportedBy: {
      id: 203,
      name: 'User #203',
      email: 'user203@example.com'
    },
    reportedDate: '2024-12-11T08:15:00Z',
    status: 'pending',
    adminNotes: '',
    previousReports: [
      { date: '2024-11-20', type: 'abuse', status: 'resolved' }
    ]
  },
  {
    id: 5,
    reportedItemType: 'user',
    reportedItemId: 22,
    reportedItem: {
      id: 22,
      type: 'user',
      name: 'Spam Bot',
      email: 'spambot@example.com',
      role: 'user',
      status: 'suspended',
      avatar: 'https://i.pravatar.cc/150?img=22',
      joinDate: '2024-12-01',
      activityLog: [
        { action: 'Sent 50 spam messages', date: '2024-12-08' },
        { action: 'Posted spam content', date: '2024-12-07' }
      ]
    },
    reportType: 'spam',
    reportReason: 'Bot account spamming',
    description: 'Automated bot account posting spam across the platform',
    reportedBy: {
      id: 456,
      name: 'User #456',
      email: 'user456@example.com'
    },
    reportedDate: '2024-12-08T16:45:00Z',
    status: 'resolved',
    adminNotes: 'Account suspended. IP blocked.',
    previousReports: [
      { date: '2024-12-07', type: 'spam', status: 'resolved' },
      { date: '2024-12-06', type: 'spam', status: 'resolved' },
      { date: '2024-12-05', type: 'spam', status: 'resolved' }
    ]
  }
];

export const reportTypeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'spam', label: 'Spam' },
  { value: 'abuse', label: 'Abuse' },
  { value: 'copyright', label: 'Copyright' },
  { value: 'inappropriate', label: 'Inappropriate Content' }
];

export const reportStatusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'resolved', label: 'Resolved' }
];
