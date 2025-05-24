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
  Alert,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

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

  const downloadImages = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Cannot save images without permission."
        );
        return;
      }

      const imagesToDownload = [
        {
          uri: virtualTryOnImages.modelImage,
          label: "modelImage",
        },
        {
          uri: virtualTryOnImages.resultImage,
          label: "resultImage",
        },
      ];

      for (const image of imagesToDownload) {
        if (!image.uri) continue;
        const fileName = `${image.label}_${Date.now()}.png`;
        const fileUri = FileSystem.documentDirectory + fileName;

        const downloadedFile = await FileSystem.downloadAsync(
          image.uri,
          fileUri
        );
        await MediaLibrary.createAssetAsync(downloadedFile.uri);
      }

      Alert.alert("Success", "Images saved to your device!");
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Error", "Something went wrong while downloading.");
    }
  };

  const shareImage = async () => {
    try {
      const resultUri = virtualTryOnImages.resultImage;
      if (!resultUri) {
        Alert.alert("No image", "No result image to share.");
        return;
      }

      const fileName = `shared_result_${Date.now()}.png`;
      const fileUri = FileSystem.documentDirectory + fileName;

      const downloadedFile = await FileSystem.downloadAsync(resultUri, fileUri);

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert(
          "Not Supported",
          "Sharing is not available on this device."
        );
        return;
      }

      await Sharing.shareAsync(downloadedFile.uri);
    } catch (error) {
      console.error("Share error:", error);
      Alert.alert("Error", "Could not share the image.");
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
          marginTop: 32,
          gap: 16,
        }}
      >
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
            onPress={downloadImages}
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
            onPress={shareImage}
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
          onPress={() => {
            setVirtualTryOnImages((prev) => ({
              ...prev,
              modelImage: virtualTryOnImages.resultImage,
              clothImage: null,
            }));
            router.push("/Clothes");
          }}
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
          onPress={() => {
            setVirtualTryOnImages((prev) => ({
              ...prev,
              modelImage: null,
            }));
            router.push("/");
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
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
