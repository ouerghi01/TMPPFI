import React, { useState } from 'react';
import { BarChart as BarChartIcon, TrendingUp, Users, Mail, ThumbsUp, Eye, Download, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Participation data over time
  const participationData = [
    { date: '01/12', consultations: 120, petitions: 85, votes: 150, assemblies: 45 },
    { date: '05/12', consultations: 135, petitions: 92, votes: 168, assemblies: 52 },
    { date: '10/12', consultations: 145, petitions: 105, votes: 180, assemblies: 58 },
    { date: '15/12', consultations: 158, petitions: 118, votes: 195, assemblies: 63 },
    { date: '20/12', consultations: 172, petitions: 125, votes: 210, assemblies: 68 },
    { date: '25/12', consultations: 165, petitions: 120, votes: 205, assemblies: 65 },
    { date: '30/12', consultations: 180, petitions: 135, votes: 225, assemblies: 72 },
    { date: '05/01', consultations: 195, petitions: 148, votes: 240, assemblies: 78 }
  ];

  // Module usage distribution
  const moduleData = [
    { name: 'Concertations', value: 35, color: '#3b82f6' },
    { name: 'Votes', value: 30, color: '#8b5cf6' },
    { name: 'Pétitions', value: 20, color: '#10b981' },
    { name: 'Assemblées', value: 10, color: '#f59e0b' },
    { name: 'Conférences', value: 5, color: '#ec4899' }
  ];

  // Theme engagement
  const themeEngagementData = [
    { theme: 'Mobilité', participants: 420, contributions: 850 },
    { theme: 'Environnement', participants: 385, contributions: 720 },
    { theme: 'Logement', participants: 340, contributions: 620 },
    { theme: 'Culture', participants: 295, contributions: 540 },
    { theme: 'Éducation', participants: 280, contributions: 510 },
    { theme: 'Économie', participants: 245, contributions: 465 }
  ];

  // User demographics
  const demographicsData = [
    { ageGroup: '18-24', count: 120 },
    { ageGroup: '25-34', count: 280 },
    { ageGroup: '35-44', count: 340 },
    { ageGroup: '45-54', count: 295 },
    { ageGroup: '55-64', count: 210 },
    { ageGroup: '65+', count: 155 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BarChartIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Indicateurs & Statistiques
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Analysez les performances et l'engagement de votre plateforme
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                timeRange === '7d'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              7 jours
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                timeRange === '30d'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              30 jours
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                timeRange === '90d'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              90 jours
            </button>
            <button
              onClick={() => setTimeRange('1y')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                timeRange === '1y'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              1 an
            </button>
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Utilisateurs actifs
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  2,847
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+12.5%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Contributions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  8,426
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+18.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Votes totaux
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  15,683
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+24.8%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Vues de page
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  45,219
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+8.4%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolution de la participation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="consultations" stroke="#3b82f6" strokeWidth={2} name="Concertations" />
                <Line type="monotone" dataKey="votes" stroke="#8b5cf6" strokeWidth={2} name="Votes" />
                <Line type="monotone" dataKey="petitions" stroke="#10b981" strokeWidth={2} name="Pétitions" />
                <Line type="monotone" dataKey="assemblies" stroke="#f59e0b" strokeWidth={2} name="Assemblées" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition par module</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={moduleData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {moduleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement par thème</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={themeEngagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="theme" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="participants" fill="#3b82f6" name="Participants" />
                <Bar dataKey="contributions" fill="#8b5cf6" name="Contributions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Démographie des utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={demographicsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="ageGroup" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#10b981" name="Utilisateurs" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                icon: Mail,
                color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
                title: 'Nouvelle contribution sur "Mobilité Urbaine"',
                time: 'Il y a 5 minutes',
                user: 'Marie Dubois'
              },
              {
                icon: ThumbsUp,
                color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
                title: 'Vote enregistré sur le budget participatif',
                time: 'Il y a 12 minutes',
                user: 'Jean Martin'
              },
              {
                icon: Users,
                color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
                title: 'Nouvel utilisateur inscrit',
                time: 'Il y a 23 minutes',
                user: 'Sophie Bernard'
              },
              {
                icon: Calendar,
                color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
                title: 'Assemblée citoyenne programmée',
                time: 'Il y a 1 heure',
                user: 'Admin'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.color}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}