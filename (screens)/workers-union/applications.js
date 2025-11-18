import { theme } from '@/constants/theme';
import { mockApplications } from '@/data/mockData';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  CheckCircle,
  ChevronLeft,
  Clock,
  DollarSign,
  FileText,
  GraduationCap,
  Plane,
  Plus,
  XCircle,
} from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const APPLICATION_TYPES = [
  { id: 'loan', title: 'Emergency Loan', icon: DollarSign, color: theme.colors.secondary },
  { id: 'education', title: 'Education Fund', icon: GraduationCap, color: theme.colors.accent },
  { id: 'leave', title: 'Extended Leave', icon: Plane, color: theme.colors.primary },
];

export default function ApplicationsScreen() {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return Clock;
      case 'approved':
        return CheckCircle;
      case 'rejected':
        return XCircle;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return theme.colors.warning;
      case 'approved':
        return theme.colors.success;
      case 'rejected':
        return theme.colors.danger;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color={theme.colors.text.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Applications</Text>
        <Text style={styles.headerSubtitle}>Manage your benefit applications</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Application</Text>
          <View style={styles.typeGrid}>
            {APPLICATION_TYPES.map((type) => {
              const IconComponent = type.icon;
              return (
                <TouchableOpacity
                  key={type.id}
                  style={styles.typeCard}
                  activeOpacity={0.7}
                >
                  <View style={[styles.typeIcon, { backgroundColor: type.color + '15' }]}>
                    <IconComponent size={24} color={type.color} />
                  </View>
                  <Text style={styles.typeTitle}>{type.title}</Text>
                  <View style={styles.applyButton}>
                    <Plus size={16} color={theme.colors.primary} />
                    <Text style={styles.applyButtonText}>Apply</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Applications</Text>
          {mockApplications.length > 0 ? (
            mockApplications.map((application) => {
              const StatusIcon = getStatusIcon(application.status);
              const statusColor = getStatusColor(application.status);

              return (
                <TouchableOpacity
                  key={application.id}
                  style={styles.applicationCard}
                  activeOpacity={0.7}
                >
                  <View style={styles.applicationLeft}>
                    <View style={styles.applicationIcon}>
                      <FileText size={20} color={theme.colors.primary} />
                    </View>
                    <View style={styles.applicationInfo}>
                      <Text style={styles.applicationTitle}>{application.title}</Text>
                      <Text style={styles.applicationType}>
                        {application.type.charAt(0).toUpperCase() + application.type.slice(1)}
                      </Text>
                      <Text style={styles.applicationDate}>
                        {new Date(application.date).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.applicationRight}>
                    <View
                      style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}
                    >
                      <StatusIcon size={14} color={statusColor} />
                      <Text style={[styles.statusText, { color: statusColor }]}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <FileText size={48} color={theme.colors.text.light} />
              <Text style={styles.emptyStateText}>No applications yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Submit your first application to access union benefits
              </Text>
            </View>
          )}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Application Process</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Select the type of benefit you need</Text>
            </View>
            <View style={styles.infoStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>Fill out the application form with required details</Text>
            </View>
            <View style={styles.infoStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Submit and wait for committee review</Text>
            </View>
            <View style={styles.infoStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={styles.stepText}>Receive notification of decision within 5-7 days</Text>
            </View>
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
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  backButton: {
    marginBottom: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.white,
  },
  headerSubtitle: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.white,
    opacity: 0.9,
    marginTop: 4,
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
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  typeCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadow.sm,
  },
  typeIcon: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  typeTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  applyButtonText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.primary,
  },
  applicationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadow.sm,
  },
  applicationLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  applicationIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  applicationInfo: {
    flex: 1,
  },
  applicationTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  applicationType: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: 2,
  },
  applicationDate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.light,
  },
  applicationRight: {
    justifyContent: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadow.sm,
  },
  emptyStateText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.md,
  },
  emptyStateSubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  infoSection: {
    padding: theme.spacing.md,
  },
  infoTitle: {
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
  },
  infoStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  stepNumberText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.white,
  },
  stepText: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: 20,
    paddingTop: 4,
  },
});
