import React, { useState } from 'react';
import { Shield, Plus, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Badge } from '../../components/ui/badge';
import { NewThemeDialog, EditThemeDialog, DeleteThemeDialog } from '../components/dialogs/ThemeDialogs';

interface Theme {
  id: string;
  name: string;
  nameDE: string;
  nameEN: string;
  color: string;
  icon: string;
  processCount: number;
  status: 'active' | 'inactive';
}

export function ThemesManagement() {
  const [themes] = useState<Theme[]>([
    {
      id: '1',
      name: 'Environnement & climat',
      nameDE: 'Umwelt & Klima',
      nameEN: 'Environment & climate',
      color: 'green',
      icon: '🌱',
      processCount: 45,
      status: 'active'
    },
    {
      id: '2',
      name: 'Urbanisme & logement',
      nameDE: 'Städtebau & Wohnen',
      nameEN: 'Urban planning & housing',
      color: 'blue',
      icon: '🏢',
      processCount: 32,
      status: 'active'
    },
    {
      id: '3',
      name: 'Mobilité & transport',
      nameDE: 'Mobilität & Verkehr',
      nameEN: 'Mobility & transport',
      color: 'purple',
      icon: '🚇',
      processCount: 28,
      status: 'active'
    },
    {
      id: '4',
      name: 'Éducation & jeunesse',
      nameDE: 'Bildung & Jugend',
      nameEN: 'Education & youth',
      color: 'yellow',
      icon: '📚',
      processCount: 41,
      status: 'active'
    },
    {
      id: '5',
      name: 'Santé',
      nameDE: 'Gesundheit',
      nameEN: 'Health',
      color: 'red',
      icon: '🏥',
      processCount: 19,
      status: 'active'
    },
    {
      id: '6',
      name: 'Culture',
      nameDE: 'Kultur',
      nameEN: 'Culture',
      color: 'pink',
      icon: '🎭',
      processCount: 23,
      status: 'active'
    },
    {
      id: '7',
      name: 'Gouvernance locale',
      nameDE: 'Lokale Governance',
      nameEN: 'Local governance',
      color: 'indigo',
      icon: '🏛️',
      processCount: 15,
      status: 'active'
    },
    {
      id: '8',
      name: 'Économie & emploi',
      nameDE: 'Wirtschaft & Beschäftigung',
      nameEN: 'Economy & employment',
      color: 'amber',
      icon: '💼',
      processCount: 26,
      status: 'active'
    }
  ]);

  // Dialog states
  const [newThemeOpen, setNewThemeOpen] = useState(false);
  const [editThemeOpen, setEditThemeOpen] = useState(false);
  const [deleteThemeOpen, setDeleteThemeOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
      indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
      amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
    };
    return colorMap[color] || colorMap.blue;
  };

  const handleEditTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    setEditThemeOpen(true);
  };

  const handleDeleteTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    setDeleteThemeOpen(true);
  };

  const handleNewThemeSubmit = (data: any) => {
    console.log('New theme:', data);
    // TODO: Implement theme creation
  };

  const handleEditSubmit = (data: any) => {
    console.log('Edit theme:', data);
    // TODO: Implement theme update
  };

  const handleDeleteConfirm = () => {
    console.log('Delete theme:', selectedTheme);
    // TODO: Implement theme deletion
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Gestion des thèmes
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gérer les thématiques transversales de la plateforme
            </p>
          </div>
        </div>
        <Button className="gap-2" onClick={() => setNewThemeOpen(true)}>
          <Plus className="w-4 h-4" />
          Nouveau thème
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total thèmes
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {themes.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Thèmes actifs
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {themes.filter(t => t.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total processus
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {themes.reduce((acc, t) => acc + t.processCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Moyenne/thème
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {Math.round(themes.reduce((acc, t) => acc + t.processCount, 0) / themes.length)}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Themes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des thèmes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border dark:border-gray-700">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Icône</TableHead>
                  <TableHead>Nom (FR)</TableHead>
                  <TableHead>Nom (DE)</TableHead>
                  <TableHead>Nom (EN)</TableHead>
                  <TableHead>Couleur</TableHead>
                  <TableHead className="text-right">Processus</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {themes.map((theme) => (
                  <TableRow key={theme.id}>
                    <TableCell>
                      <span className="text-2xl">{theme.icon}</span>
                    </TableCell>
                    <TableCell className="font-medium">{theme.name}</TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {theme.nameDE}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {theme.nameEN}
                    </TableCell>
                    <TableCell>
                      <Badge className={getColorClass(theme.color)}>
                        {theme.color}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {theme.processCount}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={theme.status === 'active' ? 'default' : 'secondary'}
                      >
                        {theme.status === 'active' ? 'Actif' : 'Inactif'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditTheme(theme)}>
                            <Edit2 className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 dark:text-red-400" onClick={() => handleDeleteTheme(theme)}>
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
      <NewThemeDialog
        open={newThemeOpen}
        onOpenChange={setNewThemeOpen}
        onSubmit={handleNewThemeSubmit}
      />
      
      <EditThemeDialog
        open={editThemeOpen}
        onOpenChange={setEditThemeOpen}
        theme={selectedTheme}
        onSubmit={handleEditSubmit}
      />
      
      <DeleteThemeDialog
        open={deleteThemeOpen}
        onOpenChange={setDeleteThemeOpen}
        theme={selectedTheme}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}