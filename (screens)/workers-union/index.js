import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, CreditCard, FileText, MessageSquare, Calendar, Award, AlertCircle } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { AnnouncementBanner } from '@/components/AnnouncementBanner';
import { QuickActionCard } from '@/components/QuickActionCard';
import { mockUser, mockAnnouncements } from '@/data/mockData';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{mockUser.name}</Text>
            <Text style={styles.membershipId}>ID: {mockUser.membershipId}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color={theme.colors.text.white} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>
                {mockAnnouncements.filter(a => !a.isRead).length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          {mockAnnouncements.slice(0, 2).map((announcement) => (
            <AnnouncementBanner key={announcement.id} announcement={announcement} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <QuickActionCard
              title="Pay Subscription"
              icon={CreditCard}
              colors={theme.gradients.primary}
              onPress={() => router.push('/finances')}
            />
            <QuickActionCard
              title="View Events"
              icon={Calendar}
              colors={theme.gradients.secondary}
              onPress={() => router.push('/(tabs)/events')}
            />
            <QuickActionCard
              title="My Applications"
              icon={FileText}
              colors={theme.gradients.cool}
              onPress={() => router.push('/applications')}
            />
            <QuickActionCard
              title="Community"
              icon={MessageSquare}
              colors={theme.gradients.warm}
              onPress={() => router.push('/(tabs)/community')}
            />
            <QuickActionCard
              title="Benefits"
              icon={Award}
              colors={theme.gradients.success}
              onPress={() => router.push('/benefits')}
            />
            <QuickActionCard
              title="Report Issue"
              icon={AlertCircle}
              colors={theme.gradients.dark}
              onPress={() => router.push('/report-issue')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Union Information</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Branch: {mockUser.branch}</Text>
            <Text style={styles.infoText}>Member since: {new Date(mockUser.joinDate).toLocaleDateString()}</Text>
            <Text style={styles.infoText}>Occupation: {mockUser.occupation}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.white,
    opacity: 0.9,
  },
  userName: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.white,
    marginTop: 4,
  },
  membershipId: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.white,
    opacity: 0.8,
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: theme.spacing.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: theme.colors.danger,
    borderRadius: theme.borderRadius.full,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: theme.colors.text.white,
    fontSize: 10,
    fontWeight: theme.fontWeight.bold,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.sm,
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    ...theme.shadow.sm,
  },
  infoTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
});
