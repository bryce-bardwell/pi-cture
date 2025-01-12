import { styled } from 'styled-components';

type PixelProps = {
  $showGridLines: boolean;
};

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Pixel = styled.div<PixelProps>`
  background-color: white;
  border: ${({ $showGridLines }) =>
    $showGridLines ? '1px solid black' : 'none'};
`;

export const PixelGrid = styled.div`
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(64, 1fr);
  grid-template-rows: repeat(64, 1fr);
  height: 43vw;
  width: 43vw;
  @media (max-width: 640px) {
    height: 43vh;
    width: 43vh;
  }
`;

export const ShowGridLinesToggle = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
`;
