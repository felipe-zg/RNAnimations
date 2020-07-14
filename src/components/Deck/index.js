import React from "react";
import { View, Animated } from "react-native";

import { Container } from "./styles";

const Deck = ({ data, renderItem }) => {
  return <Container>{data.map((item) => renderItem(item))}</Container>;
};

export default Deck;
