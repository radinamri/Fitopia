import React from "react";
import Svg, { Path } from "react-native-svg";
import { useColorScheme } from "react-native";

export default function ArrowUpCircleFill() {
  const colorScheme = useColorScheme();
  const fillColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";

  return (
    <Svg
      width="32"
      height="32"
      fill={fillColor}
      viewBox="0 0 16 16"
      transform="rotate(180)"
    >
      <Path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
    </Svg>
  );
}
