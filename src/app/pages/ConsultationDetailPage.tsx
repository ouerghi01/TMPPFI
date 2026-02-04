import React, { useEffect, useState } from 'react';
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
import { getCommentsByConsultation, getCommentReplies } from '../../api/comments';
import apiClient from '@/client';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from '../components/AuthModal';

interface Comment {
  userId: string | undefined;
  id: string;
  author: string;
  date: string;
  content: string;
  likes: number;
  replyCount?: number;
  parentId?: string | null;
}



export function ConsultationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { language, t, tLocal } = useLanguage();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasParticipated, setHasParticipated] = useState(false);

  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [hasSupported, setHasSupported] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const { user, isLoggedIn } = useAuth();
  const { data: consultation_v1, isLoading, error } = useConsultation(id || '');
  const [consultation, setConsultation] = useState<any | null>(null);
  useEffect(() => {
    setConsultation(consultation_v1);
  }, [consultation_v1, id]);
  const { data: theme_use } = useTheme(consultation?.themeId || '');
  const [theme, setTheme] = useState<any | null>(null);
  useEffect(() => {
    setTheme(theme_use);
  }, [theme_use]);
  useEffect(() => {
    const fetchComments = async () => {
      const data = await getCommentsByConsultation(id || '');
      setComments(data);
    };
    const computeDisabled = async () => {
      if (!isLoggedIn) {
        setHasParticipated(true);
        return;
      }

      const alreadyParticipating = await check_participe_inConsultation(id || '');
      setHasParticipated(alreadyParticipating);
    };

    computeDisabled();
    fetchComments();
  }, [id, consultation]);
  // Check if debate is active
  const isDebateActive = consultation?.status === 'OPEN' || consultation?.status === 'UPCOMING';

  // Show loading state
  if (isLoading || error || !consultation || !theme) {
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

    const comment: any = {
      moduleType: "CONSULTATION",
      moduleId: id,
      parentId: null,
      content: newComment,
    };
    const submitComment = async () => {
      try {
        const response = await apiClient.post('/comments', comment);
        if (response.status === 201) {
          const comment_data = response.data;
          setComments([comment_data, ...comments]);
          setNewComment('');
          toast.success(
            language === 'fr' ? 'Commentaire publié !' :
              language === 'de' ? 'Kommentar veröffentlicht!' :
                'Comment posted!'
          );
        } else {
          toast.error(
            language === 'fr' ? 'Une erreur est survenue lors de la publication de votre commentaire' :
              language === 'de' ? 'Ein Fehler ist aufgetreten, Ihr commentaire konnte pas être publié' :
                'An error occurred while posting your comment'
          );
        }
      } catch (error) {
        toast.error(
          language === 'fr' ? 'Une erreur est survenue lors de la publication de votre commentaire' :
            language === 'de' ? 'Ein Fehler ist aufgetreten, Ihr commentaire konnte pas être publié' :
              'An error occurred while posting your comment'
        );
      }
    };

    submitComment();
  };

  const handleEditComment = (commentId: string) => {
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
      setEditingCommentId(commentId);
      setEditingContent(comment.content);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingContent.trim()) return;
    const formData = {
      content: editingContent,

    };
    const response = await apiClient.put(`/comments/${editingCommentId}`, formData);
    if (response.status === 200) {
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
    } else {
      toast.error(
        language === 'fr' ? 'Une erreur est survenue lors de la mise à jour de votre commentaire' :
          language === 'de' ? 'Ein Fehler ist aufgetreten, Ihr Kommentar konnte nicht aktualisiert werden' :
            'An error occurred while updating your comment'
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleDeleteComment = async (commentId: string) => {
    const response = await apiClient.delete(`/comments/${commentId}`);
    if (response.status === 204) {
      const updatedComments = comments.filter(comment => comment.id !== commentId);
      setComments(updatedComments);
      toast.success(
        language === 'fr' ? 'Commentaire supprimé !' :
          language === 'de' ? 'Kommentar gelöscht!' :
            'Comment deleted!'
      );
    } else {
      toast.error(
        language === 'fr' ? 'Une erreur est survenue lors de la suppression de votre commentaire' :
          language === 'de' ? 'Ein Fehler ist aufgetreten, Ihr Kommentar konnte nicht gelöscht werden' :
            'An error occurred while deleting your comment'
      );
    }
  };

  const getTypeLabel = () => {
    if (!consultation) return '';
    const labels = {
      public_meeting: { fr: 'Rencontre', de: 'Treffen', en: 'Meeting' },
      online_debate: { fr: 'Débat', de: 'Debatte', en: 'Debate' },
      citizen_proposal: { fr: 'Proposition', de: 'Vorschlag', en: 'Proposal' },
      PUBLIC_MEETING: { fr: 'Rencontre', de: 'Treffen', en: 'Meeting' },
      ONLINE_DEBATE: { fr: 'Débat', de: 'Debatte', en: 'Debate' },
      CITIZEN_PROPOSAL: { fr: 'Proposition', de: 'Vorschlag', en: 'Proposal' },
      legislative: { fr: 'Proposition', de: 'Vorschlag', en: 'Proposal' }
    };
    return labels[consultation.type as keyof typeof labels]?.[language] || '';
  };

  const handleLikeComment = async (commentId: string) => {
    const updatedComment = await apiClient.post(`/comments/${commentId}/like`);
    if (updatedComment.status === 200 && updatedComment.data) {
      const updatedComments = comments.map(comment =>
        comment.id === commentId ? { ...comment, likes: updatedComment.data.likes } : comment
      );
      setComments(updatedComments);
    }
    toast.success(
      language === 'fr' ? 'Commentaire aimé !' :
        language === 'de' ? 'Kommentar geliked!' :
          'Comment liked!'
    );
  };

  async function check_participe_inConsultation(id: string): Promise<boolean> {
    const response = await apiClient.post(`/consultations/${id}/has-participated`)
    if (response.status === 200) {
      return response.data
    } else {
      return false
    }
  }

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
                    <p className="font-medium">{consultation.totalParticipants}</p>
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
                {consultation?.totalComments !== undefined && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Heart className="w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">
                        {language === 'fr' && 'Contributions'}
                        {language === 'de' && 'Beiträge'}
                        {language === 'en' && 'Contributions'}
                      </p>
                      <p className="font-medium">{comments.length}</p>
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
                <Button onClick={() => handleSubmitComment()} disabled={!newComment.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  {language === 'fr' && 'Publier'}
                  {language === 'de' && 'Veröffentlichen'}
                  {language === 'en' && 'Post'}
                </Button>
              </div>

              {/* Comments List */}
              <div className="space-y-4 pt-4 border-t">
                {comments
                  .filter(c => !c.parentId)
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((comment) => (
                    <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <CommentItem
                        comment={comment}
                        user={user}
                        language={language}
                        isDebateActive={isDebateActive}
                        editingCommentId={editingCommentId}
                        editingContent={editingContent}
                        setEditingContent={setEditingContent}
                        handleSaveEdit={handleSaveEdit}
                        handleCancelEdit={handleCancelEdit}
                        handleEditComment={handleEditComment}
                        handleDeleteComment={handleDeleteComment}
                        handleLikeComment={handleLikeComment}
                        consultationId={id}
                      />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <AuthModal
          open={authModalOpen}
          onOpenChange={setAuthModalOpen}
        />
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
              {consultation.status === 'OPEN' && (
                <Button

                  onMouseEnter={() => {
                    if (!isLoggedIn) {
                      setAuthModalOpen(true);
                      return;
                    }
                  }}
                  onClick={() => {
                    if (!isLoggedIn) {
                      setAuthModalOpen(true);
                      return;
                    }

                    if (hasParticipated) {
                      return;
                    }

                    const participateCall = async () => {
                      try {
                        const response = await apiClient.post(
                          `/consultations/${consultation.id}/participate`
                        );

                        toast.success(
                          language === 'fr'
                            ? 'Vous êtes inscrit à la consultation'
                            : language === 'de'
                              ? 'Sie haben sich für die Konsultation angemeldet'
                              : 'You have registered for the consultation'
                        );

                        setConsultation(response.data);
                      } catch (e) {
                        toast.error(
                          language === 'fr'
                            ? 'Vous êtes déjà inscrit à la consultation'
                            : language === 'de'
                              ? 'Sie haben sich bereits für die Konsultation angemeldet'
                              : 'You are already registered for the consultation'
                        );
                      }
                    };

                    participateCall();
                  }}
                  className="w-full gap-2"
                >
                  <Users className="w-4 h-4" />

                  {/* Button text */}
                  {!isLoggedIn &&
                    (language === 'fr'
                      ? 'Connexion requise'
                      : language === 'de'
                        ? 'Anmeldung erforderlich'
                        : 'Login required')}

                  {isLoggedIn && hasParticipated &&
                    (language === 'fr'
                      ? 'Déjà inscrit'
                      : language === 'de'
                        ? 'Bereits angemeldet'
                        : 'Already registered')}

                  {isLoggedIn && !hasParticipated &&
                    (language === 'fr'
                      ? "S'inscrire"
                      : language === 'de'
                        ? 'Anmelden'
                        : 'Register')}
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

function CommentItem({
  comment,
  user,
  language,
  isDebateActive,
  editingCommentId,
  editingContent,
  setEditingContent,
  handleSaveEdit,
  handleCancelEdit,
  handleEditComment,
  handleDeleteComment,
  handleLikeComment,
  consultationId,
  isReply = false
}: any) {
  const [replies, setReplies] = useState<any[]>([]);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const [showReplies, setShowReplies] = useState(isReply);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const fetchReplies = async () => {
      setIsLoadingReplies(true);
      try {
        const data = await getCommentReplies(comment.id);
        setReplies(data);
      } catch (error) {
        console.error('Failed to load replies');
      } finally {
        setIsLoadingReplies(false);
      }
    };

    if (showReplies) {
      fetchReplies();
    }
  }, [comment.id, showReplies]);

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return;

    const replyData = {
      moduleType: "CONSULTATION",
      moduleId: consultationId,
      parentId: comment.id,
      content: replyText,
    };

    try {
      const response = await apiClient.post(`/comments/${comment.id}/reply`, replyData);
      if (response.status === 201) {
        setReplies([response.data, ...replies]);
        setReplyText('');
        setIsReplying(false);
        setShowReplies(true);
        toast.success(language === 'fr' ? 'Réponse publiée !' : 'Reply posted!');
      }
    } catch (error) {
      toast.error(language === 'fr' ? 'Erreur lors de la réponse' : 'Error posting reply');
    }
  };

  return (
    <div className={isReply ? "ml-8 mt-4 border-l-2 border-gray-100 pl-4" : ""}>
      {editingCommentId === comment.id ? (
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
            rows={2}
            className="w-full"
          />
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handleSaveEdit} disabled={!editingContent.trim()}>
              <Save className="w-4 h-4 mr-1" />
              {language === 'fr' ? 'Enregistrer' : 'Save'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleCancelEdit}>
              <X className="w-4 h-4 mr-1" />
              {language === 'fr' ? 'Annuler' : 'Cancel'}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-medium text-gray-900">{comment.author}</p>
              <p className="text-sm text-gray-500">
                {new Date(comment.date).toLocaleDateString(language)}
              </p>
            </div>
            <Button onClick={() => handleLikeComment(comment.id)} variant="ghost" size="sm" className="gap-1">
              <ThumbsUp className="w-4 h-4" />
              {comment.likes}
            </Button>
          </div>
          <p className="text-gray-700 mb-2">{comment.content}</p>

          <div className="flex items-center gap-4">
            {isDebateActive && (
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-blue-600 gap-1 h-8"
                onClick={() => setIsReplying(!isReplying)}
              >
                <MessageSquare className="w-4 h-4" />
                {language === 'fr' ? 'Répondre' : 'Reply'}
              </Button>
            )}

            {comment.userId === user?.userId && isDebateActive && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-blue-600 hover:text-blue-700 h-8"
                  onClick={() => handleEditComment(comment.id)}
                >
                  <Edit2 className="w-4 h-4" />
                  {language === 'fr' ? 'Modifier' : 'Edit'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-red-600 hover:text-red-700 h-8"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  <Trash2 className="w-4 h-4" />
                  {language === 'fr' ? 'Supprimer' : 'Delete'}
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:bg-blue-50 gap-1 h-8 ml-auto"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? (
                language === 'fr' ? 'Masquer les réponses' : 'Hide replies'
              ) : (
                language === 'fr' ? 'Voir les réponses' : 'View replies'
              )}
              {(comment.replyCount !== undefined ? comment.replyCount : replies.length) > 0 &&
                ` (${comment.replyCount !== undefined ? comment.replyCount : replies.length})`}
            </Button>
          </div>

          {isReplying && (
            <div className="mt-4 space-y-3">
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={language === 'fr' ? 'Votre réponse...' : 'Your reply...'}
                rows={2}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSubmitReply} disabled={!replyText.trim()}>
                  {language === 'fr' ? 'Répondre' : 'Reply'}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsReplying(false)}>
                  {language === 'fr' ? 'Annuler' : 'Cancel'}
                </Button>
              </div>
            </div>
          )}

          {showReplies && (
            <div className="space-y-4">
              {isLoadingReplies && replies.length === 0 ? (
                <p className="text-xs text-gray-400 mt-2 ml-8">Chargement...</p>
              ) : (
                replies
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      user={user}
                      language={language}
                      isDebateActive={isDebateActive}
                      editingCommentId={editingCommentId}
                      editingContent={editingContent}
                      setEditingContent={setEditingContent}
                      handleSaveEdit={handleSaveEdit}
                      handleCancelEdit={handleCancelEdit}
                      handleEditComment={handleEditComment}
                      handleDeleteComment={handleDeleteComment}
                      handleLikeComment={handleLikeComment}
                      consultationId={consultationId}
                      isReply={true}
                    />
                  ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
