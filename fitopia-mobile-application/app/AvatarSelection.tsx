import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  useColorScheme,
} from "react-native";
import ChevronLeft from "@/assets/images/icons/ChevronLeft";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { useVirtualTryOn } from "@/context/VirtualTryOnContext";

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

const { width } = Dimensions.get("window");
// Using avatarImageWidth as defined in your provided snippet
const avatarImageWidth = width * 0.2;
const avatarImageHeight = (avatarImageWidth * 4) / 3;
const itemSpacing = 8; // Used for marginBottom on items and in column height calculation
const columnSpacing = 8; // Used for marginRight on columns

export default function AvatarSelection() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

  const { gender, setVirtualTryOnImages } = useVirtualTryOn();
  // Renamed selectedAvatar to selectedAvatarIndex for clarity as it stores the index
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState<number | null>(
    null
  );

  const avatars = useMemo(
    () => (gender === "Male" ? menModels : womenModels),
    [gender]
  );

  useEffect(() => {
    // When gender changes, reset avatar selection and relevant context images
    setSelectedAvatarIndex(null);
    setVirtualTryOnImages((prev) => ({
      ...prev,
      modelImage: null, // Clears modelImage, compatible with string | null
      resultImage: null, // Clear result image as well
    }));
  }, [gender, setVirtualTryOnImages]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // Fallback if there's no screen to go back to (e.g., deep link)
      router.replace({ pathname: "/GenderSelection" }); // Or your app's default flow start
    }
  };

  const handleAvatarSelect = useCallback(
    (avatarAssetId: number, index: number) => {
      // avatarAssetId is the require() output (a number)
      setSelectedAvatarIndex(index);
      const resolvedAsset = Image.resolveAssetSource(avatarAssetId);
      const imageUri = resolvedAsset ? resolvedAsset.uri : null; // Get the URI string

      setVirtualTryOnImages((prev) => ({
        ...prev,
        modelImage: imageUri, // Store the URI string in context
        resultImage: null, // Clear any previous VTO result image
      }));
    },
    [setVirtualTryOnImages]
  );

  // The source for the preview <Image> component will be the require() ID for local display
  const previewImageSource =
    selectedAvatarIndex !== null ? avatars[selectedAvatarIndex] : null;

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
          zIndex: 10,
          padding: 8,
        }}
        onPress={handleBack}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        accessibilityHint="Navigates to gender selection screen"
      >
        <ChevronLeft />
      </TouchableOpacity>

      <ThemedView // Main content container
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          paddingTop: 40,
          gap: 16,
        }}
      >
        {/* <ThemedText fontWeight="semibold" textSize="3xl">
          {" "}
          Choose Your Avatar
        </ThemedText> */}

        {/* Preview Area */}
        <ThemedView
          style={{
            width: width * 0.6,
            height: width * 0.6 * 1.3,
            borderRadius: 30,
            overflow: "hidden",
            borderWidth: 4,
            borderColor: dark ? "#FFFFFF" : "#000000",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: dark ? "#1C1C1E" : "#F2F2F7",
          }}
        >
          {previewImageSource !== null ? ( // Check against null
            <Image
              source={previewImageSource} // Use require() ID for local preview
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          ) : (
            <ThemedText
              fontWeight="semibold"
              textSize="xl"
              style={{ color: dark ? "#555" : "#AAA" }}
            >
              Choose Your Avatar
            </ThemedText>
          )}
        </ThemedView>

        {/* Horizontal Scroll Avatar Grid - Two Rows */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 10,
          }}
          style={{ maxHeight: avatarImageHeight * 2 + itemSpacing + 20 }}
        >
          <ThemedView style={{ flexDirection: "row" }}>
            {Array.from({ length: Math.ceil(avatars.length / 2) }).map(
              (_, columnIndex) => {
                const firstIndexInColumn = columnIndex * 2;
                const secondIndexInColumn = firstIndexInColumn + 1;

                return (
                  <ThemedView
                    key={`column-${columnIndex}`}
                    style={{
                      marginRight: columnSpacing,
                      flexDirection: "column",
                      // Height is implicitly defined by children, or use avatarImageHeight * 2 + itemSpacing
                      // Original was: justifyContent: "space-between", height: avatarImageHeight * 2 + 10
                      // Simpler to let flexbox handle vertical spacing if items have fixed height + marginBottom
                    }}
                  >
                    {[firstIndexInColumn, secondIndexInColumn].map(
                      (avatarIndex) => {
                        if (avatarIndex >= avatars.length) return null;

                        const currentAvatarAssetId = avatars[avatarIndex]; // This is the require() ID
                        const isSelected = avatarIndex === selectedAvatarIndex;

                        return (
                          <TouchableOpacity
                            key={`avatar-${avatarIndex}`}
                            onPress={() =>
                              handleAvatarSelect(
                                currentAvatarAssetId,
                                avatarIndex
                              )
                            }
                            style={{
                              width: avatarImageWidth,
                              height: avatarImageHeight,
                              marginBottom: itemSpacing,
                              borderRadius: 12,
                              overflow: "hidden",
                              borderWidth: 2,
                              borderColor: isSelected
                                ? "orange"
                                : dark
                                ? "#444"
                                : "#DDD",
                              backgroundColor: dark ? "#2C2C2E" : "#E5E5EA",
                            }}
                            accessibilityRole="button"
                            accessibilityLabel={`Select avatar ${
                              avatarIndex + 1
                            }`}
                            accessibilityState={{ selected: isSelected }}
                          >
                            <Image
                              source={currentAvatarAssetId} // Use require() ID for grid thumbnails
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                              resizeMode="cover"
                            />
                          </TouchableOpacity>
                        );
                      }
                    )}
                  </ThemedView>
                );
              }
            )}
          </ThemedView>
        </ScrollView>
        <TouchableOpacity
          onPress={() => router.push("/UploadCloth")}
          style={{
            backgroundColor: "orange",
            padding: 8,
            paddingStart: 16,
            paddingEnd: 16,
            borderRadius: 8,
          }}
        >
          <ThemedText fontWeight="semibold" textSize="2xl">
            Next
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}
