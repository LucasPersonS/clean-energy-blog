import React, { useEffect, useState } from 'react';
import { Quiz } from '../../app/types/quiz';
import { fetchQuizzes, deleteQuiz } from '../../app/api/quizzes';
import Link from 'next/link';

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const data = await fetchQuizzes();
      setQuizzes(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this quiz?')) return;
    try {
      await deleteQuiz(id);
      loadQuizzes();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="quiz-list">
      <h2 className="text-2xl font-bold mb-4">Quizzes</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-dark-secondary p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{quiz.titulo}</h3>
            <p className="mb-4">{quiz.descricao}</p>
            <div className="flex space-x-2">
              <Link href={`/quizzes/${quiz.id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View</button>
              </Link>
              <Link href={`/quizzes/edit/${quiz.id}`}>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</button>
              </Link>
              <button
                onClick={() => handleDelete(quiz.id!)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;