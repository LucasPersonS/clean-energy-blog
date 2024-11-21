import type { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '../../../app/types/Post';

// Mock data for demonstration purposes
const mockPosts: Post[] = [
  {
    id: 1,
    author: {
      id: 'user1',
      name: 'John Doe',
      email: 'john@example.com',
      avatarUrl: '/images/john-avatar.png',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    },
    tweet: 'This is a sample post',
    image: '/images/sample-post.png',
    likes: 10,
    dislikes: 2,
    comments: [],
  },
  // Add more mock posts as needed
];

export default function handler(req: NextApiRequest, res: NextApiResponse<Post[] | { message: string }>) {
  if (req.method === 'GET') {
    res.status(200).json(mockPosts);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
