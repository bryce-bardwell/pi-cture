import {
  AppWrapper,
  ButtonContainer,
  GridContainer,
  OptionsContainer,
  PictureButton,
  PixelGrid,
} from './App.styles';
import { RGB } from '../types';
import { Pixel } from './components/Pixel';
import { useState } from 'react';
import { RgbaColorPicker } from 'react-colorful';
import { postDraw } from './api';

const gridSquares = Array.from({ length: 64 * 64 }, (_, i) => i);

const App = () => {
  const [colour, setColour] = useState({ r: 200, g: 150, b: 35, a: 0.5 });
  const [showGridLines, setShowGridLines] = useState(true);
  const [pixelColors, setPixelColors] = useState<RGB[]>(() =>
    Array(gridSquares.length).fill({ r: 255, g: 255, b: 255 })
  );
  const [isDrawing, setIsDrawing] = useState(false);
  const [isFillMode, setIsFillMode] = useState(false);

  const handleMouseDown = () => {
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handlePixelDrag = (index: number, colour: RGB) => {
    if (isDrawing) {
      setPixelColors((prevColors) =>
        prevColors.map((color, i) => (i === index ? colour : color))
      );
    }
  };

  const handleShowGridLinesToggle = () => {
    setShowGridLines((value) => !value);
  };

  const handleFill = (index: number, fillColour: RGB) => {
    const targetColour = pixelColors[index];

    const areColorsEqual = (c1: RGB, c2: RGB) =>
      c1.r === c2.r && c1.g === c2.g && c1.b === c2.b;

    // Avoid redundant fills
    if (areColorsEqual(targetColour, fillColour)) return;

    const queue = [index];
    const newPixelColors = [...pixelColors];

    while (queue.length > 0) {
      const currentIndex = queue.shift()!;

      // Skip if already filled or not the target color
      if (!areColorsEqual(newPixelColors[currentIndex], targetColour)) continue;

      newPixelColors[currentIndex] = fillColour;

      const row = Math.floor(currentIndex / 64);
      const col = currentIndex % 64;

      // Up
      if (row > 0) queue.push(currentIndex - 64);
      // Down
      if (row < 63) queue.push(currentIndex + 64);
      // Left
      if (col > 0) queue.push(currentIndex - 1);
      // Right
      if (col < 63) queue.push(currentIndex + 1);
    }

    setPixelColors(newPixelColors);
  };

  const handlePixelClick = (index: number, colour: RGB) => {
    if (isFillMode) {
      return handleFill(index, colour);
    }
    setPixelColors((prevColors) =>
      prevColors.map((color, i) => (i === index ? colour : color))
    );
  };

  const resetGrid = () => {
    setPixelColors(Array(gridSquares.length).fill({ r: 255, g: 255, b: 255 }));
  };

  return (
    <AppWrapper onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <h1>pi-cture</h1>
      <GridContainer>
        <PixelGrid>
          {gridSquares.map((square, index) => (
            <Pixel
              $colour={pixelColors[index]}
              $onClick={() => handlePixelClick(index, colour)}
              $onMouseEnter={() => handlePixelDrag(index, colour)}
              $showGridLines={showGridLines}
              key={square}
            />
          ))}
        </PixelGrid>
        <OptionsContainer>
          <RgbaColorPicker color={colour} onChange={setColour} />
          <ButtonContainer>
            <PictureButton onClick={() => postDraw(pixelColors)}>
              Submit
            </PictureButton>
            <PictureButton onClick={handleShowGridLinesToggle}>
              Show Grid Lines
            </PictureButton>
            <PictureButton onClick={resetGrid}>Clear</PictureButton>
            <button onClick={() => setIsFillMode((prev) => !prev)}>
              {isFillMode ? 'Disable Fill' : 'Enable Fill'}
            </button>
          </ButtonContainer>
        </OptionsContainer>
      </GridContainer>
    </AppWrapper>
  );
};

export default App;
