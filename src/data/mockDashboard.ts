export const mockDashboardStats = {
  activeUsers: 12458,
  activeUsersChange: 12.5,
  influencers: 1247,
  influencersChange: 8.2,
  totalFeeds: 45678,
  totalFeedsChange: 15.3,
  popularTags: 234,
  popularTagsChange: 5.7
};

export const mockRecentActivities = [
  {
    id: 1,
    type: "user_joined",
    message: "New user Sarah Johnson joined",
    timestamp: "2024-12-11T09:30:00Z",
    icon: "UserPlus"
  },
  {
    id: 2,
    type: "feed_approved",
    message: "Feed #1234 by Jessica Park was approved",
    timestamp: "2024-12-11T09:15:00Z",
    icon: "Check"
  },
  {
    id: 3,
    type: "collaboration",
    message: "New collaboration request from Seoul Style Co.",
    timestamp: "2024-12-11T08:45:00Z",
    icon: "Handshake"
  },
  {
    id: 4,
    type: "report",
    message: "New report submitted for Feed #5678",
    timestamp: "2024-12-11T08:20:00Z",
    icon: "AlertTriangle"
  },
  {
    id: 5,
    type: "influencer_verified",
    message: "Sophie Lee was verified as an influencer",
    timestamp: "2024-12-11T07:50:00Z",
    icon: "BadgeCheck"
  }
];

export const mockChartData = {
  userGrowth: [
    { month: "Jan", users: 8500 },
    { month: "Feb", users: 9200 },
    { month: "Mar", users: 9800 },
    { month: "Apr", users: 10500 },
    { month: "May", users: 11200 },
    { month: "Jun", users: 11800 },
    { month: "Jul", users: 12458 }
  ],
  feedEngagement: [
    { day: "Mon", likes: 2500, comments: 450, shares: 120 },
    { day: "Tue", likes: 3200, comments: 580, shares: 160 },
    { day: "Wed", likes: 2800, comments: 520, shares: 140 },
    { day: "Thu", likes: 3500, comments: 620, shares: 180 },
    { day: "Fri", likes: 4200, comments: 750, shares: 220 },
    { day: "Sat", likes: 5100, comments: 890, shares: 280 },
    { day: "Sun", likes: 4800, comments: 820, shares: 250 }
  ],
  tagTrends: [
    { tag: "#KoreanFashion", count: 5600 },
    { tag: "#OOTD", count: 4200 },
    { tag: "#StreetStyle", count: 3800 },
    { tag: "#MinimalistFashion", count: 2900 },
    { tag: "#VintageFashion", count: 2400 },
    { tag: "#BeautyTips", count: 2100 }
  ],
  influencerPerformance: [
    { name: "Jessica Park", engagement: 8.5, followers: 125000 },
    { name: "Sophie Lee", engagement: 9.8, followers: 210000 },
    { name: "David Kim", engagement: 6.2, followers: 89000 },
    { name: "Alex Martinez", engagement: 5.1, followers: 45000 }
  ]
};
