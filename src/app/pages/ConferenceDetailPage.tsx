import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useConference, useTheme } from '../hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import {
    Calendar,
    MapPin,
    Users,
    ArrowLeft,
    Clock,
    Mic,
    Globe,
    UserPlus,
    CheckCircle,
    Share2,
    ExternalLink,
    Award,
    Video,
    Info
} from 'lucide-react';
import { toast } from 'sonner';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { ThemeTag } from '../components/ThemeTag';
import { StatusBadge } from '../components/StatusBadge';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from '../components/AuthModal';
import apiClient from '@/client';
import { format } from 'date-fns';
import { fr, de, enUS } from 'date-fns/locale';
import { LocalizedString } from '../types';

interface SessionTypeInfo {
    label: LocalizedString;
    color: string;
}

const SESSION_TYPES: Record<string, SessionTypeInfo> = {
    keynote: {
        label: { fr: 'Keynote', de: 'Keynote', en: 'Keynote' },
        color: 'bg-indigo-50 text-indigo-700 border-indigo-100'
    },
    workshop: {
        label: { fr: 'Atelier', de: 'Workshop', en: 'Workshop' },
        color: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    },
    panel: {
        label: { fr: 'Table Ronde', de: 'Podiumsdiskussion', en: 'Panel Discussion' },
        color: 'bg-amber-50 text-amber-700 border-amber-100'
    },
    networking: {
        label: { fr: 'Networking', de: 'Networking', en: 'Networking' },
        color: 'bg-rose-50 text-rose-700 border-rose-100'
    },
    break: {
        label: { fr: 'Pause', de: 'Pause', en: 'Break' },
        color: 'bg-slate-50 text-slate-600 border-slate-200'
    },
    unknown: {
        label: { fr: 'Session', de: 'Sitzung', en: 'Session' },
        color: 'bg-gray-50 text-gray-500 border-gray-200'
    }
};

