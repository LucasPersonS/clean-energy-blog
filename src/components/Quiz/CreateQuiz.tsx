import React, { useState } from 'react';
import { Quiz, Question } from '../../app/types/quiz';
import { createQuiz } from '../../app/api/quizzes';
import { useRouter } from 'next/router';

const CreateQuiz: React.FC = () => {
  const [titulo, setTitulo] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [perguntas, setPerguntas] = useState<Question[]>([]);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const addQuestion = () => {
    setPerguntas([...perguntas, { texto: '', opcoes: ['', '', '', ''], respostaCorreta: 0 }]);
  };

  const handleQuestionChange = (
    index: number,
    field: keyof Question | `opcoes.${number}`,
    value: string | number
  ) => {
    const updatedPerguntas = [...perguntas];
    if (typeof field === 'string' && field.startsWith('opcoes.')) {
      const opcIndex = parseInt(field.split('.')[1], 10);
      updatedPerguntas[index].opcoes[opcIndex] = value as string;
    } else {
      updatedPerguntas[index] = {
        ...updatedPerguntas[index],
        [field]: value,
      };
    }
    setPerguntas(updatedPerguntas);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !descricao.trim()) {
      setError('Title and Description are required.');
      return;
    }
    if (perguntas.length === 0) {
      setError('At least one question is required.');
      return;
    }
    for (const pergunta of perguntas) {
      if (!pergunta.texto.trim()) {
        setError('All questions must have text.');
        return;
      }
      if (pergunta.opcoes.some((op) => !op.trim())) {
        setError('All options must be filled.');
        return;
      }
      if (
        pergunta.respostaCorreta < 0 ||
        pergunta.respostaCorreta >= pergunta.opcoes.length
      ) {
        setError('Correct answer index is out of range.');
        return;
      }
    }

    const newQuiz: Quiz = { titulo, descricao, perguntas };
    try {
      const createdQuiz = await createQuiz(newQuiz);
      router.push(`/quizzes/${createdQuiz.id}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="create-quiz">
      <h2 className="text-2xl font-bold mb-4">Create New Quiz</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-dark-secondary p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-white mb-2">Title</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-2 rounded bg-dark-primary text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Description</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full p-2 rounded bg-dark-primary text-white"
            rows={3}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Questions</h3>
          {perguntas.map((pergunta, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-700 rounded">
              <div className="mb-2">
                <label className="block text-white mb-1">Question Text</label>
                <input
                  type="text"
                  value={pergunta.texto}
                  onChange={(e) =>
                    handleQuestionChange(index, 'texto', e.target.value)
                  }
                  className="w-full p-2 rounded bg-dark-primary text-white"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-white mb-1">Options</label>
                {pergunta.opcoes.map((opcao, opcIndex) => (
                  <input
                    key={opcIndex}
                    type="text"
                    value={opcao}
                    onChange={(e) =>
                      handleQuestionChange(index, `opcoes.${opcIndex}`, e.target.value)
                    }
                    className="w-full p-2 rounded bg-dark-primary text-white mb-1"
                    placeholder={`Option ${opcIndex + 1}`}
                    required
                  />
                ))}
              </div>
              <div>
                <label className="block text-white mb-1">Correct Option Index (0-based)</label>
                <input
                  type="number"
                  min="0"
                  max={pergunta.opcoes.length - 1}
                  value={pergunta.respostaCorreta}
                  onChange={(e) =>
                    handleQuestionChange(index, 'respostaCorreta', parseInt(e.target.value, 10))
                  }
                  className="w-full p-2 rounded bg-dark-primary text-white"
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Question
          </button>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;