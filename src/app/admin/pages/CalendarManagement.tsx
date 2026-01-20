import React, { useState } from 'react';
import { Calendar, Plus, Edit2, Trash2, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { NewEventDialog, EditEventDialog, DeleteEventDialog } from '../components/dialogs/EventDialogs';

interface Event {
  id: string;
  title: string;
  type: 'consultation' | 'assembly' | 'conference' | 'vote' | 'deadline';
  date: string;
  time: string;
  location?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  participants?: number;
  description: string;
}

export function CalendarManagement() {
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Concertation: Mobilité Urbaine',
      type: 'consultation',
      date: '2025-01-15',
      time: '14:00',
      location: 'Salle du Conseil',
      status: 'upcoming',
      participants: 45,
      description: 'Discussion sur les nouvelles pistes cyclables'
    },
    {
      id: '2',
      title: 'Assemblée Citoyenne - Climat',
      type: 'assembly',
      date: '2025-01-20',
      time: '18:30',
      location: 'Maison de Quartier',
      status: 'upcoming',
      participants: 120,
      description: 'Atelier participatif sur la transition énergétique'
    },
    {
      id: '3',
      title: 'Conférence: Smart City',
      type: 'conference',
      date: '2025-01-25',
      time: '09:00',
      location: 'Centre de Congrès',
      status: 'upcoming',
      participants: 200,
      description: 'Innovations technologiques pour la ville de demain'
    },
    {
      id: '4',
      title: 'Vote: Budget Participatif 2025',
      type: 'vote',
      date: '2025-02-01',
      time: '00:00',
      status: 'upcoming',
      description: 'Période de vote pour le budget participatif'
    },
    {
      id: '5',
      title: 'Deadline: Pétition Transport',
      type: 'deadline',
      date: '2025-01-31',
      time: '23:59',
      status: 'upcoming',
      description: 'Date limite pour signer la pétition'
    }
  ]);

  // Dialog states
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [editEventOpen, setEditEventOpen] = useState(false);
  const [deleteEventOpen, setDeleteEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      consultation: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      assembly: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      conference: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      vote: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      deadline: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[type] || colors.consultation;
  };

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      consultation: 'Concertation',
      assembly: 'Assemblée',
      conference: 'Conférence',
      vote: 'Vote',
      deadline: 'Échéance'
    };
    return labels[type] || type;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const groupEventsByMonth = () => {
    const grouped: { [key: string]: Event[] } = {};
    
    events.forEach(event => {
      const date = new Date(event.date);
      const monthKey = date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
      
      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(event);
    });

    return grouped;
  };

  const groupedEvents = groupEventsByMonth();

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setEditEventOpen(true);
  };

  const handleDeleteEvent = (event: Event) => {
    setSelectedEvent(event);
    setDeleteEventOpen(true);
  };

  const handleNewEventSubmit = (data: any) => {
    console.log('New event:', data);
    // TODO: Implement event creation
  };

  const handleEditSubmit = (data: any) => {
    console.log('Edit event:', data);
    // TODO: Implement event update
  };

  const handleDeleteConfirm = () => {
    console.log('Delete event:', selectedEvent);
    // TODO: Implement event deletion
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Calendrier & Phases
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gérer les événements et les phases des processus participatifs
            </p>
          </div>
        </div>
        <Button className="gap-2" onClick={() => setNewEventOpen(true)}>
          <Plus className="w-4 h-4" />
          Nouvel événement
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Événements totaux
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {events.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  À venir
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {events.filter(e => e.status === 'upcoming').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  En cours
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {events.filter(e => e.status === 'ongoing').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Terminés
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {events.filter(e => e.status === 'completed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events Timeline */}
      <div className="space-y-6">
        {Object.entries(groupedEvents).map(([month, monthEvents]) => (
          <Card key={month}>
            <CardHeader>
              <CardTitle className="capitalize">{month}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    <div className="flex-shrink-0 text-center min-w-[70px]">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                        {new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {event.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {event.location}
                              </div>
                            )}
                            {event.participants && (
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {event.participants} participants
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(event.type)}>
                            {getTypeLabel(event.type)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditEvent(event)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialogs */}
      <NewEventDialog
        open={newEventOpen}
        onOpenChange={setNewEventOpen}
        onSubmit={handleNewEventSubmit}
      />
      
      <EditEventDialog
        open={editEventOpen}
        onOpenChange={setEditEventOpen}
        event={selectedEvent}
        onSubmit={handleEditSubmit}
      />
      
      <DeleteEventDialog
        open={deleteEventOpen}
        onOpenChange={setDeleteEventOpen}
        event={selectedEvent}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}