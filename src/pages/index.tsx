import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

const HomePage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center w-full h-auto justify-center min-h-screen bg-gradient-to-r from-green-600 to-green-900 text-white px-4">
        <h1 className="text-title font-extrabold mb-6 text-center">
          Um Futuro Mais Sustentável
        </h1>
        <p className="text-paragraph max-w-lg text-center mb-20">
          Bem-vindo à nossa plataforma sobre energia limpa e sustentabilidade. Explore posts, participe de quizzes e descubra como podemos construir um futuro mais verde juntos.
        </p>
        <Link href="/posts" className="bg-lime-500 text-dark-primary px-6 py-2 rounded-full font-semibold hover:bg-lime-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Ir para o Futuro
        </Link>
      </div>
    </Layout>
  );
};

export default HomePage; 