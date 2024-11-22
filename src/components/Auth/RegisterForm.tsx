import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Notification from '../Utilitarios/Notification'; 
import { getErrorMessage } from '../../app/utils/errorHandler';

const RegisterForm: React.FC = () => {
    const router = useRouter();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        setNotification(null);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, email, senha })
            });

            const dados = await response.json();

            if (response.ok) {
                setNotification({ type: 'success', message: dados.message });
                // Redirect after a short delay to allow users to see the notification
                setTimeout(() => {
                    router.push('/auth/login');
                }, 1500);
            } else {
                setNotification({ type: 'error', message: dados.error || 'Erro desconhecido' });
                setError(dados.error || 'Erro desconhecido');
            }
        } catch (erro: any) {
            const errorMessage = getErrorMessage(erro);
            setNotification({ type: 'error', message: errorMessage });
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome"
                    required
                    className="w-full p-3 bg-dark-secondary text-dark-text border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-twitter-lime transition"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full p-3 bg-dark-secondary text-dark-text border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-twitter-lime transition"
                />
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Senha"
                    required
                    className="w-full p-3 bg-dark-secondary text-dark-text border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-twitter-lime transition"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-twitter-blue text-white p-3 rounded-lg hover:bg-twitter-darkBlue transition-colors ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isSubmitting ? 'Registrando...' : 'Registrar'}
                </button>
            </form>
        </>
    );
};

export default RegisterForm;
