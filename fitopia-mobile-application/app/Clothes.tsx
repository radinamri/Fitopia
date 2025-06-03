import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  useColorScheme,
  Image,
  FlatList,
  TextInput,
  Animated,
  TouchableOpacity,
  Keyboard,
  Pressable,
  Modal,
  // View, // No longer explicitly needed just for style if ThemedView is used everywhere
} from "react-native";
import Search from "@/assets/images/icons/Search"; // Assuming Search is an SVG component or similar
import { ThemedText } from "@/components/ThemedText"; // Assuming ThemedText is a custom component
import { ThemedView } from "@/components/ThemedView"; // Assuming ThemedView is a custom component
import { useVirtualTryOn } from "@/context/VirtualTryOnContext"; // Assuming custom context
import { router } from "expo-router"; // Assuming expo-router for navigation

type ClothesItem = {
  id: number;
  src: number;
  name: string;
  price: string;
  category: string;
};

const clothesData: ClothesItem[] = [
  {
    id: 1,
    src: require("@/assets/images/clothes/upper/Appliquéd cotton blouse-$52.99.png"),
    name: "APPLIQUÉD COTTON BLOUSE",
    price: "$52.99",
    category: "Upper",
  },
  {
    id: 2,
    src: require("@/assets/images/clothes/overall/Bead-Embellished Knit Dress-$99.00.png"),
    name: "BEAD-EMBELLISHED KNIT DRESS",
    price: "$99.00",
    category: "Overall",
  },
  {
    id: 3,
    src: require("@/assets/images/clothes/lower/Belted Shorts-$32.99.png"),
    name: "BELTED SHORTS",
    price: "$32.99",
    category: "Lower",
  },
  {
    id: 4,
    src: require("@/assets/images/clothes/upper/Cotton T-Shirt-$14.99.png"),
    name: "COTTON T-SHIRT",
    price: "$14.99",
    category: "Upper",
  },
  {
    id: 5,
    src: require("@/assets/images/clothes/overall/Crochet-Look Dress-$54.99.png"),
    name: "CROCHET-LOOK DRESS",
    price: "$54.99",
    category: "Overall",
  },
  {
    id: 6,
    src: require("@/assets/images/clothes/lower/Crochet-Look Mini Skirt-$29.99.png"),
    name: "CROCHET-LOOK MINI SKIRT",
    price: "$29.99",
    category: "Lower",
  },
  {
    id: 7,
    src: require("@/assets/images/clothes/overall/Crochet-Look Tunic Dress-$109.00.png"),
    name: "CROCHET-LOOK TUNIC DRESS",
    price: "$109.00",
    category: "Overall",
  },
  {
    id: 8,
    src: require("@/assets/images/clothes/lower/Denim Shorts-$24.99.png"),
    name: "DENIM SHORTS",
    price: "$24.99",
    category: "Lower",
  },
  {
    id: 9,
    src: require("@/assets/images/clothes/upper/Fitted T-shirt-$7.99.png"),
    name: "FITTED T-SHIRT",
    price: "$7.99",
    category: "Upper",
  },
  {
    id: 10,
    src: require("@/assets/images/clothes/upper/Flounced One-Shoulder Top-$17.99.png"),
    name: "FLOUNCED ONE-SHOULDER TOP",
    price: "$17.99",
    category: "Upper",
  },
  {
    id: 11,
    src: require("@/assets/images/clothes/lower/High Waist Denim Shorts-$29.99.png"),
    name: "HIGH WAIST DENIM SHORTS",
    price: "$29.99",
    category: "Lower",
  },
  {
    id: 12,
    src: require("@/assets/images/clothes/lower/Lace-Detail Mini Skirt-$24.99.png"),
    name: "LACE-DETAIL MINI SKIRT",
    price: "$24.99",
    category: "Lower",
  },
  {
    id: 13,
    src: require("@/assets/images/clothes/upper/Lace-Trimmed Strappy Top-$12.99.png"),
    name: "LACE-TRIMMED STRAPPY TOP",
    price: "$12.99",
    category: "Upper",
  },
  {
    id: 14,
    src: require("@/assets/images/clothes/upper/Linen Shirt-$32.99.png"),
    name: "LINEN SHIRT",
    price: "$32.99",
    category: "Upper",
  },
  {
    id: 15,
    src: require("@/assets/images/clothes/lower/Linen-Blend Pants-$29.99.png"),
    name: "LINEN-BLEND PANTS",
    price: "$29.99",
    category: "Lower",
  },
  {
    id: 16,
    src: require("@/assets/images/clothes/upper/Linen-Blend Shirt-$24.99.png"),
    name: "LINEN-BLEND SHIRT",
    price: "$24.99",
    category: "Upper",
  },
  {
    id: 17,
    src: require("@/assets/images/clothes/lower/Linen-Blend Shorts-$19.99.png"),
    name: "LINEN-BLEND SHORTS",
    price: "$19.99",
    category: "Lower",
  },
  {
    id: 18,
    src: require("@/assets/images/clothes/upper/Loose Fit Printed T-shirt-$9.99.png"),
    name: "LOOSE FIT PRINTED T-SHIRT",
    price: "$9.99",
    category: "Upper",
  },
  {
    id: 19,
    src: require("@/assets/images/clothes/upper/Loose Fit Ribbed Resort Shirt-$34.99.png"),
    name: "LOOSE FIT RIBBED RESORT SHIRT",
    price: "$34.99",
    category: "Upper",
  },
  {
    id: 20,
    src: require("@/assets/images/clothes/upper/Loose Fit T-shirt-$12.99.png"),
    name: "LOOSE FIT T-SHIRT",
    price: "$12.99",
    category: "Upper",
  },
  {
    id: 21,
    src: require("@/assets/images/clothes/lower/Loose Straight High Jeans-$39.99.png"),
    name: "LOOSE STRAIGHT HIGH JEANS",
    price: "$39.99",
    category: "Lower",
  },
  {
    id: 22,
    src: require("@/assets/images/clothes/lower/Maxi Skirt-$39.99.png"),
    name: "MAXI SKIRT",
    price: "$39.99",
    category: "Lower",
  },
  {
    id: 23,
    src: require("@/assets/images/clothes/upper/One-Shoulder Top-$12.99.png"),
    name: "ONE-SHOULDER TOP",
    price: "$12.99",
    category: "Upper",
  },
  {
    id: 24,
    src: require("@/assets/images/clothes/lower/Patterned Pull-On Shorts-$29.99.png"),
    name: "PATTERNED PULL-ON SHORTS",
    price: "$29.99",
    category: "Lower",
  },
  {
    id: 25,
    src: require("@/assets/images/clothes/upper/Printed Shirt-$39.99.png"),
    name: "PRINTED SHIRT",
    price: "$39.99",
    category: "Upper",
  },
  {
    id: 26,
    src: require("@/assets/images/clothes/upper/Regular Fit Hole-Knit T-Shirt-$29.99.png"),
    name: "REGULAR FIT HOLE-KNIT T-SHIRT",
    price: "$29.99",
    category: "Upper",
  },
  {
    id: 27,
    src: require("@/assets/images/clothes/upper/Regular Fit Linen-Blend Polo Shirt-$39.99.png"),
    name: "REGULAR FIT LINEN-BLEND POLO SHIRT",
    price: "$39.99",
    category: "Upper",
  },
  {
    id: 28,
    src: require("@/assets/images/clothes/upper/Regular Fit Rib-knit T-shirt-$24.99.png"),
    name: "REGULAR FIT RIB-KNIT T-SHIRT",
    price: "$24.99",
    category: "Upper",
  },
  {
    id: 29,
    src: require("@/assets/images/clothes/upper/Regular Fit Textured shirt-$24.99.png"),
    name: "REGULAR FIT TEXTURED SHIRT",
    price: "$24.99",
    category: "Upper",
  },
  {
    id: 30,
    src: require("@/assets/images/clothes/lower/Regular-Fit Canvas Shorts-$24.99.png"),
    name: "REGULAR-FIT CANVAS SHORTS",
    price: "$24.99",
    category: "Lower",
  },
  {
    id: 31,
    src: require("@/assets/images/clothes/upper/Regular-Fit Linen Resort Shirt-$39.99.png"),
    name: "REGULAR-FIT LINEN RESORT SHIRT",
    price: "$39.99",
    category: "Upper",
  },
  {
    id: 32,
    src: require("@/assets/images/clothes/lower/Regular-Fit Linen Shorts-$39.99.png"),
    name: "REGULAR-FIT LINEN SHORTS",
    price: "$39.99",
    category: "Lower",
  },
  {
    id: 33,
    src: require("@/assets/images/clothes/upper/Regular-Fit Ribbed Resort Shirt-$39.99.png"),
    name: "REGULAR-FIT RIBBED RESORT SHIRT",
    price: "$39.99",
    category: "Upper",
  },
  {
    id: 34,
    src: require("@/assets/images/clothes/lower/Regular-Fit Sweatshorts-$17.99.png"),
    name: "REGULAR-FIT SWEATSHORTS",
    price: "$17.99",
    category: "Lower",
  },
  {
    id: 35,
    src: require("@/assets/images/clothes/upper/Regular-Fit Textured-Knit Resort Shirt-$42.99.png"),
    name: "REGULAR-FIT TEXTURED-KNIT RESORT SHIRT",
    price: "$42.99",
    category: "Upper",
  },
  {
    id: 36,
    src: require("@/assets/images/clothes/lower/Sheer Pleated Skirt-$54.99.png"),
    name: "SHEER PLEATED SKIRT",
    price: "$54.99",
    category: "Lower",
  },
  {
    id: 37,
    src: require("@/assets/images/clothes/upper/Slim Fit Polo Shirt-$29.99.png"),
    name: "SLIM FIT POLO SHIRT",
    price: "$29.99",
    category: "Upper",
  },
  {
    id: 38,
    src: require("@/assets/images/clothes/lower/Straight linen-blend trousers-$39.99.png"),
    name: "STRAIGHT LINEN-BLEND TROUSERS",
    price: "$39.99",
    category: "Lower",
  },
  {
    id: 39,
    src: require("@/assets/images/clothes/lower/Swim Shorts-$17.99.png"),
    name: "SWIM SHORTS",
    price: "$17.99",
    category: "Lower",
  },
  {
    id: 40,
    src: require("@/assets/images/clothes/overall/Tie-belt Shirt Dress-$29.99.png"),
    name: "TIE-BELT SHIRT DRESS",
    price: "$29.99",
    category: "Overall",
  },
  {
    id: 41,
    src: require("@/assets/images/clothes/overall/Tie-Detail Maxi Dress-$39.99.png"),
    name: "TIE-DETAIL MAXI DRESS",
    price: "$39.99",
    category: "Overall",
  },
  {
    id: 42,
    src: require("@/assets/images/clothes/lower/Tiered Maxi Skirt-$19.99.png"),
    name: "TIERED MAXI SKIRT",
    price: "$19.99",
    category: "Lower",
  },
  {
    id: 43,
    src: require("@/assets/images/clothes/lower/Tiered Maxi Skirt-$42.99.png"),
    name: "TIERED MAXI SKIRT",
    price: "$42.99",
    category: "Lower",
  },
  {
    id: 44,
    src: require("@/assets/images/clothes/lower/Wide-Leg Drawstring Pants-$24.99.png"),
    name: "WIDE-LEG DRAWSTRING PANTS",
    price: "$24.99",
    category: "Lower",
  },
  {
    id: 45,
    src: require("@/assets/images/clothes/lower/Wide-leg Joggers-$17.99.png"),
    name: "WIDE-LEG JOGGERS",
    price: "$17.99",
    category: "Lower",
  },
  {
    id: 46,
    src: require("@/assets/images/clothes/lower/Wide-Leg Twill Pants-$42.99.png"),
    name: "WIDE-LEG TWILL PANTS",
    price: "$42.99",
    category: "Lower",
  },
  {
    id: 47,
    src: require("@/assets/images/clothes/upper/Metallica T-Shirt-$15.99.png"),
    name: "METALLICA T-SHIRT",
    price: "$15.99",
    category: "Upper",
  },
];

