const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Oleg was here');
});

app.get('/oleg', (req, res) => {
  console.log(req.baseUrl); // ' '
  console.log(req.originalUrl); // '/oleg'
  console.log(req.hostname); // 'localhost'
  
  res.send('Gotcha!');
});

app.get('/users/:name/:surname', (req, res) => {
  console.log(req.path); // '/users/Linus/Torvalds'
  console.log(req.params); // { name: 'Linus', surname: 'Torvalds' }

  res.send('Nice socks :3');
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});