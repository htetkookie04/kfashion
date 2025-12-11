# K-Fashion Admin Dashboard

A complete **frontend-only** admin dashboard prototype for managing a K-Fashion social platform. Built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**.

## 🚀 Features

### ✅ Complete Admin Dashboard
- **Login Page** - Mock authentication with client-side validation
- **Dashboard** - Overview with statistics widgets and recent activities
- **User Management** - Manage general users and influencers
- **Content Management** - Review feeds and handle reports
- **Brand Collaborations** - Track sponsored content and partnerships
- **AI Recommendations** - Configure AI algorithm settings
- **Data Analytics** - Charts and performance metrics
- **Notices & Events** - Create announcements and manage events
- **System Settings** - Theme toggle, localization, and preferences

### 🎨 Modern UI/UX
- **Dark/Light Mode** - Full theme support with toggle
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Tailwind CSS** - Modern, utility-first styling
- **Lucide Icons** - Beautiful, consistent iconography
- **Recharts** - Interactive data visualization

### 🔧 Frontend-Only Architecture
- **No Backend** - All data is mock/static
- **No Database** - Uses JSON mock data
- **Local State** - React useState for UI updates
- **LocalStorage** - Persists auth and theme preferences

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔑 Demo Credentials

```
Email: admin@kfashion.com
Password: admin123
```

## 📁 Project Structure

```
k-fashion-dashboard/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── Table.tsx
│   │   └── layout/          # Layout components
│   │       ├── Layout.tsx
│   │       ├── Sidebar.tsx
│   │       └── Topbar.tsx
│   ├── contexts/            # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── data/                # Mock data
│   │   ├── mockAuth.ts
│   │   ├── mockContent.ts
│   │   ├── mockDashboard.ts
│   │   ├── mockFeeds.ts
│   │   └── mockUsers.ts
│   ├── pages/               # Page components
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── UsersPage.tsx
│   │   ├── InfluencersPage.tsx
│   │   ├── FeedsPage.tsx
│   │   ├── ReportsPage.tsx
│   │   ├── CollaborationsPage.tsx
│   │   ├── AIRecommendationsPage.tsx
│   │   ├── AnalyticsPage.tsx
│   │   ├── NoticesPage.tsx
│   │   ├── EventsPage.tsx
│   │   └── SettingsPage.tsx
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # Entry point
│   └── style.css            # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎯 Key Features by Page

### 1. **Login Page**
- Email + password authentication
- Client-side validation
- Demo credentials display
- Mock authentication logic

### 2. **Dashboard**
- 4 stat widgets (Users, Influencers, Feeds, Tags)
- Recent activity feed
- Quick action buttons
- Platform overview cards

### 3. **User Management**
- General Users table with:
  - View/Edit modal
  - Activate/Deactivate toggle
  - Filter and search
- Influencers page with:
  - Verification status
  - Follower count
  - Engagement metrics

### 4. **Content Management**
- **Feed Review:**
  - Visual feed cards
  - Approve/Reject buttons
  - Tag display
  - Like/comment counts
- **Report History:**
  - Report table
  - Filter by type
  - Status tracking

### 5. **Brand Collaborations**
- Collaboration table
- Budget tracking
- Status management (pending/approved/rejected)
- Influencer partnerships

### 6. **AI Recommendations**
- Algorithm weight sliders
- Feature toggles
- Performance metrics
- Real-time updates

### 7. **Data Analytics**
- User growth line chart
- Feed engagement bar chart
- Top tags visualization
- Influencer performance metrics

### 8. **Notices**
- Create new notices
- Priority levels
- Active/Inactive status
- Table view

### 9. **Events**
- Event cards
- Registration tracking
- Create event modal
- Date and location info

### 10. **Settings**
- **Appearance:** Dark/Light mode toggle
- **Localization:** Language, Currency, Timezone
- **API Configuration:** Mock API keys
- **Admin Roles:** Permission management

## 🎨 UI Components

### Reusable Components
- **Button** - Multiple variants (primary, secondary, success, danger, outline)
- **Card** - Container with optional title/subtitle
- **Input** - Text input with label and error states
- **Modal** - Popup dialog with different sizes
- **Table** - Generic table with custom columns
- **StatCard** - Dashboard statistics widget

## 🔄 State Management Examples

### Approve Feed
```typescript
const approveFeed = (id: number) => {
  setFeeds(feeds.map(feed =>
    feed.id === id ? { ...feed, status: 'approved' } : feed
  ));
};
```

### Toggle User Status
```typescript
const toggleStatus = (id: number) => {
  setUsers(users.map(user => 
    user.id === id 
      ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
      : user
  ));
};
```

### Create Notice
```typescript
const handleCreate = () => {
  const notice = {
    id: notices.length + 1,
    ...newNotice,
    publishedAt: new Date().toISOString(),
    isActive: true
  };
  setNotices([notice, ...notices]);
};
```

### Theme Toggle
```typescript
const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  document.documentElement.classList.toggle('dark', newTheme === 'dark');
};
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS
- **Recharts** - Data visualization
- **Lucide React** - Icon library

## 🌈 Theme Support

The dashboard fully supports light and dark modes:
- Toggle in Topbar
- Toggle in Settings page
- Persisted in localStorage
- All components are theme-aware

## 📱 Responsive Design

All pages are responsive and work on:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🚦 Routing

Protected routes require authentication:
- `/login` - Login page (public)
- `/dashboard` - Main dashboard (protected)
- `/users` - User management (protected)
- `/influencers` - Influencer management (protected)
- `/feeds` - Feed review (protected)
- `/reports` - Report history (protected)
- `/collaborations` - Brand collaborations (protected)
- `/ai-recommendations` - AI settings (protected)
- `/analytics` - Data analytics (protected)
- `/notices` - Notices management (protected)
- `/events` - Events management (protected)
- `/settings` - System settings (protected)

## 📝 Notes

- **Frontend Only:** No backend or database required
- **Mock Data:** All data is static/temporary
- **LocalStorage:** Used for auth state and theme preference
- **No Persistence:** Changes reset on page refresh (except auth and theme)
- **Development Only:** Not production-ready, prototype for UI/UX

## 🎓 Learning Resources

This project demonstrates:
- React hooks (useState, useEffect, useContext)
- TypeScript interfaces and types
- React Router v6 routing
- Tailwind CSS utility classes
- Component composition
- Context API for state
- Protected routes
- Form handling
- Modal dialogs
- Dark mode implementation

## 📄 License

This is a prototype project for demonstration purposes.

## 👨‍💻 Author

Built with React, TypeScript, and Tailwind CSS
