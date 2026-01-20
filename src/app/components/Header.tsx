import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { 
  Users, 
  Menu, 
  LogIn, 
  Search,
  Home,
  MessageSquare,
  FileText,
  Mic,
  Vote,
  Layers,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import { AuthModal } from './AuthModal';
import { UserMenu } from './UserMenu';
import { GlobalSearch } from './GlobalSearch';
import { MobileMenu } from './MobileMenu';
import { NotificationCenter } from './NotificationCenter';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { isLoggedIn, user, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation items with icons
  const navItems = [
    { key: 'home', path: '/', icon: Home, label: t('nav.home') },
    { key: 'consultations', path: '/consultations', icon: MessageSquare, label: t('nav.consultations') },
    { key: 'assemblies', path: '/assemblies', icon: Users, label: t('nav.assemblies') },
    { key: 'petitions', path: '/petitions', icon: FileText, label: t('nav.petitions') },
    { key: 'conferences', path: '/conferences', icon: Mic, label: t('nav.conferences') },
    { key: 'votes', path: '/votes', icon: Vote, label: language === 'fr' ? 'Votes' : language === 'de' ? 'Abstimmungen' : 'Votes' },
    { key: 'signalements', path: '/signalements', icon: AlertCircle, label: language === 'fr' ? 'Signalements' : language === 'de' ? 'Meldungen' : 'Reports' },
    { key: 'youth-space', path: '/youth-space', icon: Sparkles, label: language === 'fr' ? '🌟 Jeunesse' : language === 'de' ? '🌟 Jugend' : '🌟 Youth' },
    { key: 'themes', path: '/themes', icon: Layers, label: t('nav.themes') },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Centered Container with max-width */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1400px] px-6 lg:px-8">
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Users className="w-6 h-6 text-white" />
              </motion.div>
            </Link>

            {/* Navigation principale - Center aligned with icons */}
            <nav className="hidden lg:flex items-center justify-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50/50 text-center whitespace-nowrap text-[15px]"
                >
                  <item.icon className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Actions - Right aligned */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-blue-50/50 hover:bg-blue-100/50 rounded-lg transition-colors"
                title={language === 'fr' ? 'Rechercher (Ctrl+K)' : language === 'de' ? 'Suchen (Ctrl+K)' : 'Search (Ctrl+K)'}
              >
                <Search className="w-4 h-4" />
                <kbd className="hidden xl:inline-block px-2 py-0.5 text-xs bg-white border border-gray-300 rounded">
                  Ctrl+K
                </kbd>
              </button>

              {/* Search Icon (Mobile) */}
              <button
                onClick={() => setSearchOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-blue-50/50"
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>

              {/* Language Selector */}
              <Select value={language} onValueChange={(value) => setLanguage(value as 'fr' | 'de' | 'en')}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">FR</SelectItem>
                  <SelectItem value="de">DE</SelectItem>
                  <SelectItem value="en">EN</SelectItem>
                </SelectContent>
              </Select>

              {/* Notification Center (only when logged in) */}
              {isLoggedIn && user && <NotificationCenter />}

              {/* Auth Button or User Menu */}
              {isLoggedIn && user ? (
                <div className="hidden md:block">
                  <UserMenu
                    userName={`${user.firstName} ${user.lastName}`}
                    userEmail={user.email}
                    onLogout={logout}
                  />
                </div>
              ) : (
                <Button
                  onClick={() => setAuthModalOpen(true)}
                  size="icon"
                  className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  title={language === 'fr' ? 'Connexion' : language === 'de' ? 'Anmelden' : 'Login'}
                >
                  <LogIn className="w-4 h-4" />
                </Button>
              )}

              {/* Mobile menu button */}
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-blue-50/50 transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
      />

      {/* Global Search */}
      <GlobalSearch
        open={searchOpen}
        onOpenChange={setSearchOpen}
      />

      {/* Mobile Menu */}
      <MobileMenu
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
      />
    </header>
  );
}