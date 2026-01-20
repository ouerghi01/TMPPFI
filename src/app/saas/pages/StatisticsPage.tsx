import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'motion/react';
import { BarChart3, Download, Filter, Calendar, FileText, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';
import { toast } from 'sonner';

export function StatisticsPage() {
  const { language } = useLanguage();
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState('6months');
  const [selectedOrganization, setSelectedOrganization] = useState('all');
  const [selectedModules, setSelectedModules] = useState<string[]>(['all']);

  const organizations = [
    'Ville de Bruxelles',
    'Commune d\'Ixelles',
    'Région Wallonne',
    'Canton de Genève',
    'Ville de Lausanne'
  ];

  const modules = [
    language === 'fr' ? 'Votes' : language === 'de' ? 'Abstimmungen' : 'Votes',
    language === 'fr' ? 'Débats' : language === 'de' ? 'Debatten' : 'Debates',
    language === 'fr' ? 'Pétitions' : language === 'de' ? 'Petitionen' : 'Petitions',
    language === 'fr' ? 'Assemblées' : language === 'de' ? 'Versammlungen' : 'Assemblies',
    language === 'fr' ? 'Conférences' : language === 'de' ? 'Konferenzen' : 'Conferences'
  ];

  const data = [
    { month: 'Jan', participation: 420, users: 1200, processes: 15 },
    { month: 'Feb', participation: 580, users: 1450, processes: 18 },
    { month: 'Mar', participation: 620, users: 1680, processes: 22 },
    { month: 'Apr', participation: 710, users: 1920, processes: 25 },
    { month: 'May', participation: 850, users: 2150, processes: 28 },
    { month: 'Jun', participation: 980, users: 2480, processes: 32 }
  ];

  const moduleDistribution = [
    { name: language === 'fr' ? 'Votes' : language === 'de' ? 'Abstimmungen' : 'Votes', value: 420 },
    { name: language === 'fr' ? 'Débats' : language === 'de' ? 'Debatten' : 'Debates', value: 380 },
    { name: language === 'fr' ? 'Pétitions' : language === 'de' ? 'Petitionen' : 'Petitions', value: 290 },
    { name: language === 'fr' ? 'Assemblées' : language === 'de' ? 'Versammlungen' : 'Assemblies', value: 180 },
    { name: language === 'fr' ? 'Conférences' : language === 'de' ? 'Konferenzen' : 'Conferences', value: 120 },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

  const handleToggleModule = (module: string) => {
    if (module === 'all') {
      setSelectedModules(['all']);
    } else {
      const newSelection = selectedModules.filter(m => m !== 'all');
      if (newSelection.includes(module)) {
        const filtered = newSelection.filter(m => m !== module);
        setSelectedModules(filtered.length === 0 ? ['all'] : filtered);
      } else {
        setSelectedModules([...newSelection, module]);
      }
    }
  };

  const handleApplyFilters = () => {
    toast.success(
      language === 'fr' 
        ? 'Filtres appliqués avec succès' 
        : language === 'de' 
        ? 'Filter erfolgreich angewendet' 
        : 'Filters applied successfully'
    );
    setFilterDialogOpen(false);
  };

  const handleExport = (format: string) => {
    toast.success(
      language === 'fr' 
        ? `Export ${format.toUpperCase()} en cours...` 
        : language === 'de' 
        ? `${format.toUpperCase()}-Export läuft...` 
        : `Exporting ${format.toUpperCase()}...`
    );
    setExportDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent">
              {language === 'fr' ? 'Statistiques & Rapports' : language === 'de' ? 'Statistiken & Berichte' : 'Statistics & Reports'}
            </h1>
            <p className="text-gray-600 mt-2">
              {language === 'fr' ? 'Analyses et rapports détaillés de la plateforme' : language === 'de' ? 'Detaillierte Analysen und Berichte der Plattform' : 'Detailed platform analytics and reports'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Filtrer' : language === 'de' ? 'Filtern' : 'Filter'}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {language === 'fr' ? 'Filtrer les statistiques' : language === 'de' ? 'Statistiken filtern' : 'Filter Statistics'}
                  </DialogTitle>
                  <DialogDescription>
                    {language === 'fr' ? 'Personnalisez l\'affichage des données' : language === 'de' ? 'Datenanzeige anpassen' : 'Customize data display'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-range">
                      {language === 'fr' ? 'Période' : language === 'de' ? 'Zeitraum' : 'Period'}
                    </Label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger id="date-range">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1month">{language === 'fr' ? 'Dernier mois' : language === 'de' ? 'Letzter Monat' : 'Last month'}</SelectItem>
                        <SelectItem value="3months">{language === 'fr' ? '3 derniers mois' : language === 'de' ? 'Letzte 3 Monate' : 'Last 3 months'}</SelectItem>
                        <SelectItem value="6months">{language === 'fr' ? '6 derniers mois' : language === 'de' ? 'Letzte 6 Monate' : 'Last 6 months'}</SelectItem>
                        <SelectItem value="1year">{language === 'fr' ? 'Dernière année' : language === 'de' ? 'Letztes Jahr' : 'Last year'}</SelectItem>
                        <SelectItem value="all">{language === 'fr' ? 'Tout' : language === 'de' ? 'Alles' : 'All time'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">
                      {language === 'fr' ? 'Organisation' : language === 'de' ? 'Organisation' : 'Organization'}
                    </Label>
                    <Select value={selectedOrganization} onValueChange={setSelectedOrganization}>
                      <SelectTrigger id="organization">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{language === 'fr' ? 'Toutes' : language === 'de' ? 'Alle' : 'All'}</SelectItem>
                        {organizations.map(org => (
                          <SelectItem key={org} value={org}>{org}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      {language === 'fr' ? 'Modules' : language === 'de' ? 'Module' : 'Modules'}
                    </Label>
                    <div className="border rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="module-all"
                          checked={selectedModules.includes('all')}
                          onCheckedChange={() => handleToggleModule('all')}
                        />
                        <Label htmlFor="module-all" className="text-sm font-normal cursor-pointer">
                          {language === 'fr' ? 'Tous les modules' : language === 'de' ? 'Alle Module' : 'All modules'}
                        </Label>
                      </div>
                      {modules.map(module => (
                        <div key={module} className="flex items-center space-x-2">
                          <Checkbox
                            id={`module-${module}`}
                            checked={selectedModules.includes(module) || selectedModules.includes('all')}
                            onCheckedChange={() => handleToggleModule(module)}
                            disabled={selectedModules.includes('all')}
                          />
                          <Label htmlFor={`module-${module}`} className="text-sm font-normal cursor-pointer">
                            {module}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {
                    setDateRange('6months');
                    setSelectedOrganization('all');
                    setSelectedModules(['all']);
                  }}>
                    {language === 'fr' ? 'Réinitialiser' : language === 'de' ? 'Zurücksetzen' : 'Reset'}
                  </Button>
                  <Button onClick={handleApplyFilters}>
                    {language === 'fr' ? 'Appliquer' : language === 'de' ? 'Anwenden' : 'Apply'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Exporter' : language === 'de' ? 'Exportieren' : 'Export'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {language === 'fr' ? 'Exporter les statistiques' : language === 'de' ? 'Statistiken exportieren' : 'Export Statistics'}
                  </DialogTitle>
                  <DialogDescription>
                    {language === 'fr' ? 'Choisissez le format d\'export' : language === 'de' ? 'Wählen Sie das Exportformat' : 'Choose export format'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2"
                    onClick={() => handleExport('pdf')}
                  >
                    <FileText className="w-8 h-8 text-red-600" />
                    <span className="font-medium">PDF</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2"
                    onClick={() => handleExport('excel')}
                  >
                    <BarChart3 className="w-8 h-8 text-green-600" />
                    <span className="font-medium">Excel</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2"
                    onClick={() => handleExport('csv')}
                  >
                    <FileText className="w-8 h-8 text-blue-600" />
                    <span className="font-medium">CSV</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2"
                    onClick={() => handleExport('json')}
                  >
                    <FileText className="w-8 h-8 text-purple-600" />
                    <span className="font-medium">JSON</span>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            title: language === 'fr' ? 'Participation totale' : language === 'de' ? 'Gesamtbeteiligung' : 'Total Participation',
            value: '4,260',
            change: '+18%',
            icon: TrendingUp,
            color: 'blue'
          },
          {
            title: language === 'fr' ? 'Utilisateurs actifs' : language === 'de' ? 'Aktive Benutzer' : 'Active Users',
            value: '2,480',
            change: '+12%',
            icon: TrendingUp,
            color: 'emerald'
          },
          {
            title: language === 'fr' ? 'Processus' : language === 'de' ? 'Prozesse' : 'Processes',
            value: '140',
            change: '+24%',
            icon: TrendingUp,
            color: 'purple'
          },
          {
            title: language === 'fr' ? 'Taux engagement' : language === 'de' ? 'Engagement-Rate' : 'Engagement Rate',
            value: '68%',
            change: '+8%',
            icon: TrendingUp,
            color: 'amber'
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center`}>
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
                      {language === 'fr' ? 'vs mois dernier' : language === 'de' ? 'vs letzter Monat' : 'vs last month'}
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
        {/* Participation Chart */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>{language === 'fr' ? 'Participation mensuelle' : language === 'de' ? 'Monatliche Teilnahme' : 'Monthly Participation'}</CardTitle>
              <CardDescription>
                {language === 'fr' ? 'Évolution de la participation sur 6 mois' : language === 'de' ? 'Entwicklung der Teilnahme über 6 Monate' : 'Participation evolution over 6 months'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
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
                  <Bar 
                    dataKey="participation" 
                    name={language === 'fr' ? 'Participation' : language === 'de' ? 'Teilnahme' : 'Participation'}
                    fill="url(#colorGradient)" 
                    radius={[8, 8, 0, 0]} 
                  />
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

        {/* User Growth Chart */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>{language === 'fr' ? 'Croissance utilisateurs' : language === 'de' ? 'Benutzerwachstum' : 'User Growth'}</CardTitle>
              <CardDescription>
                {language === 'fr' ? 'Évolution du nombre d\'utilisateurs actifs' : language === 'de' ? 'Entwicklung der aktiven Benutzer' : 'Active users evolution'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
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
                    dataKey="users" 
                    name={language === 'fr' ? 'Utilisateurs' : language === 'de' ? 'Benutzer' : 'Users'}
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', r: 5 }}
                    activeDot={{ r: 7 }}
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
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'fr' ? 'Distribution par module' : language === 'de' ? 'Verteilung nach Modul' : 'Distribution by Module'}
            </CardTitle>
            <CardDescription>
              {language === 'fr' ? 'Répartition des activités par type de module' : language === 'de' ? 'Verteilung der Aktivitäten nach Modultyp' : 'Activity distribution by module type'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={moduleDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {moduleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="flex flex-col justify-center space-y-3">
                {moduleDistribution.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Process Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'fr' ? 'Activité des processus' : language === 'de' ? 'Prozessaktivität' : 'Process Activity'}
            </CardTitle>
            <CardDescription>
              {language === 'fr' ? 'Nombre de processus actifs par mois' : language === 'de' ? 'Anzahl aktiver Prozesse pro Monat' : 'Number of active processes per month'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
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
                <Bar 
                  dataKey="processes" 
                  name={language === 'fr' ? 'Processus' : language === 'de' ? 'Prozesse' : 'Processes'}
                  fill="#10b981" 
                  radius={[8, 8, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
