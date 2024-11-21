export type Comment = {
  id: number;
  postId: number;
  author: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  content: string;
  timestamp: string;
};
