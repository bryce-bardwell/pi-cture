import type { RGBa } from '../../../types';

type PixelProps = {
  $colour: RGBa;
  $onClick: () => void;
  $onMouseEnter: () => void;
  $showGridLines: boolean;
};

const toRgbString = ({ r, g, b, a }: RGBa) => `rgb(${r}, ${g}, ${b}, ${a})`;

export const Pixel = ({
  $colour,
  $onClick,
  $onMouseEnter,
  $showGridLines,
}: PixelProps) => {
  return (
    <div
      onClick={$onClick}
      onMouseEnter={$onMouseEnter}
      style={{
        backgroundColor: toRgbString($colour),
        border: $showGridLines ? '1px solid black' : 'none',
      }}
    />
  );
};
