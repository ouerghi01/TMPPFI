import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { PageBanner } from "../components/PageBanner";
import { PageLayout } from "../components/layout/PageLayout";
import { KPICard } from "../components/layout/KPICard";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { IVRAccessBanner } from "../components/IVRAccessBanner";
import {
  MessageSquare,
  Users,
  FileText,
  CheckSquare,
  ArrowRight,
  Home,
  Lightbulb,
  Calendar,
  TrendingUp,
  Clock,
  Mic,
  UserCheck,
  Scale,
  Sparkles,
  Vote,
  AlertCircle,
} from "lucide-react";

import {
  useDashboardStats,
  useConsultations,
  usePetitions,
  useVotes,
  useAssemblies,
  useThemes,
  useYouthPolls,
  useYouthSpaceStats,
  useLegislativeConsultations,
  useConferences,
  useSignalementStats
} from "../hooks/useApi";
import { format } from "date-fns";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "../components/AuthModal";

export function Dashboard() {
  const { t, language, tLocal } = useLanguage();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, user, login, logout, updateProfile } = useAuth();
  // Fetch data using React Query hooks
  const { data: stats, isLoading: isLoadingStats } = useDashboardStats();
  const { data: themes } = useThemes();
  const { data: consultations } = useConsultations();
  const { data: petitions } = usePetitions();
  const { data: votes } = useVotes();
  const { data: assemblies } = useAssemblies();
  const { data: legislativeConsultations } = useLegislativeConsultations();
  const { data: conferences } = useConferences();
  const { data: signalementStats } = useSignalementStats();
  const { data: youthPolls } = useYouthPolls({ status: 'OPEN', featured: true });

  const getDaysLeft = (dateStr: string) => {
    const end = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(end.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getThemeBaseColor = (color: string) => {
    // defined as 'text-blue-600', extract 'blue'
    if (!color) return 'blue';
    const parts = color.split('-');
    return parts.length >= 2 ? parts[1] : 'blue';
  };

  const processus_actifs = (consultations?.filter((consultation) => consultation.status === 'OPEN')?.length ?? 0) +
    (petitions?.filter((petition) => petition.status === 'OPEN')?.length ?? 0) +
    (votes?.filter((vote) => vote.status === 'OPEN')?.length ?? 0) +
    (assemblies?.filter((assembly) => assembly.status === 'registration_open')?.length ?? 0) +
    (legislativeConsultations?.filter((legislativeConsultation) => legislativeConsultation.status === 'OPEN')?.length ?? 0) +
    (conferences?.filter((conference) => conference.status === 'registration_open')?.length ?? 0) +

    (youthPolls?.filter((youthPoll) => youthPoll.status === 'OPEN')?.length ?? 0) +
    (signalementStats?.ByStatus?.IN_PROGRESS?.totalSignalements ?? 0);
  const kpiStats = [
    {
      label: language === 'fr' ? 'Processus actifs' : language === 'de' ? 'Aktive Prozesse' : 'Active processes',
      value: (
        processus_actifs

      ).toString(),

      icon: MessageSquare,
      variant: 'blue' as const,
    },
    {
      label: language === 'fr' ? 'Pétitions ouvertes' : language === 'de' ? 'Offene Petitionen' : 'Open petitions',
      value: petitions?.length?.toString() || "0",
      icon: FileText,
      variant: 'green' as const,
    },
    {
      label: language === 'fr' ? 'Votes en cours' : language === 'de' ? 'Laufende Abstimmungen' : 'Ongoing votes',
      value: votes?.length?.toString() || "0",
      icon: CheckSquare,
      variant: 'purple' as const,
    },
    {
      label: language === 'fr' ? 'Participants totaux' : language === 'de' ? 'Teilnehmer insgesamt' : 'Total participants',
      value: stats?.count || "0",
      icon: Users,
      variant: 'orange' as const,
    },
  ];

  // Show loading state
  if (isLoadingStats) {
    return (
      <div>
        <PageBanner
          title={
            language === "fr"
              ? "Tableau de bord citoyen"
              : language === "de"
                ? "Bürger-Dashboard"
                : "Citizen Dashboard"
          }
          description={
            language === "fr"
              ? "Participez aux décisions qui façonnent votre commune"
              : language === "de"
                ? "Beteiligen Sie sich an Entscheidungen, die Ihre Gemeinde gestalten"
                : "Participate in decisions that shape your community"
          }
          gradient="from-blue-600 to-indigo-600"
          icon={<Home className="w-12 h-12 text-white" />}
        />
        <PageLayout className="py-8">
          <div className="text-center text-gray-500">
            {language === 'fr' ? 'Chargement...' : language === 'de' ? 'Laden...' : 'Loading...'}
          </div>
        </PageLayout>
      </div>
    );
  }

  return (
    <div>
      <PageBanner
        title={
          language === "fr"
            ? "Tableau de bord citoyen"
            : language === "de"
              ? "Bürger-Dashboard"
              : "Citizen Dashboard"
        }
        description={
          language === "fr"
            ? "Participez aux décisions qui façonnent votre commune"
            : language === "de"
              ? "Beteiligen Sie sich an Entscheidungen, die Ihre Gemeinde gestalten"
              : "Participate in decisions that shape your community"
        }
        gradient="from-blue-600 to-indigo-600"
        icon={<Home className="w-12 h-12 text-white" />}
      />

      <PageLayout className="py-8">
        {/* KPI Cards - Standard 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpiStats.map((stat, index) => (
            <KPICard
              key={index}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              variant={stat.variant}
            />
          ))}
        </div>

        {/* IVR Access Banner */}
        <div className="mb-12">
          <IVRAccessBanner />
        </div>

        {/* Themes Overview - Moved here after KPI cards */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">
                {t("nav.themes")}
              </h2>
              <p className="text-sm text-gray-500">
                {language === "fr" && "Explorez les thématiques de votre commune"}
                {language === "de" && "Entdecken Sie die Themen Ihrer Gemeinde"}
                {language === "en" && "Explore your community's themes"}
              </p>
            </div>
            <Link
              to="/themes"
              className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors group"
            >
              <span>
                {language === "fr" && "Voir tous"}
                {language === "de" && "Alle anzeigen"}
                {language === "en" && "View all"}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {themes?.slice(0, 8).map((theme) => {
              // Calculate real process count
              let consultationBytheme = consultations?.filter((consultation) => parseInt(consultation.themeId) === parseInt(theme.id)).length;
              let petitionBytheme = petitions?.filter((petition) => parseInt(petition.themeId) === parseInt(theme.id)).length;
              let voteBytheme = votes?.filter((vote) => parseInt(vote.themeId) === parseInt(theme.id)).length;
              let assembliesByTheme = assemblies?.filter((assembly) => parseInt(assembly.themeId) === parseInt(theme.id)).length;
              let youthParticipationByTheme = youthPolls?.filter((youthPoll) => parseInt(youthPoll.themeId) === parseInt(theme.id)).length;
              if (youthParticipationByTheme == undefined) {
                youthParticipationByTheme = 0;
              }
              if (consultationBytheme === undefined) {
                consultationBytheme = 0;
              }
              if (petitionBytheme === undefined) {
                petitionBytheme = 0;
              }
              if (voteBytheme === undefined) {
                voteBytheme = 0;
              }
              if (assembliesByTheme === undefined) {
                assembliesByTheme = 0;
              }
              const processCount = consultationBytheme + petitionBytheme + voteBytheme + assembliesByTheme + youthParticipationByTheme;


              // Map icon string to component if needed, or use a default if it's a string
              // For now assuming theme.icon is a string/emoji or we need a proper icon mapper.
              // The original code used {theme.icon} which implies it's a string/node.

              return (
                <Link
                  key={theme.id}
                  to={`/themes/${theme.id}`}
                  className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md bg-white group"
                  style={{
                    borderLeftWidth: "4px",
                    borderLeftColor: theme.colorHex || theme.color || "#3b82f6", // Fallback color
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{theme.icon}</span>
                    <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {tLocal(theme.name)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">
                      {processCount}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      {language === 'fr' && 'processus'}
                      {language === 'de' && 'Prozesse'}
                      {language === 'en' && 'processes'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Processus en cours */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">
                {language === "fr" && "Processus en cours"}
                {language === "de" && "Laufende Prozesse"}
                {language === "en" && "Ongoing Processes"}
              </h2>
              <p className="text-sm text-gray-500">
                {language === "fr" && "Participez aux dispositifs actifs"}
                {language === "de" && "Beteiligen Sie sich an aktiven Prozessen"}
                {language === "en" && "Participate in active processes"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/consultations" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-l-4 border-l-blue-500 hover:border-l-blue-600">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <Badge className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors">
                      {consultations?.filter((consultation) => consultation.status === 'OPEN')?.length || 0} {language === "fr" && "actives"}
                      {language === "de" && "aktiv"}
                      {language === "en" && "active"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {t("nav.consultations")}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Donnez votre avis sur les projets locaux"}
                    {language === "de" && "Geben Sie Ihre Meinung zu lokalen Projekten ab"}
                    {language === "en" && "Share your opinion on local projects"}
                  </p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    <span>
                      {language === "fr" && "Participer"}
                      {language === "de" && "Teilnehmen"}
                      {language === "en" && "Participate"}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/petitions" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-l-4 border-l-green-500 hover:border-l-green-600">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                      {petitions?.length || 0} {language === "fr" && "ouvertes"}
                      {language === "de" && "offen"}
                      {language === "en" && "open"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {t("nav.petitions")}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Signez ou créez une pétition citoyenne"}
                    {language === "de" && "Unterschreiben oder erstellen Sie eine Petition"}
                    {language === "en" && "Sign or create a citizen petition"}
                  </p>
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <span>
                      {language === "fr" && "Signer"}
                      {language === "de" && "Unterschreiben"}
                      {language === "en" && "Sign"}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/votes" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-l-4 border-l-purple-500 hover:border-l-purple-600">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <Vote className="w-6 h-6 text-purple-600" />
                    </div>
                    <Badge className="bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-colors">
                      {votes?.filter((vote) => vote.status === 'OPEN')?.length || 0} {language === "fr" && "en cours"}
                      {language === "de" && "laufend"}
                      {language === "en" && "ongoing"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {language === "fr" && "Votes & Référendums"}
                    {language === "de" && "Abstimmungen & Referenden"}
                    {language === "en" && "Votes & Referendums"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Votez sur les décisions importantes"}
                    {language === "de" && "Stimmen Sie über wichtige Entscheidungen ab"}
                    {language === "en" && "Vote on important decisions"}
                  </p>
                  <div className="flex items-center text-purple-600 text-sm font-medium">
                    <span>
                      {language === "fr" && "Voter"}
                      {language === "de" && "Abstimmen"}
                      {language === "en" && "Vote"}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/signalements" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-l-4 border-l-red-500 hover:border-l-red-600">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <Badge className="bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100 transition-colors">
                      {/* Calculate active signalements (submitted + in_progress + under_review) */}
                      {(signalementStats?.byStatus?.SUBMITTED || 0) + (signalementStats?.byStatus?.IN_PROGRESS || 0) + (signalementStats?.byStatus?.UNDER_REVIEW || 0)} {language === "fr" && "actifs"}
                      {language === "de" && "aktiv"}
                      {language === "en" && "active"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {language === "fr" && "Signalements citoyens"}
                    {language === "de" && "Bürgermeldungen"}
                    {language === "en" && "Citizen Reports"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Signalez les problèmes de votre commune"}
                    {language === "de" && "Melden Sie Probleme in Ihrer Gemeinde"}
                    {language === "en" && "Report issues in your community"}
                  </p>
                  <div className="flex items-center text-red-600 text-sm font-medium">
                    <span>
                      {language === "fr" && "Signaler"}
                      {language === "de" && "Melden"}
                      {language === "en" && "Report"}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Legislative Consultations - NEW */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">
                {t("nav.legislativeConsultations")}
              </h2>
              <p className="text-sm text-gray-500">
                {language === "fr" && "Annotez et commentez les projets de loi article par article"}
                {language === "de" && "Kommentieren Sie Gesetzesentwürfe Artikel für Artikel"}
                {language === "en" && "Annotate and comment on bills article by article"}
              </p>
            </div>
            <Link
              to="/legislative-consultations"
              className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors group"
            >
              <span>
                {language === "fr" && "Voir toutes"}
                {language === "de" && "Alle anzeigen"}
                {language === "en" && "View all"}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legislativeConsultations?.slice(0, 2).map((item) => (
              <Link key={item.id} to={`/legislative-consultations/${item.id}`}>
                <Card className={`h-full hover:shadow-lg transition-shadow border-l-4 ${item.textType === 'law' ? 'border-l-indigo-500' : 'border-l-purple-500'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors">
                        <Scale className="w-3 h-3 mr-1" />
                        {language === "fr" && (item.textType === 'law' ? "Projet de loi" : "Règlement")}
                        {language === "de" && (item.textType === 'law' ? "Gesetzentwurf" : "Verordnung")}
                        {language === "en" && (item.textType === 'law' ? "Bill" : "Regulation")}
                      </Badge>
                      <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                        <Clock className="w-3 h-3 mr-1" />
                        {getDaysLeft(item.endDate)} {language === "fr" && "jours restants"}
                        {language === "de" && "Tage übrig"}
                        {language === "en" && "days left"}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {tLocal(item.title)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {tLocal(item.description)}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{item.stats?.totalArticles || 0} {language === "fr" ? "articles" : language === "de" ? "Artikel" : "articles"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{item.stats?.totalAnnotations || 0} {language === "fr" ? "annotations" : language === "de" ? "Anmerkungen" : "annotations"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{item.stats?.totalParticipants || 0}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Assemblées citoyennes - New Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">
                {language === "fr" && "Assemblées citoyennes"}
                {language === "de" && "Bürgerversammlungen"}
                {language === "en" && "Citizens' Assemblies"}
              </h2>
              <p className="text-sm text-gray-500">
                {language === "fr" && "Délibérations citoyennes sur les grands enjeux"}
                {language === "de" && "Bürgerberatungen zu wichtigen Themen"}
                {language === "en" && "Citizen deliberations on major issues"}
              </p>
            </div>
            <Link
              to="/assemblies"
              className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors group"
            >
              <span>
                {language === "fr" && "Voir toutes"}
                {language === "de" && "Alle anzeigen"}
                {language === "en" && "View all"}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assemblies?.slice(0, 3).map((assembly) => {
              const meetingDate = assembly.nextMeeting?.date ? new Date(assembly.nextMeeting.date) : null;

              return (
                <Link key={assembly.id} to={`/assemblies/${assembly.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        {meetingDate && (
                          <Badge className="bg-teal-50 text-teal-600 border border-teal-200 hover:bg-teal-100 transition-colors">
                            <Clock className="w-3 h-3 mr-1" />
                            {language === "fr" && "Prochaine session"}
                            {language === "de" && "Nächste Sitzung"}
                            {language === "en" && "Next session"}
                          </Badge>
                        )}
                        {assembly.theme && (
                          <Badge
                            className={`bg-${getThemeBaseColor(assembly.theme.color)}-50 text-${getThemeBaseColor(assembly.theme.color)}-600 border border-${getThemeBaseColor(assembly.theme.color)}-200 hover:bg-${getThemeBaseColor(assembly.theme.color)}-100 transition-colors`}
                            style={{
                              color: assembly.theme.colorHex,
                              backgroundColor: `${assembly.theme.colorHex}10`,
                              borderColor: `${assembly.theme.colorHex}40`
                            }}
                          >
                            {tLocal(assembly.theme.name)}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {tLocal(assembly.name)}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {tLocal(assembly.description)}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <UserCheck className="w-4 h-4" />
                          <span>{assembly.totalMembers} {language === "fr" ? "membres" : language === "de" ? "Mitglieder" : "members"}</span>
                        </div>
                        {meetingDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{format(meetingDate, "d MMM")}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Concertations */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">
                {language === "fr" && "Concertations actives"}
                {language === "de" && "Aktive Konsultationen"}
                {language === "en" && "Active Consultations"}
              </h2>
              <p className="text-sm text-gray-500">
                {language === "fr" && "Contribuez aux projets en cours de votre commune"}
                {language === "de" && "Tragen Sie zu laufenden Projekten Ihrer Gemeinde bei"}
                {language === "en" && "Contribute to your community's ongoing projects"}
              </p>
            </div>
            <Link
              to="/consultations"
              className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors group"
            >
              <span>
                {language === "fr" && "Voir toutes"}
                {language === "de" && "Alle anzeigen"}
                {language === "en" && "View all"}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {consultations?.slice(0, 2).map((consultation) => (
              <Link key={consultation.id} to={`/consultations/${consultation.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                        <Clock className="w-3 h-3 mr-1" />
                        {getDaysLeft(consultation.endDate)} {language === "fr" && "jours restants"}
                        {language === "de" && "Tage übrig"}
                        {language === "en" && "days left"}
                      </Badge>
                      {consultation.theme && (
                        <Badge
                          className={`bg-${getThemeBaseColor(consultation.theme.color)}-50 text-${getThemeBaseColor(consultation.theme.color)}-600 border border-${getThemeBaseColor(consultation.theme.color)}-200 hover:bg-${getThemeBaseColor(consultation.theme.color)}-100 transition-colors`}
                          style={{
                            color: consultation.theme.colorHex,
                            backgroundColor: `${consultation.theme.colorHex}10`,
                            borderColor: `${consultation.theme.colorHex}40`
                          }}
                        >
                          {tLocal(consultation.theme.name)}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {tLocal(consultation.title)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {tLocal(consultation.description)}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{consultation.totalParticipants || 0} {language === "fr" ? "participants" : language === "de" ? "Teilnehmer" : "participants"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{consultation.totalComments || 0} {language === "fr" ? "contributions" : language === "de" ? "Beiträge" : "contributions"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Pétitions populaires */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">
                {language === "fr" && "Pétitions populaires"}
                {language === "de" && "Beliebte Petitionen"}
                {language === "en" && "Popular Petitions"}
              </h2>
              <p className="text-sm text-gray-500">
                {language === "fr" && "Soutenez les initiatives citoyennes"}
                {language === "de" && "Unterstützen Sie Bürgerinitiativen"}
                {language === "en" && "Support citizen initiatives"}
              </p>
            </div>
            <Link
              to="/petitions"
              className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors group"
            >
              <span>
                {language === "fr" && "Voir toutes"}
                {language === "de" && "Alle anzeigen"}
                {language === "en" && "View all"}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {petitions?.slice(0, 3).map((petition) => (
              <Link key={petition.id} to={`/petitions/${petition.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {petition.status === 'OPEN' && (
                        <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {language === "fr" && "En tendance"}
                          {language === "de" && "Im Trend"}
                          {language === "en" && "Trending"}
                        </Badge>
                      )}
                      {petition.theme && (
                        <Badge
                          className={`bg-${getThemeBaseColor(petition.theme.color)}-50 text-${getThemeBaseColor(petition.theme.color)}-600 border border-${getThemeBaseColor(petition.theme.color)}-200 hover:bg-${getThemeBaseColor(petition.theme.color)}-100 transition-colors`}
                          style={{
                            color: petition.theme.colorHex,
                            backgroundColor: `${petition.theme.colorHex}10`,
                            borderColor: `${petition.theme.colorHex}40`
                          }}
                        >
                          {tLocal(petition.theme.name)}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {tLocal(petition.title)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {tLocal(petition.description)}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {language === "fr" && "Signatures"}
                          {language === "de" && "Unterschriften"}
                          {language === "en" && "Signatures"}
                        </span>
                        <span className="font-semibold text-gray-900">{petition.currentSignatures.toLocaleString()} / {petition.targetSignatures.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(petition.progressPercentage, 100)}%` }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Votes & Référendums */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-gray-900">
              {language === "fr" && "Votes & Référendums"}
              {language === "de" && "Abstimmungen & Referenden"}
              {language === "en" && "Votes & Referendums"}
            </h2>
            <Link
              to="/votes"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              {language === "fr" && "Voir tous"}
              {language === "de" && "Alle anzeigen"}
              {language === "en" && "View all"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {votes?.slice(0, 2).map((vote) => (
              <Link key={vote.id} to={`/votes/${vote.id}`}>
                <Card className={`h-full hover:shadow-lg transition-shadow border-l-4 ${vote.type === 'referendum' ? 'border-l-purple-500' : 'border-l-blue-500'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors">
                        <Clock className="w-3 h-3 mr-1" />
                        {language === "fr" && `Se termine dans ${getDaysLeft(vote.endDate)} jours`}
                        {language === "de" && `Endet in ${getDaysLeft(vote.endDate)} Tagen`}
                        {language === "en" && `Ends in ${getDaysLeft(vote.endDate)} days`}
                      </Badge>
                      <Badge className="bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-colors">
                        {language === "fr" && (vote.type === 'referendum' ? "Référendum" : "Sondage")}
                        {language === "de" && (vote.type === 'referendum' ? "Referendum" : "Umfrage")}
                        {language === "en" && (vote.type === 'referendum' ? "Referendum" : "Poll")}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {tLocal(vote.title)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {tLocal(vote.description)}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <Users className="w-4 h-4 inline mr-1" />
                        {vote.stats?.totalVotes?.toLocaleString() || 0} {language === "fr" ? "votes" : language === "de" ? "Stimmen" : "votes"}
                      </div>
                      <Button size="sm" className={vote.type === 'referendum' ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700"}>
                        {language === "fr" && (vote.hasVoted ? "Voir résultats" : "Voter maintenant")}
                        {language === "de" && (vote.hasVoted ? "Ergebnisse ansehen" : "Jetzt abstimmen")}
                        {language === "en" && (vote.hasVoted ? "View results" : "Vote now")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Conférences à venir */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-gray-900">
              {language === "fr" && "Conférences à venir"}
              {language === "de" && "Kommende Konferenzen"}
              {language === "en" && "Upcoming Conferences"}
            </h2>
            <Link
              to="/conferences"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              {language === "fr" && "Voir toutes"}
              {language === "de" && "Alle anzeigen"}
              {language === "en" && "View all"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {conferences?.slice(0, 3).map((conference) => {
              const date = new Date(conference.startDate);

              return (
                <Link key={conference.id} to={`/conferences/${conference.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-900">{format(date, "d MMM yyyy")}</div>
                          <div className="text-gray-500">{format(date, "HH:mm")}</div>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {tLocal(conference.title)}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {tLocal(conference.description)}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Mic className="w-4 h-4" />
                        <span>{conference.speakers?.length || 0} {language === "fr" ? "intervenants" : language === "de" ? "Redner" : "speakers"}</span>
                      </div>
                      {conference.status === 'registration_open' && (
                        <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                          {language === "fr" && "Inscriptions ouvertes"}
                          {language === "de" && "Anmeldung offen"}
                          {language === "en" && "Registration open"}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Youth Space - Espace Jeunesse */}
        {youthPolls && youthPolls.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl text-gray-900 mb-1 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  {language === "fr" && "Espace Jeunesse"}
                  {language === "de" && "Jugendraum"}
                  {language === "en" && "Youth Space"}
                </h2>
                <p className="text-sm text-gray-500">
                  {language === "fr" && "Participe aux micro-sondages et gagne des points !"}
                  {language === "de" && "Nimm an Mikro-Umfragen teil und sammle Punkte!"}
                  {language === "en" && "Participate in micro-polls and earn points!"}
                </p>
              </div>
              <Link
                to="/youth-space"
                className="text-sm text-gray-600 hover:text-purple-600 flex items-center gap-1.5 transition-colors group"
              >
                <span>
                  {language === "fr" && "Voir tout"}
                  {language === "de" && "Alle anzeigen"}
                  {language === "en" && "View all"}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-xl p-6 mb-6 border border-purple-100">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === "fr" && "🎯 Fais entendre ta voix !"}
                    {language === "de" && "🎯 Lass deine Stimme hören!"}
                    {language === "en" && "🎯 Make your voice heard!"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === "fr" && `${youthPolls?.length || 0} sondages actifs • ${youthPolls?.reduce((acc, poll) => acc + poll.totalResponses, 0) || 0} réponses`}
                    {language === "de" && `${youthPolls?.length || 0} aktive Umfragen • ${youthPolls?.reduce((acc, poll) => acc + poll.totalResponses, 0) || 0} Antworten`}
                    {language === "en" && `${youthPolls?.length || 0} active polls • ${youthPolls?.reduce((acc, poll) => acc + poll.totalResponses, 0) || 0} responses`}
                  </p>
                </div>
                <Link to="/youth-space">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    {language === "fr" && "Participer maintenant"}
                    {language === "de" && "Jetzt teilnehmen"}
                    {language === "en" && "Participate now"}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {youthPolls.slice(0, 3).map((poll) => (
                <Link key={poll.id} to={`/youth-space/${poll.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-purple-500 overflow-hidden">
                    {poll.imageUrl && (
                      <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-pink-100">
                        <img
                          src={poll.imageUrl}
                          alt={typeof poll.title === 'string' ? poll.title : poll.title.fr}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {typeof poll.title === 'string' ? poll.title : tLocal(poll.title)}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {typeof poll.description === 'string' ? poll.description : tLocal(poll.description)}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{poll.estimatedDuration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{poll.totalResponses}</span>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-600">
                          <Sparkles className="w-3 h-3" />
                          <span className="font-medium">{poll.gamificationPoints} pts</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action - Propose an Idea */}
        <Card className="mt-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-none shadow-lg">
          <CardContent className="py-12 px-6 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-6">
              <Lightbulb className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl mb-4 text-gray-900">
              {language === "fr" &&
                "Vous avez une idée pour votre commune ?"}
              {language === "de" &&
                "Sie haben eine Idee für Ihre Gemeinde?"}
              {language === "en" &&
                "Do you have an idea for your community?"}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {language === "fr" &&
                "Partagez vos propositions pour améliorer la vie locale. Chaque idée compte et peut faire la différence !"}
              {language === "de" &&
                "Teilen Sie Ihre Vorschläge zur Verbesserung des lokalen Lebens. Jede Idee zählt und kann den Unterschied machen!"}
              {language === "en" &&
                "Share your proposals to improve local life. Every idea counts and can make a difference!"}
            </p>
            <Button
              onClick={() => {
                if (!isLoggedIn) {
                  setAuthModalOpen(true);
                } else {
                  navigate('/propose-idea');
                }
              }}
              size="lg"
              className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6"
            >
              <Lightbulb className="w-5 h-5" />
              {language === "fr" && "Proposer une idée"}
              {language === "de" && "Eine Idee vorschlagen"}
              {language === "en" && "Propose an idea"}
            </Button>
            {/* Login requirement note */}
            <p className="mt-4 text-sm text-gray-500">
              {language === "fr" && "Connexion requise pour soumettre une idée."}
              {language === "de" && "Anmeldung erforderlich, um eine Idee einzureichen."}
              {language === "en" && "Login required to submit an idea."}
            </p>
          </CardContent>
        </Card>
        {/* Auth Modal */}
        <AuthModal
          open={authModalOpen}
          onOpenChange={setAuthModalOpen}
        />
      </PageLayout>
    </div>
  );
}