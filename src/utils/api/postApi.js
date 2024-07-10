import { BaseApi } from "./base";

const http = new BaseApi("/api/v1");


export const  createPost = async ({  type, postText, postPhoto }) => {

  try {
    const response = await http.postPhotoUpload("/newsfeed",postPhoto, type, postText);
    // console.log("resdataid",response );              
    return response;              
  } catch (error) {              
    console.error('Error:', error);              
    throw error;
  }
}


export const writeComment = async ({ post_id, commentText }) => {
  try {
    const response = await http.comment("/comments", { post_id, commentText });
    // console.log("commentresponse", response);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
export const writeReply = async ({ comments_id, repliesText }) => {
  try {
    const response = await http.reply("/replies", { comments_id, repliesText });
    // console.log("reply response", response);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const getPosts = () => {
  return http.get('/newsfeed')
  .then(response => response)
  .catch(error => {
      console.error('Error fetching posts:', error);
      throw error;
    });
}

export const getPostsById = (user_id) => {
  return http.getById(`/newsfeed/${user_id}`)
  .then(response => response)
  .catch(error => {
      console.error('Error fetching posts:', error);
      throw error;
    });
}

export const delPostsById = (posts_id) => {
  return http.delete(`/newsfeed/${posts_id}`)
  .then(response => response)
  .catch(error => {
      console.error('Error fetching posts:', error);
      throw error;
    });
}