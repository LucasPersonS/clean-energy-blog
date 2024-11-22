import React from 'react';
import Layout from '../../components/Layout';
import QuizList from '../../components/Quiz/QuizList';
import Link from 'next/link';

const QuizzesPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Quizzes</h1>
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

export default QuizzesPage;