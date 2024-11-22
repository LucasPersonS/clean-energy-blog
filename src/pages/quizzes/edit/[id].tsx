import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../../components/Layout';
import EditQuiz from '../../../components/Quiz/EditQuiz';
import Link from 'next/link';

const EditQuizPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || Array.isArray(id)) {
    return (
      <Layout>
        <p className="text-center mt-10">Invalid Quiz ID.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Edit Quiz</h1>
          <Link href="/quizzes">
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Back to List
            </button>
          </Link>
        </div>
        <EditQuiz quizId={parseInt(id, 10)} />
      </div>
    </Layout>
  );
};

export default EditQuizPage;