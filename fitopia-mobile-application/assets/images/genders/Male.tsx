import React from "react";
import Svg, { Path } from "react-native-svg";
import { useColorScheme } from "react-native";

export default function Male() {
  const colorScheme = useColorScheme();
  const fillColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";

  return (
    <Svg width="64" height="64" fill={fillColor} viewBox="0 0 16 16">
      <Path
        fill-rule="evenodd"
        d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8"
      />
    </Svg>
  );
}
