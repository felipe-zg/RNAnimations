import styled from "styled-components/native";
import { Animated, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const AnimatedCard = styled(Animated.View)`
  position: absolute;
  width: ${SCREEN_WIDTH}px;
  top: ${(props) =>
    10 * (props.cascadeIndex - props.cascadeCurrentCard || 0)}px;
`;

export const AnimatedLikeText = styled(Animated.View)`
  transform: rotate(-30deg);
  position: absolute;
  top: 50px;
  left: 40px;
  z-index: 1000;
`;

export const AnimatedDislikeText = styled(Animated.View)`
  transform: rotate(30deg);
  position: absolute;
  top: 50px;
  right: 40px;
  z-index: 1000;
`;

export const YupNopeText = styled.Text`
  border: 2px solid ${(props) => props.color};
  color: ${(props) => props.color};
  font-size: 32px;
  font-weight: bold;
  padding: 10px;
`;
