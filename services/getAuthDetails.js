const axios = require('axios');

const {config} = require('../config')

module.exports = async () => {
    const authRes = await axios({
        method: 'GET',
        url: 'https://api.backblazeb2.com/b2api/v2/b2_authorize_account',
        auth: {
            username: config.backBlazeID,
            password: config.backBlazeKey,
        },
    });

    console.info(`Success getting B2 auth details`);

    const data = authRes.data;

    console.log(JSON.stringify(data));

    const bucketId = data.allowed.bucketId;
    const apiUrl = data.apiUrl;
    const authToken = data.authorizationToken;
    const downloadUrl = data.downloadUrl;
    const bucketName = data.allowed.bucketName;

    return {
        bucketId,
        apiUrl,
        authToken,
        downloadUrl,
        bucketName
    };
};
