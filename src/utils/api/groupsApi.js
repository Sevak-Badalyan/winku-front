import { BaseApi } from "./base";

const http = new BaseApi("/api/v1");


export const addGroups = ({group_name}) => {
  return http.postAnswer('/groups',{ group_name})
.then(response => response)
.catch(error => {
    // console.log(response);
    throw error;
  });
}


export const addMembers = ({group_id ,user_id }) => {
  return http.postAnswer('/members',{ group_id ,user_id })
.then(response => response)
.catch(error => {
    console.error('Error fetching members:', error);
    throw error;
  });
}


export const getGroups = () => {
  return http.get('/members')
.then(response => response)
.catch(error => {
    console.error('Error fetching groups:', error);
    throw error;
  });
}


export const getMembers = (group_id) => {
  return http.getById(`/members/${group_id}`)
.then(response => response)
.catch(error => {
    console.error('Error fetching members:', error);
    throw error;
  });
}


export const delMembers = ({group_id,user_id}) => {
  return http.delete(`/members/${group_id}/user/${user_id}`) 
  .then(response => response)

    .catch(error => {
      console.error('Error deleting member:', error);
      throw error;
    });
};


export const getGroupMessageById = (group_id) => {
  return http.get(`/members/message/${group_id}`)          
.then(response => response)
.catch(error => {
    console.error('Error fetching posts:', error);
    throw error;
  });
}


