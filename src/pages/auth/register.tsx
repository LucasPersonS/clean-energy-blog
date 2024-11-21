import React from 'react';
import RegisterForm from '../../components/Auth/RegisterForm';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white px-4">
      <div className="bg-dark-secondary bg-opacity-60 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Registrar</h2>
        <RegisterForm />
        <p className="mt-4 text-center">
          Já tem uma conta?{' '}
          <Link href="/auth/login" className="text-twitter-lime hover:underline">
            Faça login aqui
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage; 