import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import QuizDetail from '../../components/Quiz/QuizDetail';

const QuizDetailPage: React.FC = () => {
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
        <QuizDetail quizId={parseInt(id, 10)} />
      </div>
    </Layout>
  );
};

export default QuizDetailPage;