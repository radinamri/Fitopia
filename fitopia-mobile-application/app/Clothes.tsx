import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  useColorScheme,
  Image, // Import Image
  FlatList,
  TextInput,
  Animated,
  TouchableOpacity,
  Keyboard,
  Pressable,
  Modal,
} from "react-native";
import Search from "@/assets/images/icons/Search";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useVirtualTryOn } from "@/context/VirtualTryOnContext";
import { router } from "expo-router";

type ClothesItem = {
  id: number;
  src: number; // Changed from 'any' to 'number' as it's from require()
  name: string;
  price: string;
  category: string;
};

// Your clothesData remains the same, as item.src is correctly a require() output
const clothesData: ClothesItem[] = [
  {
    id: 1,
    src: require("@/assets/images/clothes/upper/1.png"),
    name: "Casual Shirt",
    price: "$29.99",
    category: "Upper",
  },
  {
    id: 2,
    src: require("@/assets/images/clothes/upper/2.png"),
    name: "Formal Shirt",
    price: "$34.99",
    category: "Upper",
  },
  {
    id: 3,
    src: require("@/assets/images/clothes/upper/3.png"),
    name: "Leather Jacket",
    price: "$99.99",
    category: "Upper",
  },
  {
    id: 4,
    src: require("@/assets/images/clothes/upper/4.png"),
    name: "Winter Jacket",
    price: "$120.00",
    category: "Upper",
  },
  {
    id: 5,
    src: require("@/assets/images/clothes/upper/5.png"),
    name: "Denim Jeans",
    price: "$45.50",
    category: "Upper",
  },
  {
    id: 6,
    src: require("@/assets/images/clothes/upper/6.png"),
    name: "Chino Pants",
    price: "$40.00",
    category: "Upper",
  },
  {
    id: 7,
    src: require("@/assets/images/clothes/upper/7.png"),
    name: "Sneakers",
    price: "$60.00",
    category: "Upper",
  },
  {
    id: 8,
    src: require("@/assets/images/clothes/upper/8.png"),
    name: "Formal Shoes",
    price: "$75.00",
    category: "Upper",
  },
  {
    id: 9,
    src: require("@/assets/images/clothes/lower/1.png"),
    name: "Summer Dress",
    price: "$55.99",
    category: "Lower",
  },
  {
    id: 10,
    src: require("@/assets/images/clothes/lower/2.png"),
    name: "Evening Gown",
    price: "$140.00",
    category: "Lower",
  },
  {
    id: 11,
    src: require("@/assets/images/clothes/lower/3.png"),
    name: "Casual Hoodie",
    price: "$39.99",
    category: "Lower",
  },
  {
    id: 12,
    src: require("@/assets/images/clothes/lower/4.png"),
    name: "Zipped Hoodie",
    price: "$49.99",
    category: "Lower",
  },
  {
    id: 13,
    src: require("@/assets/images/clothes/lower/5.png"),
    name: "Mini Skirt",
    price: "$25.99",
    category: "Lower",
  },
  {
    id: 14,
    src: require("@/assets/images/clothes/overall/1.png"),
    name: "Maxi Skirt",
    price: "$30.99",
    category: "Overall",
  },
  {
    id: 15,
    src: require("@/assets/images/clothes/overall/2.png"),
    name: "Graphic T-Shirt",
    price: "$19.99",
    category: "Overall",
  },
  {
    id: 16,
    src: require("@/assets/images/clothes/overall/3.png"),
    name: "Plain T-Shirt",
    price: "$14.99",
    category: "Overall",
  },
  {
    id: 17,
    src: require("@/assets/images/clothes/overall/4.png"),
    name: "Casual Shirt",
    price: "$14.99",
    category: "Overall",
  },
];

