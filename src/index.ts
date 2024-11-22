import express from 'express';

const app = express();
const port = 3000;

app.get('/ping', (_req, res) => {
  res.send({ result: 'pong' });
});
