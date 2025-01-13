import type { PixelGrid } from '../../../types';
import { PIXEL_GRID_HEIGHT, PIXEL_GRID_WIDTH } from '../constants';

export const validatePixelGrid = (image: PixelGrid): boolean => {
  if (image.length !== PIXEL_GRID_HEIGHT) {
    return false;
  }

  if (!image.every((row) => row.length === PIXEL_GRID_WIDTH)) {
    return false;
  }

  return true;
};
