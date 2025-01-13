import { RGB } from '../../types';

type PixelProps = {
  $colour: RGB;
  $onClick: () => void;
  $onMouseEnter: () => void;
  $showGridLines: boolean;
};

const toRgbString = ({ r, g, b, a }: RGB) => `rgb(${r}, ${g}, ${b}, ${a})`;

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
