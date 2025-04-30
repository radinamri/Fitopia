import React, { useCallback, useState } from "react";
import {
  Image,
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { ThemedView } from "@/components/ThemedView";
import { useVirtualTryOn } from "@/context/VirtualTryOnContext";
import XCircleFill from "@/assets/images/icons/XCircleFill";

interface PhotoUploaderProps {
  onUpload: (photoUri: string) => void;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onUpload }) => {
  const { setVirtualTryOnImages } = useVirtualTryOn();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [backgroundImageUri, setBackgroundImageUri] = useState<string | null>(
    Image.resolveAssetSource(
      require("@/assets/images/room/upload-model-photo.png")
    ).uri
  );

  // Request permission for the gallery or camera
  const requestPermission = async (
    permissionType: "camera" | "mediaLibrary"
  ) => {
    let permissionResult;
    if (permissionType === "camera") {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    } else {
      permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        `Please grant ${permissionType} access to continue.`,
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  // Open image picker for the main photo
  const pickImage = async () => {
    const hasPermission = await requestPermission("mediaLibrary");
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      onUpload(uri); // Pass the photo URI to the parent component via onUpload
    } else {
      Alert.alert("No image selected.");
    }
  };

  // Open camera for the main photo
  const takePhoto = async () => {
    const hasPermission = await requestPermission("camera");
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      onUpload(uri); // Pass the photo URI to the parent component via onUpload
    } else {
      Alert.alert("No photo taken.");
    }
  };

  // Choose file for the main photo
  const chooseFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (result?.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      onUpload(uri); // Pass the photo URI to the parent component via onUpload
    } else {
      Alert.alert("No file chosen.");
    }
  };

  // Function to pick a background image (optional)
  const pickBackgroundImage = async () => {
    const hasPermission = await requestPermission("mediaLibrary");
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5, // Adjust quality as needed for background
    });

    if (!result.canceled) {
      setBackgroundImageUri(result.assets[0].uri);
    } else {
      Alert.alert("No background image selected.");
    }
  };

  // Prompt user to choose between gallery, camera, or file picker for the main photo
  const handleImagePress = () => {
    Alert.alert(
      "Upload Your Perfect Photo",
      "Choose where you want to pick your photo from:",
      [
        {
          text: "Photo Library",
          onPress: pickImage,
        },
        {
          text: "Take Photo",
          onPress: takePhoto,
        },
        {
          text: "Choose File",
          onPress: chooseFile,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const handleRemoveImage = useCallback(() => {
    setSelectedImage(null);
    setVirtualTryOnImages((prevImages) => ({
      ...prevImages,
      modelImage: null,
    }));
  }, [setVirtualTryOnImages]);

  const colorScheme = useColorScheme();
  const color = colorScheme === "dark" ? "#FFFFFF" : "#000000";
  const screenWidth = Dimensions.get("window").width;

  return (
    <TouchableWithoutFeedback onPress={handleImagePress}>
      <ThemedView
        style={{
          width: screenWidth * 0.8,
          height: screenWidth * 0.8,
          borderColor: color,
          borderWidth: 4,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <ThemedView
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {backgroundImageUri && (
              <Image
                source={{ uri: backgroundImageUri }}
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
            )}
          </ThemedView>
        )}
        {selectedImage && (
          <TouchableOpacity
            style={{ position: "absolute", top: 10, right: 10 }}
            onPress={handleRemoveImage}
          >
            <XCircleFill />
          </TouchableOpacity>
        )}
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default PhotoUploader;
