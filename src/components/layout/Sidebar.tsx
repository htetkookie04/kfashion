import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
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
  Settings,
  ChevronDown,
  ChevronRight,
  FileText
} from 'lucide-react';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  {
    label: 'User Management',
    icon: Users,
    subItems: [
      { path: '/users', icon: Users, label: 'General Users' },
      { path: '/influencers', icon: UserCheck, label: 'Influencers' }
    ]
  },
  {
    label: 'Content Management',
    icon: FileText,
    subItems: [
      { path: '/feeds', icon: Image, label: 'Feed Review' },
      { path: '/reports', icon: Flag, label: 'Report History' }
    ]
  },
  { path: '/collaborations', icon: Handshake, label: 'Brand Collaborations' },
  { path: '/ai-recommendations', icon: Brain, label: 'AI Recommendations' },
  { path: '/analytics', icon: BarChart3, label: 'Data Analytics' },
  { path: '/notices', icon: Bell, label: 'Notices' },
  { path: '/events', icon: Calendar, label: 'Events' },
  { path: '/settings', icon: Settings, label: 'System Settings' }
];

export function Sidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({
    'User Management': true, // Default open
    'Content Management': true // Default open
  });

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          K-Fashion
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Admin Dashboard</p>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          
          // Handle nested menu items
          if ('subItems' in item && item.subItems) {
            const isExpanded = expandedItems[item.label];

            return (
              <div key={item.label} className="mb-2">
                <button
                  onClick={() => toggleExpand(item.label)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.subItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isActive = location.pathname === subItem.path;

                      return (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <SubIcon className="w-4 h-4" />
                          <span className="text-sm font-medium">{subItem.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // Handle regular menu items
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path!}
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
