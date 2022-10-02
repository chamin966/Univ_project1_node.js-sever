const express = require('express');
const app = express();
const portNum = 3000;

app.get('/', (req, res) => {
  res.send('Hello world!!');
});

app.listen(portNum, () => {
  console.log('서버가 실행중입니다...');
});
