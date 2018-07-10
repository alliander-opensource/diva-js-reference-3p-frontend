import axios from 'axios';

const baseUrl = `${window.env.baseUrl}/api`;

function getSessionData() {
  return axios
    .get(`${baseUrl}/get-session`, {
      withCredentials: true,
    })
    .then(response => response.data);
}

function deauthenticate() {
  return axios
    .get(`${baseUrl}/deauthenticate`, {
      withCredentials: true,
    });
}

const service = {
  getSessionData,
  deauthenticate,
};

export default service;
