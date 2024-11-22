import React from 'react';
import Layout from '../../components/Layout';
import CreateQuiz from '../../components/Quiz/CreateQuiz';
import Link from 'next/link';

const CreateQuizPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Create New Quiz</h1>
          <Link href="/quizzes">
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Back to List
            </button>
          </Link>
        </div>
        <CreateQuiz />
      </div>
    </Layout>
  );
};

export default CreateQuizPage;