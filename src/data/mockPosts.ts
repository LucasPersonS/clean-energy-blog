import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { User } from '../types/User';

const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Lucas',
    email: 'Lucas@example.com',
    avatarUrl: '/avatars/avatar1.png',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    isFollowing: true,
  },
  {
    id: 'user2',
    name: 'Loco Smith',
    email: 'Loco@example.com',
    avatarUrl: '/avatars/avatar1.png',
    createdAt: '2023-02-15T00:00:00Z',
    updatedAt: '2023-02-15T00:00:00Z',
    isFollowing: false,
  },
  // Add more mock users as needed
];

const mockComments: Comment[] = [
  {
    id: 1,
    postId: 1,
    author: mockUsers[1],
    content: 'Great post! Really insightful.',
    timestamp: '2023-04-01T12:34:56Z',
  },
  {
    id: 2,
    postId: 1,
    author: mockUsers[0],
    content: 'Thank you for your feedback!',
    timestamp: '2023-04-02T09:21:43Z',
  },
  // Add more mock comments as needed
];

export const mockPosts: Post[] = [
  {
    id: 1,
    author: mockUsers[0],
    tweet: 'Exploring the benefits of renewable energy sources. #sustainability',
    image: '/avatars/avatar1.png',
    likes: 25,
    dislikes: 3,
    comments: mockComments.filter(comment => comment.postId === 1),
  },
  {
    id: 2,
    author: mockUsers[1],
    tweet: 'Just installed solar panels at home! Excited for a greener future.',
    image: '/avatars/avatar1.png',
    likes: 40,
    dislikes: 1,
    comments: mockComments.filter(comment => comment.postId === 2),
  },
  // Add more mock posts as needed
];
