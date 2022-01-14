require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path')
const handler = require('./middleware/errorHandle')

const PORT = process.env.PORT || 5001
// mongoose connection
require('./config/mongoose')()

app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb',extended: true}));

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use('/api', require('./routes/index'))
app.use(handler.invalidRoute, handler.errorHandler);

app.listen(PORT, () => console.log('Server running on', PORT))