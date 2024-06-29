const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
const port = 3000;

//Middleware
app.use(express.json());

const apiRoutes = require('./routes/api.js');
app.use(apiRoutes);

app.listen(port, () => {
    console.log(`server ${port}`);
})