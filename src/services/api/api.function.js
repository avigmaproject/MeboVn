import axios from 'axios';
import {API, BASE_URL} from './api.types';

export const register = async data => {
  return axios(`${BASE_URL}${API.REGISTRATION_API}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    data: data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const login = async data => {
  return axios(`${BASE_URL}${API.LOGIN_API}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    data: data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const createupdateenroller = async (data, access_token) => {
  return axios(`${BASE_URL}${API.CREATE_UPDATE_ENROLLER_MASTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    data: data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const adduser = async (data, access_token) => {
  return axios(`${BASE_URL}${API.ADD_USER_MASTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    data: data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getstate = async data => {
  return axios(`${BASE_URL}${API.GET_STATE_MASTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + access_token,
    },
    data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const forgotpassword = async data => {
  return axios(`${BASE_URL}${API.FORGOT_PASSWORD}`, {
    method: 'POST',
    data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const resetpassword = async data => {
  return axios(`${BASE_URL}${API.RESET_PASSWORD}`, {
    method: 'POST',
    data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getenrollermaster = async (data, access_token) => {
  return axios(`${BASE_URL}${API.GET_ENROLLER_MASTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};
export const getusermaster = async (data, access_token) => {
  return axios(`${BASE_URL}${API.GET_USER_MASTER_MASTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getuserhome = async (data, access_token) => {
  return axios(`${BASE_URL}${API.Get_User_Home}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};
