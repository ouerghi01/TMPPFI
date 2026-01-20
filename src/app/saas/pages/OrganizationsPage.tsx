import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'motion/react';
import {
  Building2,
  Plus,
  Search,
  Edit,
  Eye,
  Ban,
  Check,
  Clock,
  Filter,
  Download,
  X,
  Mail,
  Phone,
  MapPin,
  Users as UsersIcon,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { OrganizationWizard } from '../components/OrganizationWizard';
import { toast } from 'sonner';

interface Organization {
  id: string;
  name: string;
  slug: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  usersCount: number;
  processesCount: number;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
}

export function OrganizationsPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [wizardOpen, setWizardOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: '1',
      name: 'Ville de Bruxelles',
      slug: 'bruxelles',
      status: 'active',
      createdAt: '2024-01-15',
      usersCount: 2543,
      processesCount: 24,
      email: 'contact@bruxelles.be',
      phone: '+32 2 279 22 11',
      address: 'Grand-Place, 1000 Bruxelles',
      description: 'Ville de Bruxelles - Administration communale'
    },
    {
      id: '2',
      name: 'Commune d\'Ixelles',
      slug: 'ixelles',
      status: 'active',
      createdAt: '2024-02-20',
      usersCount: 1876,
      processesCount: 18,
      email: 'info@ixelles.be',
      phone: '+32 2 515 60 00',
      address: 'Chaussée d\'Ixelles 168, 1050 Ixelles',
      description: 'Commune d\'Ixelles - Services communaux'
    },
    {
      id: '3',
      name: 'Région Wallonne',
      slug: 'wallonie',
      status: 'active',
      createdAt: '2024-03-10',
      usersCount: 4521,
      processesCount: 36,
      email: 'contact@wallonie.be',
      phone: '+32 81 33 21 11',
      address: 'Place Joséphine Charlotte 2, 5100 Namur',
      description: 'Gouvernement de la Région Wallonne'
    },
    {
      id: '4',
      name: 'Canton de Genève',
      slug: 'geneve',
      status: 'active',
      createdAt: '2024-04-05',
      usersCount: 3210,
      processesCount: 28,
      email: 'info@ge.ch',
      phone: '+41 22 327 11 11',
      address: 'Rue de l\'Hôtel-de-Ville 2, 1204 Genève',
      description: 'République et Canton de Genève'
    },
    {
      id: '5',
      name: 'Ville de Lausanne',
      slug: 'lausanne',
      status: 'pending',
      createdAt: '2025-01-08',
      usersCount: 0,
      processesCount: 0,
      email: 'info@lausanne.ch',
      phone: '+41 21 315 11 11',
      address: 'Place de la Palud 2, 1003 Lausanne',
      description: 'Ville de Lausanne - En cours d\'intégration'
    }
  ]);

  const getStatusBadge = (status: Organization['status']) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100">
            <Check className="w-3 h-3 mr-1" />
            {language === 'fr' ? 'Active' : language === 'de' ? 'Aktiv' : 'Active'}
          </Badge>
        );
      
      case 'inactive':
        return (
          <Badge className="bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100">
            <Ban className="w-3 h-3 mr-1" />
            {language === 'fr' ? 'Inactive' : language === 'de' ? 'Inaktiv' : 'Inactive'}
          </Badge>
        );
      
      case 'pending':
        return (
          <Badge className="bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100">
            <Clock className="w-3 h-3 mr-1" />
            {language === 'fr' ? 'En attente' : language === 'de' ? 'Ausstehend' : 'Pending'}
          </Badge>
        );
    }
  };

  const handleViewOrganization = (org: Organization) => {
    setSelectedOrg(org);
    setViewDialogOpen(true);
  };

  const handleEditOrganization = (org: Organization) => {
    setSelectedOrg(org);
    setEditDialogOpen(true);
  };

  const handleUpdateOrganization = () => {
    if (!selectedOrg) return;
    
    setOrganizations(prev => prev.map(org => 
      org.id === selectedOrg.id ? selectedOrg : org
    ));
    
    toast.success(
      language === 'fr' 
        ? 'Organisation mise à jour avec succès' 
        : language === 'de' 
        ? 'Organisation erfolgreich aktualisiert' 
        : 'Organization updated successfully'
    );
    setEditDialogOpen(false);
  };

  const handleChangeStatus = (org: Organization) => {
    setSelectedOrg(org);
    setStatusDialogOpen(true);
  };

  const confirmStatusChange = () => {
    if (!selectedOrg) return;
    
    const newStatus = selectedOrg.status === 'active' ? 'inactive' : 'active';
    
    setOrganizations(prev => prev.map(org => 
      org.id === selectedOrg.id ? { ...org, status: newStatus } : org
    ));
    
    toast.success(
      language === 'fr' 
        ? `Organisation ${newStatus === 'active' ? 'activée' : 'suspendue'} avec succès` 
        : language === 'de' 
        ? `Organisation erfolgreich ${newStatus === 'active' ? 'aktiviert' : 'gesperrt'}` 
        : `Organization ${newStatus === 'active' ? 'activated' : 'suspended'} successfully`
    );
    setStatusDialogOpen(false);
  };

  const handleExport = () => {
    toast.success(
      language === 'fr' 
        ? 'Export en cours...' 
        : language === 'de' 
        ? 'Export läuft...' 
        : 'Exporting...'
    );
  };

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || org.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent">
              {language === 'fr' ? 'Gestion des organisations' : language === 'de' ? 'Organisationsverwaltung' : 'Organizations Management'}
            </h1>
            <p className="text-gray-600 mt-2">
              {language === 'fr' 
                ? 'Créez et gérez les organisations de la plateforme' 
                : language === 'de' 
                ? 'Erstellen und verwalten Sie Plattformorganisationen' 
                : 'Create and manage platform organizations'}
            </p>
          </div>
          <Dialog open={wizardOpen} onOpenChange={setWizardOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Nouvelle organisation' : language === 'de' ? 'Neue Organisation' : 'New Organization'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader className="sr-only">
                <DialogTitle>
                  {language === 'fr' ? 'Créer une nouvelle organisation' : language === 'de' ? 'Neue Organisation erstellen' : 'Create New Organization'}
                </DialogTitle>
                <DialogDescription>
                  {language === 'fr' ? 'Assistant de création d\'organisation' : language === 'de' ? 'Organisations-Erstellungsassistent' : 'Organization creation wizard'}
                </DialogDescription>
              </DialogHeader>
              <OrganizationWizard onComplete={() => setWizardOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            title: language === 'fr' ? 'Total' : language === 'de' ? 'Gesamt' : 'Total',
            value: organizations.length,
            color: 'blue'
          },
          {
            title: language === 'fr' ? 'Actives' : language === 'de' ? 'Aktiv' : 'Active',
            value: organizations.filter(o => o.status === 'active').length,
            color: 'emerald'
          },
          {
            title: language === 'fr' ? 'En attente' : language === 'de' ? 'Ausstehend' : 'Pending',
            value: organizations.filter(o => o.status === 'pending').length,
            color: 'amber'
          },
          {
            title: language === 'fr' ? 'Utilisateurs' : language === 'de' ? 'Benutzer' : 'Users',
            value: organizations.reduce((acc, org) => acc + org.usersCount, 0).toLocaleString(),
            color: 'purple'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-500 bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder={language === 'fr' ? 'Rechercher une organisation...' : language === 'de' ? 'Organisation suchen...' : 'Search organization...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      {language === 'fr' ? 'Filtres' : language === 'de' ? 'Filter' : 'Filters'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                      <DialogTitle>
                        {language === 'fr' ? 'Filtrer les organisations' : language === 'de' ? 'Organisationen filtern' : 'Filter Organizations'}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>{language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}</Label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">{language === 'fr' ? 'Tous' : language === 'de' ? 'Alle' : 'All'}</SelectItem>
                            <SelectItem value="active">{language === 'fr' ? 'Active' : language === 'de' ? 'Aktiv' : 'Active'}</SelectItem>
                            <SelectItem value="inactive">{language === 'fr' ? 'Inactive' : language === 'de' ? 'Inaktiv' : 'Inactive'}</SelectItem>
                            <SelectItem value="pending">{language === 'fr' ? 'En attente' : language === 'de' ? 'Ausstehend' : 'Pending'}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {
                        setStatusFilter('all');
                        setFilterDialogOpen(false);
                      }}>
                        {language === 'fr' ? 'Réinitialiser' : language === 'de' ? 'Zurücksetzen' : 'Reset'}
                      </Button>
                      <Button onClick={() => setFilterDialogOpen(false)}>
                        {language === 'fr' ? 'Appliquer' : language === 'de' ? 'Anwenden' : 'Apply'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Exporter' : language === 'de' ? 'Exportieren' : 'Export'}
              </Button>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Organizations Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'fr' ? 'Liste des organisations' : language === 'de' ? 'Organisationsliste' : 'Organizations List'}
            </CardTitle>
            <CardDescription>
              {filteredOrganizations.length} {language === 'fr' ? 'organisations trouvées' : language === 'de' ? 'Organisationen gefunden' : 'organizations found'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'fr' ? 'Nom' : language === 'de' ? 'Name' : 'Name'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Slug' : 'Slug'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Utilisateurs' : language === 'de' ? 'Benutzer' : 'Users'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Processus' : language === 'de' ? 'Prozesse' : 'Processes'}</TableHead>
                  <TableHead>{language === 'fr' ? 'Date de création' : language === 'de' ? 'Erstellungsdatum' : 'Created At'}</TableHead>
                  <TableHead className="text-right">{language === 'fr' ? 'Actions' : language === 'de' ? 'Aktionen' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrganizations.map((org, index) => (
                  <motion.tr
                    key={org.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group hover:bg-blue-50/50"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <span>{org.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">{org.slug}</code>
                    </TableCell>
                    <TableCell>{getStatusBadge(org.status)}</TableCell>
                    <TableCell>{org.usersCount.toLocaleString()}</TableCell>
                    <TableCell>{org.processesCount}</TableCell>
                    <TableCell>{new Date(org.createdAt).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewOrganization(org)}
                          title={language === 'fr' ? 'Voir les détails' : language === 'de' ? 'Details anzeigen' : 'View details'}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditOrganization(org)}
                          title={language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleChangeStatus(org)}
                          title={org.status === 'active' 
                            ? (language === 'fr' ? 'Suspendre' : language === 'de' ? 'Sperren' : 'Suspend')
                            : (language === 'fr' ? 'Activer' : language === 'de' ? 'Aktivieren' : 'Activate')
                          }
                        >
                          <Ban className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* View Organization Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              {selectedOrg?.name}
            </DialogTitle>
            <DialogDescription>
              {language === 'fr' ? 'Détails de l\'organisation' : language === 'de' ? 'Organisationsdetails' : 'Organization details'}
            </DialogDescription>
          </DialogHeader>
          {selectedOrg && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    {language === 'fr' ? 'Slug' : 'Slug'}
                  </p>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">{selectedOrg.slug}</code>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    {language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}
                  </p>
                  {getStatusBadge(selectedOrg.status)}
                </div>
              </div>

              {selectedOrg.description && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    {language === 'fr' ? 'Description' : language === 'de' ? 'Beschreibung' : 'Description'}
                  </p>
                  <p className="text-sm text-gray-900">{selectedOrg.description}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedOrg.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-sm text-gray-900">{selectedOrg.email}</p>
                    </div>
                  </div>
                )}
                {selectedOrg.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {language === 'fr' ? 'Téléphone' : language === 'de' ? 'Telefon' : 'Phone'}
                      </p>
                      <p className="text-sm text-gray-900">{selectedOrg.phone}</p>
                    </div>
                  </div>
                )}
              </div>

              {selectedOrg.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {language === 'fr' ? 'Adresse' : language === 'de' ? 'Adresse' : 'Address'}
                    </p>
                    <p className="text-sm text-gray-900">{selectedOrg.address}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <UsersIcon className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{selectedOrg.usersCount.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">
                          {language === 'fr' ? 'Utilisateurs' : language === 'de' ? 'Benutzer' : 'Users'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-purple-600" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{selectedOrg.processesCount}</p>
                        <p className="text-xs text-gray-600">
                          {language === 'fr' ? 'Processus' : language === 'de' ? 'Prozesse' : 'Processes'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {new Date(selectedOrg.createdAt).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US')}
                        </p>
                        <p className="text-xs text-gray-600">
                          {language === 'fr' ? 'Créée le' : language === 'de' ? 'Erstellt am' : 'Created on'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              {language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close'}
            </Button>
            <Button onClick={() => {
              setViewDialogOpen(false);
              if (selectedOrg) handleEditOrganization(selectedOrg);
            }}>
              <Edit className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Organization Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {language === 'fr' ? 'Modifier l\'organisation' : language === 'de' ? 'Organisation bearbeiten' : 'Edit Organization'}
            </DialogTitle>
            <DialogDescription>
              {language === 'fr' ? 'Modifiez les informations de l\'organisation' : language === 'de' ? 'Organisationsinformationen bearbeiten' : 'Edit organization information'}
            </DialogDescription>
          </DialogHeader>
          {selectedOrg && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">
                    {language === 'fr' ? 'Nom' : language === 'de' ? 'Name' : 'Name'}
                  </Label>
                  <Input
                    id="edit-name"
                    value={selectedOrg.name}
                    onChange={(e) => setSelectedOrg({ ...selectedOrg, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-slug">Slug</Label>
                  <Input
                    id="edit-slug"
                    value={selectedOrg.slug}
                    onChange={(e) => setSelectedOrg({ ...selectedOrg, slug: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">
                  {language === 'fr' ? 'Description' : language === 'de' ? 'Beschreibung' : 'Description'}
                </Label>
                <Textarea
                  id="edit-description"
                  value={selectedOrg.description || ''}
                  onChange={(e) => setSelectedOrg({ ...selectedOrg, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={selectedOrg.email || ''}
                    onChange={(e) => setSelectedOrg({ ...selectedOrg, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">
                    {language === 'fr' ? 'Téléphone' : language === 'de' ? 'Telefon' : 'Phone'}
                  </Label>
                  <Input
                    id="edit-phone"
                    value={selectedOrg.phone || ''}
                    onChange={(e) => setSelectedOrg({ ...selectedOrg, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-address">
                  {language === 'fr' ? 'Adresse' : language === 'de' ? 'Adresse' : 'Address'}
                </Label>
                <Input
                  id="edit-address"
                  value={selectedOrg.address || ''}
                  onChange={(e) => setSelectedOrg({ ...selectedOrg, address: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </Button>
            <Button onClick={handleUpdateOrganization}>
              {language === 'fr' ? 'Enregistrer' : language === 'de' ? 'Speichern' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Change Confirmation Dialog */}
      <AlertDialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              {language === 'fr' ? 'Confirmer le changement de statut' : language === 'de' ? 'Statusänderung bestätigen' : 'Confirm Status Change'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedOrg?.status === 'active' 
                ? (language === 'fr' 
                    ? `Êtes-vous sûr de vouloir suspendre l'organisation "${selectedOrg?.name}" ? Les utilisateurs ne pourront plus accéder aux fonctionnalités.`
                    : language === 'de'
                    ? `Sind Sie sicher, dass Sie die Organisation "${selectedOrg?.name}" sperren möchten? Benutzer können nicht mehr auf die Funktionen zugreifen.`
                    : `Are you sure you want to suspend the organization "${selectedOrg?.name}"? Users will no longer be able to access features.`)
                : (language === 'fr' 
                    ? `Êtes-vous sûr de vouloir activer l'organisation "${selectedOrg?.name}" ?`
                    : language === 'de'
                    ? `Sind Sie sicher, dass Sie die Organisation "${selectedOrg?.name}" aktivieren möchten?`
                    : `Are you sure you want to activate the organization "${selectedOrg?.name}"?`)
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusChange}>
              {language === 'fr' ? 'Confirmer' : language === 'de' ? 'Bestätigen' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}