import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useConsultation, useTheme } from '../hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { ThemeTag } from '../components/ThemeTag';
import { StatusBadge } from '../components/StatusBadge';
import { 
  Calendar, 
  MapPin, 
  Users, 
  ArrowLeft, 
  MessageSquare, 
  Heart,
  Send,
  ThumbsUp,
  Share2,
  Edit2,
  Trash2,
  Save,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface Comment {
  id: string;
  author: string;
  date: string;
  content: string;
  likes: number;
}

const mockComments: Comment[] = [
  {
    id: '1',
    author: 'Marie Dubois',
    date: '2024-12-20',
    content: 'Excellente initiative ! Je suis totalement favorable à ce projet. Il est temps d\'agir pour notre environnement local.',
    likes: 12
  },
  {
    id: '2',
    author: 'Pierre Martin',
    date: '2024-12-19',
    content: 'Je pense qu\'il faudrait aussi considérer l\'impact sur les commerces locaux. Avez-vous prévu des consultations avec les commerçants ?',
    likes: 8
  },
  {
    id: '3',
    author: 'Sophie Laurent',
    date: '2024-12-18',
    content: 'Super projet ! J\'aimerais proposer d\'ajouter également des espaces de jeux pour enfants.',
    likes: 15
  }
];

export function ConsultationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { language, t, tLocal } = useLanguage();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [hasSupported, setHasSupported] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  // Fetch consultation using React Query
  const { data: consultation, isLoading, error } = useConsultation(id || '');
  
  // Fetch theme data
  const { data: theme } = useTheme(consultation?.themeId || '');

  // Check if debate is active
  const isDebateActive = consultation?.status === 'open' || consultation?.status === 'upcoming';

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-600">
            {language === 'fr' && 'Chargement...'}
            {language === 'de' && 'Wird geladen...'}
            {language === 'en' && 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  // Show error or not found state
  if (error || !consultation || !theme) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl mb-4 text-gray-900">
            {language === 'fr' && 'Concertation non trouvée'}
            {language === 'de' && 'Konsultation nicht gefunden'}
            {language === 'en' && 'Consultation not found'}
          </h1>
          <Button onClick={() => navigate('/consultations')}>
            {language === 'fr' && 'Retour aux concertations'}
            {language === 'de' && 'Zurück zu Konsultationen'}
            {language === 'en' && 'Back to consultations'}
          </Button>
        </div>
      </div>
    );
  }

  const handleSupport = () => {
    setHasSupported(!hasSupported);
    toast.success(
      hasSupported
        ? language === 'fr' ? 'Support retiré' : language === 'de' ? 'Unterstützung entfernt' : 'Support removed'
        : language === 'fr' ? 'Merci pour votre soutien !' : language === 'de' ? 'Danke für Ihre Unterstützung!' : 'Thank you for your support!'
    );
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Vous',
      date: new Date().toISOString().split('T')[0],
      content: newComment,
      likes: 0
    };

    setComments([comment, ...comments]);
    setNewComment('');
    toast.success(
      language === 'fr' ? 'Commentaire publié !' : 
      language === 'de' ? 'Kommentar veröffentlicht!' : 
      'Comment posted!'
    );
  };

  const handleEditComment = (commentId: string) => {
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
      setEditingCommentId(commentId);
      setEditingContent(comment.content);
    }
  };

  const handleSaveEdit = () => {
    if (!editingContent.trim()) return;

    const updatedComments = comments.map(comment => 
      comment.id === editingCommentId ? { ...comment, content: editingContent } : comment
    );

    setComments(updatedComments);
    setEditingCommentId(null);
    setEditingContent('');
    toast.success(
      language === 'fr' ? 'Commentaire mis à jour !' : 
      language === 'de' ? 'Kommentar aktualisiert!' : 
      'Comment updated!'
    );
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleDeleteComment = (commentId: string) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
    toast.success(
      language === 'fr' ? 'Commentaire supprimé !' : 
      language === 'de' ? 'Kommentar gelöscht!' : 
      'Comment deleted!'
    );
  };

  const getTypeLabel = () => {
    if (!consultation) return '';
    const labels = {
      public_meeting: { fr: 'Rencontre', de: 'Treffen', en: 'Meeting' },
      online_debate: { fr: 'Débat', de: 'Debatte', en: 'Debate' },
      citizen_proposal: { fr: 'Proposition', de: 'Vorschlag', en: 'Proposal' }
    };
    return labels[consultation.type]?.[language] || '';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/consultations')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {language === 'fr' && 'Retour aux concertations'}
        {language === 'de' && 'Zurück zu Konsultationen'}
        {language === 'en' && 'Back to consultations'}
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{getTypeLabel()}</Badge>
                    <StatusBadge status={consultation.status} />
                  </div>
                  <CardTitle className="text-3xl mb-2">{tLocal(consultation.title)}</CardTitle>
                  <ThemeTag themeId={consultation.themeId} />
                </div>
              </div>
              <CardDescription className="text-base">
                {tLocal(consultation.description)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500">
                      {language === 'fr' && 'Date'}
                      {language === 'de' && 'Datum'}
                      {language === 'en' && 'Date'}
                    </p>
                    <p className="font-medium">{new Date(consultation.startDate).toLocaleDateString(language)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500">
                      {language === 'fr' && 'Participants'}
                      {language === 'de' && 'Teilnehmer'}
                      {language === 'en' && 'Participants'}
                    </p>
                    <p className="font-medium">{consultation.registeredParticipants}</p>
                  </div>
                </div>
                {consultation.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">
                        {language === 'fr' && 'Lieu'}
                        {language === 'de' && 'Ort'}
                        {language === 'en' && 'Location'}
                      </p>
                      <p className="font-medium">{consultation.location.name}</p>
                    </div>
                  </div>
                )}
                {consultation.stats?.totalComments !== undefined && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Heart className="w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">
                        {language === 'fr' && 'Contributions'}
                        {language === 'de' && 'Beiträge'}
                        {language === 'en' && 'Contributions'}
                      </p>
                      <p className="font-medium">{consultation.stats.totalComments + (hasSupported ? 1 : 0)}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                {language === 'fr' && 'Commentaires'}
                {language === 'de' && 'Kommentare'}
                {language === 'en' && 'Comments'}
                <Badge variant="secondary">{comments.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* New Comment */}
              <div className="space-y-3">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={
                    language === 'fr' ? 'Partagez votre avis...' :
                    language === 'de' ? 'Teilen Sie Ihre Meinung...' :
                    'Share your thoughts...'
                  }
                  rows={3}
                />
                <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  {language === 'fr' && 'Publier'}
                  {language === 'de' && 'Veröffentlichen'}
                  {language === 'en' && 'Post'}
                </Button>
              </div>

              {/* Comments List */}
              <div className="space-y-4 pt-4 border-t">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0">
                    {editingCommentId === comment.id ? (
                      // Edit Mode
                      <div className="space-y-3">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{comment.author}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(comment.date).toLocaleDateString(language)}
                            </p>
                          </div>
                        </div>
                        <Textarea
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          rows={3}
                          className="w-full"
                        />
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={handleSaveEdit}
                            disabled={!editingContent.trim()}
                            className="gap-1"
                          >
                            <Save className="w-4 h-4" />
                            {language === 'fr' && 'Enregistrer'}
                            {language === 'de' && 'Speichern'}
                            {language === 'en' && 'Save'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancelEdit}
                            className="gap-1"
                          >
                            <X className="w-4 h-4" />
                            {language === 'fr' && 'Annuler'}
                            {language === 'de' && 'Abbrechen'}
                            {language === 'en' && 'Cancel'}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // Display Mode
                      <>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{comment.author}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(comment.date).toLocaleDateString(language)}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {comment.likes}
                          </Button>
                        </div>
                        <p className="text-gray-700 mb-2">{comment.content}</p>
                        
                        {/* Edit and Delete buttons - only for own comments and active debates */}
                        {comment.author === 'Vous' && isDebateActive && (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-blue-600 hover:text-blue-700"
                              onClick={() => handleEditComment(comment.id)}
                            >
                              <Edit2 className="w-4 h-4" />
                              {language === 'fr' && 'Modifier'}
                              {language === 'de' && 'Bearbeiten'}
                              {language === 'en' && 'Edit'}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                              {language === 'fr' && 'Supprimer'}
                              {language === 'de' && 'Löschen'}
                              {language === 'en' && 'Delete'}
                            </Button>
                          </div>
                        )}
                        
                        {/* Info message if debate is closed */}
                        {comment.author === 'Vous' && !isDebateActive && (
                          <p className="text-xs text-gray-500 italic mt-2">
                            {language === 'fr' && 'La concertation est terminée, vous ne pouvez plus modifier ce commentaire.'}
                            {language === 'de' && 'Die Konsultation ist beendet, Sie können diesen Kommentar nicht mehr bearbeiten.'}
                            {language === 'en' && 'The consultation is closed, you can no longer edit this comment.'}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'fr' && 'Actions'}
                {language === 'de' && 'Aktionen'}
                {language === 'en' && 'Actions'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {consultation.type === 'citizen_proposal' && (
                <Button 
                  onClick={handleSupport} 
                  variant={hasSupported ? 'secondary' : 'default'}
                  className="w-full gap-2"
                >
                  <Heart className={`w-4 h-4 ${hasSupported ? 'fill-current' : ''}`} />
                  {hasSupported 
                    ? (language === 'fr' ? 'Soutien retiré' : language === 'de' ? 'Unterstützt' : 'Supported')
                    : (language === 'fr' ? 'Soutenir' : language === 'de' ? 'Unterstützen' : 'Support')
                  }
                </Button>
              )}
              {consultation.type === 'public_meeting' && consultation.status === 'upcoming' && (
                <Button className="w-full gap-2">
                  <Users className="w-4 h-4" />
                  {language === 'fr' && 'S\'inscrire'}
                  {language === 'de' && 'Anmelden'}
                  {language === 'en' && 'Register'}
                </Button>
              )}
              <Button variant="outline" className="w-full gap-2">
                <Share2 className="w-4 h-4" />
                {language === 'fr' && 'Partager'}
                {language === 'de' && 'Teilen'}
                {language === 'en' && 'Share'}
              </Button>
            </CardContent>
          </Card>

          {/* Theme Info */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'fr' && 'Thématique'}
                {language === 'de' && 'Thema'}
                {language === 'en' && 'Theme'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="p-4 rounded-lg flex items-center gap-3"
                style={{ backgroundColor: `${theme.color}20` }}
              >
                <span className="text-2xl">{theme.icon}</span>
                <div>
                  <p className="font-medium" style={{ color: theme.color }}>
                    {tLocal(theme.name)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {language === 'fr' && 'Découvrez tous les projets liés à ce thème'}
                    {language === 'de' && 'Entdecken Sie alle Projekte zu diesem Thema'}
                    {language === 'en' && 'Discover all projects related to this theme'}
                  </p>
                </div>
              </div>
              <Link to={`/themes/${theme.id}`}>
                <Button variant="ghost" className="w-full mt-3">
                  {language === 'fr' && 'Voir tous les projets'}
                  {language === 'de' && 'Alle Projekte anzeigen'}
                  {language === 'en' && 'View all projects'}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}