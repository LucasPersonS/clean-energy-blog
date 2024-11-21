import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Notification from '../Utilitarios/Notification'; 
import { useAuth } from '../../context/AuthContext';
import { getErrorMessage } from '../../utils/errorHandler';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
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
      const response = await fetch('/api/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await response.json();

      if (response.ok) {
        login({ 
          nome: dados.nome, 
          email: dados.email, 
          avatarUrl: '/avatars/avatar1.png', 
          id: 'user1', 
          createdAt: '', 
          updatedAt: '' 
        });
        setNotification({ type: 'success', message: dados.message || 'Login realizado com sucesso!' });
        setTimeout(() => {
          router.push('/posts');
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
          className={`w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors ${
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
