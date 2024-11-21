export type Comment = {
  id: number;
  postId: number;
  author: {
    id: string;
    nome: string;
    email: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  content: string;
  timestamp: string;
};
