const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios');

// Allows us to access .env file:
require('dotenv').config();


router.get('/', (req, res) => {
    console.log('In GET');
    // API call to giphy's server with our API key
    axios.get( `http://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}` )
    .then( response => {
        console.log('Data from giphy', response.data);
        res.send(response.data);
    })
    .catch( error => {
        console.log('Error getting searched giphy', error);
        res.sendStatus(500);
    })
});

module.exports = router;