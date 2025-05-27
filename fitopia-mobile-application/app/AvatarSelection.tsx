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
const avatarImageWidth = width * 0.2;
const avatarImageHeight = (avatarImageWidth * 4) / 3;

export default function AvatarSelection() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

  const { gender, setVirtualTryOnImages } = useVirtualTryOn();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  const avatars = useMemo(
    () => (gender === "Male" ? menModels : womenModels),
    [gender]
  );

  useEffect(() => {
    setSelectedAvatar(null);
    setVirtualTryOnImages((prev) => ({ ...prev, modelImage: null }));
  }, [gender, setVirtualTryOnImages]);

  const handleBack = () => router.replace("/GenderSelection");

  const handleAvatarSelect = useCallback(
    (avatar: number, index: number) => {
      setSelectedAvatar(index);
      setVirtualTryOnImages((prev) => ({
        ...prev,
        modelImage: avatar,
        resultImage: "@/assets/images/models/men/2.png",
      }));
    },
    [setVirtualTryOnImages]
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
          marginTop: 32,
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

        {/* Horizontal Scroll Avatar Grid - Two Rows */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
        >
          <ThemedView style={{ flexDirection: "row" }}>
            {Array.from({ length: Math.ceil(avatars.length / 2) }).map(
              (_, columnIndex) => {
                const firstIndex = columnIndex * 2;
                const secondIndex = firstIndex + 1;

                return (
                  <ThemedView
                    key={columnIndex}
                    style={{
                      marginRight: 10,
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: avatarImageHeight * 2 + 10,
                    }}
                  >
                    {[firstIndex, secondIndex].map((index) => {
                      if (index >= avatars.length) return null;

                      const isSelected = index === selectedAvatar;

                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() =>
                            handleAvatarSelect(avatars[index], index)
                          }
                          style={{
                            width: avatarImageWidth,
                            height: avatarImageHeight,
                            marginBottom: 8,
                            borderRadius: 12,
                            overflow: "hidden",
                            borderWidth: isSelected ? 3 : 0,
                            borderColor: isSelected ? "orange" : "transparent",
                          }}
                        >
                          <Image
                            source={avatars[index]}
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                            resizeMode="cover"
                          />
                        </TouchableOpacity>
                      );
                    })}
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
            opacity: selectedAvatar !== null ? 1 : 0.5,
          }}
          disabled={selectedAvatar === null}
        >
          <ThemedText fontWeight="semibold" textSize="2xl">
            Next
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}
