import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  useColorScheme,
  FlatList,
  Image,
  View,
  Dimensions,
} from "react-native";
import ChevronLeft from "@/assets/images/icons/ChevronLeft";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { useVirtualTryOn } from "@/context/VirtualTryOnContext";

const menModels: number[] = [
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

const womenModels: number[] = [
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

interface RenderItemProps {
  item: number;
  index: number;
}

export default function AvatarSelection() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";
  const { gender, setVirtualTryOnImages } = useVirtualTryOn();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const MODELS_PER_PAGE = 8;
  const NUM_COLUMNS = 2;
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    const screenWidth = Dimensions.get("window").width;
    // Calculate the width, accounting for padding and space-between
    const calculatedItemWidth = (screenWidth - 32) / NUM_COLUMNS; // 32 for paddingHorizontal * 2
    setItemWidth(calculatedItemWidth);
  }, []);

  const handleBack = () => {
    router.push({ pathname: "/GenderSelection" });
  };

  const currentModels = gender === "Male" ? menModels : womenModels;
  const totalPages = Math.ceil(currentModels.length / MODELS_PER_PAGE);
  const paginatedModels = currentModels.slice(
    (currentPage - 1) * MODELS_PER_PAGE,
    currentPage * MODELS_PER_PAGE
  );

  const handleAvatarPress = useCallback(
    (index: number) => {
      const modelIndex = (currentPage - 1) * MODELS_PER_PAGE + index;
      const selectedModelUri = currentModels[modelIndex];
      setSelectedAvatar(modelIndex);
      setVirtualTryOnImages((prev) => ({
        ...prev,
        modelImage: Image.resolveAssetSource(selectedModelUri).uri,
      }));
      console.log(
        "Selected Avatar URI:",
        Image.resolveAssetSource(selectedModelUri).uri
      );
    },
    [currentPage, currentModels, setVirtualTryOnImages, MODELS_PER_PAGE]
  );

  const renderItem = useCallback(
    ({ item, index }: RenderItemProps) => {
      const itemHeight = itemWidth * 1.33; // Maintain 3:4 aspect ratio
      return (
        <TouchableOpacity
          key={index}
          style={{
            width: itemWidth,
            height: itemHeight,
            borderRadius: 10,
            overflow: "hidden",
            borderWidth: 2,
            borderColor:
              selectedAvatar === (currentPage - 1) * MODELS_PER_PAGE + index
                ? "orange"
                : "transparent",
            marginBottom: 16,
          }}
          onPress={() => handleAvatarPress(index)}
        >
          <Image
            source={item}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
        </TouchableOpacity>
      );
    },
    [handleAvatarPress, selectedAvatar, currentPage, MODELS_PER_PAGE, itemWidth]
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: dark ? "#000000" : "#FFFFFF",
        paddingHorizontal: 16,
      }}
    >
      <TouchableOpacity
        style={{ position: "absolute", top: 40, left: 10, zIndex: 10 }}
        onPress={handleBack}
      >
        <ChevronLeft />
      </TouchableOpacity>
      <ThemedView
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 32,
          marginTop: 80,
          marginBottom: 20,
        }}
      >
        <ThemedText fontWeight="semibold" textSize="4xl">
          Select Your Avatar
        </ThemedText>
      </ThemedView>

      {currentModels && currentModels.length > 0 ? (
        <>
          <FlatList
            data={paginatedModels}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={NUM_COLUMNS}
            style={{ width: "100%" }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{ alignItems: "center" }}
          />

          {totalPages > 1 && (
            <View style={{ flexDirection: "row", gap: 8, marginTop: 20 }}>
              {[...Array(totalPages)].map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: dark ? "#FFFFFF" : "#000000",
                    backgroundColor:
                      currentPage === i + 1 ? "orange" : "transparent",
                  }}
                  onPress={() => setCurrentPage(i + 1)}
                >
                  <ThemedText
                    style={{
                      color: dark ? "#FFFFFF" : "#000000",
                      ...(currentPage === i + 1 && { color: "white" }),
                    }}
                  >
                    {i + 1}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </>
      ) : (
        <ThemedText>No avatars available for the selected gender.</ThemedText>
      )}
    </SafeAreaView>
  );
}
