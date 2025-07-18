import { createGlobalStyle, styled } from 'styled-components';

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
`;

export const GridContainer = styled.div`
  display: flex;
  gap: 5%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const PixelGrid = styled.div`
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(64, 1fr);
  grid-template-rows: repeat(64, 1fr);
  height: 41vw;
  width: 41vw;
  @media (max-width: 640px) {
    height: 41vh;
    width: 41vh;
  }
`;

export const OptionsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PictureButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    height: 100%;
    overflow: hidden;
  }
`;