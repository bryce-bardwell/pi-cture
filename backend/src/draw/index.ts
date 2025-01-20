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
        rows: 64,
        cols: 64,
        chainLength: 1,
        brightness: 100,
        pwmLsbNanoseconds: 2500,
        inverseColors: false,
        ledRgbSequence: 'RGB',
        pixelMapperConfig: '',
        disableHardwarePulsing: false,
        hardwareMapping: GpioMapping.Regular,
        limitRefreshRateHz: 0,
        multiplexing: 0,
        rowAddressType: 0,
        scanMode: 0,
        showRefreshRate: false,
        panelType: 'FM6126A',
        parallel: 1,
        pwmBits: 11,
        pwmDitherBits: 0,
      },
      {
        gpioSlowdown: 1,
        daemon: RuntimeFlag.Off,
        dropPrivileges: RuntimeFlag.Off,
        doGpioInit: false,
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

  return true;
};
