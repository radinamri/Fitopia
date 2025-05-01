import { Link, Stack } from "expo-router";
import { SafeAreaView, StyleSheet, useColorScheme } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
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
            gap: 8,
          }}
        >
          <ThemedText fontWeight="extrabold" textSize="4xl">
            NOT Found!
          </ThemedText>
          <ThemedText fontWeight="medium" textSize="md">
            Could not find requested resource
          </ThemedText>
          <Link href={"/"}>
            <ThemedText
              fontWeight="semibold"
              textSize="lg"
              style={{ color: "orange" }}
            >
              Return Home
            </ThemedText>
          </Link>
        </ThemedView>
      </SafeAreaView>
    </>
  );
}
