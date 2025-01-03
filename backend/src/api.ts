import express from 'express';
import { validatePixelGrid } from './validate';
import { PIXEL_GRID_HEIGHT, PIXEL_GRID_WIDTH } from './constants';
import { draw } from './draw';

const app = express();
const port = 3001;

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

  if (draw(pixels)) {
    res.status(200).send({ response: 'Image successfully updated' });
  } else {
    res.status(500).send({ error: 'Failed to update image' });
  }
});

app.listen(port, () => {
  console.log(`📸 pi-cture API listening on port ${port}`);
});

module.exports = app;
