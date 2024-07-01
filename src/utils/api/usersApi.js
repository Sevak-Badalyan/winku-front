  import { BaseApi } from "./base";
  const http = new BaseApi();
  const photoUrl =import.meta.env.VITE_PHOTO_URL

  export const login = async (body) => {
    try { 
      const response = await http.post("/auth/login", body);

      console.log("REPONSE", response);

      const profileImg = response.profileImg ? response.profileImg : 'upload/default/profile/beff811f-c8ce-44b1-9ebb-21e699f6d82a.webp' 
      const coverImg = response.coverImg ? response.coverImg : 'upload/default/cover/54ca2cf5-b891-4c7e-8484-9403fa310d9b.png' 

  const modifiedResponse = {
    ...response,
    profileImg: `${photoUrl}${profileImg}`,
    coverImg: `${photoUrl}${coverImg}`,
  }
  return { modifiedResponse};
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  export const getUserData = () => {
      const users = JSON.parse(localStorage.getItem('userData'));
  
      return users;
      }






  export const register = (body) => {
    return http.post("/auth/register", body);
  }



export const editUsers = ({ name ,surname , position}) => {
  return http.postAnswer('/users',{ name ,surname , position})
.then(response => response)
.catch(error => {
    console.error('Error fetching posts:', error);
    throw error;
  });
}


export const getAllUsers = () => {
  return http.get('/users')                           
.then(response => response)
.catch(error => {
    console.error('Error fetching posts:', error);
    throw error;
  });
}


export const searchUsers = (searchText) => {
  return http.postAnswer('/users/search',searchText)                           
.then(response => response)
.catch(error => {
    console.error('Error fetching posts:', error);
    throw error;
  });
}
