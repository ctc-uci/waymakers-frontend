const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

const port = process.env.REACT_APP_SELF_PORT;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Web server listening on port: ${port}`);
});
