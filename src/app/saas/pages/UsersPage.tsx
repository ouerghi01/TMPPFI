import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'motion/react';
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Shield,
  Filter,
  Download,
  Mail,
  Lock,
  Eye,
  UserPlus,
  AlertCircle,
  CheckCircle2
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
import { Badge } from '../../components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Checkbox } from '../../components/ui/checkbox';
import { toast } from 'sonner';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  organization: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  usersCount: number;
}

const availablePermissions = [
  'manage_organizations',
  'manage_users',
  'manage_billing',
  'view_analytics',
  'manage_processes',
  'moderate_content',
  'publish_results',
  'view_reports',
  'view_processes'
];

export function UsersPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
  const [viewUserDialogOpen, setViewUserDialogOpen] = useState(false);
  const [createRoleDialogOpen, setCreateRoleDialogOpen] = useState(false);
  const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false);
  const [deleteRoleDialogOpen, setDeleteRoleDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // New user form state
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    organization: '',
  });

  // New role form state
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  // Mock data
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@bruxelles.be',
      role: 'Admin',
      organization: 'Ville de Bruxelles',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@ixelles.be',
      role: 'Manager',
      organization: 'Commune d\'Ixelles',
      status: 'active',
      createdAt: '2024-02-20'
    },
    {
      id: '3',
      firstName: 'Pierre',
      lastName: 'Dubois',
      email: 'pierre.dubois@wallonie.be',
      role: 'Moderator',
      organization: 'Région Wallonne',
      status: 'active',
      createdAt: '2024-03-10'
    },
    {
      id: '4',
      firstName: 'Sophie',
      lastName: 'Laurent',
      email: 'sophie.laurent@geneve.ch',
      role: 'Observer',
      organization: 'Canton de Genève',
      status: 'inactive',
      createdAt: '2024-04-05'
    }
  ]);

  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Super Admin',
      description: language === 'fr' ? 'Accès complet à toutes les organisations' : language === 'de' ? 'Vollzugriff auf alle Organisationen' : 'Full access to all organizations',
      permissions: ['manage_organizations', 'manage_users', 'manage_billing', 'view_analytics'],
      usersCount: 2
    },
    {
      id: '2',
      name: 'Admin',
      description: language === 'fr' ? 'Gestion complète de l\'organisation' : language === 'de' ? 'Vollständige Verwaltung der Organisation' : 'Full organization management',
      permissions: ['manage_processes', 'manage_users', 'moderate_content', 'publish_results'],
      usersCount: 24
    },
    {
      id: '3',
      name: 'Manager',
      description: language === 'fr' ? 'Gestion des processus et modération' : language === 'de' ? 'Prozessverwaltung und Moderation' : 'Process management and moderation',
      permissions: ['manage_processes', 'moderate_content', 'view_analytics'],
      usersCount: 45
    },
    {
      id: '4',
      name: 'Moderator',
      description: language === 'fr' ? 'Modération du contenu' : language === 'de' ? 'Inhaltsmoderation' : 'Content moderation',
      permissions: ['moderate_content', 'view_reports'],
      usersCount: 78
    },
    {
      id: '5',
      name: 'Observer',
      description: language === 'fr' ? 'Accès en lecture seule' : language === 'de' ? 'Schreibgeschützter Zugriff' : 'Read-only access',
      permissions: ['view_processes', 'view_analytics'],
      usersCount: 156
    }
  ]);

  const mockOrganizations = [
    'Ville de Bruxelles',
    'Commune d\'Ixelles',
    'Région Wallonne',
    'Canton de Genève',
    'Ville de Lausanne'
  ];

  // User handlers
  const handleCreateUser = () => {
    const user: User = {
      id: String(users.length + 1),
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
      organization: newUser.organization,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, user]);
    setNewUser({ firstName: '', lastName: '', email: '', role: '', organization: '' });
    setCreateUserDialogOpen(false);

    toast.success(
      language === 'fr' 
        ? 'Utilisateur créé avec succès' 
        : language === 'de' 
        ? 'Benutzer erfolgreich erstellt' 
        : 'User created successfully'
    );
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditUserDialogOpen(true);
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;
    
    setUsers(prev => prev.map(u => 
      u.id === selectedUser.id ? selectedUser : u
    ));

    toast.success(
      language === 'fr' 
        ? 'Utilisateur modifié avec succès' 
        : language === 'de' 
        ? 'Benutzer erfolgreich bearbeitet' 
        : 'User updated successfully'
    );
    setEditUserDialogOpen(false);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setDeleteUserDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (!selectedUser) return;
    
    setUsers(prev => prev.filter(u => u.id !== selectedUser.id));

    toast.success(
      language === 'fr' 
        ? 'Utilisateur supprimé avec succès' 
        : language === 'de' 
        ? 'Benutzer erfolgreich gelöscht' 
        : 'User deleted successfully'
    );
    setDeleteUserDialogOpen(false);
  };

  const handleToggleUserStatus = (user: User) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    setUsers(prev => prev.map(u => 
      u.id === user.id ? { ...u, status: newStatus } : u
    ));

    toast.success(
      language === 'fr' 
        ? `Utilisateur ${newStatus === 'active' ? 'activé' : 'désactivé'} avec succès` 
        : language === 'de' 
        ? `Benutzer erfolgreich ${newStatus === 'active' ? 'aktiviert' : 'deaktiviert'}` 
        : `User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`
    );
  };

  const handleSendEmail = (user: User) => {
    toast.success(
      language === 'fr' 
        ? `Email envoyé à ${user.email}` 
        : language === 'de' 
        ? `E-Mail an ${user.email} gesendet` 
        : `Email sent to ${user.email}`
    );
  };

  const handleResetPassword = (user: User) => {
    toast.success(
      language === 'fr' 
        ? `Lien de réinitialisation envoyé à ${user.email}` 
        : language === 'de' 
        ? `Zurücksetzungslink an ${user.email} gesendet` 
        : `Reset link sent to ${user.email}`
    );
  };

  // Role handlers
  const handleCreateRole = () => {
    const role: Role = {
      id: String(roles.length + 1),
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      usersCount: 0
    };

    setRoles([...roles, role]);
    setNewRole({ name: '', description: '', permissions: [] });
    setCreateRoleDialogOpen(false);

    toast.success(
      language === 'fr' 
        ? 'Rôle créé avec succès' 
        : language === 'de' 
        ? 'Rolle erfolgreich erstellt' 
        : 'Role created successfully'
    );
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setEditRoleDialogOpen(true);
  };

  const handleUpdateRole = () => {
    if (!selectedRole) return;
    
    setRoles(prev => prev.map(r => 
      r.id === selectedRole.id ? selectedRole : r
    ));

    toast.success(
      language === 'fr' 
        ? 'Rôle modifié avec succès' 
        : language === 'de' 
        ? 'Rolle erfolgreich bearbeitet' 
        : 'Role updated successfully'
    );
    setEditRoleDialogOpen(false);
  };

  const handleDeleteRole = (role: Role) => {
    setSelectedRole(role);
    setDeleteRoleDialogOpen(true);
  };

  const confirmDeleteRole = () => {
    if (!selectedRole) return;
    
    setRoles(prev => prev.filter(r => r.id !== selectedRole.id));

    toast.success(
      language === 'fr' 
        ? 'Rôle supprimé avec succès' 
        : language === 'de' 
        ? 'Rolle erfolgreich gelöscht' 
        : 'Role deleted successfully'
    );
    setDeleteRoleDialogOpen(false);
  };

  const toggleRolePermission = (permission: string, isNewRole: boolean = false) => {
    if (isNewRole) {
      setNewRole(prev => ({
        ...prev,
        permissions: prev.permissions.includes(permission)
          ? prev.permissions.filter(p => p !== permission)
          : [...prev.permissions, permission]
      }));
    } else if (selectedRole) {
      setSelectedRole({
        ...selectedRole,
        permissions: selectedRole.permissions.includes(permission)
          ? selectedRole.permissions.filter(p => p !== permission)
          : [...selectedRole.permissions, permission]
      });
    }
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

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
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
              {language === 'fr' ? 'Gestion des utilisateurs & rôles' : language === 'de' ? 'Benutzer- und Rollenverwaltung' : 'Users & Roles Management'}
            </h1>
            <p className="text-gray-600 mt-2">
              {language === 'fr' 
                ? 'Gérez les utilisateurs et leurs permissions' 
                : language === 'de' 
                ? 'Verwalten Sie Benutzer und deren Berechtigungen' 
                : 'Manage users and their permissions'}
            </p>
          </div>
          <Dialog open={createUserDialogOpen} onOpenChange={setCreateUserDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Nouvel utilisateur' : language === 'de' ? 'Neuer Benutzer' : 'New User'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {language === 'fr' ? 'Créer un utilisateur' : language === 'de' ? 'Benutzer erstellen' : 'Create User'}
                </DialogTitle>
                <DialogDescription>
                  {language === 'fr' ? 'Ajoutez un nouvel utilisateur à la plateforme' : language === 'de' ? 'Fügen Sie einen neuen Benutzer zur Plattform hinzu' : 'Add a new user to the platform'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-firstName">
                      {language === 'fr' ? 'Prénom' : language === 'de' ? 'Vorname' : 'First Name'}
                    </Label>
                    <Input
                      id="new-firstName"
                      value={newUser.firstName}
                      onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                      placeholder="Jean"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-lastName">
                      {language === 'fr' ? 'Nom' : language === 'de' ? 'Nachname' : 'Last Name'}
                    </Label>
                    <Input
                      id="new-lastName"
                      value={newUser.lastName}
                      onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                      placeholder="Dupont"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-email">Email</Label>
                  <Input
                    id="new-email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="jean.dupont@example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-organization">
                      {language === 'fr' ? 'Organisation' : language === 'de' ? 'Organisation' : 'Organization'}
                    </Label>
                    <Select value={newUser.organization} onValueChange={(value) => setNewUser({ ...newUser, organization: value })}>
                      <SelectTrigger id="new-organization">
                        <SelectValue placeholder={language === 'fr' ? 'Sélectionnez...' : language === 'de' ? 'Wählen...' : 'Select...'} />
                      </SelectTrigger>
                      <SelectContent>
                        {mockOrganizations.map(org => (
                          <SelectItem key={org} value={org}>{org}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-role">
                      {language === 'fr' ? 'Rôle' : language === 'de' ? 'Rolle' : 'Role'}
                    </Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                      <SelectTrigger id="new-role">
                        <SelectValue placeholder={language === 'fr' ? 'Sélectionnez...' : language === 'de' ? 'Wählen...' : 'Select...'} />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateUserDialogOpen(false)}>
                  {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
                </Button>
                <Button onClick={handleCreateUser} disabled={!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.role || !newUser.organization}>
                  {language === 'fr' ? 'Créer' : language === 'de' ? 'Erstellen' : 'Create'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            title: language === 'fr' ? 'Total utilisateurs' : language === 'de' ? 'Gesamtbenutzer' : 'Total Users',
            value: users.length,
            color: 'blue'
          },
          {
            title: language === 'fr' ? 'Actifs' : language === 'de' ? 'Aktiv' : 'Active',
            value: users.filter(u => u.status === 'active').length,
            color: 'emerald'
          },
          {
            title: language === 'fr' ? 'Inactifs' : language === 'de' ? 'Inaktiv' : 'Inactive',
            value: users.filter(u => u.status === 'inactive').length,
            color: 'gray'
          },
          {
            title: language === 'fr' ? 'Rôles' : language === 'de' ? 'Rollen' : 'Roles',
            value: roles.length,
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

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Utilisateurs' : language === 'de' ? 'Benutzer' : 'Users'}
            </TabsTrigger>
            <TabsTrigger value="roles">
              <Shield className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Rôles & Permissions' : language === 'de' ? 'Rollen & Berechtigungen' : 'Roles & Permissions'}
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder={language === 'fr' ? 'Rechercher un utilisateur...' : language === 'de' ? 'Benutzer suchen...' : 'Search user...'}
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
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {language === 'fr' ? 'Filtrer les utilisateurs' : language === 'de' ? 'Benutzer filtern' : 'Filter Users'}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>{language === 'fr' ? 'Rôle' : language === 'de' ? 'Rolle' : 'Role'}</Label>
                            <Select value={roleFilter} onValueChange={setRoleFilter}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">{language === 'fr' ? 'Tous' : language === 'de' ? 'Alle' : 'All'}</SelectItem>
                                {roles.map(role => (
                                  <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>{language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}</Label>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">{language === 'fr' ? 'Tous' : language === 'de' ? 'Alle' : 'All'}</SelectItem>
                                <SelectItem value="active">{language === 'fr' ? 'Actif' : language === 'de' ? 'Aktiv' : 'Active'}</SelectItem>
                                <SelectItem value="inactive">{language === 'fr' ? 'Inactif' : language === 'de' ? 'Inaktiv' : 'Inactive'}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => {
                            setRoleFilter('all');
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

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'fr' ? 'Liste des utilisateurs' : language === 'de' ? 'Benutzerliste' : 'Users List'}
                </CardTitle>
                <CardDescription>
                  {filteredUsers.length} {language === 'fr' ? 'utilisateurs trouvés' : language === 'de' ? 'Benutzer gefunden' : 'users found'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === 'fr' ? 'Utilisateur' : language === 'de' ? 'Benutzer' : 'User'}</TableHead>
                      <TableHead>{language === 'fr' ? 'Email' : language === 'de' ? 'E-Mail' : 'Email'}</TableHead>
                      <TableHead>{language === 'fr' ? 'Rôle' : language === 'de' ? 'Rolle' : 'Role'}</TableHead>
                      <TableHead>{language === 'fr' ? 'Organisation' : language === 'de' ? 'Organisation' : 'Organization'}</TableHead>
                      <TableHead>{language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}</TableHead>
                      <TableHead className="text-right">{language === 'fr' ? 'Actions' : language === 'de' ? 'Aktionen' : 'Actions'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group hover:bg-gray-50"
                      >
                        <TableCell className="font-medium">
                          <div>
                            <p>{user.firstName} {user.lastName}</p>
                            <p className="text-xs text-gray-500">{user.organization}</p>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>{user.organization}</TableCell>
                        <TableCell>
                          <button onClick={() => handleToggleUserStatus(user)}>
                            {user.status === 'active' ? (
                              <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 cursor-pointer transition-colors">
                                {language === 'fr' ? 'Actif' : language === 'de' ? 'Aktiv' : 'Active'}
                              </Badge>
                            ) : (
                              <Badge className="bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors">
                                {language === 'fr' ? 'Inactif' : language === 'de' ? 'Inaktiv' : 'Inactive'}
                              </Badge>
                            )}
                          </button>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditUser(user)}
                              title={language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleSendEmail(user)}
                              title={language === 'fr' ? 'Envoyer un email' : language === 'de' ? 'E-Mail senden' : 'Send email'}
                            >
                              <Mail className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleResetPassword(user)}
                              title={language === 'fr' ? 'Réinitialiser le mot de passe' : language === 'de' ? 'Passwort zurücksetzen' : 'Reset password'}
                            >
                              <Lock className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteUser(user)}
                              title={language === 'fr' ? 'Supprimer' : language === 'de' ? 'Löschen' : 'Delete'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Roles Tab */}
          <TabsContent value="roles" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {language === 'fr' ? 'Gérez les rôles et leurs permissions' : language === 'de' ? 'Verwalten Sie Rollen und deren Berechtigungen' : 'Manage roles and their permissions'}
              </p>
              <Dialog open={createRoleDialogOpen} onOpenChange={setCreateRoleDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Nouveau rôle' : language === 'de' ? 'Neue Rolle' : 'New Role'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {language === 'fr' ? 'Créer un rôle' : language === 'de' ? 'Rolle erstellen' : 'Create Role'}
                    </DialogTitle>
                    <DialogDescription>
                      {language === 'fr' ? 'Définissez un nouveau rôle avec ses permissions' : language === 'de' ? 'Definieren Sie eine neue Rolle mit ihren Berechtigungen' : 'Define a new role with its permissions'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-role-name">
                        {language === 'fr' ? 'Nom du rôle' : language === 'de' ? 'Rollenname' : 'Role Name'}
                      </Label>
                      <Input
                        id="new-role-name"
                        value={newRole.name}
                        onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                        placeholder="Contributor"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-role-desc">
                        {language === 'fr' ? 'Description' : language === 'de' ? 'Beschreibung' : 'Description'}
                      </Label>
                      <Textarea
                        id="new-role-desc"
                        value={newRole.description}
                        onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                        rows={2}
                        placeholder={language === 'fr' ? 'Description du rôle...' : language === 'de' ? 'Rollenbeschreibung...' : 'Role description...'}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        {language === 'fr' ? 'Permissions' : language === 'de' ? 'Berechtigungen' : 'Permissions'}
                      </Label>
                      <div className="border rounded-lg p-4 space-y-2 max-h-60 overflow-y-auto">
                        {availablePermissions.map(permission => (
                          <div key={permission} className="flex items-center space-x-2">
                            <Checkbox
                              id={`new-perm-${permission}`}
                              checked={newRole.permissions.includes(permission)}
                              onCheckedChange={() => toggleRolePermission(permission, true)}
                            />
                            <Label htmlFor={`new-perm-${permission}`} className="text-sm font-normal cursor-pointer">
                              {permission.replace(/_/g, ' ')}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setCreateRoleDialogOpen(false)}>
                      {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
                    </Button>
                    <Button onClick={handleCreateRole} disabled={!newRole.name || !newRole.description || newRole.permissions.length === 0}>
                      {language === 'fr' ? 'Créer' : language === 'de' ? 'Erstellen' : 'Create'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="group hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-600" />
                            {role.name}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {role.description}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">
                          {role.usersCount} {language === 'fr' ? 'utilisateurs' : language === 'de' ? 'Benutzer' : 'users'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            {language === 'fr' ? 'Permissions' : language === 'de' ? 'Berechtigungen' : 'Permissions'}:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {role.permissions.map((permission) => (
                              <Badge key={permission} variant="outline" className="text-xs">
                                {permission.replace(/_/g, ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity pt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleEditRole(role)}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteRole(role)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Edit User Dialog */}
      <Dialog open={editUserDialogOpen} onOpenChange={setEditUserDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {language === 'fr' ? 'Modifier l\'utilisateur' : language === 'de' ? 'Benutzer bearbeiten' : 'Edit User'}
            </DialogTitle>
            <DialogDescription>
              {language === 'fr' ? 'Modifiez les informations de l\'utilisateur' : language === 'de' ? 'Benutzerinformationen bearbeiten' : 'Edit user information'}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-firstName">
                    {language === 'fr' ? 'Prénom' : language === 'de' ? 'Vorname' : 'First Name'}
                  </Label>
                  <Input
                    id="edit-firstName"
                    value={selectedUser.firstName}
                    onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-lastName">
                    {language === 'fr' ? 'Nom' : language === 'de' ? 'Nachname' : 'Last Name'}
                  </Label>
                  <Input
                    id="edit-lastName"
                    value={selectedUser.lastName}
                    onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-organization">
                    {language === 'fr' ? 'Organisation' : language === 'de' ? 'Organisation' : 'Organization'}
                  </Label>
                  <Select value={selectedUser.organization} onValueChange={(value) => setSelectedUser({ ...selectedUser, organization: value })}>
                    <SelectTrigger id="edit-organization">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockOrganizations.map(org => (
                        <SelectItem key={org} value={org}>{org}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">
                    {language === 'fr' ? 'Rôle' : language === 'de' ? 'Rolle' : 'Role'}
                  </Label>
                  <Select value={selectedUser.role} onValueChange={(value) => setSelectedUser({ ...selectedUser, role: value })}>
                    <SelectTrigger id="edit-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUserDialogOpen(false)}>
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </Button>
            <Button onClick={handleUpdateUser}>
              {language === 'fr' ? 'Enregistrer' : language === 'de' ? 'Speichern' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={editRoleDialogOpen} onOpenChange={setEditRoleDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {language === 'fr' ? 'Modifier le rôle' : language === 'de' ? 'Rolle bearbeiten' : 'Edit Role'}
            </DialogTitle>
            <DialogDescription>
              {language === 'fr' ? 'Modifiez les informations et permissions du rôle' : language === 'de' ? 'Rolleninformationen und Berechtigungen bearbeiten' : 'Edit role information and permissions'}
            </DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-role-name">
                  {language === 'fr' ? 'Nom du rôle' : language === 'de' ? 'Rollenname' : 'Role Name'}
                </Label>
                <Input
                  id="edit-role-name"
                  value={selectedRole.name}
                  onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-role-desc">
                  {language === 'fr' ? 'Description' : language === 'de' ? 'Beschreibung' : 'Description'}
                </Label>
                <Textarea
                  id="edit-role-desc"
                  value={selectedRole.description}
                  onChange={(e) => setSelectedRole({ ...selectedRole, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  {language === 'fr' ? 'Permissions' : language === 'de' ? 'Berechtigungen' : 'Permissions'}
                </Label>
                <div className="border rounded-lg p-4 space-y-2 max-h-60 overflow-y-auto">
                  {availablePermissions.map(permission => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-perm-${permission}`}
                        checked={selectedRole.permissions.includes(permission)}
                        onCheckedChange={() => toggleRolePermission(permission)}
                      />
                      <Label htmlFor={`edit-perm-${permission}`} className="text-sm font-normal cursor-pointer">
                        {permission.replace(/_/g, ' ')}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditRoleDialogOpen(false)}>
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </Button>
            <Button onClick={handleUpdateRole}>
              {language === 'fr' ? 'Enregistrer' : language === 'de' ? 'Speichern' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <AlertDialog open={deleteUserDialogOpen} onOpenChange={setDeleteUserDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              {language === 'fr' ? 'Confirmer la suppression' : language === 'de' ? 'Löschen bestätigen' : 'Confirm Deletion'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'fr' 
                ? `Êtes-vous sûr de vouloir supprimer l'utilisateur "${selectedUser?.firstName} ${selectedUser?.lastName}" ? Cette action est irréversible.`
                : language === 'de'
                ? `Sind Sie sicher, dass Sie den Benutzer "${selectedUser?.firstName} ${selectedUser?.lastName}" löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.`
                : `Are you sure you want to delete the user "${selectedUser?.firstName} ${selectedUser?.lastName}"? This action cannot be undone.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteUser} className="bg-red-600 hover:bg-red-700">
              {language === 'fr' ? 'Supprimer' : language === 'de' ? 'Löschen' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Role Confirmation Dialog */}
      <AlertDialog open={deleteRoleDialogOpen} onOpenChange={setDeleteRoleDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              {language === 'fr' ? 'Confirmer la suppression' : language === 'de' ? 'Löschen bestätigen' : 'Confirm Deletion'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'fr' 
                ? `Êtes-vous sûr de vouloir supprimer le rôle "${selectedRole?.name}" ? ${selectedRole?.usersCount || 0} utilisateur(s) utilisent ce rôle.`
                : language === 'de'
                ? `Sind Sie sicher, dass Sie die Rolle "${selectedRole?.name}" löschen möchten? ${selectedRole?.usersCount || 0} Benutzer verwenden diese Rolle.`
                : `Are you sure you want to delete the role "${selectedRole?.name}"? ${selectedRole?.usersCount || 0} user(s) have this role.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteRole} className="bg-red-600 hover:bg-red-700">
              {language === 'fr' ? 'Supprimer' : language === 'de' ? 'Löschen' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}