import React, { useEffect, useState } from 'react';
import { Quiz } from '../../app/types/quiz';
import { fetchQuizById } from '../../app/api/quizzes';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface QuizDetailProps {
  quizId: number;
}

const QuizDetail: React.FC<QuizDetailProps> = ({ quizId }) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadQuiz();
  }, [quizId]);

  const loadQuiz = async () => {
    try {
      const data = await fetchQuizById(quizId);
      setQuiz(data);
      setUserAnswers(new Array(data.perguntas.length).fill(-1));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = answerIndex;
    setUserAnswers(updatedAnswers);
  };

  const checkAnswers = () => {
    if (!quiz) return;
    let correctCount = 0;
    quiz.perguntas.forEach((pergunta, index) => {
      if (userAnswers[index] === pergunta.respostaCorreta) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  if (error) {
    return (
      <div className="quiz-detail">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => router.push('/quizzes')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Voltar para a Lista
        </button>
      </div>
    );
  }

  if (!quiz) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="quiz-detail">
      <h2 className="text-3xl font-bold mb-4">{quiz.titulo}</h2>
      <p className="mb-6">{quiz.descricao}</p>
      <div className="space-y-4">
        {quiz.perguntas.map((pergunta, index) => (
          <div key={pergunta.id} className="bg-dark-secondary p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">
              {index + 1}. {pergunta.texto}
            </h3>
            <ul className="list-none">
              {pergunta.opcoes.map((opcao, idx) => (
                <li key={idx} className="mb-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={idx}
                      checked={userAnswers[index] === idx}
                      onChange={() => handleAnswerChange(index, idx)}
                      className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out mr-2"
                    />
                    <span className="text-white">{opcao}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button
        onClick={checkAnswers}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Verificar Respostas
      </button>
      {score !== null && (
        <p className="mt-4 text-xl">
          Você acertou {score} de {quiz.perguntas.length}
        </p>
      )}
      <Link href="/quizzes">
        <button className="mt-6 inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Voltar para a Lista
        </button>
      </Link>
    </div>
  );
};

export default QuizDetail;