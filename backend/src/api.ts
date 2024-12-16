import express from 'express';
import { validatePixelGrid } from './validate';
import { PIXEL_GRID_HEIGHT, PIXEL_GRID_WIDTH } from './constants';
import { spawn } from 'child_process';

const app = express();
const port = 3000;

app.use(express.json());

// health check
app.get('/api/ping', (_req, res) => {
  res.status(200).send({ response: 'pong' });
});

app.post('/api/draw', (req, res) => {
  const { pixels } = req?.body;
  if (!pixels) {
    res.status(400).send({ error: 'Request body must contain pixels grid' });
    return;
  }

  if (!validatePixelGrid(pixels)) {
    res.status(400).send({
      error: `Request body pixels grid does not have the correct dimensions. Required: ${PIXEL_GRID_HEIGHT} x ${PIXEL_GRID_WIDTH}`,
    });
    return;
  }

  const pythonProcess = spawn('python3', ['src/draw.py']);
  let output = '';

  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      return res
        .status(500)
        .send({ error: 'Python script failed', details: output });
    }

    try {
      res.status(200).send(output);
    } catch (err) {
      res.status(500).send({ error: 'Invalid output from Python script' });
    }
  });
});

app.listen(port, () => {
  console.log(`📸 pi-cture API listening on port ${port}`);
});

module.exports = app;
