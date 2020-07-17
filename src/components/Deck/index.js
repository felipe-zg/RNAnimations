import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Animated,
  PanResponder,
  LayoutAnimation,
  UIManager,
  Dimensions,
} from "react-native";

import {
  AnimatedCard,
  AnimatedLikeText,
  AnimatedDislikeText,
  YupNopeText,
} from "./styles";

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

  useEffect(() => {
    setCurrentCard(0);
  }, [data]);

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
    let rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const getLikeOpacity = () => {
    let likeOpacity = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: "clamp",
    });
    return likeOpacity;
  };

  const getDislikeOpacity = () => {
    let dislikeOpacity = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: "clamp",
    });
    return dislikeOpacity;
  };

  const getNextCardOpacity = () => {
    let nextCardOpacity = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: "clamp",
    });
    return nextCardOpacity;
  };

  const getNextCardScale = () => {
    let nextCardScale = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.9, 1],
      extrapolate: "clamp",
    });
    return nextCardScale;
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
            <AnimatedLikeText style={{ opacity: getLikeOpacity() }}>
              <YupNopeText color="green">LIKE</YupNopeText>
            </AnimatedLikeText>
            <AnimatedDislikeText style={{ opacity: getDislikeOpacity() }}>
              <YupNopeText color="red">NOPE</YupNopeText>
            </AnimatedDislikeText>

            {renderCard(item)}
          </AnimatedCard>
        );
      } else {
        return (
          <AnimatedCard
            style={{
              opacity: getNextCardOpacity(),
              transform: [{ scale: getNextCardScale() }],
            }}
            key={item.id}
          >
            {renderCard(item)}
          </AnimatedCard>
        );
      }
    })
    .reverse();
};

export default Deck;
