const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/patateetcornichon-admin'));

app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname,'/dist/patateetcornichon-admin/index.html'));
});

app.listen(process.env.PORT || 8080);
