import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { 
  useLegislativeConsultation,
  useCreateAnnotation,
  useVoteOnAnnotation 
} from '@/app/hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Separator } from '@/app/components/ui/separator';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { StatusBadge } from '@/app/components/StatusBadge';
import { ThemeTag } from '@/app/components/ThemeTag';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { 
  ArrowLeft, 
  FileText, 
  Calendar, 
  Users, 
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Send,
  Sparkles,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { toast } from 'sonner';
import type { ArticleDTO, ArticleAnnotationDTO } from '@/app/types';

export function LegislativeConsultationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { language, tLocal } = useLanguage();
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [annotationContent, setAnnotationContent] = useState('');
  const [activeTab, setActiveTab] = useState<'articles' | 'summary'>('articles');

  // Fetch data
  const { data: consultation, isLoading, error } = useLegislativeConsultation(id || '');
  
  // Mutations
  const createAnnotationMutation = useCreateAnnotation();
  const voteOnAnnotationMutation = useVoteOnAnnotation();

  // Select first article by default
  React.useEffect(() => {
    if (consultation?.articles && consultation.articles.length > 0 && !selectedArticleId) {
      setSelectedArticleId(consultation.articles[0].id);
    }
  }, [consultation, selectedArticleId]);

  // Get selected article
  const selectedArticle = consultation?.articles.find(a => a.id === selectedArticleId);

  // Handle annotation submission
  const handleSubmitAnnotation = async () => {
    if (!annotationContent.trim() || !selectedArticleId) {
      toast.error(
        language === 'fr' 
          ? 'Veuillez entrer un commentaire' 
          : language === 'de'
          ? 'Bitte geben Sie einen Kommentar ein'
          : 'Please enter a comment'
      );
      return;
    }

    try {
      await createAnnotationMutation.mutateAsync({
        articleId: selectedArticleId,
        content: annotationContent,
      });
      
      setAnnotationContent('');
      
      toast.success(
        language === 'fr'
          ? 'Annotation ajoutée avec succès'
          : language === 'de'
          ? 'Anmerkung erfolgreich hinzugefügt'
          : 'Annotation added successfully'
      );
    } catch (error) {
      toast.error(
        language === 'fr'
          ? 'Erreur lors de l\'ajout de l\'annotation'
          : language === 'de'
          ? 'Fehler beim Hinzufügen der Anmerkung'
          : 'Error adding annotation'
      );
    }
  };

  // Handle vote on annotation
  const handleVote = async (annotationId: string, voteType: 'upvote' | 'downvote') => {
    try {
      await voteOnAnnotationMutation.mutateAsync({
        annotationId,
        voteType,
      });
    } catch (error) {
      toast.error(
        language === 'fr'
          ? 'Erreur lors du vote'
          : language === 'de'
          ? 'Fehler beim Abstimmen'
          : 'Error voting'
      );
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (error || !consultation) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {language === 'fr' && 'Consultation législative non trouvée'}
            {language === 'de' && 'Gesetzgebungsberatung nicht gefunden'}
            {language === 'en' && 'Legislative consultation not found'}
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Link to="/legislative-consultations">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'fr' && 'Retour'}
              {language === 'de' && 'Zurück'}
              {language === 'en' && 'Back'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getTextTypeLabel = () => {
    const labels = {
      law: { fr: 'Projet de loi', de: 'Gesetzentwurf', en: 'Bill' },
      regulation: { fr: 'Règlement', de: 'Verordnung', en: 'Regulation' },
      decree: { fr: 'Décret', de: 'Dekret', en: 'Decree' },
      ordinance: { fr: 'Ordonnance', de: 'Verordnung', en: 'Ordinance' },
      amendment: { fr: 'Amendement', de: 'Änderungsantrag', en: 'Amendment' },
    };
    return labels[consultation.textType][language];
  };

  const isActive = consultation.status === 'open';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-4">
            <Link to="/legislative-consultations">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'fr' && 'Toutes les consultations'}
                {language === 'de' && 'Alle Beratungen'}
                {language === 'en' && 'All consultations'}
              </Button>
            </Link>
          </div>

          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                  <FileText className="w-3 h-3 mr-1" />
                  {getTextTypeLabel()}
                </Badge>
                {consultation.referenceNumber && (
                  <Badge variant="outline" className="bg-gray-50 text-gray-700">
                    {consultation.referenceNumber}
                  </Badge>
                )}
                <StatusBadge status={consultation.status} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {tLocal(consultation.title)}
              </h1>
              <p className="text-lg text-gray-600">
                {tLocal(consultation.description)}
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(consultation.startDate).toLocaleDateString(language)} - {new Date(consultation.endDate).toLocaleDateString(language)}
              </span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>
                {consultation.stats.totalArticles} {language === 'fr' ? 'articles' : language === 'de' ? 'Artikel' : 'articles'}
              </span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>
                {consultation.stats.totalAnnotations} {language === 'fr' ? 'annotations' : language === 'de' ? 'Anmerkungen' : 'annotations'}
              </span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>
                {consultation.stats.totalParticipants} {language === 'fr' ? 'participants' : language === 'de' ? 'Teilnehmer' : 'participants'}
              </span>
            </div>
          </div>

          {/* Theme */}
          {consultation.themeId && (
            <div className="mt-4">
              <ThemeTag themeId={consultation.themeId} />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'articles' | 'summary')}>
          <TabsList className="mb-6">
            <TabsTrigger value="articles">
              <FileText className="w-4 h-4 mr-2" />
              {language === 'fr' && 'Articles'}
              {language === 'de' && 'Artikel'}
              {language === 'en' && 'Articles'}
            </TabsTrigger>
            {consultation.summary && (
              <TabsTrigger value="summary">
                <Sparkles className="w-4 h-4 mr-2" />
                {language === 'fr' && 'Synthèse IA'}
                {language === 'de' && 'KI-Zusammenfassung'}
                {language === 'en' && 'AI Summary'}
              </TabsTrigger>
            )}
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Article List Sidebar */}
              <div className="lg:col-span-3">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-base">
                      {language === 'fr' && 'Table des matières'}
                      {language === 'de' && 'Inhaltsverzeichnis'}
                      {language === 'en' && 'Table of contents'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-[600px] overflow-y-auto">
                      {consultation.articles.map((article, index) => (
                        <button
                          key={article.id}
                          onClick={() => setSelectedArticleId(article.id)}
                          className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                            selectedArticleId === article.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900">
                                {language === 'fr' && 'Article'} {language === 'de' && 'Artikel'} {language === 'en' && 'Article'} {article.articleNumber}
                              </div>
                              {article.title && (
                                <div className="text-xs text-gray-600 truncate mt-0.5">
                                  {tLocal(article.title)}
                                </div>
                              )}
                            </div>
                            {article.stats.annotationsCount > 0 && (
                              <Badge variant="secondary" className="shrink-0 text-xs">
                                {article.stats.annotationsCount}
                              </Badge>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Article Content */}
              <div className="lg:col-span-9 space-y-6">
                {selectedArticle && (
                  <>
                    {/* Article Text */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <CardTitle>
                              {language === 'fr' && 'Article'} {language === 'de' && 'Artikel'} {language === 'en' && 'Article'} {selectedArticle.articleNumber}
                            </CardTitle>
                            {selectedArticle.title && (
                              <CardDescription className="mt-1">
                                {tLocal(selectedArticle.title)}
                              </CardDescription>
                            )}
                          </div>
                          <Badge variant="outline">
                            {selectedArticle.stats.annotationsCount} {language === 'fr' ? 'annotations' : language === 'de' ? 'Anmerkungen' : 'annotations'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="prose max-w-none">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {tLocal(selectedArticle.content)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Add Annotation Form */}
                    {isActive && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {language === 'fr' && 'Ajouter une annotation'}
                            {language === 'de' && 'Anmerkung hinzufügen'}
                            {language === 'en' && 'Add annotation'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <Textarea
                              placeholder={
                                language === 'fr' 
                                  ? 'Partagez votre point de vue sur cet article...'
                                  : language === 'de'
                                  ? 'Teilen Sie Ihre Meinung zu diesem Artikel...'
                                  : 'Share your thoughts on this article...'
                              }
                              value={annotationContent}
                              onChange={(e) => setAnnotationContent(e.target.value)}
                              rows={4}
                              className="resize-none"
                            />
                            <div className="flex justify-end">
                              <Button 
                                onClick={handleSubmitAnnotation}
                                disabled={createAnnotationMutation.isPending || !annotationContent.trim()}
                              >
                                <Send className="w-4 h-4 mr-2" />
                                {language === 'fr' && 'Publier'}
                                {language === 'de' && 'Veröffentlichen'}
                                {language === 'en' && 'Publish'}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Annotations List */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {language === 'fr' && 'Annotations'}
                          {language === 'de' && 'Anmerkungen'}
                          {language === 'en' && 'Annotations'}
                          <span className="ml-2 text-sm font-normal text-gray-500">
                            ({selectedArticle.annotations.length})
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedArticle.annotations.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>
                              {language === 'fr' && 'Aucune annotation pour le moment'}
                              {language === 'de' && 'Noch keine Anmerkungen'}
                              {language === 'en' && 'No annotations yet'}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {selectedArticle.annotations.map((annotation) => (
                              <AnnotationItem
                                key={annotation.id}
                                annotation={annotation}
                                onVote={handleVote}
                                language={language}
                              />
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          {/* AI Summary Tab */}
          {consultation.summary && (
            <TabsContent value="summary">
              <AISummaryView summary={consultation.summary} language={language} tLocal={tLocal} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}

// Annotation Item Component
interface AnnotationItemProps {
  annotation: ArticleAnnotationDTO;
  onVote: (annotationId: string, voteType: 'upvote' | 'downvote') => void;
  language: 'fr' | 'de' | 'en';
}

function AnnotationItem({ annotation, onVote, language }: AnnotationItemProps) {
  const getStatusBadge = () => {
    if (annotation.status === 'highlighted') {
      return (
        <Badge variant="default" className="bg-amber-100 text-amber-800 border-amber-200">
          <Sparkles className="w-3 h-3 mr-1" />
          {language === 'fr' ? 'Mise en avant' : language === 'de' ? 'Hervorgehoben' : 'Highlighted'}
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
            {annotation.author.firstName[0]}{annotation.author.lastName[0]}
          </div>
          <div>
            <div className="font-medium text-sm text-gray-900">
              {annotation.author.firstName} {annotation.author.lastName}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(annotation.createdAt).toLocaleDateString(language)}
            </div>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      <p className="text-gray-700 text-sm leading-relaxed">{annotation.content}</p>

      <div className="flex items-center gap-4 pt-2">
        <div className="flex items-center gap-2">
          <Button
            variant={annotation.hasUpvoted ? 'default' : 'outline'}
            size="sm"
            onClick={() => onVote(annotation.id, 'upvote')}
            className="h-8"
          >
            <ThumbsUp className="w-3.5 h-3.5 mr-1" />
            {annotation.votes.upvotes}
          </Button>
          <Button
            variant={annotation.hasDownvoted ? 'default' : 'outline'}
            size="sm"
            onClick={() => onVote(annotation.id, 'downvote')}
            className="h-8"
          >
            <ThumbsDown className="w-3.5 h-3.5 mr-1" />
            {annotation.votes.downvotes}
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          {language === 'fr' && 'Score:'} {language === 'de' && 'Bewertung:'} {language === 'en' && 'Score:'} {annotation.votes.score}
        </div>
      </div>

      {/* Replies */}
      {annotation.replies && annotation.replies.length > 0 && (
        <div className="ml-8 mt-3 space-y-3 border-l-2 border-gray-200 pl-4">
          {annotation.replies.map((reply) => (
            <AnnotationItem key={reply.id} annotation={reply} onVote={onVote} language={language} />
          ))}
        </div>
      )}
    </div>
  );
}

// AI Summary View Component
interface AISummaryViewProps {
  summary: any;
  language: 'fr' | 'de' | 'en';
  tLocal: (str: any) => string;
}

function AISummaryView({ summary, language, tLocal }: AISummaryViewProps) {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'negative':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      default:
        return <Minus className="w-5 h-5 text-gray-600" />;
    }
  };

  const getControversyBadge = (level: 'low' | 'medium' | 'high') => {
    const config = {
      low: { color: 'bg-green-100 text-green-800 border-green-200', label: { fr: 'Faible', de: 'Niedrig', en: 'Low' } },
      medium: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: { fr: 'Moyen', de: 'Mittel', en: 'Medium' } },
      high: { color: 'bg-red-100 text-red-800 border-red-200', label: { fr: 'Élevé', de: 'Hoch', en: 'High' } },
    };
    return <Badge variant="outline" className={config[level].color}>{config[level].label[language]}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            {language === 'fr' && 'Vue d\'ensemble'}
            {language === 'de' && 'Überblick'}
            {language === 'en' && 'Overview'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{tLocal(summary.overview)}</p>
        </CardContent>
      </Card>

      {/* Participation Insights */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'fr' && 'Aperçu de la participation'}
            {language === 'de' && 'Beteiligungsübersicht'}
            {language === 'en' && 'Participation insights'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {getSentimentIcon(summary.participationInsights.sentimentTrend)}
              <span className="font-medium">
                {language === 'fr' && 'Tendance:'} {language === 'de' && 'Trend:'} {language === 'en' && 'Trend:'}
              </span>
            </div>
            <Badge variant="outline">
              {summary.participationInsights.sentimentTrend}
            </Badge>
          </div>
          <div>
            <h4 className="font-medium mb-2">
              {language === 'fr' && 'Thèmes récurrents:'}
              {language === 'de' && 'Wiederkehrende Themen:'}
              {language === 'en' && 'Common themes:'}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {summary.participationInsights.commonThemes.map((theme: any, index: number) => (
                <li key={index}>{tLocal(theme)}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Key Articles */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'fr' && 'Articles clés'}
            {language === 'de' && 'Schlüsselartikel'}
            {language === 'en' && 'Key articles'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {summary.keyArticles.map((article: any) => (
              <div key={article.articleId} className="border border-gray-200 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">
                    {language === 'fr' && 'Article'} {language === 'de' && 'Artikel'} {language === 'en' && 'Article'} {article.articleNumber}
                  </h4>
                  {getControversyBadge(article.controversyLevel)}
                </div>
                <p className="text-sm text-gray-700">{tLocal(article.summary)}</p>
                {article.topConcerns.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-600">
                      {language === 'fr' && 'Principales préoccupations:'}
                      {language === 'de' && 'Hauptanliegen:'}
                      {language === 'en' && 'Top concerns:'}
                    </span>
                    <ul className="mt-1 space-y-1">
                      {article.topConcerns.map((concern: any, index: number) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-indigo-600">•</span>
                          {tLocal(concern)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {summary.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'fr' && 'Recommandations'}
              {language === 'de' && 'Empfehlungen'}
              {language === 'en' && 'Recommendations'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {summary.recommendations.map((rec: any, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 flex-1">{tLocal(rec)}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
