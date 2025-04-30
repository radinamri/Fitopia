import Female from "@/assets/images/genders/Female";
import Male from "@/assets/images/genders/Male";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { FlatList, TouchableOpacity, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GenderSelection() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

  const genders: { name: "Male" | "Female"; Component: React.FC }[] = [
    { name: "Male", Component: Male },
    { name: "Female", Component: Female },
  ];
  const [selectedGender, setSelectedGender] = useState<
    "Male" | "Female" | null
  >(null);

  const handleGenderSelection = (genderName: "Male" | "Female") => {
    setSelectedGender(genderName);
  };

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
          gap: 32,
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
            const isSelected = selectedGender === item.name;
            let borderColor;
            if (isSelected) {
              borderColor = "orange";
            } else {
              borderColor = dark ? "#FFFFFF" : "#000000";
            }
            return (
              <TouchableOpacity
                onPress={() => handleGenderSelection(item.name)}
                style={{
                  marginHorizontal: 16,
                  alignItems: "center",
                  borderWidth: 4,
                  borderColor: borderColor,
                  borderRadius: 20,
                  padding: 32,
                  gap: 16,
                }}
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
          contentContainerStyle={{ alignItems: "center" }}
        />
      </ThemedView>
    </SafeAreaView>
  );
}