export default function Clothes() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

  // Destructure virtualTryOnImages as well if you need to read from it,
  // but for this specific change, only setVirtualTryOnImages is strictly needed for the update.
  const { virtualTryOnImages, setVirtualTryOnImages } = useVirtualTryOn();

  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ClothesItem | null>(null);

  const searchWidth = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(searchWidth, {
      toValue: isSearching ? 0.1 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isSearching]);

  const openModal = (item: ClothesItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const handleTryOnPress = () => {
    if (selectedItem) {
      const resolvedAsset = Image.resolveAssetSource(selectedItem.src);
      const clothUri = resolvedAsset ? resolvedAsset.uri : null;

      console.log(
        "Clothes.tsx (Try On) - Resolved cloth URI to be set:",
        clothUri
      );
      console.log(
        "Clothes.tsx (Try On) - Current modelImage from context:",
        virtualTryOnImages.modelImage
      );

      setVirtualTryOnImages((prev) => {
        const newState = {
          ...prev,
          clothImage: clothUri, // Store the URI string
          resultImage: null, // Clear previous result image
        };
        console.log(
          "Clothes.tsx (Try On) - Context state AFTER update attempt:",
          JSON.stringify(newState, null, 2)
        );
        return newState;
      });
    }
    closeModal();
    router.push("/Preview");
  };

  const renderItem = ({ item }: { item: ClothesItem }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <ThemedView style={{ alignItems: "flex-start" }}>
        <Image
          source={item.src} // Displays the local image via its require() ID
          style={{
            width: 160,
            height: 160,
            borderRadius: 10,
            resizeMode: "cover",
          }}
        />
        <ThemedText
          fontWeight="semibold"
          textSize="sm"
          style={{ marginTop: 8 }}
        >
          {item.name}
        </ThemedText>
        <ThemedText
          fontWeight="medium"
          textSize="sm"
          style={{ color: "orange" }}
        >
          {item.price}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: dark ? "#000000" : "#FFFFFF",
      }}
    >
      {/* Search Bar Area */}
      <ThemedView
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: 16,
          marginTop: 32, // Assuming this screen doesn't have the same absolute positioned back button
        }}
      >
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 2,
            borderColor: dark ? "#FFFFFF" : "#000000",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 16,
            gap: 8,
            width: searchWidth.interpolate({
              inputRange: [0, 1],
              outputRange: ["80%", "100%"], // Shrinks to 80% when isSearching is true (0.1 in your effect maps to 80% here)
            }),
          }}
        >
          <Search />
          <TextInput
            placeholder="Search"
            placeholderTextColor={dark ? "#FFFFFF" : "#000000"}
            value={searchText}
            onChangeText={setSearchText}
            onFocus={() => setIsSearching(true)}
            style={{
              flex: 1,
              color: dark ? "#FFFFFF" : "#000000",
              fontWeight: "500",
              fontSize: 16,
            }}
          />
        </Animated.View>
        {isSearching && (
          <TouchableOpacity
            onPress={() => {
              setIsSearching(false);
              setSearchText("");
              Keyboard.dismiss();
            }}
            style={{ marginLeft: 12 }}
          >
            <ThemedText
              fontWeight="bold"
              textSize="md"
              style={{ color: "orange" }}
            >
              Cancel
            </ThemedText>
          </TouchableOpacity>
        )}
      </ThemedView>

      {/* Clothes List Area */}
      <ThemedView
        style={{ width: "100%", alignItems: "center", marginTop: 32, flex: 1 }} // Added flex: 1 for FlatList to scroll properly
      >
        <FlatList
          data={clothesData.filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          style={{ width: "90%" }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 16,
          }}
          contentContainerStyle={{ paddingBottom: 64 }}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>

      {/* Modal for Selected Item */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <ThemedView // Modal backdrop
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.7)", // Darkened backdrop
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          <ThemedView // Modal content container
            style={{
              width: "90%", // Adjusted width
              maxWidth: 400, // Max width for larger screens
              borderRadius: 20, // Softer rounding
              padding: 24, // Increased padding
              alignItems: "center",
              backgroundColor: dark ? "#1C1C1E" : "#FFFFFF", // Theme-aware background
              shadowColor: "#000", // Added shadow for depth
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            {selectedItem && (
              <>
                <Image
                  source={selectedItem.src} // Displays local image
                  style={{
                    width: 200, // Adjusted size
                    height: 200, // Adjusted size
                    borderRadius: 16, // Softer rounding
                    marginBottom: 20,
                    resizeMode: "contain",
                  }}
                />
                <ThemedText
                  fontWeight="bold" // Bolder for title
                  textSize="xl" // Adjusted size
                  style={{
                    color: dark ? "#FFFFFF" : "#000000",
                    marginBottom: 8,
                  }}
                >
                  {selectedItem.name}
                </ThemedText>
                <ThemedText
                  fontWeight="semibold" // Semibold for price
                  textSize="lg"
                  style={{ color: "orange", marginBottom: 24 }} // Added margin
                >
                  {selectedItem.price}
                </ThemedText>
                <ThemedView // Button container
                  style={{
                    width: "100%", // Full width for buttons
                    flexDirection: "row",
                    justifyContent: "space-between", // Ensure this works with gap
                    backgroundColor: "transparent", // Make parent background transparent
                    gap: 12, // Spacing between buttons
                  }}
                >
                  <TouchableOpacity // Try On Button
                    onPress={handleTryOnPress} // Use the new handler
                    style={{
                      backgroundColor: "orange",
                      paddingVertical: 14, // Adjusted padding
                      borderRadius: 10,
                      flex: 1,
                      alignItems: "center",
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={`Try on ${selectedItem.name}`}
                  >
                    <ThemedText
                      fontWeight="bold" // Bolder text
                      textSize="md" // Adjusted size
                      style={{ color: "#FFFFFF" }} // White text on orange
                    >
                      Try On
                    </ThemedText>
                  </TouchableOpacity>
                  <Pressable // Close Button
                    onPress={closeModal}
                    style={{
                      backgroundColor: dark ? "#3A3A3C" : "#E5E5EA", // Themed background
                      paddingVertical: 14, // Adjusted padding
                      borderRadius: 10,
                      flex: 1,
                      alignItems: "center",
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Close modal"
                  >
                    <ThemedText
                      fontWeight="bold" // Bolder text
                      textSize="md" // Adjusted size
                      style={{ color: dark ? "#FFFFFF" : "#000000" }} // Themed text
                    >
                      Close
                    </ThemedText>
                  </Pressable>
                </ThemedView>
              </>
            )}
          </ThemedView>
        </ThemedView>
      </Modal>
    </SafeAreaView>
  );
}
