import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User, Settings, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

interface UserMenuProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

export function UserMenu({ userName, userEmail, onLogout }: UserMenuProps) {
  const { language } = useLanguage();
  const profile = localStorage.getItem('userProfile');
  const user = profile ? JSON.parse(profile) : null;

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          className="flex items-center gap-3 rounded-full hover:bg-blue-50/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
            <AvatarImage
              src={user?.avatar}
              alt={userName}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {/* User info section */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3 p-2">
            <Avatar className="h-12 w-12 border-2 border-white shadow-md">
              <AvatarImage
                src={user?.avatar}
                alt={userName}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold text-gray-900 leading-none truncate max-w-[140px]" title={userName}>
                {userName}
              </p>
              <p className="text-xs text-gray-500 leading-none truncate max-w-[140px]" title={userEmail}>
                {userEmail}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <Link to="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>
              {language === 'fr' && 'Mon profil'}
              {language === 'de' && 'Mein Profil'}
              {language === 'en' && 'My profile'}
            </span>
          </DropdownMenuItem>
        </Link>
        {/* 
        <Link to="/settings">
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>
              {language === 'fr' && 'Paramètres'}
              {language === 'de' && 'Einstellungen'}
              {language === 'en' && 'Settings'}
            </span>
          </DropdownMenuItem>
        </Link>

        
        */}


        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>
            {language === 'fr' && 'Déconnexion'}
            {language === 'de' && 'Abmelden'}
            {language === 'en' && 'Logout'}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
