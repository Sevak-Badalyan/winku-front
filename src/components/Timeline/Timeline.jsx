

import React, { useState, useEffect } from 'react';
import Posts from '../Posts/Posts';
import Publish from '../Publish/Publish';
import SkeletonPosts from '../Posts/SkeletonPosts'; 
import { getPostsById } from '../../utils/api/postApi';

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const { id } = JSON.parse(localStorage.getItem('userData'));
      const postsData = await getPostsById(id);
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRefreshPosts = async () => {
    setLoadingPosts(true);
    await fetchPosts();
  };

  return (
    <div>
      <Publish refreshPosts={handleRefreshPosts} />
      {loadingPosts ? (
        <div>
          <SkeletonPosts />
          <SkeletonPosts />
        </div>
      ) : (
        <Posts posts={posts} setPosts={setPosts} />
      )}
    </div>
  );
}
