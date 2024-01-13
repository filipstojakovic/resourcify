const jwksClient = require("jwks-rsa");

const client = jwksClient({
  jwksUri: process.env.JWKS_URI,
});

export function getKeycloakKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

module.exports = {
  getKeycloakKey,
};
