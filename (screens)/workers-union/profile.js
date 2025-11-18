import { theme } from '@/constants/theme';
import { mockUser } from '@/data/mockData';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Bell,
  Briefcase,
  Calendar,
  ChevronRight,
  FileText,
  HelpCircle,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Settings
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const SettingsItem = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    showToggle,
    toggleValue,
    onToggle,
  }) => (
    <TouchableOpacity
      style={styles.settingsItem}
      onPress={onPress}
      disabled={showToggle}
      activeOpacity={0.7}
    >
      <View style={styles.settingsItemLeft}>
        <View style={styles.settingsIconContainer}>
          <Icon size={20} color={theme.colors.primary} />
        </View>
        <View>
          <Text style={styles.settingsItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showToggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
          thumbColor={theme.colors.surface}
        />
      ) : (
        <ChevronRight size={20} color={theme.colors.text.light} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Image
          source={{ uri: mockUser.avatarUrl }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{mockUser.name}</Text>
        <Text style={styles.profileId}>{mockUser.membershipId}</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Mail size={18} color={theme.colors.text.secondary} />
              <Text style={styles.infoText}>{mockUser.email}</Text>
            </View>
            <View style={styles.infoItem}>
              <Phone size={18} color={theme.colors.text.secondary} />
              <Text style={styles.infoText}>{mockUser.phone}</Text>
            </View>
            <View style={styles.infoItem}>
              <Briefcase size={18} color={theme.colors.text.secondary} />
              <Text style={styles.infoText}>{mockUser.occupation}</Text>
            </View>
            <View style={styles.infoItem}>
              <MapPin size={18} color={theme.colors.text.secondary} />
              <Text style={styles.infoText}>{mockUser.branch}</Text>
            </View>
            <View style={styles.infoItem}>
              <Calendar size={18} color={theme.colors.text.secondary} />
              <Text style={styles.infoText}>
                Member since {new Date(mockUser.joinDate).toLocaleDateString()}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            <SettingsItem
              icon={Bell}
              title="Notifications"
              subtitle="Receive updates and alerts"
              showToggle
              toggleValue={notificationsEnabled}
              onToggle={setNotificationsEnabled}
            />
            <SettingsItem
              icon={Lock}
              title="Change Password"
              subtitle="Update your password"
              onPress={() => { }}
            />
            <SettingsItem
              icon={Settings}
              title="App Preferences"
              subtitle="Customize your experience"
              onPress={() => { }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.settingsCard}>
            <SettingsItem
              icon={HelpCircle}
              title="Help & Support"
              subtitle="Get help or contact us"
              onPress={() => { }}
            />
            <SettingsItem
              icon={FileText}
              title="Terms & Conditions"
              subtitle="Read our terms"
              onPress={() => { }}
            />
            <SettingsItem
              icon={FileText}
              title="Privacy Policy"
              subtitle="Your data protection"
              onPress={() => { }}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color={theme.colors.danger} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
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
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.full,
    borderWidth: 4,
    borderColor: theme.colors.surface,
    marginBottom: theme.spacing.md,
  },
  profileName: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.white,
    marginBottom: 4,
  },
  profileId: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.white,
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadow.sm,
    marginBottom: theme.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  infoText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.primary,
    flex: 1,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadow.sm,
  },
  editButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.white,
  },
  settingsCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadow.sm,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: 1,
  },
  settingsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsItemTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text.primary,
  },
  settingsItemSubtitle: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.danger + '30',
  },
  logoutText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.danger,
  },
  version: {
    textAlign: 'center',
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.light,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
});
