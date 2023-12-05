// Dynamic route!
// e.g. /match/1, /match/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL>

import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Paragraph, Text, Title } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import { COLORS } from "~/lib/theme";
import { apiFetch } from "~/lib/utils";

interface Match {
  id: number;
  type: string;
  content: {
    user: string;
    title: string;
    description: string;
    image: string;
  };
  timestamp: string;
  is_deleted: boolean;
  user_id: number;
}

interface CardComponentProps {
  id: number;
  content: {
    user: string;
    title: string;
    description: string;
    image: string;
  };
  timestamp: string;
  is_deleted: boolean;
  user_id: number;
  onDelete: (id: number) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ id, content, timestamp, onDelete }) => (
  <Card style={styles.card}>
    <Card.Cover source={{ uri: content.image }} style={styles.cardImage} />
    <Card.Content style={styles.cardContent}>
      <Title style={styles.cardTitle} numberOfLines={1}>
        {content.title}
      </Title>
      <Text numberOfLines={1} style={{ color: "grey" }}>
        {content.user} &#9733;&#9733;&#9733;&#9733; 4.7 (51)
      </Text>
      <Paragraph style={styles.cardParagraph} numberOfLines={3}>
        {content.description}
      </Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button onPress={() => onDelete(id)}>Delete</Button>
    </Card.Actions>
  </Card>
);

export default function MatchFound() {
  const { id } = useLocalSearchParams();
  const [matches, setMatches] = useState<Match[]>([]);

  const deleteMatch = async (matchId: number) => {
    try {
      await apiFetch(`/notification/${matchId}`, { method: "DELETE" });
      const updatedMatches = matches.filter((match) => match.id !== matchId);
      setMatches(updatedMatches);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { data, error } = await apiFetch<Match[]>(`/notification/user/${id}`);
        if (error) {
          console.error(error);
        } else {
          setMatches(data || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMatches();
  }, [id]);

  return (
    <TabsProvider>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Suggested Matches</Text>
        </View>
        <Tabs>
          <TabScreen label="To send">
            <ScrollView
              style={{ flex: 1, padding: 8 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
            >
              {matches.map((match) => (
                <CardComponent key={match.id} {...match} onDelete={deleteMatch} />
              ))}
            </ScrollView>
          </TabScreen>
          <TabScreen label="To receive">
            <ScrollView
              style={{ flex: 1, padding: 8 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
            >
              {matches.map((match) => (
                <CardComponent key={match.id} {...match} onDelete={deleteMatch} />
              ))}
            </ScrollView>
          </TabScreen>
        </Tabs>
      </View>
    </TabsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: COLORS.surface,
    paddingBottom: 16,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: -4,
  },
  cardParagraph: {
    fontSize: 12,
    paddingTop: 4,
    height: 40,
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  card: {
    flexBasis: "48%",
    marginVertical: 8,
  },
  cardImage: {
    resizeMode: "cover",
    height: 200,
  },
  cardContent: {
    marginTop: 8,
  },
});
