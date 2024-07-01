import { BaseApi } from "./base";

const http = new BaseApi("/api/v1/");

export const getPhotos = (user_id) => {
  

    return http.getById(`/newsfeed/photos/${user_id}`)
    .then(response => response)
    .catch(error => {
        console.error('Error fetching posts:', error);
        throw error;
      });
  }

 