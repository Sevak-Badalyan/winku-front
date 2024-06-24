import { BaseApi } from "./base";

const http = new BaseApi();


export const changePicture = (body) => {
  const { file, type } = body; 
  return http.postUpload("/upload", file, type) 
    .then(response => response)
    .catch(error => {
      console.error('Error posting:', error);
      throw error;
    });
}

