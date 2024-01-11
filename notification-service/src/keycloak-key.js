const jwksClient = require("jwks-rsa");
require('dotenv').config({path: __dirname + `/../.env${process.env.NODE_ENV ? "." + process.env.NODE_ENV.trim() : ""}`});

const client = jwksClient({
  jwksUri: process.env.JWKS_URI,
});

function getKeycloakKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

module.exports = {getKeycloakKey};
