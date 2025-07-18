import type { RGBa } from '../../../types';

export const makePixelGrid = (pixels: RGBa[]): RGBa[][] => {
  return Array.from({ length: 64 }, (_, i) =>
    pixels.slice(i * 64, i * 64 + 64)
  );
};

export const getBlankGrid = (grid: RGBa[]) => {
  return Array.from({ length: grid.length }, () => ({
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  }));
};

export const floodFill = (
  grid: RGBa[],
  gridWidth: number,
  startIdx: number,
  targetColor: RGBa,
  fillColor: RGBa
): RGBa[] => {
  const areColorsEqual = (c1: RGBa, c2: RGBa) =>
    c1.r === c2.r && c1.g === c2.g && c1.b === c2.b && c1.a === c2.a;

  // Avoid redundant fills
  if (areColorsEqual(targetColor, fillColor)) return grid;

  const queue = [startIdx];
  const newGrid = [...grid];

  while (queue.length > 0) {
    const currentIndex = queue.shift()!;

    // Skip if already filled or not the target color
    if (!areColorsEqual(newGrid[currentIndex], targetColor)) continue;

    newGrid[currentIndex] = fillColor;

    const row = Math.floor(currentIndex / gridWidth);
    const col = currentIndex % gridWidth;

    // Add neighboring indices to the queue
    if (row > 0) queue.push(currentIndex - gridWidth); // Up
    if (row < gridWidth - 1) queue.push(currentIndex + gridWidth); // Down
    if (col > 0) queue.push(currentIndex - 1); // Left
    if (col < gridWidth - 1) queue.push(currentIndex + 1); // Right
  }

  return newGrid;
};

export const getMatrixReady = (pixels: RGBa[]) => {
  pixels.forEach(pixel => {
    if (pixel.r === 0 && pixel.g === 0 && pixel.b === 0) {
      pixel.a = 1;
    }
  })

  return pixels;
}