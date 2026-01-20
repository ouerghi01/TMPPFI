import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { PageBanner } from '@/app/components/PageBanner';
import { PageLayout } from '@/app/components/layout/PageLayout';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { ErrorMessage } from '@/app/components/ErrorMessage';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Label } from '@/app/components/ui/label';
import { Progress } from '@/app/components/ui/progress';
import { useYouthPoll, useRespondToYouthPoll } from '@/app/hooks/useApi';
import { Sparkles, Clock, Users, CheckCircle, ArrowLeft, Eye, Check, X, Circle, Square } from 'lucide-react';
import { toast } from 'sonner';
import type { CreateYouthPollResponseDTO } from '@/app/types';

/**
 * YouthPollDetailPage - Page de détail d'un micro-sondage
 * 
 * Fonctionnalités:
 * - Affichage des questions du sondage
 * - Réponses (choix unique, multiple, rating)
 * - Affichage des résultats après soumission
 * - Gamification avec points
 */
export default function YouthPollDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { language, tLocal } = useLanguage();
  const navigate = useNavigate();

  const { data: poll, isLoading, error } = useYouthPoll(id || '');
  const respondMutation = useRespondToYouthPoll();

  const [responses, setResponses] = useState<Record<string, string[]>>({});
  const [visualMode, setVisualMode] = useState(false);

  // Visual mode icons and colors for options
  const getVisualForOption = (index: number) => {
    const visuals = [
      { icon: Check, color: 'bg-green-500', borderColor: 'border-green-500', textColor: 'text-green-500', emoji: '✓' },
      { icon: X, color: 'bg-red-500', borderColor: 'border-red-500', textColor: 'text-red-500', emoji: '✗' },
      { icon: Circle, color: 'bg-blue-500', borderColor: 'border-blue-500', textColor: 'text-blue-500', emoji: '●' },
      { icon: Square, color: 'bg-purple-500', borderColor: 'border-purple-500', textColor: 'text-purple-500', emoji: '■' },
      { icon: Sparkles, color: 'bg-yellow-500', borderColor: 'border-yellow-500', textColor: 'text-yellow-500', emoji: '⭐' },
    ];
    return visuals[index % visuals.length];
  };

  const handleOptionSelect = (questionId: string, optionId: string, isMultiple: boolean) => {
    if (isMultiple) {
      setResponses(prev => {
        const current = prev[questionId] || [];
        const newSelection = current.includes(optionId)
          ? current.filter(id => id !== optionId)
          : [...current, optionId];
        return { ...prev, [questionId]: newSelection };
      });
    } else {
      setResponses(prev => ({ ...prev, [questionId]: [optionId] }));
    }
  };

  const handleSubmit = async () => {
    if (!poll) return;

    // Validation
    const requiredQuestions = poll.questions.filter(q => q.required);
    const missingResponses = requiredQuestions.filter(q => !responses[q.id] || responses[q.id].length === 0);

    if (missingResponses.length > 0) {
      toast.error(
        language === 'fr' ? 'Veuillez répondre à toutes les questions obligatoires' :
        language === 'de' ? 'Bitte beantworten Sie alle Pflichtfragen' :
        'Please answer all required questions'
      );
      return;
    }

    const responseData: CreateYouthPollResponseDTO = {
      pollId: poll.id,
      responses: Object.entries(responses).map(([questionId, selectedOptions]) => ({
        questionId,
        selectedOptions,
      })),
    };

    try {
      await respondMutation.mutateAsync(responseData);
      toast.success(
        language === 'fr' ? `🎉 Merci ! Tu as gagné ${poll.gamificationPoints} points` :
        language === 'de' ? `🎉 Danke! Du hast ${poll.gamificationPoints} Punkte gewonnen` :
        `🎉 Thanks! You earned ${poll.gamificationPoints} points`
      );
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors de la soumission' :
        language === 'de' ? 'Fehler beim Senden' :
        'Error submitting response'
      );
    }
  };

  if (isLoading) {
    return (
      <div>
        <PageBanner
          title={language === 'fr' ? 'Chargement...' : language === 'de' ? 'Laden...' : 'Loading...'}
          description=""
          gradient="from-purple-600 to-pink-600"
          icon={<Sparkles className="w-12 h-12 text-white" />}
        />
        <PageLayout className="py-8">
          <LoadingSpinner />
        </PageLayout>
      </div>
    );
  }

  if (error || !poll) {
    return (
      <div>
        <PageBanner
          title={language === 'fr' ? 'Erreur' : language === 'de' ? 'Fehler' : 'Error'}
          description=""
          gradient="from-red-600 to-pink-600"
          icon={<Sparkles className="w-12 h-12 text-white" />}
        />
        <PageLayout className="py-8">
          <ErrorMessage 
            message={
              language === 'fr' ? 'Sondage introuvable' :
              language === 'de' ? 'Umfrage nicht gefunden' :
              'Poll not found'
            } 
          />
        </PageLayout>
      </div>
    );
  }

  const hasResponded = poll.hasUserResponded;

  return (
    <div>
      <PageBanner
        title={tLocal(poll.title)}
        description={tLocal(poll.description)}
        gradient="from-purple-600 via-pink-600 to-orange-500"
        icon={<Sparkles className="w-12 h-12 text-white" />}
      />

      <PageLayout className="py-8 max-w-4xl">
        {/* Retour */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/youth-space')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'fr' ? 'Retour aux sondages' :
           language === 'de' ? 'Zurück zu Umfragen' :
           'Back to polls'}
        </Button>

        {/* Info Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{poll.estimatedDuration} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span>
                  {poll.totalResponses} {language === 'fr' ? 'réponses' :
                   language === 'de' ? 'Antworten' :
                   'responses'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-600" />
                <span className="font-semibold text-yellow-700">
                  {poll.gamificationPoints} {language === 'fr' ? 'points' :
                   language === 'de' ? 'Punkte' :
                   'points'}
                </span>
              </div>
              {hasResponded && (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {language === 'fr' ? 'Complété' :
                   language === 'de' ? 'Abgeschlossen' :
                   'Completed'}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Mode Simplifié Toggle - Only show if not responded */}
        {!hasResponded && (
          <Card className="mb-6 border-2 border-pink-200">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-pink-600" />
                    {language === 'fr' && 'Mode d\'affichage'}
                    {language === 'de' && 'Anzeigemodus'}
                    {language === 'en' && 'Display mode'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {visualMode ? (
                      <>
                        {language === 'fr' && '✓ Mode simplifié activé avec symboles et couleurs'}
                        {language === 'de' && '✓ Vereinfachter Modus aktiviert mit Symbolen und Farben'}
                        {language === 'en' && '✓ Simplified mode enabled with symbols and colors'}
                      </>
                    ) : (
                      <>
                        {language === 'fr' && 'Tu ne sais pas encore bien lire ? Active le mode simplifié !'}
                        {language === 'de' && 'Du kannst noch nicht gut lesen? Aktiviere den vereinfachten Modus!'}
                        {language === 'en' && 'Can\'t read well yet? Enable simplified mode!'}
                      </>
                    )}
                  </p>
                </div>
                <Button
                  onClick={() => setVisualMode(!visualMode)}
                  variant={visualMode ? "default" : "outline"}
                  size="lg"
                  className={`gap-2 font-semibold whitespace-nowrap ${visualMode ? 'bg-pink-600 hover:bg-pink-700' : 'border-2 border-pink-600 text-pink-700 hover:bg-pink-50'}`}
                >
                  <Eye className="w-5 h-5" />
                  {visualMode ? (
                    <>
                      {language === 'fr' ? '📝 Mode normal' :
                      language === 'de' ? '📝 Normaler Modus' :
                      '📝 Normal mode'}
                    </>
                  ) : (
                    <>
                      {language === 'fr' ? '🎨 Mode simplifié' :
                      language === 'de' ? '🎨 Vereinfachter Modus' :
                      '🎨 Simplified mode'}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Questions */}
        <div className="space-y-6">
          {poll.questions.map((question, index) => (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle className="text-lg flex items-start justify-between">
                  <span>
                    {index + 1}. {tLocal(question.question)}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {question.type === 'single_choice' && (
                  visualMode ? (
                    // Visual Mode - Simplified with big buttons
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {question.options.map((option, optionIndex) => {
                        const visual = getVisualForOption(optionIndex);
                        const VisualIcon = visual.icon;
                        const isSelected = responses[question.id]?.[0] === option.id;
                        return (
                          <button
                            key={option.id}
                            onClick={() => handleOptionSelect(question.id, option.id, false)}
                            disabled={hasResponded}
                            className={`p-6 rounded-2xl border-4 transition-all transform hover:scale-105 ${
                              isSelected
                                ? `${visual.borderColor} ${visual.color} bg-opacity-10 shadow-xl`
                                : 'border-gray-300 bg-white hover:border-gray-400'
                            } ${hasResponded ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                          >
                            <div className="flex flex-col items-center gap-3">
                              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                                isSelected
                                  ? `${visual.color} text-white`
                                  : `bg-gray-100 ${visual.textColor}`
                              }`}>
                                <VisualIcon className="w-10 h-10 stroke-[3]" />
                              </div>
                              <div className="text-center">
                                <div className={`text-4xl mb-2 ${
                                  isSelected ? visual.textColor : 'text-gray-400'
                                }`}>
                                  {option.emoji || visual.emoji}
                                </div>
                                <span className={`text-lg font-bold block ${
                                  isSelected ? 'text-gray-900' : 'text-gray-700'
                                }`}>
                                  {tLocal(option.text)}
                                </span>
                              </div>
                              {isSelected && (
                                <div className={`mt-2 px-3 py-1 rounded-full ${visual.color} text-white font-semibold text-sm`}>
                                  {language === 'fr' && '✓ Choisi'}
                                  {language === 'de' && '✓ Gewählt'}
                                  {language === 'en' && '✓ Selected'}
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    // Standard Mode
                    <RadioGroup
                      value={responses[question.id]?.[0] || ''}
                      onValueChange={(value) => handleOptionSelect(question.id, value, false)}
                      disabled={hasResponded}
                    >
                      {question.options.map((option, optionIndex) => {
                        const visual = getVisualForOption(optionIndex);
                        return (
                          <div key={option.id} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                              {option.emoji && <span className="mr-2">{option.emoji}</span>}
                              {tLocal(option.text)}
                            </Label>
                            {hasResponded && option.percentage !== undefined && (
                              <div className="flex items-center gap-2">
                                <Progress value={option.percentage} className="w-20 h-2" />
                                <span className="text-sm text-gray-500 min-w-[3rem]">
                                  {Math.round(option.percentage)}%
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </RadioGroup>
                  )
                )}

                {question.type === 'multiple_choice' && (
                  visualMode ? (
                    // Visual Mode - Multiple choice with big buttons
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {question.options.map((option, optionIndex) => {
                        const visual = getVisualForOption(optionIndex);
                        const VisualIcon = visual.icon;
                        const isSelected = responses[question.id]?.includes(option.id);
                        return (
                          <button
                            key={option.id}
                            onClick={() => handleOptionSelect(question.id, option.id, true)}
                            disabled={hasResponded}
                            className={`p-6 rounded-2xl border-4 transition-all transform hover:scale-105 ${
                              isSelected
                                ? `${visual.borderColor} ${visual.color} bg-opacity-10 shadow-xl`
                                : 'border-gray-300 bg-white hover:border-gray-400'
                            } ${hasResponded ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                          >
                            <div className="flex flex-col items-center gap-3">
                              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                                isSelected
                                  ? `${visual.color} text-white`
                                  : `bg-gray-100 ${visual.textColor}`
                              }`}>
                                <VisualIcon className="w-10 h-10 stroke-[3]" />
                              </div>
                              <div className="text-center">
                                <div className={`text-4xl mb-2 ${
                                  isSelected ? visual.textColor : 'text-gray-400'
                                }`}>
                                  {option.emoji || visual.emoji}
                                </div>
                                <span className={`text-lg font-bold block ${
                                  isSelected ? 'text-gray-900' : 'text-gray-700'
                                }`}>
                                  {tLocal(option.text)}
                                </span>
                              </div>
                              {isSelected && (
                                <div className={`mt-2 px-3 py-1 rounded-full ${visual.color} text-white font-semibold text-sm`}>
                                  {language === 'fr' && '✓ Choisi'}
                                  {language === 'de' && '✓ Gewählt'}
                                  {language === 'en' && '✓ Selected'}
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    // Standard Mode
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const visual = getVisualForOption(optionIndex);
                        return (
                          <div key={option.id} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                            <Checkbox
                              id={option.id}
                              checked={responses[question.id]?.includes(option.id) || false}
                              onCheckedChange={() => handleOptionSelect(question.id, option.id, true)}
                              disabled={hasResponded}
                            />
                            <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                              {option.emoji && <span className="mr-2">{option.emoji}</span>}
                              {tLocal(option.text)}
                            </Label>
                            {hasResponded && option.percentage !== undefined && (
                              <div className="flex items-center gap-2">
                                <Progress value={option.percentage} className="w-20 h-2" />
                                <span className="text-sm text-gray-500 min-w-[3rem]">
                                  {Math.round(option.percentage)}%
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )
                )}

                {question.type === 'yes_no' && (
                  visualMode ? (
                    // Visual Mode - Big Yes/No buttons
                    <div className="grid grid-cols-2 gap-6">
                      {question.options.slice(0, 2).map((option, optionIndex) => {
                        const visual = getVisualForOption(optionIndex);
                        const VisualIcon = visual.icon;
                        const isSelected = responses[question.id]?.[0] === option.id;
                        return (
                          <button
                            key={option.id}
                            onClick={() => handleOptionSelect(question.id, option.id, false)}
                            disabled={hasResponded}
                            className={`p-8 rounded-2xl border-4 transition-all transform hover:scale-105 ${
                              isSelected
                                ? `${visual.borderColor} ${visual.color} bg-opacity-10 shadow-xl`
                                : 'border-gray-300 bg-white hover:border-gray-400'
                            } ${hasResponded ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                          >
                            <div className="flex flex-col items-center gap-4">
                              <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
                                isSelected
                                  ? `${visual.color} text-white`
                                  : `bg-gray-100 ${visual.textColor}`
                              }`}>
                                <VisualIcon className="w-12 h-12 stroke-[3]" />
                              </div>
                              <div className="text-center">
                                <div className={`text-5xl mb-3 ${
                                  isSelected ? visual.textColor : 'text-gray-400'
                                }`}>
                                  {option.emoji || visual.emoji}
                                </div>
                                <span className={`text-2xl font-bold block ${
                                  isSelected ? 'text-gray-900' : 'text-gray-700'
                                }`}>
                                  {tLocal(option.text)}
                                </span>
                              </div>
                              {isSelected && (
                                <div className={`mt-2 px-4 py-2 rounded-full ${visual.color} text-white font-semibold`}>
                                  {language === 'fr' && '✓ Choisi'}
                                  {language === 'de' && '✓ Gewählt'}
                                  {language === 'en' && '✓ Selected'}
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    // Standard Mode
                    <RadioGroup
                      value={responses[question.id]?.[0] || ''}
                      onValueChange={(value) => handleOptionSelect(question.id, value, false)}
                      disabled={hasResponded}
                    >
                      {question.options.slice(0, 2).map((option, optionIndex) => {
                        const visual = getVisualForOption(optionIndex);
                        return (
                          <div key={option.id} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                              {option.emoji && <span className="mr-2 text-2xl">{option.emoji}</span>}
                              {tLocal(option.text)}
                            </Label>
                            {hasResponded && option.percentage !== undefined && (
                              <div className="flex items-center gap-2">
                                <Progress value={option.percentage} className="w-20 h-2" />
                                <span className="text-sm text-gray-500 min-w-[3rem]">
                                  {Math.round(option.percentage)}%
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </RadioGroup>
                  )
                )}

                {question.type === 'emoji' && (
                  visualMode ? (
                    // Visual Mode - Big Emoji buttons
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {question.options.map((option, optionIndex) => {
                        const isSelected = responses[question.id]?.[0] === option.id;
                        return (
                          <button
                            key={option.id}
                            onClick={() => handleOptionSelect(question.id, option.id, false)}
                            disabled={hasResponded}
                            className={`p-6 rounded-2xl border-4 transition-all transform hover:scale-105 ${
                              isSelected
                                ? 'border-purple-500 bg-purple-50 shadow-xl'
                                : 'border-gray-300 bg-white hover:border-gray-400'
                            } ${hasResponded ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                          >
                            <div className="flex flex-col items-center gap-3">
                              <div className={`text-6xl ${isSelected ? 'scale-125' : ''} transition-transform`}>
                                {option.emoji}
                              </div>
                              <span className={`text-base font-bold text-center ${
                                isSelected ? 'text-purple-700' : 'text-gray-700'
                              }`}>
                                {tLocal(option.text)}
                              </span>
                              {isSelected && (
                                <div className="mt-2 px-3 py-1 rounded-full bg-purple-600 text-white font-semibold text-sm">
                                  {language === 'fr' && '✓ Choisi'}
                                  {language === 'de' && '✓ Gewählt'}
                                  {language === 'en' && '✓ Selected'}
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    // Standard Mode - Emoji selection
                    <RadioGroup
                      value={responses[question.id]?.[0] || ''}
                      onValueChange={(value) => handleOptionSelect(question.id, value, false)}
                      disabled={hasResponded}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {question.options.map((option) => {
                          const isSelected = responses[question.id]?.[0] === option.id;
                          return (
                            <div 
                              key={option.id} 
                              className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                                isSelected 
                                  ? 'border-purple-500 bg-purple-50' 
                                  : 'border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              <RadioGroupItem value={option.id} id={option.id} />
                              <Label htmlFor={option.id} className="flex-1 cursor-pointer flex items-center gap-3">
                                <span className="text-3xl">{option.emoji}</span>
                                <span className="font-medium">{tLocal(option.text)}</span>
                              </Label>
                              {hasResponded && option.percentage !== undefined && (
                                <div className="flex items-center gap-2">
                                  <Progress value={option.percentage} className="w-20 h-2" />
                                  <span className="text-sm text-gray-500 min-w-[3rem]">
                                    {Math.round(option.percentage)}%
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </RadioGroup>
                  )
                )}

                {question.type === 'rating' && (
                  <div className="space-y-4">
                    <div className="flex justify-center gap-3">
                      {Array.from(
                        { length: (question.maxRating || 5) - (question.minRating || 1) + 1 },
                        (_, i) => (question.minRating || 1) + i
                      ).map((rating) => {
                        const ratingId = `rating_${rating}`;
                        const isSelected = responses[question.id]?.[0] === ratingId;
                        
                        return (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => handleOptionSelect(question.id, ratingId, false)}
                            disabled={hasResponded}
                            className={`w-14 h-14 rounded-full text-2xl font-bold transition-all ${
                              isSelected
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-110 shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                            } ${hasResponded ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                          >
                            {rating}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 px-2">
                      <span>
                        {language === 'fr' ? 'Pas satisfait' : 
                         language === 'de' ? 'Nicht zufrieden' : 
                         'Not satisfied'}
                      </span>
                      <span>
                        {language === 'fr' ? 'Très satisfait' : 
                         language === 'de' ? 'Sehr zufrieden' : 
                         'Very satisfied'}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Submit Button */}
        {!hasResponded && (
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={respondMutation.isPending}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12"
            >
              {respondMutation.isPending ? (
                language === 'fr' ? 'Envoi...' :
                language === 'de' ? 'Senden...' :
                'Submitting...'
              ) : (
                <>
                  {language === 'fr' ? 'Valider mes réponses' :
                   language === 'de' ? 'Antworten absenden' :
                   'Submit answers'}
                  <Sparkles className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </PageLayout>
    </div>
  );
}