const http = require('http');
const express = require('express');
const envVars = require('./config/envVars');
const models = require('./models');
const apiRoutes = require('./routes');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

server.listen(envVars.PORT, () => {
  console.log('Server running in port', envVars.PORT);
});
