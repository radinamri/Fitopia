import ArrowRepeat from "@/assets/images/icons/ArrowRepeat";
import Download from "@/assets/images/icons/Download";
import PersonStanding from "@/assets/images/icons/PersonStanding";
import Plus from "@/assets/images/icons/Plus";
import ShareIcon from "@/assets/images/icons/Share"; // Renamed to avoid conflict with Sharing module
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

  const downloadImageToGallery = async (
    uri: string | null | undefined,
    label: string
  ) => {
    if (!uri) {
      console.log(`Skipping save for ${label}, URI is null.`);
      return false;
    }
    if (uri.startsWith("file://")) {
      await MediaLibrary.createAssetAsync(uri);
      console.log(`${label} with URI ${uri} saved to Media Library.`);
      return true;
    } else {
      const fileName = `${label}_${Date.now()}.png`;
      const fileUri = FileSystem.documentDirectory + fileName;
      const downloadedFile = await FileSystem.downloadAsync(uri, fileUri);
      await MediaLibrary.createAssetAsync(downloadedFile.uri);
      console.log(
        `Remote ${label} downloaded and saved to Media Library: ${downloadedFile.uri}`
      );
      return true;
    }
  };

  const downloadImages = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Cannot save images without Media Library permission."
        );
        return;
      }

      let downloadedCount = 0;
      if (virtualTryOnImages.modelImage) {
        // Check if modelImage exists before trying to download
        if (
          await downloadImageToGallery(
            virtualTryOnImages.modelImage,
            "modelImage"
          )
        )
          downloadedCount++;
      }
      if (virtualTryOnImages.resultImage) {
        // Check if resultImage exists
        if (
          await downloadImageToGallery(
            virtualTryOnImages.resultImage,
            "resultImage"
          )
        )
          downloadedCount++;
      }

      if (downloadedCount > 0) {
        Alert.alert(
          "Success",
          `${downloadedCount} image(s) saved to your device!`
        );
      } else {
        Alert.alert("No Images", "No images were available to save.");
      }
    } catch (error) {
      console.error("Save to gallery error:", error);
      Alert.alert("Error", "Something went wrong while saving images.");
    }
  };

  const shareImage = async () => {
    try {
      let imageToShareUri = virtualTryOnImages.resultImage;
      if (!imageToShareUri) {
        Alert.alert("No Image", "No result image available to share.");
        return;
      }

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert(
          "Sharing Not Available",
          "Sharing is not available on this device."
        );
        return;
      }

      if (!imageToShareUri.startsWith("file://")) {
        const fileName = `shareable_vto_result_${Date.now()}.png`;
        const localFileUri = FileSystem.cacheDirectory + fileName; // Use cache for temporary files
        const downloadedFile = await FileSystem.downloadAsync(
          imageToShareUri,
          localFileUri
        );
        imageToShareUri = downloadedFile.uri;
      }

      await Sharing.shareAsync(imageToShareUri, {
        mimeType: "image/png",
        dialogTitle: "Share your Virtual Try-On Result",
      });
    } catch (error) {
      console.error("Share error:", error);
      Alert.alert("Error", "Could not share the image.");
    }
  };

  // Logs to check context values when Preview screen loads
  console.log(`Preview Screen - modelImage: ${virtualTryOnImages.modelImage}`);
  console.log(`Preview Screen - clothImage: ${virtualTryOnImages.clothImage}`);
  console.log(
    `Preview Screen - resultImage: ${virtualTryOnImages.resultImage}`
  );

  const imagePreviewWidth = width * 0.8;
  const buttonRowGap = 12; // Gap between buttons in a row
  const actionSectionGap = 16; // Gap between rows of buttons

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: dark ? "#000000" : "#FFFFFF",
      }}
    >
      <ThemedView // Main container for all content
        style={{
          // display: "flex", // flex is default
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 32, // Added padding for top/bottom spacing
          gap: 24, // Increased gap between image preview and actions
        }}
      >
        {/* Image Preview Area */}
        <ThemedView
          style={{
            width: imagePreviewWidth,
            height: (imagePreviewWidth * 4) / 3, // Maintain 3:4 aspect ratio
            borderRadius: 30,
            overflow: "hidden",
            borderWidth: 4,
            borderColor: "orange", // Always orange as per your original style
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {currentImage ? (
            <Image
              source={{ uri: currentImage }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain" // Changed to contain for better visibility
            />
          ) : (
            <Image // Fallback placeholder
              source={require("@/assets/images/models/men/1.png")} // Default placeholder
              style={{ width: "100%", height: "100%", opacity: 0.5 }}
              resizeMode="cover"
            />
          )}
          <TouchableOpacity // Toggle button
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: dark
                ? "rgba(0,0,0,0.6)"
                : "rgba(255,255,255,0.6)", // Semi-transparent background
              padding: 8, // Increased padding
              borderRadius: 20, // Make it more circular
            }}
            onPress={toggleImage}
            accessibilityRole="button"
            accessibilityLabel={
              showResult ? "Show model image" : "Show result image"
            }
          >
            <ArrowRepeat />
          </TouchableOpacity>
        </ThemedView>

        {/* Actions Container */}
        <ThemedView
          style={{
            width: imagePreviewWidth, // Match image preview width
            alignItems: "center",
            gap: actionSectionGap, // Gap between the two rows of buttons
          }}
        >
          {/* Row 1: Download and Share */}
          <ThemedView
            style={{
              flexDirection: "row",
              width: "100%", // Row takes full width of actionsContainer
              gap: buttonRowGap,
            }}
          >
            <TouchableOpacity // Download Button
              onPress={downloadImages}
              style={{
                flex: 1, // Each button in row takes equal width
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center", // Center content within button
                backgroundColor: dark ? "#2C2C2E" : "#E5E5EA", // Themed background
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 12,
                gap: 10, // Gap between icon and text
              }}
              accessibilityRole="button"
              accessibilityLabel="Download images"
            >
              <Download />
              <ThemedText
                fontWeight="semibold"
                textSize="md"
                style={{ color: dark ? "orange" : "#000000" }}
              >
                Download
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity // Share Button
              onPress={shareImage}
              style={{
                flex: 1, // Each button in row takes equal width
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center", // Center content within button
                backgroundColor: dark ? "#2C2C2E" : "#E5E5EA", // Themed background
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 12,
                gap: 10, // Gap between icon and text
              }}
              accessibilityRole="button"
              accessibilityLabel="Share result image"
            >
              <ShareIcon />
              <ThemedText
                fontWeight="semibold"
                textSize="md"
                style={{ color: dark ? "orange" : "#000000" }}
              >
                Share
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>

          {/* Row 2: Try Another Cloth and Change Model */}
          <ThemedView
            style={{
              flexDirection: "row",
              width: "100%", // Row takes full width of actionsContainer
              gap: buttonRowGap,
            }}
          >
            <TouchableOpacity // Try Another Cloth Button
              onPress={() => {
                setVirtualTryOnImages((prev) => ({
                  ...prev,
                  // Use current result as new model, or fallback to original model if no result
                  modelImage: prev.resultImage || prev.modelImage,
                  clothImage: null,
                  resultImage: null,
                }));
                router.push("/Clothes"); // Or /UploadCloth if user uploads their own
              }}
              style={{
                flex: 1, // Each button in row takes equal width
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center", // Center content within button
                backgroundColor: dark ? "#2C2C2E" : "#E5E5EA", // Themed background
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 12,
                gap: 4,
              }}
              accessibilityRole="button"
              accessibilityLabel="Try another cloth"
            >
              <Plus />
              <ThemedText
                fontWeight="semibold"
                textSize="sm"
                style={{ color: dark ? "orange" : "#000000" }}
              >
                Try Another Cloth
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity // Change Model Button
              onPress={() => {
                setVirtualTryOnImages((prev) => ({
                  ...prev,
                  modelImage: null,
                  clothImage: null, // Also clear cloth when changing model entirely
                  resultImage: null,
                }));
                router.push("/"); // Navigate to the start of model selection/upload
              }}
              style={{
                flex: 1, // Each button in row takes equal width
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center", // Center content within button
                backgroundColor: dark ? "#2C2C2E" : "#E5E5EA", // Themed background
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 12,
                gap: 4,
              }}
              accessibilityRole="button"
              accessibilityLabel="Change model photo"
            >
              <PersonStanding />
              <ThemedText
                fontWeight="semibold"
                textSize="md"
                // Consistent orange color for action text, or theme if preferred
                style={{ color: dark ? "orange" : "#000000" }}
              >
                Change Model
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}
