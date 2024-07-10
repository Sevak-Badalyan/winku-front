


// import React, { useState, useEffect } from 'react';
// import Posts from '../Posts/Posts';
// import Publish from '../Publish/Publish';
// import { getPostsById } from '../../utils/api/postApi';

// export default function Timeline() {
//   const [posts, setPosts] = useState([]);
//   const [loadingPosts, setLoadingPosts] = useState(true);

//   const fetchPosts = async () => {
//     try {
//       const { id } = JSON.parse(localStorage.getItem('userData'));
//       const postsData = await getPostsById(id);
//       setPosts(postsData);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <div>
//       <Publish refreshPosts={fetchPosts} />
//       <Posts posts={posts} setPosts={setPosts} />
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import Posts from '../Posts/Posts';
import Publish from '../Publish/Publish';
import SkeletonPosts from '../Posts/SkeletonPosts'; 
import { getPostsById } from '../../utils/api/postApi';

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const fetchPosts = async () => {
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

  return (
    <div>
      <Publish refreshPosts={fetchPosts} />
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
