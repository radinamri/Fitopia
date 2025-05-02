import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  View,
  Dimensions,
  useColorScheme,
} from "react-native";
import ChevronLeft from "@/assets/images/icons/ChevronLeft";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { useVirtualTryOn } from "@/context/VirtualTryOnContext";

const { width } = Dimensions.get("window");
const avatarSize = width / 3 - 16; // Adjust avatar size for 3 columns

const menModels = [
  require("@/assets/images/models/men/1.png"),
  require("@/assets/images/models/men/2.png"),
  require("@/assets/images/models/men/3.png"),
  require("@/assets/images/models/men/4.png"),
  require("@/assets/images/models/men/5.png"),
  require("@/assets/images/models/men/6.png"),
  require("@/assets/images/models/men/7.png"),
  require("@/assets/images/models/men/8.png"),
  require("@/assets/images/models/men/9.png"),
  require("@/assets/images/models/men/10.png"),
  require("@/assets/images/models/men/11.png"),
  require("@/assets/images/models/men/12.png"),
  require("@/assets/images/models/men/13.png"),
  require("@/assets/images/models/men/14.png"),
  require("@/assets/images/models/men/15.png"),
  require("@/assets/images/models/men/16.png"),
];

const womenModels = [
  require("@/assets/images/models/women/1.png"),
  require("@/assets/images/models/women/2.png"),
  require("@/assets/images/models/women/3.png"),
  require("@/assets/images/models/women/4.png"),
  require("@/assets/images/models/women/5.png"),
  require("@/assets/images/models/women/6.png"),
  require("@/assets/images/models/women/7.png"),
  require("@/assets/images/models/women/8.png"),
  require("@/assets/images/models/women/9.png"),
  require("@/assets/images/models/women/10.png"),
  require("@/assets/images/models/women/11.png"),
  require("@/assets/images/models/women/12.png"),
  require("@/assets/images/models/women/13.png"),
  require("@/assets/images/models/women/14.png"),
  require("@/assets/images/models/women/15.png"),
  require("@/assets/images/models/women/16.png"),
  require("@/assets/images/models/women/17.png"),
  require("@/assets/images/models/women/18.png"),
  require("@/assets/images/models/women/19.png"),
  require("@/assets/images/models/women/20.png"),
  require("@/assets/images/models/women/21.png"),
  require("@/assets/images/models/women/22.png"),
  require("@/assets/images/models/women/23.png"),
  require("@/assets/images/models/women/24.png"),
  require("@/assets/images/models/women/25.png"),
  require("@/assets/images/models/women/26.png"),
  require("@/assets/images/models/women/27.png"),
  require("@/assets/images/models/women/28.png"),
  require("@/assets/images/models/women/29.png"),
  require("@/assets/images/models/women/30.png"),
  require("@/assets/images/models/women/31.png"),
  require("@/assets/images/models/women/32.png"),
  require("@/assets/images/models/women/33.png"),
  require("@/assets/images/models/women/34.png"),
  require("@/assets/images/models/women/35.png"),
  require("@/assets/images/models/women/36.png"),
  require("@/assets/images/models/women/37.png"),
];

export default function AvatarSelection() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";
  const screenWidth = Dimensions.get("window").width;

  const { gender, setVirtualTryOnImages } = useVirtualTryOn();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  // Memoize the avatars array to prevent unnecessary recalculations
  const avatars = useMemo(
    () => (gender === "Male" ? menModels : womenModels),
    [gender]
  );

  // Reset selected avatar and modelImage when gender changes
  useEffect(() => {
    setSelectedAvatar(null); // Reset selected avatar
    setVirtualTryOnImages((prev) => ({
      ...prev,
      modelImage: null, // Clear modelImage in context
    }));
  }, [gender, setVirtualTryOnImages]);

  const handleBack = useCallback(() => {
    router.push({ pathname: "/GenderSelection" });
  }, []);

  const handleAvatarSelect = useCallback(
    (avatar: number, index: number) => {
      setSelectedAvatar(index);
      // Update the modelImage in the context
      setVirtualTryOnImages((prev) => ({
        ...prev,
        modelImage: avatar,
      }));
      router.push({ pathname: "/UploadCloth" });
    },
    [setVirtualTryOnImages]
  );

  const renderAvatar = useCallback(
    ({ item, index }: { item: number; index: number }) => (
      <TouchableOpacity
        onPress={() => handleAvatarSelect(item, index)}
        style={{
          margin: 8,
          borderWidth: selectedAvatar === index ? 2 : 0,
          borderColor: selectedAvatar === index ? "#007AFF" : "transparent",
          borderRadius: 8,
        }}
      >
        <Image
          source={item}
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: 8,
          }}
        />
      </TouchableOpacity>
    ),
    [selectedAvatar, handleAvatarSelect]
  );

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
          Choose Your Avatar
        </ThemedText>
        <ThemedView
          style={{
            width: screenWidth * 0.6,
            height: screenWidth * 0.6 * 1.3,
            borderColor: dark ? "#FFFFFF" : "#000000",
            borderWidth: 4,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Image
            source={require("@/assets/images/room/upload-cloth-photo-2.png")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden",
              opacity: 0.5,
            }}
            resizeMode="cover"
          />
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}
