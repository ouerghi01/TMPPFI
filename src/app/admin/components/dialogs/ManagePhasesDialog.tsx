import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Calendar, CheckCircle, Circle, ArrowRight } from 'lucide-react';

interface ManagePhasesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  process: any | null;
  onSubmit?: (data: any) => void;
}

interface Phase {
  id: string;
  name: string;
  nameDE: string;
  nameEN: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isCompleted: boolean;
  order: number;
}

export function ManagePhasesDialog({ open, onOpenChange, process, onSubmit }: ManagePhasesDialogProps) {
  const { language } = useLanguage();
  
  const defaultPhases: Phase[] = [
    {
      id: 'preparation',
      name: 'Préparation',
      nameDE: 'Vorbereitung',
      nameEN: 'Preparation',
      description: 'Planification et configuration du processus',
      startDate: '',
      endDate: '',
      isActive: false,
      isCompleted: false,
      order: 1
    },
    {
      id: 'consultation',
      name: 'Consultation',
      nameDE: 'Konsultation',
      nameEN: 'Consultation',
      description: 'Recueil des avis et commentaires des citoyens',
      startDate: '',
      endDate: '',
      isActive: false,
      isCompleted: false,
      order: 2
    },
    {
      id: 'proposal',
      name: 'Propositions',
      nameDE: 'Vorschläge',
      nameEN: 'Proposals',
      description: 'Soumission de propositions par les citoyens',
      startDate: '',
      endDate: '',
      isActive: false,
      isCompleted: false,
      order: 3
    },
    {
      id: 'vote',
      name: 'Vote',
      nameDE: 'Abstimmung',
      nameEN: 'Vote',
      description: 'Vote des citoyens sur les propositions',
      startDate: '',
      endDate: '',
      isActive: false,
      isCompleted: false,
      order: 4
    },
    {
      id: 'results',
      name: 'Résultats',
      nameDE: 'Ergebnisse',
      nameEN: 'Results',
      description: 'Publication et analyse des résultats',
      startDate: '',
      endDate: '',
      isActive: false,
      isCompleted: false,
      order: 5
    }
  ];

  const [phases, setPhases] = useState<Phase[]>(defaultPhases);

  const handlePhaseChange = (phaseId: string, field: string, value: any) => {
    setPhases(prev => prev.map(phase => 
      phase.id === phaseId ? { ...phase, [field]: value } : phase
    ));
  };

  const handleActivatePhase = (phaseId: string) => {
    setPhases(prev => prev.map(phase => ({
      ...phase,
      isActive: phase.id === phaseId
    })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ processId: process?.id, phases });
    onOpenChange(false);
  };

  if (!process) return null;

  const getPhaseLabel = (phase: Phase) => {
    if (language === 'de') return phase.nameDE;
    if (language === 'en') return phase.nameEN;
    return phase.name;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {language === 'fr' ? 'Gérer les phases du processus' :
             language === 'de' ? 'Prozessphasen verwalten' :
             'Manage Process Phases'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fr' ? `Configuration des phases pour "${process.title}"` :
             language === 'de' ? `Phasenkonfiguration für "${process.title}"` :
             `Configure phases for "${process.title}"`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* Process Info */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-200">{process.title}</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    {language === 'fr' ? 'Période:' :
                     language === 'de' ? 'Zeitraum:' :
                     'Period:'}{' '}
                    {process.startDate && process.endDate ? (
                      <>
                        {new Date(process.startDate).toLocaleDateString('fr-FR')}
                        {' → '}
                        {new Date(process.endDate).toLocaleDateString('fr-FR')}
                      </>
                    ) : (
                      language === 'fr' ? 'Non définie' :
                      language === 'de' ? 'Nicht definiert' :
                      'Not defined'
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Phases List */}
            <div className="space-y-4">
              {phases.map((phase, index) => (
                <div key={phase.id}>
                  <div
                    className={`p-5 border-2 rounded-lg transition-colors ${
                      phase.isActive
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                        : phase.isCompleted
                        ? 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {/* Phase Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          phase.isActive
                            ? 'bg-green-500 text-white'
                            : phase.isCompleted
                            ? 'bg-gray-400 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {phase.isCompleted ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : phase.isActive ? (
                            <Circle className="w-5 h-5 fill-current" />
                          ) : (
                            <span className="font-semibold">{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {getPhaseLabel(phase)}
                            </h3>
                            {phase.isActive && (
                              <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200">
                                {language === 'fr' ? 'En cours' :
                                 language === 'de' ? 'Laufend' :
                                 'Active'}
                              </Badge>
                            )}
                            {phase.isCompleted && (
                              <Badge className="bg-gray-50 text-gray-600 border border-gray-200">
                                {language === 'fr' ? 'Terminée' :
                                 language === 'de' ? 'Abgeschlossen' :
                                 'Completed'}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {phase.description}
                          </p>
                        </div>
                      </div>

                      {/* Phase Actions */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`active-${phase.id}`} className="text-sm cursor-pointer">
                            {language === 'fr' ? 'Activer' :
                             language === 'de' ? 'Aktivieren' :
                             'Activate'}
                          </Label>
                          <Switch
                            id={`active-${phase.id}`}
                            checked={phase.isActive}
                            onCheckedChange={() => handleActivatePhase(phase.id)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phase Dates */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor={`start-${phase.id}`} className="text-sm">
                          {language === 'fr' ? 'Date de début' :
                           language === 'de' ? 'Startdatum' :
                           'Start Date'}
                        </Label>
                        <Input
                          id={`start-${phase.id}`}
                          type="date"
                          value={phase.startDate}
                          onChange={(e) => handlePhaseChange(phase.id, 'startDate', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`end-${phase.id}`} className="text-sm">
                          {language === 'fr' ? 'Date de fin' :
                           language === 'de' ? 'Enddatum' :
                           'End Date'}
                        </Label>
                        <Input
                          id={`end-${phase.id}`}
                          type="date"
                          value={phase.endDate}
                          onChange={(e) => handlePhaseChange(phase.id, 'endDate', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                    </div>

                    {/* Mark as Completed */}
                    <div className="flex items-center gap-2 mt-4 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                      <Switch
                        id={`completed-${phase.id}`}
                        checked={phase.isCompleted}
                        onCheckedChange={(checked) => handlePhaseChange(phase.id, 'isCompleted', checked)}
                      />
                      <Label htmlFor={`completed-${phase.id}`} className="text-sm cursor-pointer">
                        {language === 'fr' ? 'Marquer comme terminée' :
                         language === 'de' ? 'Als abgeschlossen markieren' :
                         'Mark as completed'}
                      </Label>
                    </div>
                  </div>

                  {/* Arrow between phases */}
                  {index < phases.length - 1 && (
                    <div className="flex justify-center py-2">
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Info Box */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                <strong>
                  {language === 'fr' ? 'ℹ️ Important:' :
                   language === 'de' ? 'ℹ️ Wichtig:' :
                   'ℹ️ Important:'}
                </strong>{' '}
                {language === 'fr' ? 
                  'Une seule phase peut être active à la fois. Les citoyens ne peuvent participer qu\'aux phases actives.' :
                 language === 'de' ?
                  'Nur eine Phase kann gleichzeitig aktiv sein. Bürger können nur an aktiven Phasen teilnehmen.' :
                  'Only one phase can be active at a time. Citizens can only participate in active phases.'}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {language === 'fr' ? 'Annuler' :
               language === 'de' ? 'Abbrechen' :
               'Cancel'}
            </Button>
            <Button type="submit">
              {language === 'fr' ? 'Enregistrer les phases' :
               language === 'de' ? 'Phasen speichern' :
               'Save Phases'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}