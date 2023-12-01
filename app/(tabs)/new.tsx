import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { IconButton, TextInput } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";

interface ListItem {
  id: number;
  title: string;
  photos: string[]; //will implement this if nanay backend
  description: string;
  category: string;
  price: string;
}

// New component for the title form
function TitleForm({ setTitle }: { setTitle: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8, width: "100%" }}>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Title</Text>
      <TextInput
        placeholder="Enter title"
        style={{
          height: 30,
          borderColor: "gray",
          borderWidth: 1,
          padding: 8,
          borderRadius: 4,
          width: "100%",
        }}
        onChangeText={(text) => setTitle(text)}
      />
    </View>
  );
}

// New component for adding photos
function PhotoSection() {
  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8, width: "100%" }}>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Photos</Text>
      {/* Placeholder for adding photos (frontend only) */}
      <View
        style={{
          borderWidth: 1,
          borderColor: "gray",
          height: 140,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
        }}
      >
        <IconButton icon="camera" onPress={() => console.log("Add Photos")} />
      </View>
    </View>
  );
}

// New component for the description form
function DescriptionForm({
  setDescription,
}: {
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8, width: "100%" }}>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Description</Text>
      <TextInput
        placeholder="Enter description"
        multiline
        style={{
          height: 60,
          borderColor: "gray",
          borderWidth: 1,
          padding: 8,
          borderRadius: 4,
          width: "100%",
        }}
        onChangeText={(text) => setDescription(text)}
      />
    </View>
  );
}

// New component for the category dropdown using react-native-element-dropdown
function CategoryDropdown({
  setCategory,
}: {
  setCategory: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const data = [
    { label: "Clothing", value: "clothing" },
    { label: "Gadgets", value: "gadgets" },
    { label: "Vehicles", value: "vehicles" },
    { label: "Appliances", value: "appliances" },
  ];

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8, width: "100%" }}>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select category"
        onChange={(item) => setCategory(item.value)}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
    </View>
  );
}

// New component for the price form
function PriceForm({ setPrice }: { setPrice: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8, width: "100%" }}>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Price</Text>
      <TextInput
        placeholder="Enter price"
        keyboardType="numeric"
        style={{
          height: 30,
          borderColor: "gray",
          borderWidth: 1,
          padding: 8,
          borderRadius: 4,
          width: "100%",
        }}
        onChangeText={(text) => setPrice(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  postButton: {
    marginTop: 16,
  },
});

export default function NewListing() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center", padding: 16 }}>
        <Text style={{ fontSize: 16, marginBottom: 4 }}>Create New Listing</Text>
      </View>
      <TabsProvider defaultIndex={0}>
        <Tabs>
          <TabScreen label="Items">
            <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}>
              {/* <TitleForm /> */}
              {/* <PhotoSection /> */}
              {/* <DescriptionForm /> */}
              {/* Adding the new CategoryDropdown component */}
              {/* <CategoryDropdown /> */}
              {/* <PriceForm /> */}
              {/* Adding the post button */}
              {/* <Button
                mode="contained"
                style={styles.postButton}
                onPress={() => console.log("Post Listing")}
              >
                Post Listing
              </Button> */}
            </ScrollView>
          </TabScreen>
          <TabScreen label="Services">
            <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}>
              {/* <TitleForm /> */}
              {/* <PhotoSection /> */}
              {/* <DescriptionForm /> */}
              {/* Adding the new CategoryDropdown component */}
              {/* <CategoryDropdown /> */}
              {/* <PriceForm /> */}
              {/* Adding the post button */}
              {/* <Button
                mode="contained"
                style={styles.postButton}
                onPress={() => console.log("Post Listing")}
              >
                Post Listing
              </Button> */}
            </ScrollView>
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  );
}
