import React, { useRef } from "react";
import { View, Animated, PanResponder } from "react-native";

import { Container } from "./styles";

const Deck = ({ data, renderItem }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      //What are we touchibg
      // What components is handling the Touch
      // How the gesture changes
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {},
    })
  ).current;
  return (
    <Container style={position.getLayout()} {...panResponder.panHandlers}>
      {data.map((item) => renderItem(item))}
    </Container>
  );
};

export default Deck;
