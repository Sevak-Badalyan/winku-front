import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Posts.scss';


const SkeletonPosts = () => {
  return (
    <div className="post">
      <div className="userInfo">
        <Skeleton circle={true} height={40} width={40} className="userImg" />
        <div className="name">
          <Skeleton width={150} />
          <div className="publishDate text-xs">
            <Skeleton width={100} />
          </div>
        </div>
      </div>
      <div className="postContent">
        <Skeleton height={300} className="postPhoto" />
        <div className="interactions">
          <div className="likes">
            <Skeleton width={30} height={30} circle={true} />
            <Skeleton width={20} />
          </div>
        </div>
        <form>
          <div className="writeComment">
            <Skeleton circle={true} height={40} width={40} className="userImg" />
            <label>
              <Skeleton width="100%" height={20} />
              <Skeleton width={20} height={20} circle={true} />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkeletonPosts;
