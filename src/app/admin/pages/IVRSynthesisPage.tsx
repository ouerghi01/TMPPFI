import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { apiService } from '@/app/services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Phone, MessageSquare, Voicemail, TrendingUp, Users, MapPin, Clock, CheckCircle, XCircle, AlertCircle, BarChart3, PieChart, Download } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const translations = {
  fr: {
    title: 'Synthèse IVR - Accès Universel',
    subtitle: 'Restitution des participations par téléphone, SMS et appels automatisés',
    overview: 'Vue d\'ensemble',
    responses: 'Réponses',
    campaigns: 'Campagnes',
    accessibility: 'Impact Accessibilité',
    totalResponses: 'Réponses totales',
    completed: 'Complétées',
    partial: 'Partielles',
    abandoned: 'Abandonnées',
    byChannel: 'Par canal',
    byLanguage: 'Par langue',
    byType: 'Par type',
    phone: 'Téléphone',
    sms: 'SMS',
    automatedCall: 'Appel automatisé',
    avgDuration: 'Durée moyenne',
    seconds: 'secondes',
    peakHours: 'Heures de pointe',
    geographic: 'Distribution géographique',
    accessibilityUsers: 'Utilisateurs avec besoins d\'accessibilité',
    ofTotal: 'du total',
    timeline: 'Évolution temporelle',
    insights: 'Insights clés',
    exportData: 'Exporter les données',
    filterByChannel: 'Filtrer par canal',
    filterByType: 'Filtrer par type',
    all: 'Tous',
    consultation: 'Consultation',
    vote: 'Vote',
    petition: 'Pétition',
    poll: 'Sondage',
    survey: 'Enquête',
    processSummaries: 'Synthèses par processus',
    ivrParticipation: 'Participation IVR',
    onlineParticipation: 'Participation en ligne',
    topRegions: 'Principales régions',
  },
  de: {
    title: 'IVR-Synthese - Universeller Zugang',
    subtitle: 'Zusammenfassung der Teilnahmen per Telefon, SMS und automatisierte Anrufe',
    overview: 'Überblick',
    responses: 'Antworten',
    campaigns: 'Kampagnen',
    accessibility: 'Barrierefreiheit-Auswirkung',
    totalResponses: 'Gesamtantworten',
    completed: 'Abgeschlossen',
    partial: 'Teilweise',
    abandoned: 'Abgebrochen',
    byChannel: 'Nach Kanal',
    byLanguage: 'Nach Sprache',
    byType: 'Nach Typ',
    phone: 'Telefon',
    sms: 'SMS',
    automatedCall: 'Automatisierter Anruf',
    avgDuration: 'Durchschnittsdauer',
    seconds: 'Sekunden',
    peakHours: 'Spitzenzeiten',
    geographic: 'Geografische Verteilung',
    accessibilityUsers: 'Benutzer mit Zugänglichkeitsbedürfnissen',
    ofTotal: 'der Gesamtzahl',
    timeline: 'Zeitliche Entwicklung',
    insights: 'Wichtige Erkenntnisse',
    exportData: 'Daten exportieren',
    filterByChannel: 'Nach Kanal filtern',
    filterByType: 'Nach Typ filtern',
    all: 'Alle',
    consultation: 'Konsultation',
    vote: 'Abstimmung',
    petition: 'Petition',
    poll: 'Umfrage',
    survey: 'Erhebung',
    processSummaries: 'Zusammenfassungen nach Prozess',
    ivrParticipation: 'IVR-Teilnahme',
    onlineParticipation: 'Online-Teilnahme',
    topRegions: 'Hauptregionen',
  },
  en: {
    title: 'IVR Synthesis - Universal Access',
    subtitle: 'Summary of participation via phone, SMS and automated calls',
    overview: 'Overview',
    responses: 'Responses',
    campaigns: 'Campaigns',
    accessibility: 'Accessibility Impact',
    totalResponses: 'Total responses',
    completed: 'Completed',
    partial: 'Partial',
    abandoned: 'Abandoned',
    byChannel: 'By channel',
    byLanguage: 'By language',
    byType: 'By type',
    phone: 'Phone',
    sms: 'SMS',
    automatedCall: 'Automated call',
    avgDuration: 'Average duration',
    seconds: 'seconds',
    peakHours: 'Peak hours',
    geographic: 'Geographic distribution',
    accessibilityUsers: 'Users with accessibility needs',
    ofTotal: 'of total',
    timeline: 'Timeline evolution',
    insights: 'Key insights',
    exportData: 'Export data',
    filterByChannel: 'Filter by channel',
    filterByType: 'Filter by type',
    all: 'All',
    consultation: 'Consultation',
    vote: 'Vote',
    petition: 'Petition',
    poll: 'Poll',
    survey: 'Survey',
    processSummaries: 'Process summaries',
    ivrParticipation: 'IVR participation',
    onlineParticipation: 'Online participation',
    topRegions: 'Top regions',
  }
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function IVRSynthesisPage() {
  const { language, tLocal } = useLanguage();
  const t = translations[language];
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const { data: statsData } = useQuery({
    queryKey: ['ivr', 'stats'],
    queryFn: async () => {
      const response = await apiService.ivr.getStats();
      return response.data;
    },
  });

  const { data: responsesData } = useQuery({
    queryKey: ['ivr', 'responses', selectedChannel, selectedType],
    queryFn: async () => {
      const params: any = {};
      if (selectedChannel !== 'all') params.channel = selectedChannel;
      if (selectedType !== 'all') params.participationType = selectedType;
      const response = await apiService.ivr.getResponses(params);
      return response.data;
    },
  });

  const { data: campaignsData } = useQuery({
    queryKey: ['ivr', 'campaigns'],
    queryFn: async () => {
      const response = await apiService.ivr.getCampaigns();
      return response.data;
    },
  });

  const { data: processSummariesData } = useQuery({
    queryKey: ['ivr', 'process-summaries'],
    queryFn: async () => {
      const response = await apiService.ivr.getAllProcessSummaries();
      return response.data;
    },
  });

  if (!statsData) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  // Prepare chart data
  const channelData = [
    { name: t.phone, value: statsData.byChannel.phone, color: COLORS[0] },
    { name: t.sms, value: statsData.byChannel.sms, color: COLORS[1] },
    { name: t.automatedCall, value: statsData.byChannel.automated_call, color: COLORS[2] }
  ];

  const statusData = [
    { name: t.completed, value: statsData.completedResponses, color: COLORS[0] },
    { name: t.partial, value: statsData.partialResponses, color: COLORS[4] },
    { name: t.abandoned, value: statsData.abandonedResponses, color: COLORS[3] }
  ];

  const languageData = [
    { name: 'FR', value: statsData.byLanguage.fr, color: COLORS[0] },
    { name: 'DE', value: statsData.byLanguage.de, color: COLORS[1] },
    { name: 'EN', value: statsData.byLanguage.en, color: COLORS[2] }
  ];

  const typeData = Object.entries(statsData.byParticipationType).map(([key, value], index) => ({
    name: key,
    value: value,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
            <p className="text-gray-600 mt-1">{t.subtitle}</p>
          </div>
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            {t.exportData}
          </Button>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.totalResponses}</CardTitle>
              <Users className="size-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData.totalResponses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.completed}</CardTitle>
              <CheckCircle className="size-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{statsData.completedResponses}</div>
              <p className="text-xs text-gray-500 mt-1">
                {((statsData.completedResponses / statsData.totalResponses) * 100).toFixed(1)}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.avgDuration}</CardTitle>
              <Clock className="size-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData.averageDuration}s</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.accessibilityUsers}</CardTitle>
              <TrendingUp className="size-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {statsData.accessibilityImpact.totalAccessibilityUsers}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {statsData.accessibilityImpact.percentageOfTotal.toFixed(1)}% {t.ofTotal}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="responses">{t.responses}</TabsTrigger>
            <TabsTrigger value="campaigns">{t.campaigns}</TabsTrigger>
            <TabsTrigger value="process">{t.processSummaries}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Channel Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.byChannel}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.responses}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Language Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.byLanguage}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={languageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Peak Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.peakHours}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={statsData.peakHours}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" label={{ value: 'Heure', position: 'insideBottom', offset: -5 }} />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="responseCount" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Geographic Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="size-5" />
                  {t.geographic}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={statsData.geographicDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>{t.timeline}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={statsData.timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="responses" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responses" className="space-y-4">
            {/* Filters */}
            <div className="flex gap-4">
              <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder={t.filterByChannel} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.all}</SelectItem>
                  <SelectItem value="phone">{t.phone}</SelectItem>
                  <SelectItem value="sms">{t.sms}</SelectItem>
                  <SelectItem value="automated_call">{t.automatedCall}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder={t.filterByType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.all}</SelectItem>
                  <SelectItem value="consultation">{t.consultation}</SelectItem>
                  <SelectItem value="vote">{t.vote}</SelectItem>
                  <SelectItem value="petition">{t.petition}</SelectItem>
                  <SelectItem value="poll">{t.poll}</SelectItem>
                  <SelectItem value="survey">{t.survey}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Responses Table */}
            <Card>
              <CardHeader>
                <CardTitle>{t.responses}</CardTitle>
                <CardDescription>
                  {responsesData?.length || 0} réponse(s) trouvée(s)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {responsesData?.map((response) => (
                    <div key={response.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {response.channel === 'phone' && <Phone className="size-4 text-blue-500" />}
                          {response.channel === 'sms' && <MessageSquare className="size-4 text-green-500" />}
                          {response.channel === 'automated_call' && <Voicemail className="size-4 text-purple-500" />}
                          <span className="font-medium">{tLocal(response.processTitle)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={response.status === 'completed' ? 'default' : 'secondary'}>
                            {response.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{response.region}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {response.responses.length} réponse(s) • {response.duration}s • {response.language.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {campaignsData?.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{tLocal(campaign.name)}</CardTitle>
                      <Badge>{campaign.status}</Badge>
                    </div>
                    <CardDescription>{tLocal(campaign.description)}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">{campaign.stats.totalCalls}</div>
                        <div className="text-xs text-gray-500">Appels totaux</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{campaign.stats.completedCalls}</div>
                        <div className="text-xs text-gray-500">Complétés</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{campaign.stats.responses}</div>
                        <div className="text-xs text-gray-500">Réponses</div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {campaign.channels.map((channel) => (
                        <Badge key={channel} variant="outline">{channel}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="process" className="space-y-4">
            {processSummariesData?.map((summary) => (
              <Card key={summary.processId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{tLocal(summary.processTitle)}</CardTitle>
                    <Badge>{summary.processType}</Badge>
                  </div>
                  <CardDescription>
                    {t.ivrParticipation}: {summary.totalIVRResponses} • {t.onlineParticipation}: {summary.totalOnlineResponses}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{summary.totalIVRResponses}</div>
                      <div className="text-sm text-gray-500">{t.ivrParticipation}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{summary.totalOnlineResponses}</div>
                      <div className="text-sm text-gray-500">{t.onlineParticipation}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{summary.ivrPercentage.toFixed(1)}%</div>
                      <div className="text-sm text-gray-500">Part IVR</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">{t.insights}</h4>
                    <ul className="space-y-1">
                      {summary.insights.map((insight, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <TrendingUp className="size-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          {tLocal(insight)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}