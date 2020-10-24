const express = require('express')
const router = express.Router()
const {config} = require('../config')
const axios  = require('axios')
const getAuthDetails = require('../services/getAuthDetails')
const getUploadDetails = require('../services/getUploadDetails')

router.get('/b2auth', async function(req, res, next){
    try {
        const authDetails = await getAuthDetails();
        const uploadDetails = await getUploadDetails(authDetails);

        res.json({
            downloadUrl: authDetails.downloadUrl,
            bucketName: authDetails.bucketName,
            authToken: uploadDetails.authToken,
            uploadUrl: uploadDetails.uploadUrl
        });
        return;
    } catch (e) {
        console.log(e.message);
        res.status(500).send(e.message);
        return;
    }
})

module.exports = router