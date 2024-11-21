import { User } from './User';

export interface Post {
  id: number;
  author: User;
  tweet: string;
  image?: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
  // Add other fields as needed
}

export interface Comment {
  id: number;
  author: {
    name: string;
    email: string;
    avatarUrl: string;
  };
  content: string;
  timestamp: string;
}