export default function Clothes() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

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
      setVirtualTryOnImages((prev) => {
        const newState = {
          ...prev,
          clothImage: clothUri,
          resultImage: null,
        };
        return newState;
      });
    }
    closeModal();
    router.push("/Preview");
  };

  const renderItem = ({ item }: { item: ClothesItem }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <ThemedView
        style={{
          alignItems: "flex-start",
          width: 160, // Item container width
        }}
      >
        <Image
          source={item.src}
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
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </ThemedText>
        <ThemedText
          fontWeight="medium"
          textSize="sm"
          style={{ color: dark ? "orange" : "darkorange" }}
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
          marginTop: 32,
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
              inputRange: [0.1, 1],
              outputRange: ["80%", "100%"],
            }),
          }}
        >
          <Search />
          <TextInput
            placeholder="Search"
            placeholderTextColor={dark ? "#A9A9A9" : "#808080"}
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
        style={{ width: "100%", alignItems: "center", marginTop: 32, flex: 1 }}
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
            backgroundColor: "rgba(0,0,0,0.7)",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          <ThemedView // Modal content container
            style={{
              width: "90%",
              maxWidth: 400,
              borderRadius: 20,
              padding: 24,
              alignItems: "center",
              backgroundColor: dark ? "#1C1C1E" : "#FFFFFF",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            {selectedItem && (
              <>
                <Image
                  source={selectedItem.src}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 16,
                    marginBottom: 20,
                    resizeMode: "contain",
                  }}
                />
                <ThemedText
                  fontWeight="bold"
                  textSize="xl"
                  style={{
                    color: dark ? "#FFFFFF" : "#000000",
                    marginBottom: 8,
                    textAlign: "center", // Added text alignment
                  }}
                >
                  {selectedItem.name}
                </ThemedText>
                <ThemedText
                  fontWeight="semibold"
                  textSize="lg"
                  style={{
                    color: "orange",
                    marginBottom: 24,
                    textAlign: "center",
                  }} // Added text alignment for price too, for consistency
                >
                  {selectedItem.price}
                </ThemedText>
                <ThemedView // Button container
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "transparent", // Important for ThemedView if it has a default background
                    gap: 12,
                  }}
                >
                  <TouchableOpacity // Try On Button
                    onPress={handleTryOnPress}
                    style={{
                      backgroundColor: "orange",
                      paddingVertical: 14,
                      borderRadius: 10,
                      flex: 1,
                      alignItems: "center",
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={`Try on ${selectedItem.name}`}
                  >
                    <ThemedText
                      fontWeight="bold"
                      textSize="md"
                      style={{ color: "#FFFFFF" }}
                    >
                      Try On
                    </ThemedText>
                  </TouchableOpacity>
                  <Pressable // Close Button
                    onPress={closeModal}
                    style={{
                      backgroundColor: dark ? "#3A3A3C" : "#E5E5EA",
                      paddingVertical: 14,
                      borderRadius: 10,
                      flex: 1,
                      alignItems: "center",
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Close modal"
                  >
                    <ThemedText
                      fontWeight="bold"
                      textSize="md"
                      style={{ color: dark ? "#FFFFFF" : "#000000" }}
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
