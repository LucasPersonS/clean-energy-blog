import React, { useState } from 'react';
import Layout from './Layout';
import CreatePost from '../../components/Posts/CreatePost';
import PostList from '../../components/Posts/PostList';
import Tabs from '../../components/Utilitarios/Tabs';

const PostsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ForYou' | 'Following'>('ForYou');

  const handleTabChange = (tab: 'ForYou' | 'Following') => {
    setActiveTab(tab);
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
            <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
          <CreatePost />
          <PostList />
        </div>
      </div>
    </Layout>
  );
};

export default PostsPage;