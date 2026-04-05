import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Coffee, Mic, FileText, Settings, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: '대시보드', icon: LayoutDashboard },
    { path: '/admin/menu', label: '메뉴 관리', icon: Coffee },
    { path: '/admin/voice', label: '음성안내 관리', icon: Mic },
    { path: '/admin/posts', label: '게시글 관리', icon: FileText },
    { path: '/admin/settings', label: '디자인 설정', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">남양주시 커피 주문 관리자</h1>
        </div>
        
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-purple-50 text-purple-700 border-r-4 border-purple-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <LogOut size={20} />
            키오스크로 돌아가기
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <Outlet />
      </main>
    </div>
  );
}
