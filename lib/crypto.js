const { generateKeyPairSync, publicEncrypt, privateDecrypt } = require('node:crypto');
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

exports.encrypt = (data) => {
    const prepareStrData = JSON.stringify(data);
    const prepareBufferData = Buffer.from(prepareStrData, 'utf8');
    const encrypted = publicEncrypt(publicKey, prepareBufferData);

    return encrypted;
};
exports.decrypt = (buffer) => {
    const decrypted = privateDecrypt(privateKey, buffer);
    return decrypted;
};