import styled from "styled-components/native";
import { Dimensions } from "react-native";

const SCREEN_HEIGH = Dimensions.get("screen").height;

export const Container = styled.View`
  margin: 19px 20px;
  border-radius: 10px;
  border: 1px solid #1c1c1c;
  height: ${SCREEN_HEIGH * 0.8}px;
  overflow: hidden;
  background: #ddd;
`;

export const Image = styled.Image`
  height: ${SCREEN_HEIGH * 0.7}px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #1c1c1c;
  font-weight: bold;
  margin: 20px 10px 0 10px;
`;
