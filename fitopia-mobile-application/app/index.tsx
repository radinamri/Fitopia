import React from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  VirtualTryOnProvider,
  useVirtualTryOn,
} from "@/context/VirtualTryOnContext";
import { SafeAreaView } from "react-native-safe-area-context";
import ImagePicker from "@/components/ImagePicker";
import { router } from "expo-router";

export default function UploadModelImage() {
  return (
    <VirtualTryOnProvider>
      <UploadModelImageContent />
    </VirtualTryOnProvider>
  );
}

function UploadModelImageContent() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

  const { virtualTryOnImages, setVirtualTryOnImages } = useVirtualTryOn();

  const handleModelImageUpload = (uri: string) => {
    setVirtualTryOnImages((prev) => ({ ...prev, modelImage: uri }));
    console.log("Model Image URI:", uri); // You can handle the URI as needed
    // You might want to navigate to the next step or show a preview here
  };

  const handleTryWithAnAvatar = () => {
    router.push({ pathname: "/GenderSelection" });
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
          Upload Your Photo
        </ThemedText>
        <ImagePicker onUpload={handleModelImageUpload} />
        <TouchableOpacity
          style={{ marginTop: 32 }}
          onPress={handleTryWithAnAvatar}
        >
          <ThemedText
            fontWeight="medium"
            textSize="lg"
            style={{ color: "orange" }}
          >
            Try with an Avatar
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}
