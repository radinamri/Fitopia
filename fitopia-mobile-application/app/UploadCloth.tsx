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
      <UploadClothContent />
    </VirtualTryOnProvider>
  );
}

function UploadClothContent() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

  const { virtualTryOnImages, setVirtualTryOnImages } = useVirtualTryOn();

  const handleClothImageUpload = (uri: string) => {
    setVirtualTryOnImages((prev) => ({
      ...prev,
      clothImage: uri,
      resultImage: null,
    }));
  };

  const handleBrowseCloth = () => {
    router.push({ pathname: "/Clothes" });
  };

  const handleBack = () => {
    // Navigate to the previous screen in the stack
    if (router.canGoBack()) {
      router.back();
    } else {
      // Fallback if no screen to go back to (e.g., deep link or unexpected state)
      // This should ideally navigate to a logical previous step or a safe default screen.
      // For example, if AvatarSelection or UploadModelImage usually precedes this:
      router.replace({ pathname: "/AvatarSelection" }); // Or "/UploadModelImage" or "/"
    }
  };

  const canTryOn =
    virtualTryOnImages.modelImage !== null &&
    virtualTryOnImages.clothImage !== null;

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
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={handleBrowseCloth}
          accessibilityRole="button"
          accessibilityLabel="Browse cloth from our clothes"
          accessibilityHint="Navigates to the clothes Browse screen"
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
          onPress={() => {
            if (canTryOn) {
              // Ensure modelImage is also present
              router.push("/Preview");
            }
          }}
          style={{
            backgroundColor: "orange",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 10,
            marginTop: 16,
            opacity: canTryOn ? 1 : 0.5, // Depends on both model and cloth image
          }}
          disabled={!canTryOn} // Disable if either model or cloth image is missing
          accessibilityRole="button"
          accessibilityLabel="Try On"
          accessibilityHint="Proceeds to the virtual try-on preview screen"
        >
          <ThemedText fontWeight="semibold" textSize="2xl">
            TRY ON
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}
