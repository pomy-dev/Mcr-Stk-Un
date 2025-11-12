"use client";

import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { Icons } from '../../constants/Icons';

const { width: WINDOW_WIDTH } = Dimensions.get("window");

const mockUser = {
  name: "Alex Kimani",
  avatar: "https://i.pravatar.cc/150?img=12",
};

const groups = [
  { id: "g1", name: "Farmers Union", logo: "https://i.pravatar.cc/80?img=1", bg: "https://i.pravatar.cc/300?img=31", latestUpdate: "Annual meeting on 20 Nov" },
  { id: "g2", name: "Youth Council", logo: "https://i.pravatar.cc/80?img=2", bg: "https://i.pravatar.cc/300?img=32", latestUpdate: "Volunteer drive this Saturday" },
  { id: "g3", name: "Artisans Guild", logo: "https://i.pravatar.cc/80?img=3", bg: "https://i.pravatar.cc/300?img=33", latestUpdate: "Exhibition open till Sunday" },
  { id: "g4", name: "Small Business Assoc.", logo: "https://i.pravatar.cc/80?img=4", bg: "https://i.pravatar.cc/300?img=34", latestUpdate: "Training: Digital skills" },
  { id: "g5", name: "Mothers Circle", logo: "https://i.pravatar.cc/80?img=5", bg: "https://i.pravatar.cc/300?img=35", latestUpdate: "Health workshop next week" },
  { id: "g6", name: "Fishermen Guild", logo: "https://i.pravatar.cc/80?img=6", bg: "https://i.pravatar.cc/300?img=36", latestUpdate: "Net distribution in port" },
];

const banners = groups.map((g) => ({
  id: g.id,
  title: g.name,
  subtitle: g.latestUpdate,
  logo: g.logo,
  bg: g.bg,
}));

const reminderIcons = ["calendar", "brush", "people"];

