import { RGB } from '../../types';

export const postDraw = (pixels: RGB[]) => {
  const pixelGrid = Array.from({ length: 64 }, (_, i) =>
    pixels.slice(i * 64, i * 64 + 64)
  );
  console.log('pixel grid', JSON.stringify(pixelGrid, null, 4));
  return fetch('http://localhost:3001/api/draw', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pixels: pixelGrid }),
  });
};
