import { BaseApi } from "./base";

const http = new BaseApi("/api/v1/");

export const getPhotos = (user_id) => {
  

  // export const getPhotosById = (user_id) => {
    return http.getById(`/newsfeed/photos/${user_id}`)
    .then(response => response)
    .catch(error => {
        // console.log(response);
        console.error('Error fetching posts:', error);
        throw error;
      });
  }

  
// }



  // return new Promise((res, rej) => {
  //   setTimeout(() => {
  //     res(
  //       [
  //         "https://wpkixx.com/html/winku/images/resources/photo3.jpg",
  //         "https://www.wpkixx.com/html/winku/images/resources/photo2.jpg",
  //         "https://www.wpkixx.com/html/winku/images/resources/photo4.jpg",
  //         "https://www.wpkixx.com/html/winku/images/resources/photo6.jpg",
  //         "https://www.wpkixx.com/html/winku/images/resources/photo11.jpg",
  //         "https://wpkixx.com/html/winku/images/resources/photo3.jpg",
  //         "https://www.wpkixx.com/html/winku/images/resources/photo2.jpg",
  //         "https://www.wpkixx.com/html/winku/images/resources/photo4.jpg",
  //         "https://www.wpkixx.com/html/winku/images/resources/photo6.jpg"
  //     ]
  //     )
  //   },0)
  // })
