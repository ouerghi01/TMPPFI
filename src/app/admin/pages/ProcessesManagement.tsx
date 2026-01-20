import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
  Layers,
  Plus,
  Search,
  Calendar,
  Users,
  Edit,
  Eye,
  Trash2,
  MoreHorizontal,
  FileText,
  Clock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { EditProcessDialog } from '../components/dialogs/EditProcessDialog';
import { ManagePhasesDialog } from '../components/dialogs/ManagePhasesDialog';
import { DeleteProcessDialog } from '../components/dialogs/DeleteProcessDialog';

// Mock data
const mockProcesses = [
  {
    id: 1,
    title: 'Plan climat communal 2030',
    status: 'active',
    phase: 'consultation',
    startDate: '2026-01-01',
    endDate: '2026-06-30',
    participants: 342,
    themes: ['environnement', 'urbanisme']
  },
  {
    id: 2,
    title: 'Aménagement centre-ville',
    status: 'active',
    phase: 'proposal',
    startDate: '2026-01-15',
    endDate: '2026-04-15',
    participants: 156,
    themes: ['urbanisme', 'mobilité']
  },
  {
    id: 3,
    title: 'Budget participatif 2027',
    status: 'draft',
    phase: 'preparation',
    startDate: '2026-03-01',
    endDate: '2026-12-31',
    participants: 0,
    themes: ['gouvernance', 'économie']
  },
  {
    id: 4,
    title: 'Mobilité douce',
    status: 'closed',
    phase: 'results',
    startDate: '2025-09-01',
    endDate: '2025-12-31',
    participants: 478,
    themes: ['mobilité', 'environnement']
  }
];

export function ProcessesManagement() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  // New dialog states
  const [editProcessOpen, setEditProcessOpen] = useState(false);
  const [managePhasesOpen, setManagePhasesOpen] = useState(false);
  const [deleteProcessOpen, setDeleteProcessOpen] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; color: string }> = {
      active: { label: 'Actif', color: 'bg-green-100 text-green-700 border-green-200' },
      draft: { label: 'Brouillon', color: 'bg-gray-100 text-gray-700 border-gray-200' },
      closed: { label: 'Terminé', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      upcoming: { label: 'À venir', color: 'bg-orange-100 text-orange-700 border-orange-200' }
    };

    const variant = variants[status] || variants.draft;
    return (
      <Badge className={`${variant.color} border`}>
        {variant.label}
      </Badge>
    );
  };

  const getPhaseBadge = (phase: string) => {
    const phases: Record<string, string> = {
      preparation: 'Préparation',
      consultation: 'Consultation',
      proposal: 'Propositions',
      vote: 'Vote',
      results: 'Résultats'
    };

    return (
      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
        {phases[phase] || phase}
      </Badge>
    );
  };

  const filteredProcesses = mockProcesses.filter(process => {
    const matchesSearch = process.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || process.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEditProcess = (process: any) => {
    setSelectedProcess(process);
    setEditProcessOpen(true);
  };

  const handleManagePhases = (process: any) => {
    setSelectedProcess(process);
    setManagePhasesOpen(true);
  };

  const handleDeleteProcess = (process: any) => {
    setSelectedProcess(process);
    setDeleteProcessOpen(true);
  };

  const handleCreateProcess = () => {
    setCreateDialogOpen(false);
    // TODO: Implement process creation
  };

  const handleEditSubmit = (data: any) => {
    console.log('Edit process:', data);
    // TODO: Implement process update
  };

  const handlePhasesSubmit = (data: any) => {
    console.log('Update phases:', data);
    // TODO: Implement phases update
  };

  const handleDeleteConfirm = (options: any) => {
    console.log('Delete process with options:', options);
    // TODO: Implement process deletion
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {language === 'fr' ? 'Gestion des processus participatifs' :
             language === 'de' ? 'Verwaltung partizipativer Prozesse' :
             'Participatory Processes Management'}
          </h1>
          <p className="text-gray-600">
            {language === 'fr' ? 'Créez et gérez les processus de démocratie participative' :
             language === 'de' ? 'Erstellen und verwalten Sie partizipative Demokratieprozesse' :
             'Create and manage participatory democracy processes'}
          </p>
        </div>
        
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {language === 'fr' ? 'Nouveau processus' :
               language === 'de' ? 'Neuer Prozess' :
               'New Process'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Créer un nouveau processus</DialogTitle>
              <DialogDescription>
                Configurez les paramètres du processus participatif
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre du processus *</Label>
                <Input id="title" placeholder="Ex: Plan climat 2030" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez les objectifs du processus..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Date de début</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">Date de fin</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="themes">Thèmes associés</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner les thèmes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="environnement">Environnement</SelectItem>
                    <SelectItem value="urbanisme">Urbanisme</SelectItem>
                    <SelectItem value="mobilite">Mobilité</SelectItem>
                    <SelectItem value="education">Éducation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateProcess}>
                Créer le processus
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Processus actifs</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Layers className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En brouillon</p>
                <p className="text-2xl font-semibold text-gray-900">8</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Terminés</p>
                <p className="text-2xl font-semibold text-gray-900">23</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total participants</p>
                <p className="text-2xl font-semibold text-gray-900">976</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un processus..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actifs</SelectItem>
                <SelectItem value="draft">Brouillons</SelectItem>
                <SelectItem value="closed">Terminés</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Processes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des processus ({filteredProcesses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Processus</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Phase</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Thèmes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProcesses.map((process) => (
                  <TableRow key={process.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{process.title}</p>
                        <p className="text-sm text-gray-500">ID: {process.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(process.status)}
                    </TableCell>
                    <TableCell>
                      {getPhaseBadge(process.phase)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(process.startDate).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          → {new Date(process.endDate).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                        <Users className="w-4 h-4 text-gray-400" />
                        {process.participants}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {process.themes.slice(0, 2).map((theme, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Voir les détails
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditProcess(process)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleManagePhases(process)}>
                            <Calendar className="w-4 h-4 mr-2" />
                            Gérer les phases
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProcess(process)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <EditProcessDialog
        open={editProcessOpen}
        onOpenChange={setEditProcessOpen}
        process={selectedProcess}
        onSubmit={handleEditSubmit}
      />
      
      <ManagePhasesDialog
        open={managePhasesOpen}
        onOpenChange={setManagePhasesOpen}
        process={selectedProcess}
        onSubmit={handlePhasesSubmit}
      />
      
      <DeleteProcessDialog
        open={deleteProcessOpen}
        onOpenChange={setDeleteProcessOpen}
        process={selectedProcess}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}