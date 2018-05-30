import axios from 'axios';

function getSessionData() {
  return axios
    .get(`${window.env.baseUrl}/api/get-session`, {
      withCredentials: true,
    })
    .then(response => response.data);
}

function deauthenticate() {
  return axios
    .get(`${window.env.baseUrl}/api/deauthenticate`, {
      withCredentials: true,
    });
}

const service = {
  getSessionData,
  deauthenticate,
};

export default service;
