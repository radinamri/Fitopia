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
import PersonStanding from "@/assets/images/icons/PersonStanding";
import ChevronLeft from "@/assets/images/icons/ChevronLeft";

export default function UploadClothImage() {
  return (
    <VirtualTryOnProvider>
      <UploadClothImageContent />
    </VirtualTryOnProvider>
  );
}

function UploadClothImageContent() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

  const { virtualTryOnImages, setVirtualTryOnImages } = useVirtualTryOn();

  const handleClothImageUpload = (uri: string) => {
    setVirtualTryOnImages((prev) => ({ ...prev, clothImage: uri }));
  };

  const handleBrowseCloth = () => {
    router.push({ pathname: "/GenderSelection" });
  };

  const handleBack = () => {
    router.push({ pathname: "/" });
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
        style={{ position: "absolute", top: 40, left: 10 }}
        onPress={handleBack}
      >
        <ChevronLeft />
      </TouchableOpacity>
      <ThemedView
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <ThemedText fontWeight="semibold" textSize="4xl">
          Upload Cloth Photo
        </ThemedText>
        <ImagePicker onUpload={handleClothImageUpload} />
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 32,
          }}
          onPress={handleBrowseCloth}
        >
          <PersonStanding />
          <ThemedText
            fontWeight="medium"
            textSize="lg"
            style={{ color: "orange" }}
          >
            Browse Cloth from our Clothes
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}
