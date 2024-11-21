import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthResponse, AuthError, LoginInput, User } from '../../../app/types/User';

/**
 * Dummy user data for demonstration purposes.
 * Replace this with actual user authentication logic (e.g., querying a database).
 */
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatarUrl: '/images/john-avatar.png',
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
};

export default function handler(req: NextApiRequest, res: NextApiResponse<AuthResponse | AuthError>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { email, password } = req.body as LoginInput;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Authenticate user (Replace with real authentication logic)
  if (email === mockUser.email && password === 'password123') {
    // In a real application, generate a JWT or session
    const token = 'fake-jwt-token';
    return res.status(200).json({ token, user: mockUser });
  } else {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }
}