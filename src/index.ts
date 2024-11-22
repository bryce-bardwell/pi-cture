import express from 'express';

const app = express();
const port = 3000;

app.get('/ping', (_req, res) => {
  res.send({ result: 'pong' });
});

app.listen(port, () => {
  console.log(`📸 pi-cture API listening on port ${port}`);
});

module.exports = app;
