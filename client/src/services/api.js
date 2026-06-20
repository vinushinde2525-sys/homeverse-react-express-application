// src/services/api.js
// Centralised API layer — all server calls go through here


import axios from "axios";


// Render backend URL from environment variable
const api = axios.create({

  baseURL: import.meta.env.VITE_API_URL + "/api",

  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
  },

});




// Response interceptor
api.interceptors.response.use(

  (res) => res.data,


  (err) => {

    const message =
      err.response?.data?.message ||
      "Something went wrong. Please try again.";


    return Promise.reject(
      new Error(message)
    );

  }

);





// ===============================
// Properties API
// ===============================


export const propertiesApi = {


  getAll:

  (params) =>
    api.get(
      "/properties",
      {
        params
      }
    ),



  getById:

  (id) =>
    api.get(
      `/properties/${id}`
    ),



  getFeatured:

  () =>
    api.get(
      "/properties/featured"
    ),



  getPopularLocations:

  () =>
    api.get(
      "/properties/popular-locations"
    ),



  getStats:

  () =>
    api.get(
      "/properties/stats"
    ),


};






// ===============================
// Agents API
// ===============================


export const agentsApi = {


  getAll:

  () =>
    api.get(
      "/agents"
    ),



  getById:

  (id) =>
    api.get(
      `/agents/${id}`
    ),


};







// ===============================
// Inquiry API
// ===============================


export const inquiriesApi = {


  submit:

  (data) =>
    api.post(
      "/inquiry",
      data
    ),


};





export default api;