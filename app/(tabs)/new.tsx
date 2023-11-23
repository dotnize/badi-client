import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { IconButton } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";

// New component for the title form
function TitleForm() {
  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8, width: "100%" }}>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Title</Text>
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
          height: 200,
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
function DescriptionForm() {
  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8, width: "100%" }}>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Description</Text>
      {/* Add your TextInput here */}
    </View>
  );
}

// New component for the category dropdown using react-native-element-dropdown. Replaced picker.
function CategoryDropdown() {
  const data = [
    { label: "Clothing", value: "clothing" },
    { label: "Gadgets", value: "gadgets" },
    { label: "Vehicles", value: "vehicles" },
    { label: "Appliances", value: "appliances" },
  ];

  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8, width: "100%" }}>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Category</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={!selectedCategory ? "Select item" : "..."}
        onChange={(item) => setSelectedCategory(item.value)}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={selectedCategory ? "blue" : "black"}
            name="Safety"
            size={20}
          />
        )}
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
});

export default function NewListing() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center", padding: 16 }}>
        <Text style={{ fontSize: 16, marginBottom: 16 }}>Create New Listing</Text>
      </View>
      <TabsProvider defaultIndex={0}>
        <Tabs>
          <TabScreen label="Items">
            <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}>
              <TitleForm />
              <PhotoSection />
              <DescriptionForm />
              <CategoryDropdown />
            </ScrollView>
          </TabScreen>
          <TabScreen label="Services">
            <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}>
              <TitleForm />
              <PhotoSection />
              <DescriptionForm />
              <CategoryDropdown />
            </ScrollView>
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  );
}
