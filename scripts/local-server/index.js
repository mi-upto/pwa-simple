const express = require('express') ;
const path = require('path');

const buildDir = path.join(process.cwd(), 'build');

const app = express();

app.use(express.static(buildDir));

app.listen(3000, () => {
  console.log('started server on http://localhost:3000');
});
