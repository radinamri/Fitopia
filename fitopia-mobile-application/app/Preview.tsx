import ArrowRepeat from "@/assets/images/icons/ArrowRepeat";
import Download from "@/assets/images/icons/Download";
import PersonStanding from "@/assets/images/icons/PersonStanding";
import Plus from "@/assets/images/icons/Plus";
import Share from "@/assets/images/icons/Share";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useVirtualTryOn } from "@/context/VirtualTryOnContext";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  useColorScheme,
  Image,
  TouchableOpacity,
} from "react-native";

export default function Preview() {
  const { width } = Dimensions.get("window");
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";
  const { virtualTryOnImages, setVirtualTryOnImages } = useVirtualTryOn();

  const [showResult, setShowResult] = useState(true); // true = resultImage, false = modelImage

  const toggleImage = () => {
    setShowResult((prev) => !prev);
  };

  const currentImage = showResult
    ? virtualTryOnImages.resultImage
    : virtualTryOnImages.modelImage;

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
          marginTop: 32,
          gap: 16,
        }}
      >
        <ThemedText>model: {virtualTryOnImages.modelImage}</ThemedText>
        <ThemedText>cloth: {virtualTryOnImages.clothImage}</ThemedText>
        <ThemedText>result: {virtualTryOnImages.resultImage}</ThemedText>
        <ThemedView
          style={{
            width: width * 0.8,
            height: (width * 0.8 * 4) / 3,
            borderRadius: 30,
            overflow: "hidden",
            borderWidth: 4,
            borderColor: dark ? "orange" : "orange",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {currentImage ? (
            <Image
              source={{ uri: currentImage }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Image
              source={require("@/assets/images/models/men/1.png")}
              style={{ width: "100%", height: "100%", opacity: 0.5 }}
              resizeMode="cover"
            />
          )}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: dark ? "#000000" : "transparent",
              padding: 3,
              borderRadius: "50%",
            }}
            onPress={toggleImage}
          >
            <ArrowRepeat />
          </TouchableOpacity>
        </ThemedView>
        <ThemedView
          style={{
            width: width * 0.7,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: dark ? "#FFFFFF" : "#000000",
              padding: 8,
              paddingStart: 16,
              paddingEnd: 16,
              borderRadius: 12,
              gap: 16,
            }}
          >
            <Download />
            <ThemedText
              fontWeight="semibold"
              textSize="md"
              style={{ color: dark ? "orange" : "orange" }}
            >
              Download
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: dark ? "#FFFFFF" : "#000000",
              padding: 8,
              paddingStart: 16,
              paddingEnd: 16,
              borderRadius: 12,
              gap: 16,
            }}
          >
            <Share />
            <ThemedText
              fontWeight="semibold"
              textSize="md"
              style={{ color: dark ? "orange" : "orange" }}
            >
              Share
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: dark ? "#FFFFFF" : "#000000",
            padding: 8,
            paddingStart: 16,
            paddingEnd: 16,
            borderRadius: 12,
            gap: 16,
          }}
        >
          <Plus />
          <ThemedText
            fontWeight="semibold"
            textSize="md"
            style={{ color: dark ? "orange" : "orange" }}
          >
            Add More Cloth
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
          onPress={() => router.push("/")}
        >
          <PersonStanding />
          <ThemedText
            fontWeight="semibold"
            textSize="md"
            style={{ color: dark ? "orange" : "#000000" }}
          >
            Edit Model Photo
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}
