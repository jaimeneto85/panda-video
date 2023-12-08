import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import styled from "styled-components";

export const ButtonVideo = styled(TouchableWithoutFeedback)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors?.primary};
  justify-content: center;
  margin-bottom: 10px;
  padding: 5px 0;
  width: 100%;
`;