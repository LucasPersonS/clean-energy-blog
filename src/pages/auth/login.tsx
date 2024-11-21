import React from 'react';
import LoginForm from '../../components/Auth/LoginForm';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-900 to-green-950 text-white px-4">
      <div className="bg-dark-secondary bg-opacity-60 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Login</h2>
        <LoginForm />
        <p className="mt-4 text-center">
          Não tem uma conta?{' '}
          <Link href="/auth/register" className="text-twitter-lime hover:underline">
            Registre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;