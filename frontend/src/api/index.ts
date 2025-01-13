import { makePixelGrid } from '../util';
import type { RGBa } from '../../../types';

export const postDraw = (pixelsArr: RGBa[]) => {
  const pixels = makePixelGrid(pixelsArr);

  return fetch('http://localhost:3001/api/draw', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pixels }),
  });
};
