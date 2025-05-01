import React from "react";
import Svg, { Path } from "react-native-svg";
import { useColorScheme } from "react-native";

export default function ChevronLeft() {
  const colorScheme = useColorScheme();
  const fillColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";

  return (
    <Svg width="32" height="32" fill={fillColor} viewBox="0 0 16 16">
      <Path
        fill-rule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
      />
    </Svg>
  );
}
