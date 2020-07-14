import styled from "styled-components/native";
import { Dimensions } from "react-native";

export const Container = styled.View`
  margin: 19px 20px;
  border-radius: 10px;
  border: 1px solid #1c1c1c;
  height: ${Dimensions.get("screen").height * 0.8}px;
  overflow: hidden;
  background: #ddd;
`;

export const Image = styled.Image`
  height: ${Dimensions.get("screen").height * 0.7}px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #1c1c1c;
  font-weight: bold;
  margin: 20px 10px 0 10px;
`;
