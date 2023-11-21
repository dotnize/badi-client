// new.tsx

import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { IconButton } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";

// New component for the listing form
function ListingForm() {
  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8, width: "100%" }}>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Title</Text>
      <TextInput
        placeholder=""
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          padding: 8,
          borderRadius: 4,
          width: "100%",
        }}
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
          height: 120,
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
              {/* ListingForm component */}
              <ListingForm />
              {/* PhotoSection component */}
              <PhotoSection />
            </ScrollView>
          </TabScreen>
          <TabScreen label="Services">
            <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}>
              {/* ListingForm component */}
              <ListingForm />
              {/* PhotoSection component */}
              <PhotoSection />
            </ScrollView>
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  );
}
