import axios from 'axios';

function getSessionData() {
  return axios
    .get('/api/get-session', {
      withCredentials: true,
    })
    .then(response => response.data);
}

function deauthenticate() {
  return axios
    .get('/api/deauthenticate', {
      withCredentials: true,
    });
}

const service = {
  getSessionData,
  deauthenticate,
};

export default service;
