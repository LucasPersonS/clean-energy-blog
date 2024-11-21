import React from 'react';
import Layout from '../components/Layout';
import PostList from '../components/Posts/PostList';
import { usePosts } from '../context/PostContext';

const FeaturedPage = () => {
  const { posts } = usePosts();

  // Sort posts by likes in descending order
  const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-white">Posts em Destaque</h2>
        <PostList posts={sortedPosts} />
      </div>
    </Layout>
  );
};

export default FeaturedPage;