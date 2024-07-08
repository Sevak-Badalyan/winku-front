  import { BaseApi } from "./base";
  const http = new BaseApi();
  const photoUrl =import.meta.env.VITE_PHOTO_URL
const defaultPFP = import.meta.env.VITE_DEFAULT_PROFILE
const defaultCover=import.meta.env.VITE_DEFAULT_COVER

  export const login = async (body) => {
    try { 
      const response = await http.post("/auth/login", body);

      console.log("REPONSE", response);
      const profileImg = response.profileImg ? response.profileImg : `${photoUrl}${defaultPFP}`
      const coverImg = response.coverImg ? response.coverImg : `${photoUrl}${defaultCover}`

  const modifiedResponse = {
    ...response,
    profileImg: `${profileImg}`,
    coverImg: `${coverImg}`,
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
