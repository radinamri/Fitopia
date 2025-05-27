import React from "react";
import { Alert, TouchableOpacity, useColorScheme } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useVirtualTryOn } from "@/context/VirtualTryOnContext";
import { SafeAreaView } from "react-native-safe-area-context";
import ImagePicker from "@/components/ImagePicker";
import { router } from "expo-router";
import PersonStanding from "@/assets/images/icons/PersonStanding";

export default function UploadModelImage() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

  const { virtualTryOnImages, setVirtualTryOnImages } = useVirtualTryOn();

  const handleModelImageUpload = (uri: string) => {
    setVirtualTryOnImages((prev) => ({ ...prev, modelImage: uri }));
  };

  const handleTryWithAnAvatar = () => {
    if (virtualTryOnImages.modelImage !== null) {
      Alert.alert(
        "Replace Uploaded Photo?", // <<< YOUR TITLE
        "You've already uploaded a photo. Continuing with an avatar will remove your current photo. Do you want to proceed?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Use Avatar",
            onPress: () => {
              setVirtualTryOnImages((prev) => ({ ...prev, modelImage: null }));
              router.push({ pathname: "/GenderSelection" });
            },
            style: "destructive", // Indicates action might remove data
          },
        ]
      );
    } else {
      // No photo uploaded, just go to avatar selection
      router.push({ pathname: "/GenderSelection" });
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
          Upload Your Photo
        </ThemedText>
        <ImagePicker
          onUpload={handleModelImageUpload}
          backgroundImageUrl={require("@/assets/images/room/upload-model-photo.png")}
        />
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
          onPress={handleTryWithAnAvatar}
        >
          <PersonStanding />
          <ThemedText
            fontWeight="medium"
            textSize="lg"
            style={{ color: "orange" }}
          >
            Try with an Avatar
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/UploadCloth")}
          style={{
            backgroundColor: "orange",
            padding: 8,
            paddingStart: 16,
            paddingEnd: 16,
            borderRadius: 8,
            marginTop: 16,
            opacity: virtualTryOnImages.modelImage !== null ? 1 : 0.5,
          }}
          disabled={virtualTryOnImages.modelImage === null}
        >
          <ThemedText fontWeight="semibold" textSize="2xl">
            Next
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}
