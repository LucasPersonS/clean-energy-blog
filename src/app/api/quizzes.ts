import { Quiz, ErrorMessage } from '../types/quiz';

const API_BASE_URL = 'http://localhost:8080'; // Update with your API base URL

export async function fetchQuizzes(): Promise<Quiz[]> {
  const response = await fetch(`${API_BASE_URL}/quizzes`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch quizzes.');
  }
  return response.json();
}

export async function fetchQuizById(id: number): Promise<Quiz> {
  const response = await fetch(`${API_BASE_URL}/quizzes/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Quiz not found.');
  }
  return response.json();
}

export async function createQuiz(quiz: Quiz): Promise<Quiz> {
  const response = await fetch(`${API_BASE_URL}/quizzes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quiz),
  });
  if (!response.ok) {
    const errorData: ErrorMessage = await response.json();
    throw new Error(errorData.mensagem || 'Failed to create quiz.');
  }
  return response.json();
}

export async function updateQuiz(id: number, quiz: Quiz): Promise<Quiz> {
  const response = await fetch(`${API_BASE_URL}/quizzes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quiz),
  });
  if (!response.ok) {
    const errorData: ErrorMessage = await response.json();
    throw new Error(errorData.mensagem || 'Failed to update quiz.');
  }
  return response.json();
}

export async function deleteQuiz(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/quizzes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete quiz.');
  }
}