export default function HomeScreen({ navigation }) {
  const [greetingText, setGreetingText] = useState("");
  const [startingText, setStartingText] = useState("");
  const [activeBanner, setActiveBanner] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [reminders, setReminders] = useState([
    { id: "n1", groupId: "g1", title: "Meeting reminder: Farmers Union", time: "2h ago", checked: false },
    { id: "n2", groupId: "g3", title: "Your craft accepted for exhibition", time: "1d ago", checked: false },
    { id: "n3", groupId: "g2", title: "Volunteer sign-up confirmed", time: "3d ago", checked: false },
  ]);

  const carouselRef = useRef(null);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    let greeting = "";
    if (hour >= 5 && hour < 12) greeting = "Morning";
    else if (hour >= 12 && hour < 17) greeting = "Afternoon";
    else if (hour >= 17 && hour < 21) greeting = "Evening";
    else greeting = "Night";

    setGreetingText(greeting);
    setStartingText(
      greeting === "Morning"
        ? "Check latest updates"
        : greeting === "Afternoon"
          ? "Stay updated"
          : greeting === "Evening"
            ? "Remember your updates"
            : "Check in before you rest"
    );
  }, []);

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const nextIndex = (activeBanner + 1) % banners.length;
        carouselRef.current.scrollTo({ index: nextIndex, animated: true });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [activeBanner]);

  const handleCheckReminder = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const renderBanner = ({ item }) => (
    <Pressable
      style={[styles.bannerItem, { width: WINDOW_WIDTH - 48 }]}
      onPress={() => navigation.navigate("GroupDetailScreen", { groupId: item.id })}
    >
      <View style={styles.bannerCard}>
        <Image source={{ uri: item.logo }} style={styles.bannerLogo} />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.bannerSubtitle} numberOfLines={2}>
            {item.subtitle}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  const renderGroupGrid = () => {
    const displayGroups = groups.slice(0, 4);
    const itemWidth = (WINDOW_WIDTH - 48 - 12) / 2;

    return (
      <>
        <View style={styles.gridContainer}>
          {displayGroups.map((g) => (
            <Pressable
              key={g.id}
              style={[styles.gridItem, { width: itemWidth }]}
              onPress={() => navigation.navigate("GroupDetailScreen", { groupId: g.id })}
            >
              <Image source={{ uri: g.bg }} style={styles.gridBg} />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
              <View style={styles.gridContent}>
                <Image source={{ uri: g.logo }} style={styles.gridLogo} />
                <Text style={styles.gridName} numberOfLines={1}>
                  {g.name}
                </Text>
                <Text style={styles.gridUpdate} numberOfLines={1}>
                  {g.latestUpdate}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </>
    );
  };

  const renderGroupList = () => {
    const displayGroups = groups.slice(0, 4);
    return (
      <View style={styles.listContainer}>
        {displayGroups.map((g) => (
          <Pressable
            key={g.id}
            style={styles.listItem}
            onPress={() => navigation.navigate("GroupDetailScreen", { groupId: g.id })}
          >
            <Image source={{ uri: g.logo }} style={styles.listLogo} />
            <View style={styles.listText}>
              <Text style={styles.listName}>{g.name}</Text>
              <Text style={styles.listUpdate} numberOfLines={1}>
                {g.latestUpdate}
              </Text>
            </View>
            <Icons.Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </Pressable>
        ))}
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* App Bar */}
      <View style={styles.appBar}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icons.Ionicons name="arrow-back" size={24} color="#0f172a" />
        </Pressable>
        <View style={styles.appBarRight}>
          <Image source={{ uri: mockUser.avatar }} style={styles.userAvatar} />
          <Pressable
            onPress={() =>
              Alert.alert("Logout", "Are you sure you want to log out?", [
                { text: "Cancel" },
                { text: "Logout", onPress: () => navigation.replace("Login") },
              ])
            }
            style={styles.logoutButton}
          >
            <Icons.AntDesign name="logout" size={22} color="#dc2626" />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <Animated.View entering={FadeInDown.duration(600)} style={styles.greetingSection}>
          <Text style={styles.greetingText}>Good {greetingText}, {mockUser.name.split(" ")[0]}!</Text>
          <Text style={styles.startingText}>{startingText}</Text>
        </Animated.View>

        {/* Carousel */}
        <View style={styles.carouselContainer}>
          <Carousel
            ref={carouselRef}
            width={WINDOW_WIDTH - 48}
            height={180}
            data={banners}
            loop
            pagingEnabled
            onSnapToItem={setActiveBanner}
            renderItem={renderBanner}
            mode="parallax"
            modeConfig={{ parallaxScrollingScale: 0.92, parallaxScrollingOffset: 60 }}
          />
          <View style={styles.dotsContainer}>
            {banners.map((_, i) => (
              <View key={i} style={[styles.dot, activeBanner === i && styles.activeDot]} />
            ))}
          </View>
        </View>

        {/* Groups Section */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.groupsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Groups</Text>
            <View style={styles.toggleContainer}>
              <Pressable
                style={[styles.toggleBtn, viewMode === "grid" && styles.toggleActive]}
                onPress={() => setViewMode("grid")}
              >
                <Icons.Ionicons name="grid-outline" size={18} color={viewMode === "grid" ? "#2563eb" : "#64748b"} />
              </Pressable>
              <Pressable
                style={[styles.toggleBtn, viewMode === "list" && styles.toggleActive]}
                onPress={() => setViewMode("list")}
              >
                <Icons.Ionicons name="list-outline" size={18} color={viewMode === "list" ? "#2563eb" : "#64748b"} />
              </Pressable>
            </View>
          </View>

          {viewMode === "grid" ? renderGroupGrid() : renderGroupList()}

          <Pressable
            style={styles.viewAllButton}
            onPress={() => navigation.navigate("GroupsListScreen")}
          >
            <Text style={styles.viewAllText}>View All Groups</Text>
          </Pressable>
        </Animated.View>

        {/* My Reminders */}
        {reminders.length > 0 && (
          <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.remindersSection}>
            <Text style={styles.sectionTitle}>My Reminders</Text>
            <View style={styles.remindersList}>
              {reminders.map((item, idx) => (
                <View key={item.id} style={styles.reminderRow}>
                  <View style={styles.reminderIconContainer}>
                    <Icons.Ionicons name={reminderIcons[idx % reminderIcons.length]} size={18} color="#2563eb" />
                  </View>
                  <View style={styles.reminderText}>
                    <Text style={styles.reminderTitle}>{item.title}</Text>
                    <Text style={styles.reminderTime}>{item.time}</Text>
                  </View>
                  <Pressable onPress={() => handleCheckReminder(item.id)} style={styles.checkButton}>
                    <Icons.Ionicons name="checkmark-circle" size={24} color="#10b981" />
                  </Pressable>
                </View>
              ))}
            </View>
          </Animated.View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </>
  );
}

// === STYLES ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  // App Bar
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
    paddingBottom: 5,
    backgroundColor: "#fff",
    // borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    // elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  backButton: { padding: 8 },
  appBarTitle: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
  appBarRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  userAvatar: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: "#cbd5e1" },
  logoutButton: { padding: 6 },

  // Greeting
  greetingSection: { paddingHorizontal: 10, paddingTop: 10, paddingBottom: 8 },
  greetingText: { fontSize: 17, color: "#475569" },
  startingText: { fontSize: 22, fontWeight: "600", color: "#0f172a" },

  // Carousel
  carouselContainer: { marginTop: 5, alignItems: "center" },
  bannerItem: { height: 180, borderRadius: 16, overflow: "hidden" },
  bannerCard: {
    flex: 1,
    backgroundColor: "#ececedff",
    flexDirection: "row",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e1e1e1ff",
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  bannerLogo: { width: 64, height: 64, borderRadius: 16, marginRight: 16 },
  bannerContent: { flex: 1, justifyContent: "center" },
  bannerTitle: { fontSize: 17, fontWeight: "700", color: "#0f172a" },
  bannerSubtitle: { fontSize: 13, color: "#64748b", marginTop: 6 },

  dotsContainer: { flexDirection: "row", justifyContent: "center", marginTop: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#cbd5e1", marginHorizontal: 4 },
  activeDot: { backgroundColor: "#2563eb", width: 20 },

  // Groups Section
  groupsSection: { paddingHorizontal: 10, marginTop: 20 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 4,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  toggleBtn: { padding: 8, borderRadius: 8 },
  toggleActive: { backgroundColor: "#f1f5f9" },

  // Grid View
  gridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 10, gap: 12 },
  gridItem: { flex: 1, height: 120, borderRadius: 16, overflow: "hidden", marginBottom: 1, position: "relative" },
  gridBg: { ...StyleSheet.absoluteFillObject, width: "100%", height: "100%" },
  gridContent: { ...StyleSheet.absoluteFillObject, padding: 12, justifyContent: "flex-end" },
  gridLogo: { width: 40, height: 40, borderRadius: 12, marginBottom: 8 },
  gridName: { fontSize: 14, fontWeight: "700", color: "#fff" },
  gridUpdate: { fontSize: 11, color: "#e2e8f0", marginTop: 2 },

  viewAllButton: {
    backgroundColor: "#eef2ff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  viewAllText: { fontSize: 15, fontWeight: "600", color: "#4338ca" },

  // List View
  listContainer: { gap: 12, marginBottom: 15 },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    elevation: 1,
  },
  listLogo: { width: 48, height: 48, borderRadius: 12, marginRight: 12 },
  listText: { flex: 1 },
  listName: { fontSize: 15, fontWeight: "600", color: "#0f172a" },
  listUpdate: { fontSize: 12, color: "#64748b", marginTop: 2 },

  // Reminders
  remindersSection: { paddingHorizontal: 10, marginTop: 24, paddingBottom: 4 },
  remindersList: { borderTopWidth: 1, borderTopColor: "#e2e8f0", marginTop: 8 },
  reminderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  reminderIconContainer: { width: 36, alignItems: "center" },
  reminderText: { flex: 1, marginLeft: 12 },
  reminderTitle: { fontSize: 14, fontWeight: "600", color: "#0f172a" },
  reminderTime: { fontSize: 12, color: "#64748b", marginTop: 2 },
  checkButton: { padding: 4 },

  bottomSpacer: { height: 10 },
});