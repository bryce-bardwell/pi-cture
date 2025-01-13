import { draw } from '.';
import isPi from 'detect-rpi';

jest.mock('detect-rpi', () => jest.fn());

jest.mock('rpi-led-matrix', () => ({
  LedMatrix: jest.fn(() => ({
    fgColor: jest.fn().mockReturnValue(0xffffff),
    render: jest.fn(),
    setPixel: jest.fn(),
    sync: jest.fn(),
  })),
  GpioMapping: {
    STANDARD: 'mocked-standard',
    CUSTOM: 'mocked-custom',
  },
  RuntimeFlag: {
    NO_HARDWARE_PULSE: 'mocked-no-hardware-pulse',
    NO_SYNC: 'mocked-no-sync',
  },
}));

describe('draw', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('returns false if not run on a Raspberry Pi', () => {
    (isPi as jest.Mock).mockReturnValue(false);
    const pixelGrid = [[{ r: 0, g: 0, b: 0, a: 0 }]];
    expect(draw(pixelGrid)).toBe(false);
  });

  it('returns true if run on Raspberry Pi and drawing was successful', () => {
    (isPi as jest.Mock).mockReturnValue(true);
    const pixelGrid = [[{ r: 0, g: 0, b: 0, a: 0 }]];
    expect(draw(pixelGrid)).toBe(true);
  });
});
