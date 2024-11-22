import express from 'express';
import { validatePixelGrid } from './validate';
import { PIXEL_GRID_HEIGHT, PIXEL_GRID_WIDTH } from './constants';

const app = express();
const port = 3000;

app.use(express.json());

// health check
app.get('/ping', (_req, res) => {
  res.status(200).send({ result: 'pong' });
});

app.post('/draw', (req, res) => {
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

  res.status(200).send({
    result: `Received request to draw with these pixels -> ${pixels}`,
  });
});

app.listen(port, () => {
  console.log(`📸 pi-cture API listening on port ${port}`);
});

module.exports = app;
