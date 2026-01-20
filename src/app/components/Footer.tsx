import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Heart,
  Shield,
  FileText,
  CircleHelp,
  Settings
} from 'lucide-react';

export function Footer() {
  const { t, language } = useLanguage();

  const footerLinks = {
    platform: [
      { label: t('nav.consultations'), path: '/consultations' },
      { label: t('nav.assemblies'), path: '/assemblies' },
      { label: t('nav.petitions'), path: '/petitions' },
      { label: t('nav.conferences'), path: '/conferences' },
      { label: t('nav.votes'), path: '/votes' },
      { label: language === 'fr' ? 'Signalements' : language === 'de' ? 'Meldungen' : 'Reports', path: '/signalements' },
      { label: language === 'fr' ? '🌟 Espace Jeunesse' : language === 'de' ? '🌟 Jugendraum' : '🌟 Youth Space', path: '/youth-space' },
      { label: t('nav.themes'), path: '/themes' },
    ],
    resources: [
      { label: t('footer.howItWorks'), path: '/how-it-works' },
      { label: t('footer.faq'), path: '/faq' },
      { label: t('footer.guides'), path: '/guides' },
      { label: t('footer.support'), path: '/support' },
      { label: t('footer.ivrAccess') || 'Accès téléphonique (IVR)', path: '/ivr-access' },
    ],
    legal: [
      { label: t('footer.legal'), path: '/legal-notice' },
      { label: t('footer.privacy'), path: '/privacy' },
      { label: t('footer.terms'), path: '/terms' },
      { label: t('footer.accessibility'), path: '/accessibility' },
      { label: t('footer.cookies'), path: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Centered Container with max-width */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1400px] px-6 lg:px-8 py-12">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* About Section */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <motion.h3 
                  className="font-bold text-xl bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]"
                  animate={{
                    backgroundPosition: ["0% center", "200% center", "0% center"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  CiviAgora
                </motion.h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                {t('footer.description')}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <a href="mailto:contact@civiagora.ch" className="hover:text-blue-400 transition-colors">
                    contact@civiagora.ch
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <a 
                    href="tel:+41000000000" 
                    className="hover:text-blue-300 transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-blue-400" />
                    +32 2 000 00 00
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Bruxelles, Belgique</span>
                </div>
              </div>
            </motion.div>

            {/* Platform Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-white mb-4">{t('footer.platform')}</h4>
              <ul className="space-y-2">
                {footerLinks.platform.map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path} 
                      className="text-sm hover:text-blue-400 transition-colors flex items-center gap-1 group"
                    >
                      <span className="w-0 h-0.5 bg-blue-400 group-hover:w-2 transition-all duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-white mb-4">{t('footer.resources')}</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.path} 
                      className="text-sm hover:text-blue-400 transition-colors flex items-center gap-1 group"
                    >
                      <span className="w-0 h-0.5 bg-blue-400 group-hover:w-2 transition-all duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal & Newsletter */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-white mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2 mb-6">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.path} 
                      className="text-sm hover:text-blue-400 transition-colors flex items-center gap-1 group"
                    >
                      <span className="w-0 h-0.5 bg-blue-400 group-hover:w-2 transition-all duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Newsletter */}
              <div>
                <h5 className="font-semibold text-white text-sm mb-2">{t('footer.newsletter')}</h5>
                <Link to="/newsletter">
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder={t('footer.emailPlaceholder')}
                      className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      {t('footer.subscribe')}
                    </motion.button>
                  </div>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Social Links */}
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </motion.div>

              {/* Copyright */}
              <motion.div 
                className="text-sm text-gray-400 text-center md:text-right"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <p className="flex items-center justify-center md:justify-end gap-1">
                  © 2025 CiviAgora • {t('footer.madeWith')} 
                  <Heart className="w-4 h-4 text-red-500 inline animate-pulse" /> 
                  {t('footer.forCitizens')}
                </p>
                <p className="text-xs mt-1">{t('footer.rightsReserved')}</p>
              </motion.div>
            </div>

            {/* Trust Badges */}
            <motion.div 
              className="mt-6 pt-6 border-t border-gray-800 flex flex-wrap justify-center gap-6 text-xs text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-500" />
                <span>{t('footer.secureData')}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4 text-blue-500" />
                <span>{t('footer.gdprCompliant')}</span>
              </div>
              <div className="flex items-center gap-1">
                <CircleHelp className="w-4 h-4 text-purple-500" />
                <span>{t('footer.support247')}</span>
              </div>
              <Link 
                to="/admin"
                className="flex items-center gap-1 hover:text-gray-300 transition-colors group"
              >
                <Settings className="w-4 h-4 text-amber-500 group-hover:rotate-90 transition-transform duration-300" />
                <span>{t('footer.backOffice')}</span>
              </Link>
              <Link 
                to="/saas"
                className="flex items-center gap-1 hover:text-gray-300 transition-colors group"
              >
                <Settings className="w-4 h-4 text-blue-500 group-hover:rotate-90 transition-transform duration-300" />
                <span>{t('footer.saasBackOffice')}</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}