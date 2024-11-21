import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Notification from '../Utilitarios/Notification'; // Adjust the path if necessary

const LoginForm: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setNotification(null);

        try {
            const response = await fetch(`http://localhost:5000/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            const dados = await response.json();

            if (response.ok) {
                localStorage.setItem('token', dados.token);
                setNotification({ type: 'success', message: 'Login realizado com sucesso!' });
                // Redirect after a short delay to allow users to see the notification
                setTimeout(() => {
                    router.push('/posts');
                }, 1500);
            } else {
                setNotification({ type: 'error', message: dados.error || 'Erro desconhecido' });
                setError(dados.error || 'Erro desconhecido');
            }
        } catch (erro) {
            setNotification({ type: 'error', message: 'Erro ao conectar com a API' });
            setError('Erro ao conectar com a API');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col space-y-4">
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
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
                    disabled={isLoading}
                    className={`w-full bg-green-500 text-white p-3 rounded-lg hover:bg-twitter-darkBlue transition-colors ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
