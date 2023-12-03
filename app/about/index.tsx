import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";

import { defaultAvatarUrl } from "~/lib/firebase";
import { COLORS } from "~/lib/theme";

const TeamMembers = [
  { name: "Leonel Baclayon", image: require("~/assets/leonel.png") },
  { name: "Nathaniel Tampus", image: { uri: defaultAvatarUrl } },
  { name: "Liden Sagmon", image: require("~/assets/liden.jpg") },
  { name: "Jameel Ursonal", image: { uri: defaultAvatarUrl } },
  { name: "Christian Piape", image: require("~/assets/christian.png") },
];

const TeamMottos = [
  '"Hakuna Matata"',
  '"I have a keyboard."',
  '"If you can\'t survive, just try"',
  '"Empowering communities through technology."',
  "\"Don't worry about the things you can't control.\"",
];

const ContactInfo = () => (
  <View style={styles.contactSection}>
    <Title style={styles.sectionTitle}>Get in Touch</Title>
    <View style={styles.separator} />
    <Paragraph>Email: hello@yourcompany.com</Paragraph>
    <Paragraph>Phone: (123) 456-7890</Paragraph>
    <Paragraph>Visit us at: 42 Digital Lane, Creativity City</Paragraph>
  </View>
);

const TeamMember = ({ member, motto }: { member: { name: string; image: any }; motto: string }) => (
  <View style={styles.teamMember}>
    <Image source={member.image} style={styles.teamMemberImage} />
    <Title style={styles.teamMemberName}>{member.name}</Title>
    <Paragraph style={styles.teamMemberMotto}>{motto}</Paragraph>
  </View>
);

const AboutUsIndex = () => (
  <ScrollView contentContainerStyle={styles.container}>
    {/* Top Section */}
    <Card style={styles.topSection}>
      <Title style={styles.sectionTitle}>About Us</Title>
      <Image source={require("~/assets/team.png")} style={styles.topImage} />
      <Paragraph style={styles.sectionText}>
        Badi is a web and mobile platform that facilitates the barter of skills, services, and
        second-hand items. Our platform promotes cashless transactions while reducing carbon
        footprints, offering a secure and convenient avenue for users to trade services and goods
        sustainably.
      </Paragraph>
    </Card>

    {/* Mission Section */}
    <Card style={styles.section}>
      <Title style={styles.sectionTitle}>Our Mission</Title>
      <Paragraph style={styles.sectionText}>
        Empowering barterers and local freelancers by providing a streamlined platform for
        exchanging services and goods without the need for cash. We aim to reduce reliance on
        monetary transactions, promote eco-friendly practices, and create a vibrant community of
        sustainable trade.
      </Paragraph>
    </Card>

    {/* Team Section */}
    <View style={styles.teamSection}>
      <Title style={styles.sectionTitle}>Meet The Team</Title>
      <View style={styles.teamContainer}>
        {TeamMembers.map((member, index) => (
          <TeamMember key={index} member={member} motto={TeamMottos[index]} />
        ))}
      </View>
    </View>

    {/* Contact Section */}
    <ContactInfo />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  topSection: {
    marginBottom: 24,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
  },
  teamSection: {
    marginBottom: 24,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 16,
  },
  contactSection: {
    margin: 0,
    backgroundColor: COLORS.surfaceVariant,
    padding: 16,
  },
  separator: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 2,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 16,
    textAlign: "center",
  },
  sectionText: {
    textAlign: "center",
    marginBottom: 16,
    color: "COLORS.onPrimaryContainer",
  },
  topImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 16,
    marginBottom: 16,
    alignSelf: "center",
  },
  teamContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  teamMember: {
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: 10,
    padding: 16,
    width: "45%",
  },
  teamMemberImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  teamMemberName: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  teamMemberMotto: {
    fontStyle: "italic",
    textAlign: "center",
    color: COLORS.onSurfaceVariant,
  },
  contactText: {
    textAlign: "center",
    marginBottom: 16,
    fontStyle: "italic",
    color: COLORS.onSurfaceVariant,
    borderRadius: 10,
  },
});

export default AboutUsIndex;
