/**
 * MobileMenu - Menu mobile responsive pour CiviAgora
 * Utilise Sheet (Radix UI) pour un menu latéral élégant avec icônes et routing visible
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from './ui/sheet';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import {
  Home,
  MessageSquare,
  Users,
  FileText,
  Mic,
  Vote,
  Layers,
  User,
  Settings,
  LogOut,
  LogIn,
  HelpCircle,
  BookOpen,
  Phone,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const { t, language } = useLanguage();
  const { isLoggedIn, user, logout } = useAuth();

  const mainNavItems = [
    { 
      key: 'home', 
      path: '/', 
      icon: Home,
      label: t('nav.home')
    },
    { 
      key: 'consultations', 
      path: '/consultations', 
      icon: MessageSquare,
      label: t('nav.consultations'),
      badge: '8'
    },
    { 
      key: 'assemblies', 
      path: '/assemblies', 
      icon: Users,
      label: t('nav.assemblies')
    },
    { 
      key: 'petitions', 
      path: '/petitions', 
      icon: FileText,
      label: t('nav.petitions'),
      badge: '10'
    },
    { 
      key: 'conferences', 
      path: '/conferences', 
      icon: Mic,
      label: t('nav.conferences')
    },
    { 
      key: 'votes', 
      path: '/votes', 
      icon: Vote,
      label: language === 'fr' ? 'Votes & Référendums' : language === 'de' ? 'Abstimmungen & Referenden' : 'Votes & Referendums',
      badge: '5'
    },
    { 
      key: 'signalements', 
      path: '/signalements', 
      icon: AlertCircle,
      label: language === 'fr' ? 'Signalements citoyens' : language === 'de' ? 'Bürgermeldungen' : 'Citizen Reports'
    },
    { 
      key: 'youth-space', 
      path: '/youth-space', 
      icon: Sparkles,
      label: language === 'fr' ? '🌟 Espace Jeunesse' : language === 'de' ? '🌟 Jugendraum' : '🌟 Youth Space',
      badge: '3'
    },
    { 
      key: 'themes', 
      path: '/themes', 
      icon: Layers,
      label: t('nav.themes')
    },
  ];

  const resourcesItems = [
    {
      path: '/how-it-works',
      icon: HelpCircle,
      label: language === 'fr' ? 'Comment ça marche' : language === 'de' ? 'Wie es funktioniert' : 'How it works'
    },
    {
      path: '/faq',
      icon: HelpCircle,
      label: 'FAQ'
    },
    {
      path: '/guides',
      icon: BookOpen,
      label: language === 'fr' ? 'Guides' : language === 'de' ? 'Anleitungen' : 'Guides'
    },
    {
      path: '/support',
      icon: Phone,
      label: language === 'fr' ? 'Support' : language === 'de' ? 'Unterstützung' : 'Support'
    },
  ];

  const handleNavClick = () => {
    onOpenChange(false);
  };

  const handleLogout = () => {
    logout();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white">
        <SheetHeader>
          <SheetTitle className="text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full py-6">
          {/* User Section */}
          {isLoggedIn && user ? (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <Button 
                onClick={handleNavClick}
                asChild
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link to="/login" className="flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4" />
                  {language === 'fr' ? 'Connexion' : language === 'de' ? 'Anmelden' : 'Login'}
                </Link>
              </Button>
            </div>
          )}

          <Separator className="mb-4" />

          {/* Main Navigation */}
          <div className="flex-1 overflow-y-auto">
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                {language === 'fr' ? 'Navigation' : language === 'de' ? 'Navigation' : 'Navigation'}
              </div>
              <nav className="space-y-1">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.key}
                    to={item.path}
                    onClick={handleNavClick}
                    className="flex items-center justify-between px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            <Separator className="my-4" />

            {/* Resources */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                {language === 'fr' ? 'Ressources' : language === 'de' ? 'Ressourcen' : 'Resources'}
              </div>
              <nav className="space-y-1">
                {resourcesItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={handleNavClick}
                    className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group"
                  >
                    <item.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Footer Actions */}
          {isLoggedIn && user && (
            <>
              <Separator className="my-4" />
              <SheetFooter className="flex-col space-y-2 p-0">
                <Link
                  to="/profile"
                  onClick={handleNavClick}
                  className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors w-full group"
                >
                  <User className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  <span className="font-medium">
                    {language === 'fr' ? 'Mon profil' : language === 'de' ? 'Mein Profil' : 'My profile'}
                  </span>
                </Link>
                <Link
                  to="/settings"
                  onClick={handleNavClick}
                  className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors w-full group"
                >
                  <Settings className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  <span className="font-medium">
                    {language === 'fr' ? 'Paramètres' : language === 'de' ? 'Einstellungen' : 'Settings'}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full group"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">
                    {language === 'fr' ? 'Déconnexion' : language === 'de' ? 'Abmelden' : 'Logout'}
                  </span>
                </button>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}