import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { StatCard } from '../components/StatCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Users,
  Activity,
  Mail,
  AlertCircle,
  TrendingUp,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  ArrowRight,
  UserMinus,
  Edit,
  Mic,
  CheckSquare
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';

// Mock data for charts
const participationData = [
  { month: 'Jan', participants: 450 },
  { month: 'Fév', participants: 620 },
  { month: 'Mar', participants: 580 },
  { month: 'Avr', participants: 750 },
  { month: 'Mai', participants: 890 },
  { month: 'Juin', participants: 1020 }
];

const themeDistribution = [
  { name: 'Environnement', value: 320, color: '#10b981' },
  { name: 'Urbanisme', value: 280, color: '#f59e0b' },
  { name: 'Mobilité', value: 240, color: '#3b82f6' },
  { name: 'Éducation', value: 180, color: '#8b5cf6' },
  { name: 'Santé', value: 150, color: '#ef4444' },
  { name: 'Culture', value: 120, color: '#ec4899' },
  { name: 'Autres', value: 110, color: '#6b7280' }
];

const processStatusData = [
  { status: 'Actifs', count: 12 },
  { status: 'En attente', count: 5 },
  { status: 'Terminés', count: 23 },
  { status: 'Brouillons', count: 8 }
];

const recentActivities = [
  {
    id: 1,
    type: 'moderation',
    user: 'Sophie Martin',
    action: 'a modéré 3 contributions',
    time: 'Il y a 5 minutes',
    icon: Mail,
    color: 'text-blue-600'
  },
  {
    id: 2,
    type: 'user',
    user: 'Jean Dupont',
    action: 's\'est inscrit',
    time: 'Il y a 12 minutes',
    icon: Users,
    color: 'text-green-600'
  },
  {
    id: 3,
    type: 'process',
    user: 'Admin',
    action: 'a publié un nouveau processus',
    time: 'Il y a 1 heure',
    icon: FileText,
    color: 'text-purple-600'
  },
  {
    id: 4,
    type: 'alert',
    user: 'Système',
    action: 'Seuil de modération atteint',
    time: 'Il y a 2 heures',
    icon: AlertCircle,
    color: 'text-orange-600'
  }
];

const pendingModerations = [
  {
    id: 1,
    author: 'Marie Dubois',
    content: 'Proposition pour améliorer les pistes cyclables...',
    theme: 'Mobilité',
    date: '2026-01-06',
    priority: 'high'
  },
  {
    id: 2,
    author: 'Pierre Leroy',
    content: 'Commentaire sur le projet de parc urbain...',
    theme: 'Environnement',
    date: '2026-01-06',
    priority: 'medium'
  },
  {
    id: 3,
    author: 'Claire Bernard',
    content: 'Suggestion pour les horaires des bibliothèques...',
    theme: 'Culture',
    date: '2026-01-05',
    priority: 'low'
  }
];

