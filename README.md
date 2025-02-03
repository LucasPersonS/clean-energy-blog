# Energia Limpa Blog

Bem-vindo ao **Energia Limpa Blog**, uma plataforma desenvolvida com [Next.js](https://nextjs.org) para promover a sustentabilidade e o uso de energias renováveis. Este README fornecerá todas as informações necessárias para configurar, executar e contribuir para o projeto.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração das APIs](#configuração-das-apis)
- [Uso](#uso)
  - [Rodando o Servidor de Desenvolvimento](#rodando-o-servidor-de-desenvolvimento)
  - [Construindo para Produção](#construindo-para-produção)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Visão Geral

O **Energia Limpa Blog** é uma aplicação web que permite aos usuários:

- **Registrar-se e Fazer Login:** Gerencie sua conta de forma segura.
- **Criar e Interagir com Posts:** Compartilhe pensamentos, notícias e informações sobre energia limpa.
- **Participar de Quizzes:** Teste seus conhecimentos sobre sustentabilidade e energias renováveis.
- **Gerenciar Perfil:** Edite suas informações pessoais e visualize seus posts.

## Tecnologias Utilizadas

- **Frontend:**
  - [Next.js](https://nextjs.org) - Framework React para aplicações web.
  - [React](https://reactjs.org) - Biblioteca JavaScript para construção de interfaces de usuário.
  - [TypeScript](https://www.typescriptlang.org) - Superset do JavaScript com tipagem estática.
  - [Tailwind CSS](https://tailwindcss.com) - Utilitário CSS para estilização rápida.
  - [React Icons](https://react-icons.github.io/react-icons) - Ícones para React.

- **Backend:**
  - **Nota:** As APIs de autenticação e quizzes devem estar rodando separadamente. Referencie a seção [Configuração das APIs](#configuração-das-apis) para mais detalhes.

## Pré-requisitos

Antes de começar, certifique-se de que você tem os seguintes itens instalados em sua máquina:

- **Node.js** (v14 ou superior) - [Download](https://nodejs.org/)
- **Gerenciador de Pacotes**:
  - **npm** (vem com o Node.js)
  - ou **yarn** ([Instruções](https://yarnpkg.com/getting-started/install))
  - ou **pnpm** ([Instruções](https://pnpm.io/installation))
  - ou **bun** ([Instruções](https://bun.sh/))

## Instalação

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/seu-usuario/clean-energy-blog.git
   ```

2. **Acesse o Diretório do Projeto:**

   ```bash
   cd clean-energy-blog
   ```

3. **Instale as Dependências:**

   Utilize o gerenciador de pacotes de sua preferência:

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   # ou
   bun install
   ```

## Configuração das APIs


## Esse é um projeto para minha faculdade, onde desenvolvi uma API em JAVA, caso queira fazer o teste do blog 100% funcional, me envie uma mensagem para eu te enviar a API.
O projeto depende de duas APIs externas para funcionalidades de autenticação e quizzes:

1. **API de Autenticação:**

   - **URL Base:** `http://localhost:5000/api`
   - **Endpoints Principais:**
     - **Registro:** `POST /cadastro`
     - **Login:** `POST /login`

   **Como Rodar:**

   Certifique-se de que você tem a API de autenticação configurada e rodando nessa URL. Se a API fizer parte deste repositório ou de outro, siga as instruções específicas fornecidas nela.

2. **API de Quizzes:**

   - **URL Base:** `http://localhost:8080`
   - **Endpoints Principais:**
     - **Buscar Quizzes:** `GET /quizzes`
     - **Buscar Quiz por ID:** `GET /quizzes/:id`
     - **Criar Quiz:** `POST /quizzes`
     - **Atualizar Quiz:** `PUT /quizzes/:id`

   **Como Rodar:**

   Certifique-se de que você tem a API de quizzes configurada e rodando nessa URL. Se a API fizer parte deste repositório ou de outro, siga as instruções específicas fornecidas nela.

## Uso

### Rodando o Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento localmente:

```bash
npm run dev
```

Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação em ação.



## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

- **src**: Contém o código-fonte da aplicação.
  - **app**: Contém as páginas e componentes principais.
  - **components**: Contém componentes reutilizáveis.
  - **context**: Contém o contexto de autenticação.
  - **types**: Contém os tipos de dados utilizados na aplicação.

├── src/
│ ├── app/
│ │ ├── api/
│ │ │ ├── auth/
│ │ │ │ ├── login/
│ │ │ │ │ └── route.ts
│ │ │ │ └── register/
│ │ │ │ └── route.ts
│ │ │ └── quizzes.ts
│ │ ├── types/
│ │ │ ├── Comment.ts
│ │ │ ├── Post.ts
│ │ │ ├── User.ts
│ │ │ └── quiz.ts
│ │ └── layout.tsx
│ ├── components/
│ │ ├── Auth/
│ │ │ ├── LoginForm.tsx
│ │ │ └── RegisterForm.tsx
│ │ ├── Footer/
│ │ │ └── Footer.tsx
│ │ ├── Posts/
│ │ │ ├── CreatePost.tsx
│ │ │ ├── PostList.tsx
│ │ │ ├── PostModal.tsx
│ │ │ ├── HeaderPost.tsx
│ │ │ └── ImageUploadButton.tsx
│ │ ├── Quiz/
│ │ │ ├── CreateQuiz.tsx
│ │ │ ├── EditQuiz.tsx
│ │ │ └── QuizDetail.tsx
│ │ └── Utilitarios/
│ │ ├── Notification.tsx
│ │ ├── Skeleton.tsx
│ │ └── Tabs.tsx
│ ├── context/
│ │ ├── AuthContext.tsx
│ │ └── PostContext.tsx
│ ├── data/
│ │ └── mockPosts.ts
│ └── pages/
│ ├── auth/
│ │ ├── login.tsx
│ │ └── register.tsx
│ ├── perfil/
│ │ └── profile.tsx
│ ├── posts/
│ │ └── Layout.tsx
│ ├── quizzes/
│ │ ├── create.tsx
│ │ └── [id].tsx
│ ├── index.tsx
│ ├── featured.tsx
│ ├── quiz.tsx
│ └── not-found.tsx
├── public/
│ ├── avatars/
│ ├── logo.png
│ └── 404.jpg
├── styles/
│ └── globals.css
├── .gitignore
├── package.json
├── next.config.js
└── tsconfig.json
