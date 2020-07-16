import styled from "styled-components/native";
import { Animated, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const AnimatedCard = styled(Animated.View)`
  position: absolute;
  width: ${SCREEN_WIDTH}px;
  top: ${(props) =>
    10 * (props.cascadeIndex - props.cascadeCurrentCard || 0)}px;
`;
