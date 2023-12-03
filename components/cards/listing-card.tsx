import { Link } from "expo-router";
import { Image, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { emptyImageUrl } from "~/lib/firebase";
import type { Inventory, User, Wish } from "~/lib/types";

export default function ListingCard({ listing }: { listing: Inventory | Wish }) {
  const { id, name, description, keywords, imageUrls } = listing;
  const user = listing.user as User;

  const location = (listing as Inventory).location || user.location;

  return (
    <Link href={(listing as Inventory).preferredOffer ? `/listings/${id}` : ""}>
      <Card style={{ height: "auto", width: "100%" }}>
        <View style={{ height: 200 }}>
          <Image
            style={{
              flex: 1,
              height: "100%",
              width: "100%",
              resizeMode: "cover",
              borderRadius: 10,
              marginBottom: 10,
            }}
            source={{ uri: imageUrls?.[0] || emptyImageUrl }}
          />
        </View>
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
            }}
          >
            <View>
              <Text variant="headlineSmall">{name}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text variant="titleSmall" style={{ color: "grey" }}>
                  {user.firstName}
                </Text>
                {user.averageRating && (
                  <>
                    <Text
                      variant="titleSmall"
                      style={{
                        color: "grey",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      &#9733; {user.averageRating}
                    </Text>
                  </>
                )}
                <Text variant="titleSmall" style={{ paddingHorizontal: 10, color: "grey" }}>
                  |
                </Text>

                <Text variant="titleSmall" style={{ color: "grey" }}>
                  {location}
                </Text>
              </View>
            </View>
            {/* TODO: date posted */}
            {/* <Text style={{ marginLeft: "auto", paddingTop: 5 }}>11/27/35</Text> */}
          </View>

          <Text variant="titleMedium" style={{ marginVertical: 20 }}>
            {description}
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {keywords &&
              Array.from({ length: keywords.length }, (_, index) => (
                <Text key={index} variant="titleSmall" style={{ color: "grey" }}>
                  #{keywords[index]}
                </Text>
              ))}
          </View>
        </Card.Content>
      </Card>
    </Link>
  );
}
