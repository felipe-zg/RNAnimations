import React, { useRef } from "react";
import { View, Animated, PanResponder, Dimensions } from "react-native";

import { AnimatedCard } from "./styles";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const FORCE_SWIPE_DURATION = 250;

const Deck = ({ data, renderItem }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe(SCREEN_WIDTH * 2, 0);
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe(-SCREEN_WIDTH * 2, 0);
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
      useNativeDriver: false,
    }).start();
  };

  const forceSwipe = (x, y) => {
    Animated.timing(position, {
      toValue: { x, y },
      duration: FORCE_SWIPE_DURATION,
      useNativeDriver: false,
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
        <AnimatedCard
          key={item.id}
          style={getCardLayout()}
          {...panResponder.panHandlers}
        >
          {renderItem(item)}
        </AnimatedCard>
      );
    } else {
      return <View key={item.id}>{renderItem(item)}</View>;
    }
  });
};

export default Deck;
