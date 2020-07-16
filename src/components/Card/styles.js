import styled from "styled-components/native";
import { Dimensions } from "react-native";

const SCREEN_HEIGH = Dimensions.get("screen").height;
const SCREEN_WIDTH = Dimensions.get("screen").width;

export const Container = styled.View`
  height: ${SCREEN_HEIGH - 120}px;
  width: ${SCREEN_WIDTH * 0.9}px;
  margin: 19px 20px;
  border-radius: 10px;
  border: 1px solid #1c1c1c;
  background: #fff;
`;

export const Image = styled.Image.attrs({
  resizeMode: "cover",
})`
  flex: 1;
  height: null;
  width: null;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #1c1c1c;
  font-weight: bold;
  margin: 20px 10px 10px 10px;
`;
