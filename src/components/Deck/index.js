import React, { useRef } from "react";
import { View, Animated, PanResponder } from "react-native";

import { Container } from "./styles";

const Deck = ({ data, renderItem }) => {
  const panResponder = useRef(
    PanResponder.create({
      //What are we touchibg
      // What components is handling the Touch
      // How the gesture changes
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        console.log(gesture);
      },
      onPanResponderRelease: (event, gesture) => {},
    })
  ).current;
  return (
    <Container {...panResponder.panHandlers}>
      {data.map((item) => renderItem(item))}
    </Container>
  );
};

export default Deck;
