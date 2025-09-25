import { getMatrixReady, makePixelGrid } from '../util';
import type { RGBa } from '../../../types';

export const postDraw = (pixelsArr: RGBa[]) => {
  const matrixReadyPixels = getMatrixReady(pixelsArr);
  const pixels = makePixelGrid(matrixReadyPixels);

  return fetch(`${process.env.API_PATH}/api/draw`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pixels }),
  });
};
