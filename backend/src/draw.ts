import { LedMatrix } from 'rpi-led-matrix';
import { GpioMapping, RuntimeFlag } from 'rpi-led-matrix';
import { PixelGrid } from '../types';
import isPi from 'detect-rpi';

const matrix = isPi()
  ? new LedMatrix(
      {
        rows: 64, // Number of rows in the matrix
        cols: 64, // Number of columns in the matrix
        chainLength: 1, // Number of panels in the chain
        brightness: 100, // Brightness (0-100)
        pwmLsbNanoseconds: 1000000, // PWM frequency (optional)
        // Additional properties required by MatrixOptions
        inverseColors: false, // If true, colors are inverted (optional)
        ledRgbSequence: 'RGB', // Color sequence (optional)
        pixelMapperConfig: 'default', // Pixel mapping configuration (optional)
        disableHardwarePulsing: false, // Disable hardware pulsing (optional)
        hardwareMapping: GpioMapping.Regular, // Hardware mapping (optional)
        limitRefreshRateHz: 0, // Limit refresh rate (optional)
        multiplexing: 0, // Multiplexing (optional)
        rowAddressType: 0, // Row address type (optional)
        scanMode: 0, // Scan mode (optional)
        showRefreshRate: false, // Show refresh rate (optional),
        panelType: 'FM6126A', // Panel type (optional)
        parallel: 1, // Parallel (optional)
        pwmBits: 11, // PWM bits (optional)
        pwmDitherBits: 0, // PWM dither bits (optional)
      },
      {
        gpioSlowdown: 1, // GPIO slowdown (optional)
        daemon: RuntimeFlag.Off, // Run as daemon (optional)
        dropPrivileges: RuntimeFlag.Off, // Drop privileges (optional)
        doGpioInit: false, // Initialize GPIO (optional)
        // You can include any other runtime options based on your setup
      }
    )
  : null;

export const draw = (pixelGrid: PixelGrid) => {
  if (!matrix) {
    console.log('Called draw function on non-Raspberry Pi device');
    return false;
  }

  pixelGrid.forEach((row, y) => {
    row.forEach((color, x) => {
      matrix.fgColor(color).setPixel(x, y);
    });
  });

  matrix.sync();
  return true;
};
