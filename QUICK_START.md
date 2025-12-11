# Quick Start Guide - K-Fashion Admin Dashboard

## 🚀 Getting Started

### 1. Start the Development Server
```bash
npm run dev
```
The app will be available at: http://localhost:5173

### 2. Login
- **Email:** admin@kfashion.com
- **Password:** admin123

### 3. Explore the Dashboard

You'll see the sidebar with all menu items:
- Dashboard
- General Users
- Influencers
- Feed Review
- Report History
- Brand Collaborations
- AI Recommendations
- Data Analytics
- Notices
- Events
- System Settings

## 🎯 Key Features to Try

### ✨ Theme Toggle
1. Click the moon/sun icon in the top-right corner
2. Or go to **Settings** → **Appearance** → Toggle Dark Mode

### 👥 User Management
1. Navigate to **General Users**
2. Click **Edit** (pencil icon) to view user details
3. Click the **Activate/Deactivate** button to toggle user status

### 📸 Feed Review
1. Navigate to **Feed Review**
2. View pending feeds
3. Click **Approve** or **Reject** to moderate content
4. Status updates immediately!

### 📊 Create a Notice
1. Navigate to **Notices**
2. Click **Create Notice** button
3. Fill in title, content, and priority
4. Click **Create Notice**
5. See your new notice appear at the top of the list!

### 📅 View Events
1. Navigate to **Events**
2. See event cards with registration progress
3. Click **Create Event** to add a new one

### 🤖 AI Settings
1. Navigate to **AI Recommendations**
2. Adjust sliders to change algorithm weights
3. Toggle features on/off
4. See updates in real-time

### 📈 Analytics
1. Navigate to **Data Analytics**
2. View interactive charts:
   - User Growth (Line Chart)
   - Feed Engagement (Bar Chart)
   - Top Tags (Progress Bars)
   - Influencer Performance

## 💡 Tips

- **All changes are UI-only** - they won't persist on page refresh
- **Authentication persists** - login state saved in localStorage
- **Theme persists** - your theme preference is saved
- **Try all CRUD operations** - Create, Read, Update, Delete (UI only)
- **Responsive** - Try resizing your browser window

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Mobile Testing

To test on mobile devices:
```bash
npm run dev -- --host
```
Then access via your local IP address on your mobile device.

## 🎨 Customization

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Change these colors
    500: '#your-color',
    600: '#your-color',
    // ...
  }
}
```

### Add New Menu Item
1. Add route in `src/App.tsx`
2. Add menu item in `src/components/layout/Sidebar.tsx`
3. Create page component in `src/pages/`

## 🐛 Troubleshooting

### Port 5173 already in use
```bash
# Kill the process using the port, or
npm run dev -- --port 3000
```

### Styles not loading
```bash
# Restart the dev server
# Press Ctrl+C then run:
npm run dev
```

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

## 📖 Learn More

- **React:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org
- **Tailwind CSS:** https://tailwindcss.com
- **Vite:** https://vite.dev
- **React Router:** https://reactrouter.com

Enjoy exploring the K-Fashion Admin Dashboard! 🎉
