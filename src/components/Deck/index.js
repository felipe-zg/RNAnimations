import React, { useRef } from "react";
import { View, Animated, PanResponder, Dimensions } from "react-native";

import { AnimatedCard } from "./styles";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

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
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          console.log("swiped right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          console.log("swiped left");
        } else {
          resetCardPosition();
        }
      },
    })
  ).current;

  const resetCardPosition = () => {
    Animated.spring(position, {
      toValue: {
        x: 0,
        y: 0,
      },
    }).start();
  };

  const getCardLayout = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
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
