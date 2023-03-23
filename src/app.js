const express = require('express');
const router = require('./routes');
const cors = require('cors');
require('express-async-errors');
require('./database');

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use((err, req, res, next) => {
    if (err instanceof Error) {
       return res.status(400).json({ 
        error: err.message 
       })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

module.exports = app;