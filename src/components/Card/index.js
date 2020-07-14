import React from "react";
import { View } from "react-native";

import { Container, Image, Title } from "./styles";

const Card = ({ item }) => {
  return (
    <Container>
      <Image source={{ uri: item.uri }} />
      <Title>{item.text}</Title>
    </Container>
  );
};
export default Card;
