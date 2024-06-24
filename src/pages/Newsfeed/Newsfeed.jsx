








import React, { useState, useEffect } from 'react';
import Shortcuts from '../../components/Shortcuts/Shortcuts';
import Publish from '../../components/Publish/Publish';
import Friends from '../../components/Friends/Friends';
import { Navbar } from '../../components/Navbar/Navbar';
import './Newsfeed.css';
import Footer from '../../components/Footer/Footer';
import Posts from '../../components/Posts/Posts';
import { getPosts } from '../../utils/api/postApi';

export default function Newsfeed() {

  const [posts, setPosts] = useState([]);

  // const fetchPosts = async () => {
  //   try {
  //     const postsData = await getPosts();
  //     setPosts(postsData);
  //   } catch (error) {
  //     console.error('Error fetching posts:', error);
  //   }
  // };


  const fetchPosts = async () => {
        try {
          let postsData;
       
            postsData = await getPosts();
          
          const updatedPosts = [...posts, ...postsData];
          setPosts(updatedPosts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        } 
      };

  useEffect(() => {
    fetchPosts();
  }, []);
  const handleRefresh = () => {
        fetchPosts();
      };
  return (
    <div className='newsfeedContainer'>
      <div>
        <Navbar />
      </div>
      <div className='gridMenu'>
        <Shortcuts />
        <div>
          <Publish refreshPosts={fetchPosts} />
          <Posts posts={posts } setPosts={setPosts}/>
          <button className='refreshPosts' onClick={handleRefresh}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
          </svg>
        </button>
        </div>
        <Friends />
      </div>
      <Footer />
    </div>
  );
}
