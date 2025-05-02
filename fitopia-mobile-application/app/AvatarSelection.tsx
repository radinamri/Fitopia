import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import ChevronLeft from "@/assets/images/icons/ChevronLeft";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { useVirtualTryOn } from "@/context/VirtualTryOnContext";

const { width } = Dimensions.get("window");
const avatarSize = width / 5; // Smaller size to fit 4 avatars in 1 row with spacing

export default function AvatarSelection() {
  const { gender, setVirtualTryOnImages } = useVirtualTryOn();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const menModels = useMemo(
    () => [
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
    ],
    []
  );

  const womenModels = useMemo(
    () => [
      require("@/assets/images/models/women/1.png"),
      require("@/assets/images/models/women/2.png"),
      require("@/assets/images/models/women/3.png"),
      // ... add more here
      require("@/assets/images/models/women/37.png"),
    ],
    []
  );

  const avatars = useMemo(
    () => (gender === "Male" ? menModels : womenModels),
    [gender]
  );

  const pageSize = 4;
  const totalPages = Math.ceil(avatars.length / pageSize);

  useEffect(() => {
    setSelectedAvatar(null);
    setVirtualTryOnImages((prev) => ({
      ...prev,
      modelImage: null,
    }));
    setCurrentPage(0); // Reset page on gender change
  }, [gender, setVirtualTryOnImages]);

  const handleBack = () => router.push({ pathname: "/GenderSelection" });

  const handleAvatarSelect = (avatar: number, index: number) => {
    setSelectedAvatar(index);
    setVirtualTryOnImages((prev) => ({
      ...prev,
      modelImage: avatar,
    }));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const paginatedAvatars = avatars.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <TouchableOpacity
        style={{ position: "absolute", top: 40, left: 10, zIndex: 10 }}
        onPress={handleBack}
      >
        <ChevronLeft />
      </TouchableOpacity>

      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 32,
          gap: 16,
        }}
      >
        <ThemedText fontWeight="semibold" textSize="4xl">
          Choose Your Avatar
        </ThemedText>

        {/* Selected Avatar Display */}
        {selectedAvatar !== null ? (
          <Image
            source={avatars[selectedAvatar]}
            style={{ width: 200, height: 200, borderRadius: 16 }}
            resizeMode="contain"
          />
        ) : (
          <ThemedText>Select an avatar below</ThemedText>
        )}

        {/* Avatar Grid - Paginated */}
        <View style={{ flexDirection: "row", gap: 16, marginTop: 24 }}>
          {paginatedAvatars.map((item, index) => {
            const absoluteIndex = currentPage * pageSize + index;
            const isSelected = selectedAvatar === absoluteIndex;

            return (
              <TouchableOpacity
                key={absoluteIndex}
                onPress={() => handleAvatarSelect(item, absoluteIndex)}
                style={{
                  borderWidth: 2,
                  borderColor: isSelected ? "#007AFF" : "transparent",
                  borderRadius: 12,
                  padding: 4,
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
            );
          })}
        </View>

        {/* Pagination Controls */}
        <View style={{ flexDirection: "row", marginTop: 24, gap: 24 }}>
          <TouchableOpacity
            onPress={handlePrevPage}
            disabled={currentPage === 0}
          >
            <ThemedText
              style={{ opacity: currentPage === 0 ? 0.5 : 1 }}
              fontWeight="medium"
            >
              ◀ Prev
            </ThemedText>
          </TouchableOpacity>
          <ThemedText>
            Page {currentPage + 1} / {totalPages}
          </ThemedText>
          <TouchableOpacity
            onPress={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            <ThemedText
              style={{ opacity: currentPage === totalPages - 1 ? 0.5 : 1 }}
              fontWeight="medium"
            >
              Next ▶
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}
