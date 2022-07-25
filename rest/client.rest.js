import axiosClient from './client.base';
import axios from 'axios';
import {CLIENT_PATH} from './client.path';
const BASE_URL = 'http://192.168.2.12:8000/';

export const sendWrappedDocument = async (path, data, access_token = null) => {
  let headers = {};
  if (access_token) {
    headers = {Cookie: `access_token=${access_token}`};
  }
  return await axios.post(`${BASE_URL}${path}`, data, {headers});
};

/**
 * Call cardano service for verifying CNFT
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */
export const requestVerifyCNFT = async (path, data, access_token = null) => {
  const {hashOfDocument, policyId} = data;
  let headers = {
    hashOfDocument,
    policyId,
  };
  if (access_token) {
    headers = {...headers, Cookie: `access_token=${access_token}`};
  }
  return await axiosClient.get(`${BASE_URL}${path}`, {
    headers: headers,
  });
};

/**
 * Call cardano service for verifying signature rely on targetHash and public-key
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */
export const requestVerifySignature = async (
  path,
  data,
  access_token = null,
) => {
  const {address, payload, signature, key} = data;
  let headers = {
    address,
    payload,
    signature,
    key,
  };
  if (access_token) {
    headers = {...headers, Cookie: `access_token=${access_token}`};
  }
  return await axiosClient.get(`${BASE_URL}${path}`, {
    headers: headers,
  });
};

/**
 * Check the exists of did's wrapped document through url resolver
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */
export const checkExistsDidoWrappedDoc = async (
  path,
  data,
  access_token = null,
) => {
  if (access_token) {
    data = {...data, Cookie: `access_token=${access_token}`};
  }
  console.log(data);
  return await axiosClient.get(`${BASE_URL}${path}`, {headers: data});
};

/**
 * Get did-document by did of wrapped-document
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */

export const getDidDocumentByDid = async (path, data, access_token = null) => {
  const {did, exclude} = data;
  // * only parameter to represent when you need to get a specific object from the DIDController side
  const queryParams = `?only=${exclude}`;
  let headers = {
    did,
  };
  if (access_token) {
    headers = {...headers, Cookie: `access_token=${access_token}`};
  }
  return await axiosClient.get(`${BASE_URL}${path}${queryParams}`, {
    headers: {
      ...headers,
      did: did,
    },
  });
};

/**
 * Get list of nfts from cardano service by policy-id
 * @param {String} path
 * @param {Object} data - example: {policyId: 'xxxx'}
 * @return {Promise}
 */
export const _pullNFTs = async (
  path = CLIENT_PATH.PULL_NFTS,
  data,
  access_token = null,
) => {
  console.log(path);
  const {policyId} = data;
  let headers = {
    policyId,
  };
  if (access_token) {
    headers = {...headers, Cookie: `access_token=${access_token}`};
  }
  return await axiosClient.get(`${BASE_URL}${path}`, {
    headers: {
      ...headers,
      policyId: policyId,
    },
  });
};

/**
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */
export const requestPullTransactions = async (
  path,
  data,
  access_token = null,
) => {
  if (access_token) {
    data = {...data, Cookie: `access_token=${access_token}`};
  }
  return await axiosClient.get(`${BASE_URL}${path}`, {
    headers: data,
  });
};

/**
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */
export const requestCreateCredential = async (
  path,
  data,
  access_token = null,
) => {
  let headers = {};
  if (access_token) {
    headers = {Cookie: `access_token=${access_token}`};
  }
  return await axiosClient.post(`${BASE_URL}${path}`, data, {headers});
};

/**
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */
export const requestPublicKey = async (path, data, access_token = null) => {
  const {address, user} = data;
  return await axiosClient.get(
    `${BASE_URL}${path}?address=${address}&&user=${user}`,
    {
      headers: {
        Cookie: `access_token=${access_token}`,
      },
    },
  );
};

/**
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */
export const requestUpdateDidDocument = async (
  path,
  data,
  access_token = null,
) => {
  if (access_token) {
    data = {...data, Cookie: `access_token=${access_token}`};
  }
  return await axiosClient.put(`${BASE_URL}${path}`, data);
};

/**
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */
export const requestRevokeDocument = async (
  path,
  data,
  access_token = null,
) => {
  if (access_token) {
    data = {...data, Cookie: `access_token=${access_token}`};
  }
  return await axiosClient.delete(`${BASE_URL}${path}`, data);
};
