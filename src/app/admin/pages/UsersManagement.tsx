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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import {
  Users,
  Search,
  UserPlus,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Mail,
  Calendar,
  Filter
} from 'lucide-react';
import { NewUserDialog } from '../components/dialogs/NewUserDialog';
import { EditUserDialog } from '../components/dialogs/EditUserDialog';
import { PermissionsDialog } from '../components/dialogs/PermissionsDialog';
import { EmailUserDialog } from '../components/dialogs/EmailUserDialog';
import { DeleteUserDialog } from '../components/dialogs/DeleteUserDialog';

// Mock data
const mockUsers = [
  {
    id: 1,
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2026-01-06',
    contributions: 45
  },
  {
    id: 2,
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    role: 'moderator',
    status: 'active',
    lastLogin: '2026-01-05',
    contributions: 23
  },
  {
    id: 3,
    name: 'Marie Bernard',
    email: 'marie.bernard@example.com',
    role: 'manager',
    status: 'active',
    lastLogin: '2026-01-06',
    contributions: 67
  },
  {
    id: 4,
    name: 'Pierre Leroy',
    email: 'pierre.leroy@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2026-01-04',
    contributions: 12
  },
  {
    id: 5,
    name: 'Claire Dubois',
    email: 'claire.dubois@example.com',
    role: 'observer',
    status: 'inactive',
    lastLogin: '2025-12-20',
    contributions: 8
  }
];

