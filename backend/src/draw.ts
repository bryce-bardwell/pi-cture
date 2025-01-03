import { LedMatrix } from 'rpi-led-matrix';
import { PixelGrid } from '../types';

const matrix = new LedMatrix(
  LedMatrix.defaultMatrixOptions(),
  LedMatrix.defaultRuntimeOptions()
);

export const draw = (pixelGrid: PixelGrid) => {
  pixelGrid.forEach((row, y) => {
    row.forEach((color, x) => {
      matrix.fgColor(color).setPixel(x, y);
    });
  });

  matrix.sync();
  return true;
};
