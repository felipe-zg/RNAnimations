import React, { useRef, useState } from "react";
import { View, Animated, PanResponder, Dimensions } from "react-native";

import { AnimatedCard } from "./styles";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const FORCE_SWIPE_DURATION = 250;

const Deck = ({
  data,
  renderCard,
  onSwipeRight = () => {},
  onSwipeLeft = () => {
    console.warn("default left swipe");
  },
}) => {
  const [currentCard, setCurrentCard] = useState(0);
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

  const forceSwipe = (x, y) => {
    Animated.timing(position, {
      toValue: { x, y },
      duration: FORCE_SWIPE_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(x));
  };

  const onSwipeComplete = (direction) => {
    direction > 0 ? onSwipeRight() : onSwipeLeft();
    setCurrentCard(currentCard + 1);
    position.setValue({ x: 0, y: 0 });
  };

  return data
    .map((item, index) => {
      if (index < currentCard) {
        return;
      }
      if (index === currentCard) {
        console.warn(currentCard);
        return (
          <AnimatedCard
            key={item.id}
            style={getCardLayout()}
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </AnimatedCard>
        );
      } else {
        return (
          <AnimatedCard
            key={item.id}
            cascadeIndex={index}
            cascadeCurrentCard={currentCard}
          >
            {renderCard(item)}
          </AnimatedCard>
        );
      }
    })
    .reverse();
};

export default Deck;
