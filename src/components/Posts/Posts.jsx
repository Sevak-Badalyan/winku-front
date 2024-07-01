

import React, { useEffect, useState } from 'react';
import { delPostsById, writeComment, writeReply } from '../../utils/api/postApi';
import { getUserData } from '../../utils/api/usersApi';
import './Posts.scss';
import { useLocation } from 'react-router-dom';

const photoUrl = import.meta.env.VITE_PHOTO_URL;
const defaultPhoto = 'upload/default/profile/beff811f-c8ce-44b1-9ebb-21e699f6d82a.webp';

export default function Posts({ posts, setPosts }) {
  const [commentText, setCommentText] = useState({});
  const [users, setUser] = useState({});
  const [replyText, setReplyText] = useState({});
  const [replyToComment, setReplyToComment] = useState({ postId: null, commentId: null });
  const { pathname } = useLocation();

  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, []);

  const handleInputChange = (postId, event) => {
    setCommentText({ ...commentText, [postId]: event.target.value });
  };


  const handleReplyInputChange = (commentId, event) => {
    setReplyText({ ...replyText, [commentId]: event.target.value });
  };

  const handleCommentSubmit = async (postId) => {
    try {
      if (!commentText[postId]?.trim()) {
        return;
      }

      const response = await writeComment({
        post_id: postId,
        commentText: commentText[postId]
      });

      console.log('Comment posted:', response);

      setCommentText({ ...commentText, [postId]: '' });

      const newComment = {
        ...response,
        userProfileImg: response.profileImg,
        userName: response.name,
      };

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.posts_id === postId
            ? { ...post, comments: [...post.comments, newComment], commentCount: post.commentCount + 1 }
            : post
        )
      );
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleReplySubmit = async (commentId) => {
    try {
      if (!replyText[commentId]?.trim()) {
        return;
      }

      const response = await writeReply({ comments_id: commentId, repliesText: replyText[commentId] });
      console.log('Reply posted:', response);

      setReplyText({ ...replyText, [commentId]: '' });
      setReplyToComment({ postId: null, commentId: null });

      const newReply = {
        ...response,
        userProfileImg: response.profileImg,
        userName: response.name
      };

      setPosts(prevPosts =>
        prevPosts.map(post => ({
          ...post,
          comments: post.comments.map(comment =>
            comment.comments_id === commentId
              ? {
                ...comment,
                replies: [...(comment.replies || []), newReply]
              }
              : comment
          )
        }))
      );
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const handleReplyClick = (postId, commentId) => {
    if (replyToComment.postId === postId && replyToComment.commentId === commentId) {
      setReplyToComment({ postId: null, commentId: null });
    } else {
      setReplyToComment({ postId, commentId });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'now';
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'now';
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };
  const deletePost = async (posts_id) => {
    try {
    const response = await delPostsById(posts_id);
    console.log('Deleted post:', response);
    setPosts((prevPosts) => prevPosts.filter(elem => elem.posts_id != posts_id))
    } catch (error) {
    console.error('Error deleting post:', error);
      
    }
  }

  return (
    <div className="bigPost">
      <div className="postsContainer">
        {posts.map(post => (
          <div key={post.posts_id} className="post">
            <div className="userInfo">
              <img src={`${photoUrl}${post.userProfileImg || defaultPhoto}`} alt={post.name} className="userImg" />
              <div className="name">
                {post.userName} {post.userSurname}
                <div className="publishDate text-xs">Published: {formatDate(post.postCreatedAt)}</div>
              </div>
              {pathname === '/'? 
               <span
              onClick={() => deletePost(post.posts_id)}
              className="close-button"
            >
              &times;
            </span>:false
            }
           

            </div>
            <div className="postContent">
              {post.postPhoto && !post.postPhoto.includes('/undefined') ? (
                <img src={`${photoUrl}${post.postPhoto}`} alt="Post" className="postPhoto" />
              ) : null}
              <div className="interactions">
                <div className="likes">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                  </svg>
                  <span>{post.likeCount}</span>
                </div>
                <div className="comments">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                  </svg>
                  <span>{post.commentCount}</span>
                </div>
              </div>
              <div className="postText text-sm font-light">{post.postText}</div>
            </div>

            <div className="commentsContainer">
              {post.comments.map(comment => (
                <div key={comment.comments_id} className="comments">
                  <div className="comment">
                    <img src={`${photoUrl}${comment.userProfileImg || defaultPhoto}`} alt={comment.userName} className="commentUserImg" />
                    <div className="onlyComment">
                      <div className="commentUserInfo">
                        <div className="commentUserName font-light">{comment.userName}</div>
                        <div className="commentDate">{formatDate(comment.commentCreatedAt)}</div>
                        <button onClick={() => handleReplyClick(post.posts_id, comment.comments_id)}>
                          <div className='replyBut text-sky-500 hover:text-stone-500 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-reply-fill" viewBox="0 0 16 16">
                              <path d="M5.921 11.9 1.353 8.62a.72.72 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
                            </svg>
                          </div>
                        </button>
                      </div>
                      <div className="commentText text-sm font-light">{comment.commentText}</div>
                    </div>
                  </div>

                  {comment.replies && comment.replies.map(reply => (
                    <div key={reply.replies_id} className="replys">
                      <div className='reply'>
                        <img src={`${photoUrl}${reply.userProfileImg || defaultPhoto}`} alt={reply.userName} className="replyUserImg" />
                        <div className="replyBox">
                          <div className="replyUserInfo">
                            <div className="replyUserName">{reply.userName}</div>
                            <div className="replyDate">{formatDate(reply.replyCreatedAt)}</div>
                            <button onClick={() => handleReplyClick(post.posts_id, comment.comments_id)}>
                              <div className='replyBut text-sky-500 hover:text-stone-500 cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-reply-fill" viewBox="0 0 16 16">
                                  <path d="M5.921 11.9 1.353 8.62a.72.72 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
                                </svg>
                              </div>
                            </button>
                          </div>
                          <div className="replyText text-sm font-light">{reply.repliesText}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (replyToComment.commentId && replyToComment.postId === post.posts_id) {
                  handleReplySubmit(replyToComment.commentId);
                } else {
                  handleCommentSubmit(post.posts_id);
                }
              }}
            >
              <div className='writeComment' >
                <img src={users.profileImg || defaultPhoto} className="userImg" />
                <label htmlFor={`iconInput-${post.posts_id}`}>
                  <input
                    type="text"
                    placeholder={
                      replyToComment.postId === post.posts_id && replyToComment.commentId
                        ? `Write a ${posts
                          .flatMap(post => post.comments)
                          .find(comment => comment.comments_id === replyToComment.commentId)?.userName || ''}'s reply...`
                        : "Post your comment..."
                    }
                    id={`iconInput-${post.posts_id}`}
                    value={replyToComment.postId === post.posts_id && replyToComment.commentId ? replyText[replyToComment.commentId] || '' : commentText[post.posts_id] || ''}
                    onChange={replyToComment.postId === post.posts_id && replyToComment.commentId ? (e) => handleReplyInputChange(replyToComment.commentId, e) : (e) => handleInputChange(post.posts_id, e)}
                    onDoubleClick={() => setReplyToComment({ postId: null, commentId: null })}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-smile" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
                  </svg>
                </label>
              </div>
            </form>
          </div>
        ))}
      </div>


    </div>
  );
}
