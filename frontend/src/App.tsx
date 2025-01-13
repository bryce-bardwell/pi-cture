import {
  AppWrapper,
  ButtonContainer,
  GridContainer,
  OptionsContainer,
  PictureButton,
  PixelGrid,
} from './App.styles';
import type { RGBa } from '../../types';
import { Pixel } from './components/Pixel';
import { useState } from 'react';
import { RgbaColorPicker } from 'react-colorful';
import { postDraw } from './api';
import { floodFill, getBlankGrid } from './util';

const gridSquares = Array.from({ length: 64 * 64 }, (_, i) => i);

const App = () => {
  const [colour, setColour] = useState({ r: 0, g: 0, b: 0, a: 0.5 });
  const [showGridLines, setShowGridLines] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isFillMode, setIsFillMode] = useState(false);
  const [pixelColors, setPixelColors] = useState<RGBa[]>(() =>
    Array(gridSquares.length).fill({ r: 255, g: 255, b: 255 })
  );

  const handleMouseDown = () => {
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handlePixelDrag = (index: number, colour: RGBa) => {
    if (isDrawing) {
      setPixelColors((prevColors) =>
        prevColors.map((color, i) => (i === index ? colour : color))
      );
    }
  };

  const handleShowGridLinesToggle = () => {
    setShowGridLines((value) => !value);
  };

  const handleFill = (index: number, fillColour: RGBa) => {
    const targetColour = pixelColors[index];
    const newPixelColors = floodFill(
      pixelColors,
      64,
      index,
      targetColour,
      fillColour
    );
    setPixelColors(newPixelColors);
  };

  const handlePixelClick = (index: number, colour: RGBa) => {
    if (isFillMode) {
      return handleFill(index, colour);
    }
    setPixelColors((prevColors) =>
      prevColors.map((color, i) => (i === index ? colour : color))
    );
  };

  const resetGrid = () => {
    setPixelColors(getBlankGrid(pixelColors));
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
              key={`pixel-${square}`}
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
            <PictureButton onClick={() => setIsFillMode((prev) => !prev)}>
              {isFillMode ? 'Disable Fill' : 'Enable Fill'}
            </PictureButton>
          </ButtonContainer>
        </OptionsContainer>
      </GridContainer>
    </AppWrapper>
  );
};

export default App;
