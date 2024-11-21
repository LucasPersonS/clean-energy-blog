import { User } from './User';
import { Comment } from './Comment';

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