export function UsersManagement() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Dialog states
  const [newUserOpen, setNewUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [permissionsOpen, setPermissionsOpen] = useState(false);
  const [emailUserOpen, setEmailUserOpen] = useState(false);
  const [deleteUserOpen, setDeleteUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    const variants: Record<string, { label: string; color: string }> = {
      admin: { label: 'Administrateur', color: 'bg-purple-100 text-purple-700 border-purple-300' },
      manager: { label: 'Gestionnaire', color: 'bg-blue-100 text-blue-700 border-blue-300' },
      moderator: { label: 'Modérateur', color: 'bg-cyan-100 text-cyan-700 border-cyan-300' },
      observer: { label: 'Observateur', color: 'bg-gray-100 text-gray-700 border-gray-300' },
      user: { label: 'Utilisateur', color: 'bg-green-100 text-green-700 border-green-300' }
    };

    const variant = variants[role] || variants.user;
    return (
      <Badge className={`${variant.color} border`}>
        {variant.label}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge className="bg-green-100 text-green-700 border border-green-300">Actif</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-700 border border-gray-300">Inactif</Badge>
    );
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setEditUserOpen(true);
  };

  const handleManagePermissions = (user: any) => {
    setSelectedUser(user);
    setPermissionsOpen(true);
  };

  const handleEmailUser = (user: any) => {
    setSelectedUser(user);
    setEmailUserOpen(true);
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setDeleteUserOpen(true);
  };

  const handleNewUserSubmit = (data: any) => {
    console.log('New user:', data);
    // TODO: Implement user creation
  };

  const handleEditUserSubmit = (data: any) => {
    console.log('Edit user:', data);
    // TODO: Implement user update
  };

  const handlePermissionsSubmit = (data: any) => {
    console.log('Permissions:', data);
    // TODO: Implement permissions update
  };

  const handleEmailSubmit = (data: any) => {
    console.log('Email:', data);
    // TODO: Implement email sending
  };

  const handleDeleteConfirm = (options: any) => {
    console.log('Delete user with options:', options);
    // TODO: Implement user deletion
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {language === 'fr' ? 'Gestion des utilisateurs & rôles' :
             language === 'de' ? 'Benutzer- & Rollenverwaltung' :
             'Users & Roles Management'}
          </h1>
          <p className="text-gray-600">
            {language === 'fr' ? 'Gérez les utilisateurs, leurs rôles et permissions' :
             language === 'de' ? 'Verwalten Sie Benutzer, ihre Rollen und Berechtigungen' :
             'Manage users, their roles and permissions'}
          </p>
        </div>
        <Button className="gap-2" onClick={() => setNewUserOpen(true)}>
          <UserPlus className="w-4 h-4" />
          {language === 'fr' ? 'Nouvel utilisateur' :
           language === 'de' ? 'Neuer Benutzer' :
           'New User'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Utilisateurs</p>
                <p className="text-2xl font-semibold text-gray-900">1,420</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Administrateurs</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Modérateurs</p>
                <p className="text-2xl font-semibold text-gray-900">8</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Actifs ce mois</p>
                <p className="text-2xl font-semibold text-gray-900">892</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtres et recherche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom ou email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les rôles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="admin">Administrateur</SelectItem>
                <SelectItem value="manager">Gestionnaire</SelectItem>
                <SelectItem value="moderator">Modérateur</SelectItem>
                <SelectItem value="observer">Observateur</SelectItem>
                <SelectItem value="user">Utilisateur</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Liste des utilisateurs ({filteredUsers.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Dernière connexion</TableHead>
                  <TableHead>Contributions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getRoleBadge(user.role)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-gray-900">
                        {user.contributions}
                      </span>
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
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleManagePermissions(user)}>
                            <Shield className="w-4 h-4 mr-2" />
                            Gérer les permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEmailUser(user)}>
                            <Mail className="w-4 h-4 mr-2" />
                            Envoyer un email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user)}>
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

      {/* Permissions Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Matrice des permissions par rôle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Permission</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Admin</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Manager</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Moderator</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Observer</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Gérer les utilisateurs', admin: true, manager: true, moderator: false, observer: false },
                  { name: 'Créer des processus', admin: true, manager: true, moderator: false, observer: false },
                  { name: 'Modérer les contenus', admin: true, manager: true, moderator: true, observer: false },
                  { name: 'Voir les statistiques', admin: true, manager: true, moderator: true, observer: true },
                  { name: 'Exporter les données', admin: true, manager: true, moderator: false, observer: true },
                  { name: 'Gérer les thèmes', admin: true, manager: true, moderator: false, observer: false },
                  { name: 'Publier les résultats', admin: true, manager: true, moderator: false, observer: false },
                  { name: 'Configuration système', admin: true, manager: false, moderator: false, observer: false }
                ].map((permission, index) => (
                  <tr key={index} className="border-b hover:bg-blue-50/50">
                    <td className="py-3 px-4 text-gray-900">{permission.name}</td>
                    <td className="text-center py-3 px-4">
                      {permission.admin ? (
                        <span className="inline-block w-5 h-5 rounded-full bg-green-500"></span>
                      ) : (
                        <span className="inline-block w-5 h-5 rounded-full bg-gray-200"></span>
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {permission.manager ? (
                        <span className="inline-block w-5 h-5 rounded-full bg-green-500"></span>
                      ) : (
                        <span className="inline-block w-5 h-5 rounded-full bg-gray-200"></span>
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {permission.moderator ? (
                        <span className="inline-block w-5 h-5 rounded-full bg-green-500"></span>
                      ) : (
                        <span className="inline-block w-5 h-5 rounded-full bg-gray-200"></span>
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {permission.observer ? (
                        <span className="inline-block w-5 h-5 rounded-full bg-green-500"></span>
                      ) : (
                        <span className="inline-block w-5 h-5 rounded-full bg-gray-200"></span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <NewUserDialog
        open={newUserOpen}
        onOpenChange={setNewUserOpen}
        onSubmit={handleNewUserSubmit}
      />
      
      <EditUserDialog
        open={editUserOpen}
        onOpenChange={setEditUserOpen}
        user={selectedUser}
        onSubmit={handleEditUserSubmit}
      />
      
      <PermissionsDialog
        open={permissionsOpen}
        onOpenChange={setPermissionsOpen}
        user={selectedUser}
        onSubmit={handlePermissionsSubmit}
      />
      
      <EmailUserDialog
        open={emailUserOpen}
        onOpenChange={setEmailUserOpen}
        user={selectedUser}
        onSubmit={handleEmailSubmit}
      />
      
      <DeleteUserDialog
        open={deleteUserOpen}
        onOpenChange={setDeleteUserOpen}
        user={selectedUser}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}