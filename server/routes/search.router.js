const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios');

// Allows us to access .env file:
require('dotenv').config();


