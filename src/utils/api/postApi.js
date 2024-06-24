import { BaseApi } from "./base";

const http = new BaseApi("/api/v1");


export const  createPost = async ({  type, postText, postPhoto }) => {

  try {
    const response = await http.postPhotoUpload("/newsfeed",postPhoto, type, postText);
    console.log("resdataid",response );              
    return response;              
  } catch (error) {              
    console.error('Error:', error);              
    throw error;
  }
}


export const writeComment = async ({ post_id, commentText }) => {
  try {
    const response = await http.comment("/comments", { post_id, commentText });
    console.log("commentresponse", response);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
export const writeReply = async ({ comments_id, repliesText }) => {
  try {
    const response = await http.reply("/replies", { comments_id, repliesText });
    console.log("reply response", response);
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
      // console.log(response);
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


// export const register = (body) => {
//   return http.post("/auth/register", body);
// }


  //   setTimeout(() => {
  //     res([
  //       {
  //         post_id: 1,
  //         profileImg: "https://www.wpkixx.com/html/winku/images/resources/friend-avatar10.jpg",
  //         name: "John",
  //         surname: "Doe",
  //         postPhoto: "https://www.wpkixx.com/html/winku/images/resources/user-post.jpg",

  //         created_at: "Published: June,2 2018 19:PM",
  //         likeCount: 10,
  //         commentCount: 5,
  //         postText: "Lonely Cat Enjoying in Summer Curabitur #mypage ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc,",
  //         comments: [
  //           {
  //             comments_id: 1,
  //             profileImg: "https://www.wpkixx.com/html/winku/images/resources/friend-avatar5.jpg",
  //             userName: "	Jason Borne",
  //             commentText: "we are working for the dance and sing songs. this car is very awesome for the youngster. please vote this car and like our post",
  //             created_at: "1 year ago ",
  //             reply: [
  //               {
  //                 replies_id: 1,
  //                 profileImg: "https://www.wpkixx.com/html/winku/images/resources/comet-2.jpg",
  //                 userName: "	Alexendra Dadrio ",
  //                 repliesText: "yes, really very awesome car i see the features of this car in the official website of #Mercedes-Benz and really impressed :-)",
  //                 created_at: "1 month ago "
  //               },
  //               {
  //                 replies_id: 2,
  //                 profileImg: "https://www.wpkixx.com/html/winku/images/resources/comet-3.jpg",
  //                 userName: "Andy",
  //                 repliesText: "i like lexus cars, lexus cars are most beautiful with the awesome features, but this car is really outstanding than lexus",
  //                 created_at: "16 days ago"
  //               }
  //             ]
  //           },
  //           {
  //             id: 2,
  //             profileImg: "https://www.wpkixx.com/html/winku/images/resources/nearly6.jpg",
  //             userName: "Sarah",
  //             commentText: "we are working for the dance and sing songs. this video is very awesome for the youngster. please vote this video and like our channel ",
  //             created_at: "Jun 2030",
  //             reply: [
  //               {
  //                 replies_id: 1,
  //                 profileImg: "https://www.wpkixx.com/html/winku/images/resources/comet-2.jpg",
  //                 userName: "	Donald Trump ",
  //                 repliesText: "we are working for the dance and sing songs. this video is very awesome for the youngster. ",
  //                 created_at: "1 week ago "
  //               },
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         post_id: 2,
  //         profileImg: "https://www.wpkixx.com/html/winku/images/resources/friend-avatar11.jpg",
  //         name: "Janice",
  //         surname: "Griffith",
  //         created_at: "Jun 2030",
  //         postPhoto: "https://i0.wp.com/www.alphr.com/wp-content/uploads/2019/02/How-to-post-portrait-photos-on-Instagram-without-cropping1.jpg?fit=900%2C600&ssl=1",
  //         likeCount: 23,
  //         commentCount: 2,
  //         postText: "Feeling great today! Here's a photo from my recent vacation.",
  //         comments: [
  //           {
  //             id: 1,
  //             profileImg: "https://www.wpkixx.com/html/winku/images/resources/friend-avatar6.jpg",
  //             userName: "John",
  //             commentText: "Nice to meet you, Janice!",
  //             created_at: "Jun 2034",
  //             reply: [
  //               {
  //                 replies_id: 1,
  //                 profileImg: "https://www.wpkixx.com/html/winku/images/resources/friend-avatar8.jpg",
  //                 userName: "Bolt",
  //                 repliesText: "yes, really very awesome car i see the features of this car in the official website of #Mercedes-Benz and really impressed :-) 😍",
  //                 created_at: "Jul 2066"
  //               },
  //               {
  //                 replies_id: 2,
  //                 profileImg: "https://www.wpkixx.com/html/winku/images/resources/comet-3.jpg",
  //                 userName: "Andy",
  //                 commentText: "i like lexus cars, lexus cars are most beautiful with the awesome features, but this car is really outstanding than lexus 😎",
  //                 created_at: "Jul 2066"
  //               },
  //               {
  //                 replies_id: 3,
  //                 profileImg: "https://www.wpkixx.com/html/winku/images/resources/friend-avatar4.jpg",
  //                 userName: "Issabel",
  //                 repliesText: "I've always wanted to explore those mountains! Your adventure looks absolutely amazing. Thanks for sharing it with us! 🏞️",
  //                 created_at: "Jul 2066"
  //               }
  //             ]
  //           },
  //           {
  //             id: 2,
  //             profileImg: "https://www.wpkixx.com/html/winku/images/resources/comet-2.jpg",
  //             userName: "Sarah",
  //             commentText: "we are working for the dance and sing songs. this car is very awesome for the youngster. please vote this car and like our post 😊",
  //             created_at: "Jun 2030"
  //           }
  //         ]
  //       },
  //       {
  //         post_id: 3,
  //         profileImg: "https://www.wpkixx.com/html/winku/images/resources/photo12.jpg",
  //         name: "Emily",
  //         surname: "Johnson",
  //         created_at: "Apr 2028",
  //         postPhoto: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=600",
  //         likeCount: 15,
  //         commentCount: 3,
  //         postText: "Yesterday, I went on an amazing adventure through the lush forests and winding trails of the mountains. The scenery was absolutely breathtaking, with towering trees, cascading waterfalls, and colorful wildflowers at every turn. It felt like stepping into a fairytale! 🌲🌸✨ I captured some of the most magical moments on camera, and I can't wait to share them with you all!",
  //         comments: [
  //           {
  //             id: 2,
  //             profileImg: "https://www.wpkixx.com/html/winku/images/resources/friend-avatar4.jpg",
  //             userName: "John",
  //             commentText: "What an incredible journey! Your photos are like something out of a dream. 😍",
  //             created_at: "Jun 2030"
  //           },
  //           {
  //             id: 2,
  //             profileImg: "https://www.wpkixx.com/html/winku/images/resources/friend-avatar8.jpg",
  //             userName: "Sarah",
  //             commentText: "I'm in awe of the beauty you captured! Nature truly is the greatest artist. 🌿📸",
  //             created_at: "Jun 2030"
  //           }
  //         ]
  //       },
  //     ])
  //   }, 1000)
