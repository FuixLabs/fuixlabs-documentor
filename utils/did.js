/**
 * Function used to generate did rely on company name and encoded public key
 * @param {String} companyName - Company name
 * @param {String} publicKey - Public key
 * @return {String} - Did of wrapped document
 */
export const generateDid = (fileName, prop) => {
  const did = `did:fuixlabs:${fileName}:${prop}`;
  return did;
};
