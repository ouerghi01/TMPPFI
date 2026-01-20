import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'motion/react';
import {
  Building2,
  Users,
  Activity,
  Vote,
  MessageSquare,
  Calendar,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export function SaasDashboard() {
  const { language } = useLanguage();

  // Mock data
  const stats = [
    {
      title: language === 'fr' ? 'Organisations actives' : language === 'de' ? 'Aktive Organisationen' : 'Active Organizations',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: Building2,
      color: 'blue'
    },
    {
      title: language === 'fr' ? 'Utilisateurs totaux' : language === 'de' ? 'Gesamtbenutzer' : 'Total Users',
      value: '12,458',
      change: '+128',
      trend: 'up',
      icon: Users,
      color: 'purple'
    },
    {
      title: language === 'fr' ? 'Processus en cours' : language === 'de' ? 'Laufende Prozesse' : 'Active Processes',
      value: '89',
      change: '+12',
      trend: 'up',
      icon: Activity,
      color: 'emerald'
    },
    {
      title: language === 'fr' ? 'Débats ouverts' : language === 'de' ? 'Offene Debatten' : 'Open Debates',
      value: '156',
      change: '+24',
      trend: 'up',
      icon: MessageSquare,
      color: 'amber'
    },
    {
      title: language === 'fr' ? 'Votes à venir' : language === 'de' ? 'Bevorstehende Abstimmungen' : 'Upcoming Votes',
      value: '18',
      change: '+5',
      trend: 'up',
      icon: Vote,
      color: 'rose'
    }
  ];

  const participationData = [
    { name: language === 'fr' ? 'Concertations' : language === 'de' ? 'Konsultationen' : 'Consultations', value: 420 },
    { name: language === 'fr' ? 'Débats' : language === 'de' ? 'Debatten' : 'Debates', value: 380 },
    { name: language === 'fr' ? 'Pétitions' : language === 'de' ? 'Petitionen' : 'Petitions', value: 290 },
    { name: language === 'fr' ? 'Votes' : language === 'de' ? 'Abstimmungen' : 'Votes', value: 340 },
    { name: language === 'fr' ? 'Assemblées' : language === 'de' ? 'Versammlungen' : 'Assemblies', value: 180 },
    { name: language === 'fr' ? 'Conférences' : language === 'de' ? 'Konferenzen' : 'Conferences', value: 120 },
  ];

  const monthlyActivityData = [
    { month: language === 'fr' ? 'Jan' : 'Jan', organizations: 18, users: 9200, processes: 65 },
    { month: language === 'fr' ? 'Fév' : language === 'de' ? 'Feb' : 'Feb', organizations: 19, users: 9800, processes: 72 },
    { month: language === 'fr' ? 'Mar' : language === 'de' ? 'Mär' : 'Mar', organizations: 21, users: 10500, processes: 78 },
    { month: language === 'fr' ? 'Avr' : language === 'de' ? 'Apr' : 'Apr', organizations: 22, users: 11200, processes: 82 },
    { month: language === 'fr' ? 'Mai' : 'May', organizations: 23, users: 11800, processes: 86 },
    { month: language === 'fr' ? 'Juin' : language === 'de' ? 'Jun' : 'Jun', organizations: 24, users: 12458, processes: 89 },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

  const getColorClass = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      emerald: 'from-emerald-500 to-emerald-600',
      amber: 'from-amber-500 to-amber-600',
      rose: 'from-rose-500 to-rose-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent">
          {language === 'fr' ? 'Tableau de bord SaaS' : language === 'de' ? 'SaaS Dashboard' : 'SaaS Dashboard'}
        </h1>
        <p className="text-gray-600 mt-2">
          {language === 'fr' 
            ? 'Vue d\'ensemble de la plateforme et des organisations' 
            : language === 'de' 
            ? 'Übersicht der Plattform und Organisationen' 
            : 'Platform and organizations overview'}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getColorClass(stat.color)} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform`} />
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getColorClass(stat.color)} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    <span className="text-sm text-gray-500">
                      {language === 'fr' ? 'ce mois' : language === 'de' ? 'diesen Monat' : 'this month'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Participation by Module */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'fr' ? 'Participation par module' : language === 'de' ? 'Teilnahme nach Modul' : 'Participation per Module'}
              </CardTitle>
              <CardDescription>
                {language === 'fr' ? 'Nombre d\'activités par type de module' : language === 'de' ? 'Anzahl der Aktivitäten nach Modultyp' : 'Number of activities by module type'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={participationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Bar dataKey="value" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'fr' ? 'Évolution mensuelle' : language === 'de' ? 'Monatliche Entwicklung' : 'Monthly Evolution'}
              </CardTitle>
              <CardDescription>
                {language === 'fr' ? 'Croissance des organisations et utilisateurs' : language === 'de' ? 'Wachstum von Organisationen und Nutzern' : 'Growth of organizations and users'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="organizations" 
                    name={language === 'fr' ? 'Organisations' : language === 'de' ? 'Organisationen' : 'Organizations'}
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="processes" 
                    name={language === 'fr' ? 'Processus' : language === 'de' ? 'Prozesse' : 'Processes'}
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Module Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'fr' ? 'Distribution des modules' : language === 'de' ? 'Modulverteilung' : 'Module Distribution'}
            </CardTitle>
            <CardDescription>
              {language === 'fr' ? 'Répartition des activités par type de module' : language === 'de' ? 'Verteilung der Aktivitäten nach Modultyp' : 'Distribution of activities by module type'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={participationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {participationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activities / Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                {language === 'fr' ? 'Activités récentes' : language === 'de' ? 'Kürzliche Aktivitäten' : 'Recent Activities'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { org: 'Ville de Bruxelles', action: language === 'fr' ? 'Nouveau processus créé' : language === 'de' ? 'Neuer Prozess erstellt' : 'New process created', time: '5 min' },
                  { org: 'Commune d\'Ixelles', action: language === 'fr' ? '24 nouveaux participants' : language === 'de' ? '24 neue Teilnehmer' : '24 new participants', time: '15 min' },
                  { org: 'Région Wallonne', action: language === 'fr' ? 'Vote publié' : language === 'de' ? 'Abstimmung veröffentlicht' : 'Vote published', time: '32 min' },
                  { org: 'Canton de Genève', action: language === 'fr' ? 'Débat modéré' : language === 'de' ? 'Debatte moderiert' : 'Debate moderated', time: '1h' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-blue-50/50 transition-colors">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.org}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                {language === 'fr' ? 'Alertes système' : language === 'de' ? 'Systemwarnungen' : 'System Alerts'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: 'warning', message: language === 'fr' ? 'Maintenance programmée dans 2 jours' : language === 'de' ? 'Wartung in 2 Tagen geplant' : 'Scheduled maintenance in 2 days', org: 'System' },
                  { type: 'info', message: language === 'fr' ? 'Nouvelle version disponible' : language === 'de' ? 'Neue Version verfügbar' : 'New version available', org: 'Platform' },
                  { type: 'success', message: language === 'fr' ? 'Backup complété avec succès' : language === 'de' ? 'Backup erfolgreich abgeschlossen' : 'Backup completed successfully', org: 'System' }
                ].map((alert, index) => (
                  <div key={index} className={`flex items-start gap-3 p-3 rounded-lg ${
                    alert.type === 'warning' ? 'bg-amber-50' : 
                    alert.type === 'success' ? 'bg-emerald-50' : 'bg-blue-50'
                  }`}>
                    <AlertCircle className={`w-4 h-4 mt-0.5 ${
                      alert.type === 'warning' ? 'text-amber-600' : 
                      alert.type === 'success' ? 'text-emerald-600' : 'text-blue-600'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-600">{alert.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}