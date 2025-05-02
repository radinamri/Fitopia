import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
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
const avatarImageWidth = width * 0.2;
const avatarImageHeight = (avatarImageWidth * 4) / 3;

export default function AvatarSelection() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

  const { gender, setVirtualTryOnImages } = useVirtualTryOn();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Memoize the avatars array to prevent unnecessary recalculations
  const avatars = useMemo(
    () => (gender === "Male" ? menModels : womenModels),
    [gender]
  );

  const pageSize = 4;
  const totalPages = Math.ceil(avatars.length / pageSize);

  // Reset selected avatar and modelImage when gender changes
  useEffect(() => {
    setSelectedAvatar(null);
    setCurrentPage(0);
    setVirtualTryOnImages((prev) => ({ ...prev, modelImage: null }));
  }, [gender, setVirtualTryOnImages]);

  const handleBack = () => router.push("/GenderSelection");

  const handleAvatarSelect = useCallback(
    (avatar: number, index: number) => {
      setSelectedAvatar(index);
      // Update the modelImage in the context
      setVirtualTryOnImages((prev) => ({
        ...prev,
        modelImage: avatar,
      }));
      //   router.push({ pathname: "/UploadCloth" });
    },
    [setVirtualTryOnImages]
  );

  const paginatedAvatars = avatars.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
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
        {/* Preview */}
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
          }}
        >
          {selectedAvatar !== null ? (
            <Image
              source={avatars[selectedAvatar]}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          ) : (
            <ThemedText fontWeight="semibold" textSize="xl">
              Choose Your Avatar
            </ThemedText>
          )}
        </ThemedView>

        {/* Avatar Grid */}
        <View
          style={{
            maxWidth: "90%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {paginatedAvatars.map((item, index) => {
            const absIndex = currentPage * pageSize + index;
            const isSelected = absIndex === selectedAvatar;
            return (
              <TouchableOpacity
                key={absIndex}
                onPress={() => handleAvatarSelect(item, absIndex)}
                style={{
                  width: avatarImageWidth,
                  height: avatarImageHeight,
                  borderRadius: 10,
                  overflow: "hidden",
                  borderWidth: isSelected ? 0 : 0,
                  borderColor: isSelected ? "orange" : "transparent",
                }}
              >
                <Image
                  source={item}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Pagination */}
        <ThemedView
          style={{
            flexDirection: "row",
            gap: 32,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setCurrentPage((p) => Math.max(p - 1, 0))}
            disabled={currentPage === 0}
          >
            <ThemedText
              style={{ color: "orange", opacity: currentPage === 0 ? 0.5 : 1 }}
            >
              ◀ Prev
            </ThemedText>
          </TouchableOpacity>
          <ThemedText>
            Page {currentPage + 1}/{totalPages}
          </ThemedText>
          <TouchableOpacity
            onPress={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages - 1))
            }
            disabled={currentPage === totalPages - 1}
          >
            <ThemedText
              style={{
                color: "orange",
                opacity: currentPage === totalPages - 1 ? 0.5 : 1,
              }}
            >
              Next ▶
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}
