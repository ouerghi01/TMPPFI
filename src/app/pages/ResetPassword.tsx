import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import {
    Shield,
    Lock,
    ArrowLeft,
    Check,
    AlertCircle,
    Eye,
    EyeOff,
    ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';
import apiClient from '@/client';

export default function ResetPassword() {
    const { language } = useLanguage();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const token = params.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const validateForm = (): boolean => {
        if (password.length < 8) {
            setError(
                language === 'fr' ? 'Le mot de passe doit contenir au moins 8 caractères' :
                    language === 'de' ? 'Das Passwort muss mindestens 8 Zeichen lang sein' :
                        'Password must be at least 8 characters long'
            );
            return false;
        }

        if (password !== confirmPassword) {
            setError(
                language === 'fr' ? 'Les mots de passe ne correspondent pas' :
                    language === 'de' ? 'Die Passwörter stimmen nicht überein' :
                        'Passwords do not match'
            );
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!token) {
            setError(
                language === 'fr' ? 'Jeton de réinitialisation manquant' :
                    language === 'de' ? 'Rücksetz-Token fehlt' :
                        'Reset token is missing'
            );
            return;
        }

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await apiClient.post('/auth/reset-password', {
                token,
                password,
                confirmPassword,
            });

            if (response.status === 200) {
                setIsSubmitted(true);
                toast.success(
                    language === 'fr' ? 'Mot de passe réinitialisé avec succès' :
                        language === 'de' ? 'Passwort erfolgreich zurückgesetzt' :
                            'Password reset successfully'
                );

                // Redirect to login after a short delay
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || (
                language === 'fr' ? 'Une erreur est survenue' :
                    language === 'de' ? 'Ein Fehler ist aufgetreten' :
                        'An error occurred'
            ));
        } finally {
            setIsLoading(false);
        }
    };

    const getTitle = () => {
        if (language === 'fr') return 'Nouveau mot de passe';
        if (language === 'de') return 'Neues Passwort';
        return 'New password';
    };

    const getDescription = () => {
        if (language === 'fr') return 'Créez votre nouveau mot de passe sécurisé';
        if (language === 'de') return 'Erstellen Sie Ihr neues sicheres Passwort';
        return 'Create your new secure password';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent mb-2">
                        CiviAgora
                    </h1>
                    <p className="text-gray-600">
                        {language === 'fr' ? 'Plateforme de démocratie participative' :
                            language === 'de' ? 'Plattform für partizipative Demokratie' :
                                'Participatory Democracy Platform'}
                    </p>
                </div>

                <Card className="shadow-2xl border-2">
                    <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 text-white rounded-t-lg">
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <Lock className="w-6 h-6" />
                            {getTitle()}
                        </CardTitle>
                        <CardDescription className="text-blue-50">
                            {getDescription()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Password Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">
                                        {language === 'fr' ? 'Nouveau mot de passe' : language === 'de' ? 'Neues Passwort' : 'New Password'}
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            className={`pl-10 pr-10 ${error && password.length < 8 ? 'border-red-500' : ''}`}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">
                                        {language === 'fr' ? 'Confirmer le mot de passe' : language === 'de' ? 'Passwort bestätigen' : 'Confirm Password'}
                                    </Label>
                                    <div className="relative">
                                        <ShieldCheck className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="confirmPassword"
                                            type={showPassword ? 'text' : 'password'}
                                            className={`pl-10 ${error && password !== confirmPassword ? 'border-red-500' : ''}`}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="••••••••"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 text-lg font-semibold"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                            {language === 'fr' ? 'Réinitialisation...' : language === 'de' ? 'Zurücksetzen...' : 'Resetting...'}
                                        </>
                                    ) : (
                                        <>
                                            <Check className="mr-2 h-5 w-5" />
                                            {language === 'fr' ? 'Valider le nouveau mot de passe' : language === 'de' ? 'Neues Passwort bestätigen' : 'Reset Password'}
                                        </>
                                    )}
                                </Button>

                                {/* Back to Login */}
                                <div className="text-center pt-2">
                                    <Link
                                        to="/login"
                                        className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        {language === 'fr' ? 'Retour à la connexion' : language === 'de' ? 'Zurück zur Anmeldung' : 'Back to login'}
                                    </Link>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-6 py-4">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                                        <Check className="h-10 w-10 text-green-600" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {language === 'fr' ? 'C\'est fait !' : language === 'de' ? 'Erledigt!' : 'All set!'}
                                        </h3>
                                        <p className="text-gray-600">
                                            {language === 'fr'
                                                ? 'Votre mot de passe a été réinitialisé. Vous allez être redirigé vers la page de connexion.' :
                                                language === 'de'
                                                    ? 'Ihr Passwort wurde zurückgesetzt. Sie werden zur Anmeldeseite weitergeleitet.' :
                                                    'Your password has been reset. You will be redirected to the login page.'}
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => navigate('/login')}
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                >
                                    {language === 'fr' ? 'Se connecter maintenant' : language === 'de' ? 'Jetzt anmelden' : 'Login now'}
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Support Info */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        {language === 'fr' ? 'Besoin d\'aide ?' : language === 'de' ? 'Brauchen Sie Hilfe?' : 'Need help?'}
                        {' '}
                        <Link to="/support" className="text-blue-600 hover:underline">
                            {language === 'fr' ? 'Contactez le support' : language === 'de' ? 'Support kontaktieren' : 'Contact support'}
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
