require('dotenv').config();
require('./models/connection');

const express = require('express');

const app = express();

app.listen(process.env.PORT);
