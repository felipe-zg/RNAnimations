import styled from "styled-components/native";
import { Animated, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const AnimatedCard = styled(Animated.View)`
  position: absolute;
  width: ${SCREEN_WIDTH};
`;
export const StaticCard = styled.View`
  position: absolute;
  width: ${SCREEN_WIDTH};
`;
