import React, { useCallback } from "react";
import { FlatList, TouchableOpacity, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";

import Female from "@/assets/images/genders/Female";
import Male from "@/assets/images/genders/Male";
import ChevronLeft from "@/assets/images/icons/ChevronLeft";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useVirtualTryOn } from "@/context/VirtualTryOnContext";

type GenderName = "Male" | "Female";

interface GenderOption {
  name: GenderName;
  Component: React.FC<any>;
}

export default function GenderSelection() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";
  const { gender, setGender } = useVirtualTryOn();

  // Clear gender selection when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // This will run when the screen gains focus
      setGender(null);
      // No cleanup action is needed when it goes out of focus for this use case
    }, [setGender]) // setGender is stable, this ensures the callback is memoized
  );

  const genders: GenderOption[] = [
    { name: "Male", Component: Male },
    { name: "Female", Component: Female },
  ];

  const handleGenderSelection = (selectedGenderName: GenderName) => {
    setGender(selectedGenderName); // Set gender right before navigating
    router.push({ pathname: "/AvatarSelection" });
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // Fallback if no screen to go back to (e.g., deep link or stack manipulation)
      router.replace({ pathname: "/" }); // Or your app's main/home screen
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: dark ? "#000000" : "#FFFFFF",
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 50,
          left: 16,
          zIndex: 1,
          padding: 8,
        }}
        onPress={handleBack}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        accessibilityHint="Navigates to the previous screen"
      >
        <ChevronLeft />
      </TouchableOpacity>

      <ThemedView
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
        }}
      >
        <ThemedText fontWeight="semibold" textSize="4xl">
          Select Your Gender
        </ThemedText>
        <FlatList
          data={genders}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            const GenderComponent = item.Component;
            // 'gender' from context will be null when screen is focused due to useFocusEffect
            const isSelected = gender === item.name;
            const borderColor = isSelected
              ? "orange"
              : dark
              ? "#FFFFFF"
              : "#000000";

            return (
              <TouchableOpacity
                onPress={() => handleGenderSelection(item.name)}
                style={{
                  marginHorizontal: 12,
                  alignItems: "center",
                  borderWidth: 4,
                  borderColor: borderColor,
                  borderRadius: 20,
                  paddingVertical: 28,
                  paddingHorizontal: 24,
                  gap: 16,
                  minWidth: 150,
                }}
                accessibilityRole="button"
                accessibilityLabel={`Select ${item.name}`}
                accessibilityHint={`Sets your avatar's gender to ${item.name}`}
                accessibilityState={{ selected: isSelected }}
              >
                <GenderComponent />
                <ThemedText fontWeight="semibold" textSize="xl">
                  {item.name}
                </ThemedText>
              </TouchableOpacity>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            paddingHorizontal: 8,
          }}
        />
      </ThemedView>
    </SafeAreaView>
  );
}
