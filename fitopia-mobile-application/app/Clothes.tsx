import Search from "@/assets/images/icons/Search";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useRef, useState } from "react";
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
} from "react-native";
import { useVirtualTryOn } from "@/context/VirtualTryOnContext";
import { router } from "expo-router";

type ClothesItem = {
  id: number;
  src: any;
  name: string;
  price: string;
  category: string;
};

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

  const { setVirtualTryOnImages } = useVirtualTryOn();

  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ClothesItem | null>(null);

  const searchWidth = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(searchWidth, {
      toValue: isSearching ? 0.1 : 1, // shrink to 80% when searching
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

  const renderItem = ({ item }: { item: ClothesItem }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <ThemedView style={{ alignItems: "flex-start" }}>
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
              inputRange: [0, 1],
              outputRange: ["80%", "100%"],
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
      <ThemedView
        style={{ width: "100%", alignItems: "center", marginTop: 32 }}
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
      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <ThemedView
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,1)",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          <ThemedView
            style={{
              width: "100%",
              borderRadius: 32,
              padding: 20,
              alignItems: "center",
              backgroundColor: "#FFFFFF",
            }}
          >
            {selectedItem && (
              <>
                <Image
                  source={selectedItem.src}
                  style={{
                    width: 250,
                    height: 250,
                    borderRadius: 20,
                    marginBottom: 16,
                    resizeMode: "contain",
                  }}
                />
                <ThemedText
                  fontWeight="semibold"
                  textSize="2xl"
                  style={{ color: "#000000", marginBottom: 4 }}
                >
                  {selectedItem.name}
                </ThemedText>
                <ThemedText
                  fontWeight="medium"
                  textSize="lg"
                  style={{ color: "orange" }}
                >
                  {selectedItem.price}
                </ThemedText>
                <ThemedView
                  style={{
                    width: 250,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 32,
                    backgroundColor: "#FFFFFF",
                    gap: 16,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedItem) {
                        setVirtualTryOnImages((prev) => ({
                          ...prev,
                          clothImage: selectedItem.src,
                        }));
                      }
                      closeModal();
                      router.push("/Preview");
                    }}
                    style={{
                      backgroundColor: "orange",
                      paddingVertical: 16,
                      paddingHorizontal: 0,
                      borderRadius: 10,
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ThemedText
                      fontWeight="semibold"
                      textSize="lg"
                      style={{ color: "#fff" }}
                    >
                      Try On
                    </ThemedText>
                  </TouchableOpacity>
                  <Pressable
                    onPress={closeModal}
                    style={{
                      backgroundColor: "#f0f0f0",
                      paddingVertical: 16,
                      paddingHorizontal: 0,
                      borderRadius: 10,
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ThemedText
                      fontWeight="semibold"
                      textSize="lg"
                      style={{ color: "#333" }}
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
