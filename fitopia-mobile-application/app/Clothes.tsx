import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, useColorScheme } from "react-native";

export default function Clothes() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: dark ? "#000000" : "#FFFFFF",
      }}
    >
      <ThemedView
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 32,
          gap: 16,
        }}
      >
        <ThemedText>Clothes Screen</ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}
