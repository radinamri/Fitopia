import React from "react";
import Svg, { Path } from "react-native-svg";
import { useColorScheme } from "react-native";

export default function Plus() {
  const colorScheme = useColorScheme();
  const fillColor = colorScheme === "dark" ? "#000000" : "#FFFFFF";

  return (
    <Svg width="20" height="20" fill={fillColor} viewBox="0 0 16 16">
      <Path
        fillRule="evenodd"
        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
      />
    </Svg>
  );
}
