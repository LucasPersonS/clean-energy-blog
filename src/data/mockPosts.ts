import { Post } from '../app/types/Post';
import { Comment } from '../app/types/Comment';
import { User } from '../app/types/User';


const mockUsers: User[] = [
  {
    id: 'user1',
    nome: 'Lucas',
    email: 'Lucas@example.com',
    avatarUrl: '/avatars/avatar1.png',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    isFollowing: true,
  },
  {
    id: 'user2',
    nome: 'Loca Smith',
    email: 'Loca@example.com',
    avatarUrl: '/default-avatar.png',
    createdAt: '2023-02-15T00:00:00Z',
    updatedAt: '2023-02-15T00:00:00Z',
    isFollowing: true,
  },
  {
    id: 'user3',
    nome: 'Jonatha Louco',
    email: 'Jonatha@example.com',
    avatarUrl: '/avatars/avatar1.png',
    createdAt: '2023-02-15T00:00:00Z',
    updatedAt: '2023-02-15T00:00:00Z',
    isFollowing: false,
  },
  {
    id: 'user4',
    nome: 'Jorjão Feio',
    email: 'Jorjão@example.com',
    avatarUrl: '/avatars/avatar1.png',
    createdAt: '2023-02-25T04:00:00Z',
    updatedAt: '2023-02-25T04:00:00Z',
    isFollowing: false,
  },
];

const mockComments: Comment[] = [
  {
    id: 1,
    postId: 1,
    author: { ...mockUsers[1], id: '1' },
    content: 'Ótimo post! Muito interessante!',
    timestamp: '2023-04-01T12:34:56Z',
  },
  {
    id: 2,
    postId: 1,
    author: { ...mockUsers[0], id: '0' },
    content: 'Eae, você é um dos melhores criadores dessa plataforma!',
    timestamp: '2023-04-02T09:21:43Z',
  },
  {
    id: 3,
    postId: 3,
    author: { ...mockUsers[2], id: '2' },
    content: 'Realmente é um app muito bom!',
    timestamp: '2023-04-01T12:34:56Z',
  },
  {
    id: 4,
    postId: 4,
    author: { ...mockUsers[3], id: '3' },
    content: 'Obrigado pelo feedback!',
    timestamp: '2023-04-02T09:21:43Z',
  },
];

export const mockPosts: Post[] = [
  {
    id: 4,
    author: mockUsers[3],
    tweet: 'Bom dia! Primeira vez usando esse app!',
    image: '/logo.png',
    likes: 25,
    dislikes: 12,
    comments: mockComments.filter(comment => comment.postId === 4),
  },
  {
    id: 3,
    author: mockUsers[2],
    tweet: 'Dizem que esse joguinho aqui, ajuda os macaquinhos da amazônia! Vamos jogar?!	',
    image: '/dart.png',
    likes: 65,
    dislikes: 32,
    comments: mockComments.filter(comment => comment.postId === 3),
  },
  {
    id: 2,
    author: mockUsers[1],
    tweet: 'Eu acho que esse app é muito bom! Vamos ajudar o planeta?',
    likes: 40,
    dislikes: 1,
    comments: mockComments.filter(comment => comment.postId === 2),
  },
  {
    id: 1,
    author: mockUsers[0],
    tweet: 'Explorando os benefícios das fontes de energia renováveis. #sustentabilidade',
    image: '/avatars/avatar1.png',
    likes: 25,
    dislikes: 3,
    comments: mockComments.filter(comment => comment.postId === 1),
  },
];
