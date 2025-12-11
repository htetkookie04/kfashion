export const mockCollaborations = [
  {
    id: 1,
    brandName: "Seoul Style Co.",
    influencerId: 1,
    influencerName: "Jessica Park",
    productName: "Spring Denim Collection",
    status: "approved",
    startDate: "2024-03-01",
    endDate: "2024-04-30",
    budget: 5000,
    description: "Promote new spring denim line"
  },
  {
    id: 2,
    brandName: "K-Beauty Hub",
    influencerId: 4,
    influencerName: "Alex Martinez",
    productName: "Skincare Routine Set",
    status: "pending",
    startDate: "2024-04-15",
    endDate: "2024-05-15",
    budget: 2500,
    description: "Review and promote skincare products"
  },
  {
    id: 3,
    brandName: "Urban Chic",
    influencerId: 3,
    influencerName: "Sophie Lee",
    productName: "Summer Accessories",
    status: "rejected",
    startDate: "2024-05-01",
    endDate: "2024-06-30",
    budget: 3000,
    description: "Showcase summer accessories collection"
  }
];

export const mockNotices = [
  {
    id: 1,
    title: "Platform Maintenance Scheduled",
    content: "The platform will undergo maintenance on Dec 15, 2024 from 2:00 AM to 4:00 AM UTC.",
    type: "system",
    priority: "high",
    publishedAt: "2024-12-01T10:00:00Z",
    isActive: true
  },
  {
    id: 2,
    title: "New Feature: AI-Powered Recommendations",
    content: "We've introduced AI-powered recommendations to help users discover content they'll love!",
    type: "feature",
    priority: "medium",
    publishedAt: "2024-11-28T14:30:00Z",
    isActive: true
  },
  {
    id: 3,
    title: "Holiday Season Guidelines",
    content: "Please review our updated content guidelines for the holiday season.",
    type: "announcement",
    priority: "low",
    publishedAt: "2024-11-20T09:00:00Z",
    isActive: false
  }
];

export const mockEvents = [
  {
    id: 1,
    title: "K-Fashion Week 2024",
    description: "Join us for the annual K-Fashion Week featuring top influencers and brands",
    startDate: "2024-12-20",
    endDate: "2024-12-27",
    location: "Virtual Event",
    maxParticipants: 1000,
    registeredUsers: 456,
    status: "upcoming"
  },
  {
    id: 2,
    title: "Influencer Meetup Seoul",
    description: "Networking event for verified influencers in Seoul",
    startDate: "2024-12-15",
    endDate: "2024-12-15",
    location: "Seoul, Korea",
    maxParticipants: 50,
    registeredUsers: 38,
    status: "upcoming"
  }
];
