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
          marginTop: 32,
          gap: 16,
        }}
      >
        <ThemedText fontWeight="semibold" textSize="4xl">
          Upload Cloth Photo
        </ThemedText>
        <ImagePicker
          onUpload={handleClothImageUpload}
          backgroundImageUrl={require("@/assets/images/room/upload-cloth-photo-2.png")}
        />
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={handleBrowseCloth}
        >
          <ThemedText
            fontWeight="medium"
            textSize="lg"
            style={{ color: "orange" }}
          >
            Browse Cloth from our Clothes
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/Preview")}
          style={{
            backgroundColor: "orange",
            padding: 8,
            paddingStart: 16,
            paddingEnd: 16,
            borderRadius: 8,
            marginTop: 16,
            opacity: virtualTryOnImages.clothImage !== null ? 1 : 0.5,
          }}
          disabled={virtualTryOnImages.clothImage === null}
        >
          <ThemedText fontWeight="semibold" textSize="2xl">
            TRY ON
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}
