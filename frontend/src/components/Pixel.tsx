import React from 'react';
import styled from 'styled-components';

type RGBa = { r: number; g: number; b: number; a?: number };

interface PixelProps {
  $colour: RGBa;
  $showGridLines: boolean;
  $onClick?: () => void;
  $onMouseEnter?: () => void;
  dataIndex: number;
}

const StyledPixel = styled.div<{
  $colour: RGBa;
  $showGridLines: boolean;
}>`
  background-color: ${({ $colour }) =>
    `rgba(${$colour.r}, ${$colour.g}, ${$colour.b}, ${$colour.a ?? 1})`};
  border: ${({ $showGridLines }) => ($showGridLines ? '1px solid #ccc' : 'none')};
  touch-action: none;
`;

export const Pixel: React.FC<PixelProps> = ({
  $colour,
  $showGridLines,
  $onClick,
  $onMouseEnter,
  dataIndex,
}) => {
  return (
    <StyledPixel
      $colour={$colour}
      $showGridLines={$showGridLines}
      onClick={$onClick}
      onMouseEnter={$onMouseEnter}
      data-index={dataIndex}
    />
  );
};
