import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button, Chip, RadioButton, Text, TextInput } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";

import { useSession } from "~/hooks/useSession";
import { emptyImageUrl } from "~/lib/firebase";
import { COLORS } from "~/lib/theme";
import { Inventory, Wish } from "~/lib/types";
import { apiFetch, pickImageGetURL } from "~/lib/utils";

const availableCategories = [
  { label: "Apparels", value: "apparels" },
  { label: "Accessories", value: "accessories" },
  { label: "Bags", value: "bags" },
  { label: "Books", value: "books" },
  { label: "Hobbies", value: "hobbies" },
  { label: "Applicances", value: "appliances" },
  { label: "Gadgets", value: "gadgets" },
  { label: "Vehicles", value: "vehicles" },
  { label: "Shoes", value: "shoes" },
  { label: "Sports", value: "sports" },
];

function NewListing({ listingType }: { listingType: "inventory" | "wish" }) {
  const { user } = useSession();

  // TODO: support multiple images
  const [imageUrl, setImageUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);

  const [type, setType] = useState<"item" | "service" | "">("");

  const [location, setLocation] = useState<string>("");
  const [preferredOffer, setPreferredOffer] = useState<string>("");

  const [currentKeyword, setCurrentKeyword] = useState<string>("");

  async function postListing() {
    if (!name || !description || !category || !imageUrl || !type || !preferredOffer) return;
    const finalKeywords = [category, ...keywords];

    let newListing: Partial<Inventory> = {
      name,
      type,
      description,
      keywords: finalKeywords,
      imageUrls: [imageUrl],
    };

    if (listingType === "inventory") {
      newListing = { ...newListing, location: location || user?.location, preferredOffer };
    }

    const { data, error } = await apiFetch<Inventory | Wish>(`/${listingType}`, {
      method: "POST",
      body: JSON.stringify(newListing),
    });

    if (error || !data) {
      console.log(error || "Something went wrong while posting listing");
    } else {
      console.log("Successfully posted listing");
    }
  }

  async function selectImage() {
    const uploadedURL = await pickImageGetURL();
    if (uploadedURL) setImageUrl(uploadedURL);
  }

  function addKeyword() {
    if (currentKeyword) {
      setKeywords((prev) => [...prev, currentKeyword]);
      setCurrentKeyword("");
    }
  }

  function removeKeyword(index: number) {
    setKeywords((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <ScrollView
      contentContainerStyle={{ gap: 16 }}
      style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}
    >
      <View style={{ gap: 4 }}>
        <Text>Name:</Text>
        <TextInput value={name} onChangeText={setName} label="Enter name" />
      </View>
      <View style={{ gap: 4 }}>
        <Text>Type:</Text>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="Item"
              status={type === "item" ? "checked" : "unchecked"}
              onPress={() => setType("item")}
            />
            <Text>Item</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="Service"
              status={type === "service" ? "checked" : "unchecked"}
              onPress={() => setType("service")}
            />
            <Text>Service</Text>
          </View>
        </View>
      </View>
      <View style={{ gap: 2 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Image:</Text>
          <Button mode="contained-tonal" onPress={selectImage}>
            Select Image
          </Button>
        </View>

        <Image
          source={{ uri: imageUrl || emptyImageUrl }}
          style={{ resizeMode: "contain", height: 360, width: 360, alignSelf: "center" }}
        />
      </View>
      <View style={{ gap: 4 }}>
        <Text>Description:</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          multiline
          style={{ height: 92 }}
          label="Enter description"
        />
      </View>

      <View style={{ gap: 4 }}>
        <Text>Category:</Text>
        <Dropdown
          style={{
            backgroundColor: COLORS.surfaceVariant,
            borderRadius: 8,
            padding: 8,
          }}
          data={availableCategories}
          labelField="label"
          valueField="value"
          onChange={(item) => setCategory(item.value)}
        />
      </View>
      <View style={{ gap: 4 }}>
        <Text>Keywords:</Text>
        <View style={{ height: "100%", gap: 2, flexDirection: "row" }}>
          {keywords.map((kw, i) => (
            <Chip key={i} closeIcon="close" onClose={() => removeKeyword(i)}>
              {kw}
            </Chip>
          ))}
        </View>

        <TextInput
          placeholder="Add a keyword"
          value={currentKeyword}
          onChangeText={setCurrentKeyword}
          right={
            <TextInput.Icon
              onPress={addKeyword}
              icon={() => <AntDesign name="pluscircleo" size={24} color="black" />}
            />
          }
        />
      </View>

      {listingType === "inventory" && (
        <>
          <View style={{ gap: 4 }}>
            <Text>Location:</Text>
            <TextInput
              value={location}
              onChangeText={setLocation}
              label="Enter location (optional)"
            />
          </View>
          <View style={{ gap: 4 }}>
            <Text>Preffered offer:</Text>
            <TextInput
              value={preferredOffer}
              onChangeText={setPreferredOffer}
              label="Describe your preferred offer"
            />
          </View>
        </>
      )}

      <Button onPress={postListing} mode="contained">
        Post Listing
      </Button>
    </ScrollView>
  );
}

export default function CreateNewListingScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center", padding: 16 }}>
        <Text style={{ fontSize: 16, marginBottom: 4 }}>Create New Listing</Text>
      </View>
      <TabsProvider defaultIndex={0}>
        <Tabs>
          <TabScreen label="Inventory">
            <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}>
              <NewListing listingType="inventory" />
            </ScrollView>
          </TabScreen>
          <TabScreen label="Wish">
            <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}>
              <NewListing listingType="wish" />
            </ScrollView>
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  );
}
