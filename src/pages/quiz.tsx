import React from 'react';
import Layout from '../components/Layout';
import QuizList from '../components/Quiz/QuizList';
import Link from 'next/link';

const QuizPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Quiz de Sustentabilidade</h2>
        <p className="mb-6">
          Responda ao quiz para testar seus conhecimentos sobre energia limpa.
        </p>
        <div className="flex justify-end mb-4">
          <Link href="/quizzes/create">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Create New Quiz
            </button>
          </Link>
        </div>
        <QuizList />
      </div>
    </Layout>
  );
};

export default QuizPage;