import { validatePixelGrid } from '.';
import { PIXEL_GRID_HEIGHT, PIXEL_GRID_WIDTH } from '../constants';

describe('validatePixelGrid', () => {
  it('returns true if the pixelGrid is of correct height and width', () => {
    const goodGrid = new Array(PIXEL_GRID_HEIGHT)
      .fill(0)
      .map(() => new Array(PIXEL_GRID_WIDTH).fill(0));

    expect(validatePixelGrid(goodGrid)).toBe(true);
  });

  it('returns false if the pixelGrid is not of correct height', () => {
    const badGrid = new Array(PIXEL_GRID_HEIGHT + 1)
      .fill(0)
      .map(() => new Array(PIXEL_GRID_WIDTH).fill(0));

    expect(validatePixelGrid(badGrid)).toBe(false);
  });

  it('returns false if the pixelGrid is not of correct width', () => {
    const badGrid = new Array(PIXEL_GRID_HEIGHT)
      .fill(0)
      .map(() => new Array(PIXEL_GRID_WIDTH + 1).fill(0));

    expect(validatePixelGrid(badGrid)).toBe(false);
  });
});
