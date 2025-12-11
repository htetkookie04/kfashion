import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Image,
  Flag,
  Handshake,
  Brain,
  BarChart3,
  Bell,
  Calendar,
  Settings
} from 'lucide-react';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/users', icon: Users, label: 'General Users' },
  { path: '/influencers', icon: UserCheck, label: 'Influencers' },
  { path: '/feeds', icon: Image, label: 'Feed Review' },
  { path: '/reports', icon: Flag, label: 'Report History' },
  { path: '/collaborations', icon: Handshake, label: 'Brand Collaborations' },
  { path: '/ai-recommendations', icon: Brain, label: 'AI Recommendations' },
  { path: '/analytics', icon: BarChart3, label: 'Data Analytics' },
  { path: '/notices', icon: Bell, label: 'Notices' },
  { path: '/events', icon: Calendar, label: 'Events' },
  { path: '/settings', icon: Settings, label: 'System Settings' }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          K-Fashion
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Admin Dashboard</p>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
