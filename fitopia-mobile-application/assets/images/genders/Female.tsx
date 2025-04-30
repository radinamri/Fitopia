import React from "react";
import Svg, { Path } from "react-native-svg";
import { useColorScheme } from "react-native";

export default function Female() {
  const colorScheme = useColorScheme();
  const fillColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";

  return (
    <Svg width="64" height="64" fill={fillColor} viewBox="0 0 16 16">
      <Path
        fill-rule="evenodd"
        d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"
      />
    </Svg>
  );
}
