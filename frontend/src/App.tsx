import {
  AppWrapper,
  Pixel,
  PixelGrid,
  ShowGridLinesToggle,
  SubmitButton,
} from './App.styles';

import { useState } from 'react';

const gridSquares = Array.from({ length: 64 * 64 }, (_, i) => i);

const App = () => {
  const [showGridLines, setShowGridLines] = useState(true);

  const handleShowGridLinesToggle = () => {
    setShowGridLines((value) => !value);
  };

  return (
    <AppWrapper>
      <h1>pi-cture</h1>
      <PixelGrid>
        {gridSquares.map((square) => (
          <Pixel $showGridLines={showGridLines} key={square} />
        ))}
      </PixelGrid>
      <SubmitButton>Submit</SubmitButton>
      <ShowGridLinesToggle onClick={handleShowGridLinesToggle}>
        Show Grid Lines
      </ShowGridLinesToggle>
    </AppWrapper>
  );
};

export default App;
