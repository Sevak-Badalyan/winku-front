

export class BaseApi {

  prefix = "";
  apiUrl = "/api"
  constructor(prefix = "/api/v1") {
    this.prefix = prefix;
  }


  


  onResponse(response) {
    if (!response.ok) {
      return response.json().then(err => { throw err; });
    }
    return response.json();
  }

  post(path, body) {

    return fetch(`${this.apiUrl}${this.prefix}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        // 'Authorization': `Bearer ${accessToken}`,
      },

      body: JSON.stringify(body)
    }).then(this.onResponse);
  }

  get(path) {
    const { accessToken } = JSON.parse(localStorage.getItem('userData'));

    return fetch(`${this.apiUrl}${this.prefix}${path}`, {
      
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${accessToken}`,
      }

    }).then(this.onResponse);
  }


 delete(path) {
    const { accessToken } = JSON.parse(localStorage.getItem('userData'));

    return fetch(`${this.apiUrl}${this.prefix}${path}`, {
      
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${accessToken}`,
      }

    }).then(this.onResponse);
  }

  
  postAnswer(path, body) {
    const { accessToken } = JSON.parse(localStorage.getItem('userData'));

    return fetch(`${this.apiUrl}${this.prefix}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${accessToken}`,
      },

      body: JSON.stringify(body)
    }).then(this.onResponse);
  }
  

  getById(path) {
    const { accessToken } = JSON.parse(localStorage.getItem('userData'));

    return fetch(`${this.apiUrl}${this.prefix}${path}`, {
      
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${accessToken}`,
      }

    }).then(this.onResponse);
  }


  postUpload(path, file, type) {

    const { accessToken } = JSON.parse(localStorage.getItem('userData'))
    const headers = {
      'Authorization': `Bearer ${accessToken}`
    };

    const formData = new FormData();
    const { id } = JSON.parse(localStorage.getItem('userData'));

    formData.append('id', id);
    formData.append('type', type);
    formData.append('image', file);


    return fetch(`${this.apiUrl}${this.prefix}${path}`, {
      method: 'POST',
      headers: headers, 
      body: formData
    }).then(this.onResponse);
  }



  postPhotoUpload(path, postPhoto, type, postText) {
    const { accessToken } = JSON.parse(localStorage.getItem('userData'));
    const headers = {
      'Authorization': `Bearer ${accessToken}`
    };

    const formData = new FormData();
    const  {id } = JSON.parse(localStorage.getItem('userData'));

    formData.append('user_id', id);
    formData.append('type', type);
    formData.append('postText', postText);
    formData.append('postPhoto', postPhoto);
   

    return fetch(`${this.apiUrl}${this.prefix}${path}`, {
      method: 'POST',
      headers: headers, 
      body: formData 
    }).then(this.onResponse);
  }

 

  comment(path, { post_id, commentText }) {
    const { accessToken } = JSON.parse(localStorage.getItem('userData'));
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${accessToken}`
    };
  
    const { id } = JSON.parse(localStorage.getItem('userData'));
  
    const body = JSON.stringify({
      user_id: id,
      posts_id: post_id,
      commentText: commentText
    });
  
    return fetch(`${this.apiUrl}${this.prefix}${path}`, {
      method: 'POST',
      headers: headers,
      body: body
    }).then(this.onResponse);
  }



  reply(path,{ comments_id, repliesText}) {
    const { accessToken } = JSON.parse(localStorage.getItem('userData'));
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${accessToken}`
    };
    const { id } = JSON.parse(localStorage.getItem('userData'));
  
    const body = JSON.stringify({
      user_id: id,
      comments_id: comments_id,
      repliesText: repliesText
    });
    return fetch(`${this.apiUrl}${this.prefix}${path}`, {
      method: 'POST',
      headers: headers,
      body: body
    }).then(this.onResponse);
  }
}
