import React, { useRef } from "react";
import { View, Animated, PanResponder } from "react-native";

import { AnimatedCard } from "./styles";

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

  const getCardLayout = () => {
    return {
      ...position.getLayout(),
      transform: [{ rotate: "45deg" }],
    };
  };

  return data.map((item, index) => {
    if (index === 0) {
      return (
        <AnimatedCard style={getCardLayout()} {...panResponder.panHandlers}>
          {renderItem(item)}
        </AnimatedCard>
      );
    } else {
      return <View>{renderItem(item)}</View>;
    }
  });
};

export default Deck;
