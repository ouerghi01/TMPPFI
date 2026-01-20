import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  Shield, 
  FileText, 
  Calendar, 
  BarChart, 
  FileCheck, 
  Download, 
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Mail,
  Phone
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  roles?: string[];
  children?: NavigationItem[];
}

export function AdminLayout() {
  const { language } = useLanguage();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['']);

  // Mock user role - in real app, this would come from auth context
  const userRole = 'admin';
  const userName = 'Admin User';

  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: language === 'fr' ? 'Tableau de bord' : language === 'de' ? 'Dashboard' : 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/admin',
      roles: ['admin', 'manager', 'moderator', 'observer']
    },
    {
      id: 'users',
      label: language === 'fr' ? 'Utilisateurs & Rôles' : language === 'de' ? 'Benutzer & Rollen' : 'Users & Roles',
      icon: <Users className="w-5 h-5" />,
      path: '/admin/users',
      roles: ['admin', 'manager']
    },
    {
      id: 'processes',
      label: language === 'fr' ? 'Processus participatifs' : language === 'de' ? 'Partizipative Prozesse' : 'Participatory Processes',
      icon: <Layers className="w-5 h-5" />,
      path: '/admin/processes',
      roles: ['admin', 'manager']
    },
    {
      id: 'themes',
      label: language === 'fr' ? 'Gestion des thèmes' : language === 'de' ? 'Themenverwaltung' : 'Theme Management',
      icon: <Shield className="w-5 h-5" />,
      path: '/admin/themes',
      roles: ['admin', 'manager']
    },
    {
      id: 'moderation',
      label: language === 'fr' ? 'Modération' : language === 'de' ? 'Moderation' : 'Moderation',
      icon: <Mail className="w-5 h-5" />,
      path: '/admin/moderation',
      roles: ['admin', 'manager', 'moderator']
    },
    {
      id: 'participations',
      label: language === 'fr' ? 'Participations citoyennes' : language === 'de' ? 'Bürgerbeteiligung' : 'Citizen Participations',
      icon: <Users className="w-5 h-5" />,
      path: '/admin/participations',
      roles: ['admin', 'manager', 'observer']
    },
    {
      id: 'calendar',
      label: language === 'fr' ? 'Calendrier & Phases' : language === 'de' ? 'Kalender & Phasen' : 'Calendar & Phases',
      icon: <Calendar className="w-5 h-5" />,
      path: '/admin/calendar',
      roles: ['admin', 'manager']
    },
    {
      id: 'analytics',
      label: language === 'fr' ? 'Indicateurs & Statistiques' : language === 'de' ? 'Indikatoren & Statistiken' : 'Analytics & Statistics',
      icon: <BarChart className="w-5 h-5" />,
      path: '/admin/analytics',
      roles: ['admin', 'manager', 'observer']
    },
    {
      id: 'results',
      label: language === 'fr' ? 'Publication des résultats' : language === 'de' ? 'Veröffentlichung der Ergebnisse' : 'Results Publication',
      icon: <FileCheck className="w-5 h-5" />,
      path: '/admin/results',
      roles: ['admin', 'manager']
    },
    {
      id: 'exports',
      label: language === 'fr' ? 'Exports & Rapports' : language === 'de' ? 'Exporte & Berichte' : 'Exports & Reports',
      icon: <Download className="w-5 h-5" />,
      path: '/admin/exports',
      roles: ['admin', 'manager', 'observer']
    },
    {
      id: 'ivr',
      label: language === 'fr' ? 'Synthèse IVR' : language === 'de' ? 'IVR-Synthese' : 'IVR Synthesis',
      icon: <Phone className="w-5 h-5" />,
      path: '/admin/ivr',
      roles: ['admin', 'manager', 'observer']
    },
    {
      id: 'settings',
      label: language === 'fr' ? 'Services & Paramètres' : language === 'de' ? 'Dienste & Einstellungen' : 'Services & Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/admin/settings',
      roles: ['admin'],
      children: [
        {
          id: 'settings-general',
          label: language === 'fr' ? 'Paramètres généraux' : language === 'de' ? 'Allgemeine Einstellungen' : 'General Settings',
          icon: <Settings className="w-4 h-4" />,
          path: '/admin/settings/general',
          roles: ['admin']
        },
        {
          id: 'settings-notifications',
          label: language === 'fr' ? 'Notifications' : language === 'de' ? 'Benachrichtigungen' : 'Notifications',
          icon: <Bell className="w-4 h-4" />,
          path: '/admin/settings/notifications',
          roles: ['admin']
        }
      ]
    }
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const hasAccess = (item: NavigationItem) => {
    if (!item.roles) return true;
    return item.roles.includes(userRole);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30 h-16">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <Link to="/admin" className="flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Users className="w-6 h-6 text-white" />
              </motion.div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">
                      AU
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-sm">{userName}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  {language === 'fr' ? 'Mon compte' : language === 'de' ? 'Mein Konto' : 'My Account'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/settings" className="flex items-center w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Paramètres' : language === 'de' ? 'Einstellungen' : 'Settings'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/" className="flex items-center w-full">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Retour au site' : language === 'de' ? 'Zurück zur Website' : 'Back to site'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Déconnexion' : language === 'de' ? 'Abmelden' : 'Logout'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 transition-transform duration-300 z-20 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <nav className="p-4 space-y-1">
          {navigationItems.map((item) => {
            if (!hasAccess(item)) return null;

            const active = isActive(item.path);
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedMenus.includes(item.id);

            return (
              <div key={item.id}>
                {hasChildren ? (
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      active
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-blue-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      active
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-blue-50/50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                )}

                {/* Submenu */}
                {hasChildren && isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    {item.children!.map((child) => {
                      if (!hasAccess(child)) return null;
                      const childActive = isActive(child.path);

                      return (
                        <Link
                          key={child.id}
                          to={child.path}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                            childActive
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-gray-600 hover:bg-blue-50/50'
                          }`}
                        >
                          {child.icon}
                          <span>{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'lg:pl-64' : 'lg:pl-0'
        }`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}