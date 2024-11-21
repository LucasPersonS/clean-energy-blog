import React, { useState } from 'react';
import Layout from './Layout';
import CreatePost from '../../components/Posts/CreatePost';
import PostList from '../../components/Posts/PostList';
import Tabs from '../../components/Utilitarios/Tabs';
import ProtectedRoute from '../../components/ProtectedRoute';
import { mockPosts } from '../../data/mockPosts';

const PostsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ForYou' | 'Following'>('ForYou');

  const handleTabChange = (tab: 'ForYou' | 'Following') => {
    setActiveTab(tab);
  };

  const filteredPosts = mockPosts.filter(post => post.author.isFollowing);

  return (
    <ProtectedRoute>
      <Layout>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
            {activeTab === 'ForYou' && (
              <>
                <CreatePost />
                <PostList />
              </>
            )}
            {activeTab === 'Following' && (
              <>
                <CreatePost />
                <PostList posts={filteredPosts} />
              </>
            )}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default PostsPage;