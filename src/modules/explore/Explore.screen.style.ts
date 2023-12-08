import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors?.background};
  padding: 50px 20px;
`;

export const TitleScreen = styled.Text`
  font-size: 36px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors?.text};
`;