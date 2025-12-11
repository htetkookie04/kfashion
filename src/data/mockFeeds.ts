export const mockFeeds = [
  {
    id: 1,
    userId: 1,
    userName: "Jessica Park",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",
    caption: "New spring collection! 🌸 Loving these pastel colors #KoreanFashion #SpringStyle",
    tags: ["KoreanFashion", "SpringStyle", "OOTD"],
    likes: 1250,
    comments: 89,
    status: "pending",
    createdAt: "2024-12-10T10:30:00Z"
  },
  {
    id: 2,
    userId: 2,
    userName: "David Kim",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500",
    caption: "Minimalist wardrobe essentials 🖤 #MinimalistFashion #Basics",
    tags: ["MinimalistFashion", "Basics", "Style"],
    likes: 890,
    comments: 45,
    status: "approved",
    createdAt: "2024-12-09T15:20:00Z"
  },
  {
    id: 3,
    userId: 3,
    userName: "Sophie Lee",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500",
    caption: "Vintage vibes for the weekend 🌟 #VintageFashion #WeekendLook",
    tags: ["VintageFashion", "WeekendLook", "RetroStyle"],
    likes: 2100,
    comments: 156,
    status: "approved",
    createdAt: "2024-12-08T12:00:00Z"
  },
  {
    id: 4,
    userId: 4,
    userName: "Alex Martinez",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500",
    caption: "Street style inspiration from Seoul 🇰🇷 #StreetFashion #Seoul",
    tags: ["StreetFashion", "Seoul", "UrbanStyle"],
    likes: 456,
    comments: 32,
    status: "pending",
    createdAt: "2024-12-10T08:15:00Z"
  }
];

export const mockReports = [
  {
    id: 1,
    feedId: 2,
    reportedBy: "User #125",
    reason: "spam",
    description: "Repeated promotional content",
    status: "pending",
    createdAt: "2024-12-10T09:00:00Z"
  },
  {
    id: 2,
    feedId: 5,
    reportedBy: "User #342",
    reason: "inappropriate",
    description: "Inappropriate content for platform",
    status: "resolved",
    createdAt: "2024-12-09T14:30:00Z"
  },
  {
    id: 3,
    feedId: 8,
    reportedBy: "User #89",
    reason: "copyright",
    description: "Unauthorized use of brand images",
    status: "pending",
    createdAt: "2024-12-10T11:20:00Z"
  }
];
