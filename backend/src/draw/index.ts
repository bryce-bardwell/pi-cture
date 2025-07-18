import { LedMatrix } from 'rpi-led-matrix';
import { GpioMapping, RuntimeFlag } from 'rpi-led-matrix';
import type { PixelGrid } from '../../../types';
import isPi from 'detect-rpi';
import { LedMatrixInstance } from 'rpi-led-matrix';

// Lazy initialization of the matrix
let matrix: LedMatrixInstance | null = null;

const getMatrix = (): LedMatrixInstance | null => {
  if (!matrix && isPi()) {
    matrix = new LedMatrix(
      {
        ...LedMatrix.defaultMatrixOptions(),
        brightness: 50,
        rows: 64,
        cols: 64,
        chainLength: 1,
        hardwareMapping: GpioMapping.AdafruitHat,
        disableHardwarePulsing: true,
      },
      {
        ...LedMatrix.defaultRuntimeOptions(),
        gpioSlowdown: 4,
      }
    );
  }
  return matrix;
};

export const draw = (pixelGrid: PixelGrid) => {
  const matrix = getMatrix();

  if (!matrix) {
    console.log('Called draw function on non-Raspberry Pi device');
    return false;
  }

  pixelGrid.forEach((row, y) => {
    row.forEach((color, x) => {       
      matrix.fgColor(color);
      matrix.setPixel(x, y);
    });
  });

  matrix.sync();

  return true;
};
