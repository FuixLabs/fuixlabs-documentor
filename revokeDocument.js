// * Rest libraries
import { CLIENT_PATH } from "./rest/client.path";
import { requestRevokeDocument } from "./rest/client.rest";

/**
 * Function used for revoke document with document object, current user's public key
 * @param {Object} config - Config object used for deleting or updating document
 * @return {Promise} - Promise object includes deleting document result
 */
export const revokeDocument = async (config, access_token) => {
  try {
    if (!config) {
      throw 'Config object is required. Please check "config" object';
    }
    const revokeResult = await requestRevokeDocument(
      CLIENT_PATH.REVOKE_DOCUMENT,
      {
        data: {
          config: config,
        },
      },
      access_token
    );
    if (revokeResult?.data?.code === 1) {
      throw revokeResult?.data;
    }
    if (revokeResult?.data?.error_code) {
      throw new Error(revokeResult?.data?.error_message);
    }
    return {
      result: true,
    };
  } catch (e) {
    throw e;
  }
};
