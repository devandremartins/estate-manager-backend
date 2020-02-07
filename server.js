const express = require('express');
const dotenv = require('dotenv');

// Route files
const properties = require('./routes/properties')



dotenv.config({path: './config/config.env'});
const PORT= process.env.PORT || 5000;
const app = express();

app.use('/api/v1/properties', properties);


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