export function ConferenceDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { language, tLocal } = useLanguage();
    const navigate = useNavigate();
    const { user, isLoggedIn } = useAuth();
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const { data: conference, isLoading, error, refetch } = useConference(id || '');
    const { data: theme } = useTheme(conference?.themeId || '');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleRegister = async () => {
        if (!isLoggedIn) {
            setAuthModalOpen(true);
            return;
        }

        setIsRegistering(true);
        try {
            const response = await apiClient.post(`/conferences/${conference?.id}/register`);
            if (response.status === 200 || response.status === 201) {
                toast.success(
                    language === 'fr' ? 'Inscription confirmée !' :
                        language === 'de' ? 'Anmeldung bestätigt!' :
                            'Registration confirmed!'
                );
                refetch();
            }
        } catch (err) {
            toast.error(
                language === 'fr' ? 'Erreur lors de l\'inscription' :
                    'Error during registration'
            );
        } finally {
            setIsRegistering(false);
        }
    };

    const handleUnregister = async () => {
        try {
            const response = await apiClient.delete(`/conferences/${conference?.id}/register`);
            if (response.status === 200) {
                toast.success(
                    language === 'fr' ? 'Inscription annulée' :
                        'Registration cancelled'
                );
                refetch();
            }
        } catch (err) {
            toast.error(
                language === 'fr' ? 'Erreur lors de l\'annulation' :
                    'Error during cancellation'
            );
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
    if (error || !conference) return <div className="p-8"><ErrorMessage error={error || new Error('Conference not found')} /></div>;

    const startDate = new Date(conference.startDate);
    const endDate = new Date(conference.endDate);
    const isPast = endDate < new Date();
    const isRegistrationClosed = new Date(conference.registrationDeadline) < new Date() || conference.registeredCount >= conference.capacity;

    const formatTime = (timeStr: string) => {
        if (!timeStr) return '';
        // If it's already HH:mm
        if (/^\d{2}:\d{2}$/.test(timeStr)) return timeStr;

        try {
            const date = new Date(timeStr);
            if (isNaN(date.getTime())) return timeStr;
            return format(date, 'HH:mm');
        } catch (e) {
            return timeStr;
        }
    };

    const getSessionTypeBadge = (type: string) => {
        const typeInfo = SESSION_TYPES[type.toLowerCase()];
        if (!typeInfo) return <Badge variant="outline">{type}</Badge>;

        return (
            <Badge variant="outline" className={`${typeInfo.color} border font-medium`}>
                {tLocal(typeInfo.label)}
            </Badge>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Hero Section / Banner */}
            <div className="relative h-[400px] w-full overflow-hidden bg-indigo-900">
                {conference.images && conference.images[0] ? (
                    <img
                        src={conference.images[0]}
                        alt={tLocal(conference.title)}
                        className="w-full h-full object-cover opacity-60"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-indigo-600 to-purple-700 opacity-80" />
                )}

                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute inset-0 flex items-center">
                    <PageLayout className="w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-3xl text-white"
                        >
                            <Link
                                to="/conferences"
                                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                {language === 'fr' ? 'Retour aux conférences' : 'Back to conferences'}
                            </Link>

                            <div className="flex items-center gap-3 mb-4">
                                <ThemeTag themeId={conference.themeId} className="bg-white/10 text-white border-white/20" />
                                <StatusBadge status={conference.status} />
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {tLocal(conference.title)}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-white/90">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-indigo-300" />
                                    <span>
                                        {startDate.toLocaleDateString(language, { day: 'numeric', month: 'long', year: 'numeric' })}
                                        {conference.startDate !== conference.endDate && ` - ${endDate.toLocaleDateString(language, { day: 'numeric', month: 'long', year: 'numeric' })}`}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-indigo-300" />
                                    <span>{conference.location.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-indigo-300" />
                                    <span>{conference.registeredCount} / {conference.capacity} participants</span>
                                </div>
                            </div>
                        </motion.div>
                    </PageLayout>
                </div>
            </div>

            <PageLayout className="-mt-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden bg-white">
                            <div className="h-1.5 bg-indigo-600 w-full" />
                            <CardContent className="pt-8">
                                <div className="prose prose-indigo max-w-none">
                                    <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-slate-900 tracking-tight">
                                        <div className="p-2 bg-indigo-50 rounded-lg">
                                            <Info className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        {language === 'fr' ? 'À propos de cet événement' : 'About this event'}
                                    </h2>
                                    <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                                        {tLocal(conference.description)}
                                    </p>
                                </div>

                                {conference.tags && conference.tags.length > 0 && (
                                    <div className="mt-10 pt-6 border-t border-slate-50 flex flex-wrap gap-2">
                                        {conference.tags.map((tag: any) => (
                                            <Badge key={tag} variant="secondary" className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-slate-100/80 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-default border-none">
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Agenda / Sessions */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Clock className="w-6 h-6 text-indigo-600" />
                                {language === 'fr' ? 'Programme & Sessions' : 'Agenda & Sessions'}
                            </h2>

                            <div className="space-y-4">
                                {conference.sessions.map((session: { id: React.Key | null | undefined; startTime: string; endTime: string; type: string; title: string | LocalizedString | undefined; description: string | LocalizedString | undefined; room: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; registeredCount: any; speakers: any[]; }, index: number) => (
                                    <motion.div
                                        key={session.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="hover:shadow-lg border border-gray-100 hover:border-indigo-200 transition-all group overflow-hidden bg-white">
                                            <CardContent className="p-0">
                                                <div className="flex flex-col md:flex-row">
                                                    <div className="md:w-48 flex-shrink-0 bg-slate-50/50 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100 relative overflow-hidden group/time">
                                                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover/time:opacity-100 transition-opacity" />
                                                        <div className="flex items-center gap-2 text-indigo-600 mb-3">
                                                            <Clock className="w-5 h-5 opacity-70" />
                                                            <div className="font-black text-3xl tracking-tighter tabular-nums">
                                                                {formatTime(session.startTime)}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] pl-7">
                                                            <span>{language === 'fr' ? 'JUSQU\'À' : language === 'de' ? 'BIS' : 'UNTIL'}</span>
                                                            <span className="text-slate-600 tabular-nums">{formatTime(session.endTime)}</span>
                                                        </div>
                                                        <div className="mt-8">
                                                            {getSessionTypeBadge(session.type)}
                                                        </div>
                                                    </div>

                                                    <div className="flex-grow p-6">
                                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                                            <div className="space-y-2">
                                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight">
                                                                    {tLocal(session.title)}
                                                                </h3>
                                                                <p className="text-gray-600 leading-relaxed text-sm line-clamp-2 italic">
                                                                    {tLocal(session.description)}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap items-center gap-4 text-sm">
                                                            {session.room && (
                                                                <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                                    <MapPin className="w-4 h-4 text-indigo-400" />
                                                                    <span className="font-semibold">{session.room}</span>
                                                                </div>
                                                            )}
                                                            <div className="flex items-center gap-2 text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
                                                                <Users className="w-4 h-4 text-indigo-400" />
                                                                <span className="font-black">{session.registeredCount || 0}</span>
                                                                <span className="text-indigo-500 font-medium lowercase">
                                                                    {language === 'fr' ? 'inscrits' : 'registered'}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {session.speakers && session.speakers.length > 0 && (
                                                            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                                                                <div className="flex -space-x-3">
                                                                    {session.speakers.map((speaker: any) => (
                                                                        <Avatar key={speaker.id} className="border-2 border-white w-10 h-10 ring-2 ring-indigo-50/50 hover:scale-110 transition-transform cursor-pointer shadow-sm" title={speaker.name}>
                                                                            <AvatarImage src={speaker.avatar} />
                                                                            <AvatarFallback className="bg-indigo-50 text-indigo-700 text-xs font-black">
                                                                                {speaker.name?.split(' ').map((n: any) => n[0]).join('')}
                                                                            </AvatarFallback>
                                                                        </Avatar>
                                                                    ))}
                                                                </div>
                                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                                                                    {language === 'fr' ? 'Intervenants' : 'Speakers'}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Speakers Section */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 rounded-lg">
                                    <Mic className="w-6 h-6 text-indigo-600" />
                                </div>
                                {language === 'fr' ? 'Intervenants d\'exception' : 'Featured Speakers'}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {conference.speakers.map((speaker: any) => (
                                    <Card key={speaker.id} className="hover:shadow-xl border-none transition-all hover:-translate-y-1 bg-white overflow-hidden group">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-5">
                                                <div className="relative">
                                                    <Avatar className="w-20 h-20 shadow-md ring-2 ring-indigo-50 group-hover:ring-indigo-100 transition-all">
                                                        <AvatarImage src={speaker.avatar} />
                                                        <AvatarFallback className="text-xl font-bold bg-indigo-50 text-indigo-600">
                                                            {speaker.name?.split(' ').map((n: any) => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div className="flex-grow">
                                                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                                                        {speaker.name}
                                                    </h3>
                                                    <p className="text-indigo-600 text-sm font-bold mb-2 tracking-wide">
                                                        {tLocal(speaker.title)}
                                                    </p>
                                                    <p className="text-gray-500 text-xs font-medium mb-4 flex items-center gap-1">
                                                        <Award className="w-3 h-3 text-indigo-300" />
                                                        {speaker.organization}
                                                    </p>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 px-0 text-indigo-600 hover:text-indigo-700 hover:bg-transparent font-bold text-xs uppercase tracking-widest group/btn"
                                                        onClick={() => navigate(`/speakers/${speaker.id}`)}
                                                    >
                                                        {language === 'fr' ? 'Voir le profil complet' : 'View full profile'}
                                                        <ArrowLeft className="w-3 h-3 ml-2 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 ">
                        {/* Action Card */}
                        <Card className="sticky top-24 shadow-2xl shadow-indigo-100/50 border border-slate-100 bg-white overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full" />
                            <CardHeader className="pb-4">
                                <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">
                                    {language === 'fr' ? 'Participation' : 'Join Event'}
                                </CardTitle>
                                <CardDescription className="text-slate-500 font-medium">
                                    {isPast
                                        ? (language === 'fr' ? 'Cet événement est terminé' : 'This event is over')
                                        : (language === 'fr' ? 'Réservez votre place dès maintenant' : 'Secure your spot today')
                                    }
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                {conference.hasRegistered ? (
                                    <div className="space-y-4">
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 text-green-700">
                                            <CheckCircle className="w-6 h-6 flex-shrink-0" />
                                            <div>
                                                <p className="font-bold">Vous êtes inscrit !</p>
                                                <p className="text-sm">Nous avons hâte de vous voir.</p>
                                            </div>
                                        </div>
                                        {!isPast && (
                                            <Button
                                                variant="outline"
                                                className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                                onClick={handleUnregister}
                                            >
                                                Annuler mon inscription
                                            </Button>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                                            <div className="flex justify-between items-end">
                                                <div className="space-y-0.5">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                        {language === 'fr' ? 'Places disponibles' : 'Availability'}
                                                    </span>
                                                    <div className="flex items-baseline gap-1.5">
                                                        <span className="text-3xl font-black text-indigo-600 tabular-nums">
                                                            {conference.capacity - conference.registeredCount}
                                                        </span>
                                                        <span className="text-xs font-bold text-slate-400 uppercase">
                                                            / {conference.capacity}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[10px] font-black text-indigo-500 bg-white border border-indigo-100 px-2.5 py-1 rounded-full shadow-sm mb-1.5">
                                                        {Math.round((conference.registeredCount / conference.capacity) * 100)}% {language === 'fr' ? 'OCCUPÉ' : 'FULL'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="w-full bg-white h-4 rounded-full overflow-hidden border border-slate-100 p-1">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(conference.registeredCount / conference.capacity) * 100}%` }}
                                                    transition={{ duration: 1.5, ease: "circOut" }}
                                                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 h-full rounded-full"
                                                />
                                            </div>

                                            <p className="text-[10px] text-slate-300 text-center font-bold tracking-wider uppercase">
                                                {language === 'fr' ? 'Mise à jour en direct' : 'Live updates active'}
                                            </p>
                                        </div>

                                        <Button
                                            className="w-full h-16 text-lg font-black shadow-xl shadow-indigo-100 hover:shadow-indigo-200 transition-all active:scale-[0.98] group bg-indigo-600 hover:bg-indigo-700 tabular-nums"
                                            disabled={isPast || isRegistrationClosed || isRegistering}
                                            onClick={handleRegister}
                                        >
                                            {isRegistering ? (
                                                <LoadingSpinner size="sm" />
                                            ) : (
                                                <>
                                                    <UserPlus className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                                                    {isPast
                                                        ? (language === 'fr' ? 'ÉVÉNEMENT TERMINÉ' : 'EVENT ENDED')
                                                        : isRegistrationClosed
                                                            ? (language === 'fr' ? 'COMPLET' : 'SOLD OUT')
                                                            : (language === 'fr' ? "S'INSCRIRE MAINTENANT" : "RESERVE YOUR SEAT")
                                                    }
                                                </>
                                            )}
                                        </Button>
                                    </>
                                )}

                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <Button variant="outline" className="gap-2 h-12 border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all font-bold text-xs uppercase tracking-widest text-slate-600">
                                        <Share2 className="w-4 h-4" />
                                        {language === 'fr' ? 'Partager' : 'Share'}
                                    </Button>
                                    {conference.isHybrid && conference.onlineLink && (
                                        <Button variant="outline" className="gap-2 h-12 border-indigo-100 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-all font-bold text-xs uppercase tracking-widest">
                                            <Video className="w-4 h-4" />
                                            {language === 'fr' ? 'En ligne' : 'Join Link'}
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Organizer Info */}
                        <Card className="shadow-lg border border-slate-100 bg-white overflow-hidden">
                            <CardHeader className="pb-4 border-b border-slate-50 bg-slate-50/30">
                                <CardTitle className="text-md font-black flex items-center gap-3 text-slate-800 uppercase tracking-widest">
                                    <div className="p-1.5 bg-white rounded shadow-sm">
                                        <Award className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    {language === 'fr' ? 'Organisé par' : 'Organized by'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="flex items-center gap-5">
                                    <div className="w-20 h-20 flex-shrink-0 bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex items-center justify-center group overflow-hidden">
                                        {conference.organization.logo ? (
                                            <img
                                                src={conference.organization.logo}
                                                alt={tLocal(conference.organization.name)}
                                                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform"
                                                onError={(e) => {
                                                    (e.target as any).style.display = 'none';
                                                    (e.target as any).parentElement.innerHTML = `<span class="text-2xl font-black text-indigo-600">${tLocal(conference.organization.name)[0]}</span>`;
                                                }}
                                            />
                                        ) : (
                                            <span className="text-2xl font-black text-indigo-600">{tLocal(conference.organization.name)[0]}</span>
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-black text-xl text-slate-900 leading-tight tracking-tight">{tLocal(conference.organization.name)}</p>
                                        <p className="text-[10px] text-indigo-600 uppercase font-black tracking-[0.2em] mt-2 bg-indigo-50 px-2 py-0.5 rounded inline-block">
                                            {conference.organization.type}
                                        </p>
                                    </div>
                                </div>
                                {conference.organization.website && (
                                    <Button variant="ghost" className="w-full justify-start text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 h-10 px-0 -ml-2" asChild>
                                        <a
                                            href={conference.organization.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 px-2"
                                        >
                                            <Globe className="w-4 h-4 text-indigo-400" />
                                            <span className="text-sm font-bold tracking-tight">{language === 'fr' ? 'Site officiel' : 'Official website'}</span>
                                            <ExternalLink className="w-3 h-3 opacity-50 ml-auto" />
                                        </a>
                                    </Button>
                                )}
                            </CardContent>
                        </Card>

                        {/* Sponsors Section */}
                        {conference.sponsors && conference.sponsors.length > 0 && (
                            <Card className="shadow-lg border border-slate-100 bg-white overflow-hidden">
                                <CardHeader className="pb-4 border-b border-slate-50 bg-slate-50/30">
                                    <CardTitle className="text-md font-black flex items-center gap-3 text-slate-800 uppercase tracking-widest">
                                        <div className="p-1.5 bg-white rounded shadow-sm">
                                            <Users className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        {language === 'fr' ? 'Nos Partenaires' : 'Sponsors & Partners'}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        {conference.sponsors.map((sponsor: any) => (
                                            <div key={sponsor.id} className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-default group">
                                                <div className="h-12 w-full flex items-center justify-center">
                                                    <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                </div>
                                                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 group-hover:text-indigo-500 transition-colors">{sponsor.tier}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </PageLayout>

            <AuthModal
                open={authModalOpen}
                onOpenChange={setAuthModalOpen}
            />
        </div>
    );
}

function PageLayout({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
}
