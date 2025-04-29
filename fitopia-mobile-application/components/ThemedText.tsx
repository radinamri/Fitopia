import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  textSize?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
  fontWeight?:
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
};

const tailwindTextSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
  "6xl": 60,
  "7xl": 72,
  "8xl": 96,
  "9xl": 128,
};

const tailwindFontWeights = {
  thin: "100" as "100",
  extralight: "200" as "200",
  light: "300" as "300",
  normal: "400" as "400",
  medium: "500" as "500",
  semibold: "600" as "600",
  bold: "700" as "700",
  extrabold: "800" as "800",
  black: "900" as "900",
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  textSize = "md",
  fontWeight = "normal",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const fontSize = tailwindTextSizes[textSize];
  const fontWeightStyle = tailwindFontWeights[fontWeight];

  return (
    <Text
      style={[{ color, fontSize, fontWeight: fontWeightStyle }, style]}
      {...rest}
    />
  );
}
