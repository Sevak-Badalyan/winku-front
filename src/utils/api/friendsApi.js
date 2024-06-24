import { BaseApi } from "./base";

const http = new BaseApi("/api/v1");

export const getFriends = () => {
    return http.get('/friends')
  .then(response => response)
  .catch(error => {
      // console.log(response);
      console.error('Error fetching posts:', error);
      throw error;
    });
}
export const getFriendsMessage = () => {
  return http.get('/friends/message')
.then(response => response)
.catch(error => {
    console.error('Error fetching posts:', error);
    throw error;
  });
}

export const getFriendsMessageById = (friendships_id) => {
  return http.get(`/friends/message/${friendships_id}`)
.then(response => response)
.catch(error => {
    console.error('Error fetching posts:', error);
    throw error;
  });
}

export const getFriendsRequests = () => {
    return http.get('/friends-requests')
  .then(response => response)
  .catch(error => {
      // console.log(response);
      console.error('Error fetching posts:', error);
      throw error;
    });
}



export const deleteFriends = (friend_id) => {
    return http.delete(`/friends/${friend_id}`)
  .then(response => response)
  .catch(error => {
      // console.log(response);
      console.error('Error fetching posts:', error);
      throw error;
    });
}

export const answerFriendsRequests = ({sender_id, statusFr}) => {
  return http.postAnswer('/friends-requests/answer',{ sender_id, statusFr})
.then(response => response)
.catch(error => {
    // console.log(response);
    console.error('Error fetching posts:', error);
    throw error;
  });
}






export const getExplorePeoples = () => {
  return http.get('/friends/explore-people')
.then(response => response)
.catch(error => {
    // console.log(response);
    console.error('Error fetching posts:', error);
    throw error;
  });
}


export const addFriends = ({receiver_id}) => {
  return http.postAnswer('/friends-requests',{ receiver_id})
.then(response => response)
.catch(error => {
    // console.log(response);
    console.error('Error fetching posts:', error);
    throw error;
  });
}







//   return new Promise((res, rej) => {
    // setTimeout(() => {
    //   res(
    //     [
    //       {
    //           id: 1,
    //           name: 'Bucky',
    //           surname: "Barnes",
    //           email: 'barnes@gmail.com',
    //           img: 'https://wpkixx.com/html/winku/images/resources/friend-avatar.jpg',
    //           status: 'online'
    //       },
    //       {
    //           id: 2,
    //           name: 'Sarah',
    //           surname: "Loren",
    //           email: 'loren@gmail.com',
    //           img: 'https://wpkixx.com/html/winku/images/resources/friend-avatar2.jpg',
    //           status: 'away'
    //       },
    //       {
    //           id: 3,
    //           name: 'Jason',
    //           surname: "Boren",
    //           email: 'boren@gmail.com',
    //           img: 'https://wpkixx.com/html/winku/images/resources/friend-avatar3.jpg',
    //           status: 'away'
    //       },
    //       {
    //           id: 4,
    //           name: 'Jason',
    //           surname: "Boren",
    //           email: 'boren@gmail.com',
    //           img: 'https://wpkixx.com/html/winku/images/resources/friend-avatar3.jpg',
    //           status: 'offline'
      
    //       },
    //       {
    //           id: 5,
    //           name: 'Bucky',
    //           surname: "Barnes",
    //           email: 'barnes@gmail.com',
    //           img: 'https://wpkixx.com/html/winku/images/resources/friend-avatar.jpg',
    //           status: 'online'
    //       },
    //       {
    //           id: 6,
    //           name: 'Sarah',
    //           surname: "Loren",
    //           email: 'loren@gmail.com',
    //           img: 'https://wpkixx.com/html/winku/images/resources/friend-avatar2.jpg',
    //           status: 'away'
    //       },
    //       {
    //           id: 7,
    //           name: 'Jason',
    //           surname: "Boren",
    //           email: 'boren@gmail.com',
    //           img: 'https://wpkixx.com/html/winku/images/resources/friend-avatar3.jpg',
    //           status: 'away'
    //       },
    //       {
    //           id: 8,
    //           name: 'Jasoshmn',
    //           surname: "Boreaaan",
    //           email: 'boren@gmail.com',
    //           img: 'https://wpkixx.com/html/winku/images/resources/friend-avatar3.jpg',
    //           status: 'online'
      
    //       }
    //   ]
    //   )
    // }, 2000)
//   })
  // return http.get();
// }