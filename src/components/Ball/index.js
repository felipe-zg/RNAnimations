import React, { useEffect, useState, useRef } from "react";
import { Animated } from "react-native";

import { Circle } from "./styles";

const Ball = () => {
  const position = useRef(new Animated.ValueXY(0, 0)).current;
  useEffect(() => {
    move();
  });
  const move = () => {
    Animated.spring(position, {
      toValue: {
        x: 300,
        y: 500,
      },
    }).start();
  };

  return (
    <Animated.View style={position.getLayout()}>
      <Circle />
    </Animated.View>
  );
};

export default Ball;
