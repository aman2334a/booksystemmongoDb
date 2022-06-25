

import axios from 'axios';
const baseUrl='http://localhost:8000/'
export const loginApi=(data)=>{
    var data = JSON.stringify({
        "username": data.username,
        "password": data.password
      });
      
      var config = {
        method: 'post',
        url: baseUrl+'signin',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      return axios(config)
      
}

export const signupApi=(data)=>{
  var data = JSON.stringify({
    "username": data.username,
    "password": data.password
  });
  
  var config = {
    method: 'post',
    url: baseUrl+'register',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  
}

export const getAllBooks=(ac_token)=>{
  var axios = require('axios');
    var config = {
      method: 'get',
      url: baseUrl+'getbooks',
      headers: { 
        'Authorization': 'Bearer '+ac_token
      }
    };

    return axios(config)
    

}


export const updatebookAPi=(dataObject,ac_token)=>{
  var data = JSON.stringify(dataObject);
  console.log("updateApi",dataObject)
  
  var config = {
    method: 'put',
    url: baseUrl+'updatebook',
    headers: { 
      'Authorization': 'Bearer '+ac_token, 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
 return axios(config)
  
}


export const getBookByIdApi=(id,ac_token)=>{
  var config = {
    method: 'get',
    url: baseUrl+'getBookById?id='+id,
    headers: { 
      'Authorization': 'Bearer '+ac_token
    }
  };
  
  return axios(config)
  
}

export const addBookApi=(dataObject,ac_token)=>{
  var data = JSON.stringify(dataObject);
  
  var config = {
    method: 'post',
    url: baseUrl+'addbook',
    headers: { 
      'Authorization': 'Bearer '+ac_token, 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  
  
}

export const searchbookByAuthorNameAPi=(name,ac_token)=>{
    var config = {
      method: 'get',
      url: baseUrl+'searchbook?authorName='+name,
      headers: { 
        'Authorization': 'Bearer '+ac_token
      }
    };

    return axios(config)
   

}