export function AdminDashboard() {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          {language === 'fr' ? 'Tableau de bord institutionnel' :
           language === 'de' ? 'Institutionelles Dashboard' :
           'Institutional Dashboard'}
        </h1>
        <p className="text-gray-600">
          {language === 'fr' ? 'Vue d\'ensemble de la plateforme de démocratie participative' :
           language === 'de' ? 'Übersicht über die partizipative Demokratieplattform' :
           'Overview of the participatory democracy platform'}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={language === 'fr' ? 'Processus actifs' : language === 'de' ? 'Aktive Prozesse' : 'Active Processes'}
          value="12"
          description="3 en phase de consultation"
          icon={Activity}
          trend={{ value: 8.2, isPositive: true }}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />
        <StatCard
          title={language === 'fr' ? 'Participants' : language === 'de' ? 'Teilnehmer' : 'Participants'}
          value="1,420"
          description="Utilisateurs actifs ce mois"
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        <StatCard
          title={language === 'fr' ? 'Contributions' : language === 'de' ? 'Beiträge' : 'Contributions'}
          value="342"
          description="En attente de modération"
          icon={Mail}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />
        <StatCard
          title={language === 'fr' ? 'Taux d\'engagement' : language === 'de' ? 'Engagement-Rate' : 'Engagement Rate'}
          value="68%"
          description="Participation moyenne"
          icon={TrendingUp}
          trend={{ value: 5.3, isPositive: true }}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-100"
        />
      </div>

      {/* Participations citoyennes - Section spécifique */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                {language === 'fr' ? 'Participations citoyennes' :
                 language === 'de' ? 'Bürgerbeteiligung' :
                 'Citizen Participations'}
              </CardTitle>
              <CardDescription className="mt-1">
                {language === 'fr' ? 'Suivi des adhésions, signatures, inscriptions et actions citoyennes' :
                 language === 'de' ? 'Verfolgung von Mitgliedschaften, Unterschriften, Anmeldungen und Bürgeraktionen' :
                 'Track memberships, signatures, registrations and citizen actions'}
              </CardDescription>
            </div>
            <Link to="/admin/participations">
              <Button className="gap-2">
                {language === 'fr' ? 'Voir détails' :
                 language === 'de' ? 'Details ansehen' :
                 'View details'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Assemblées */}
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-medium text-blue-600">Assemblées</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">7</span>
                  <span className="text-xs text-gray-600">actifs</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-orange-600">
                  <UserMinus className="w-3 h-3" />
                  <span>2 annulations</span>
                </div>
              </div>
            </div>

            {/* Pétitions */}
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <Edit className="w-5 h-5 text-green-600" />
                <span className="text-xs font-medium text-green-600">Pétitions</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">12</span>
                  <span className="text-xs text-gray-600">signatures</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-red-600">
                  <UserMinus className="w-3 h-3" />
                  <span>2 retraits</span>
                </div>
              </div>
            </div>

            {/* Conférences */}
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <Mic className="w-5 h-5 text-purple-600" />
                <span className="text-xs font-medium text-purple-600">Conférences</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">8</span>
                  <span className="text-xs text-gray-600">inscrits</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-orange-600">
                  <UserMinus className="w-3 h-3" />
                  <span>2 annulations</span>
                </div>
              </div>
            </div>

            {/* Commentaires */}
            <div className="bg-white p-4 rounded-lg border border-cyan-200">
              <div className="flex items-center justify-between mb-2">
                <Mail className="w-5 h-5 text-cyan-600" />
                <span className="text-xs font-medium text-cyan-600">Commentaires</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">45</span>
                  <span className="text-xs text-gray-600">publiés</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-yellow-600">
                  <Edit className="w-3 h-3" />
                  <span>3 modifications</span>
                </div>
              </div>
            </div>

            {/* Votes */}
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <div className="flex items-center justify-between mb-2">
                <CheckSquare className="w-5 h-5 text-indigo-600" />
                <span className="text-xs font-medium text-indigo-600">Votes</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">89</span>
                  <span className="text-xs text-gray-600">confirmés</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-orange-600">
                  <Edit className="w-3 h-3" />
                  <span>5 changements</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action récentes - Participations */}
          <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Actions récentes
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Marie Dubois a rejoint l'Assemblée Citoyenne Climat</span>
                <span className="text-xs text-gray-500">Il y a 10 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Pierre Martin a annulé son inscription à la conférence</span>
                <span className="text-xs text-gray-500">Il y a 25 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Claire Fontaine a retiré sa signature de la pétition</span>
                <span className="text-xs text-gray-500">Il y a 1h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Sophie Martin a modifié son vote</span>
                <span className="text-xs text-gray-500">Il y a 2h</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Participation Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'fr' ? 'Évolution de la participation' :
               language === 'de' ? 'Teilnahmeentwicklung' :
               'Participation Over Time'}
            </CardTitle>
            <CardDescription>Nombre de participants par mois</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="participants"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribution by Theme */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'fr' ? 'Distribution par thème' :
               language === 'de' ? 'Verteilung nach Thema' :
               'Distribution by Theme'}
            </CardTitle>
            <CardDescription>Répartition des participations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={themeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {themeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Process Status Chart */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'fr' ? 'État des processus participatifs' :
             language === 'de' ? 'Status der partizipativen Prozesse' :
             'Participatory Processes Status'}
          </CardTitle>
          <CardDescription>Répartition par statut</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="status" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom Row: Recent Activity & Pending Moderations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {language === 'fr' ? 'Activité récente' :
                 language === 'de' ? 'Letzte Aktivitäten' :
                 'Recent Activity'}
              </span>
              <Button variant="ghost" size="sm">
                Voir tout <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className={`p-2 rounded-lg bg-gray-50`}>
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>{' '}
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Moderations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>
                  {language === 'fr' ? 'Modérations en attente' :
                   language === 'de' ? 'Ausstehende Moderationen' :
                   'Pending Moderations'}
                </span>
                <span className="px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                  {pendingModerations.length}
                </span>
              </div>
              <Link to="/admin/moderation">
                <Button variant="ghost" size="sm">
                  Gérer <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingModerations.map((item) => (
                <div
                  key={item.id}
                  className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{item.author}</span>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        item.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : item.priority === 'medium'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {item.priority === 'high' ? 'Urgent' : item.priority === 'medium' ? 'Moyen' : 'Faible'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-1">{item.content}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.date).toLocaleDateString('fr-FR')}
                    </span>
                    <span className="flex items-center gap-1">
                      •
                      {item.theme}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <AlertCircle className="w-5 h-5" />
            {language === 'fr' ? 'Alertes et notifications' :
             language === 'de' ? 'Warnungen und Benachrichtigungen' :
             'Alerts and Notifications'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  3 processus arrivent à échéance cette semaine
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Vérifiez les dates de clôture des consultations en cours
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Taux de participation en hausse de 12% ce mois
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  L'engagement des citoyens continue de progresser
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}