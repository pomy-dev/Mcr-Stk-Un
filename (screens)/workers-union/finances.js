import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Wallet, TrendingUp, AlertCircle, CreditCard, DollarSign, PiggyBank, Clock } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { GradientCard } from '@/components/GradientCard';
import { mockSubscriptions, mockFinanceSummary } from '@/data/mockData';

export default function FinancesScreen() {
  const formatCurrency = (amount) => `E${amount.toFixed(2)}`;

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return theme.colors.success;
      case 'pending':
        return theme.colors.warning;
      case 'overdue':
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
        <Text style={styles.headerTitle}>Finances</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryContainer}>
          <GradientCard colors={theme.gradients.primary} style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <Wallet size={24} color={theme.colors.text.white} />
            </View>
            <Text style={styles.balanceAmount}>{formatCurrency(mockFinanceSummary.balance)}</Text>
            <Text style={styles.balanceSubtext}>
              Total Contributions: {formatCurrency(mockFinanceSummary.totalContributions)}
            </Text>
          </GradientCard>

          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: theme.colors.success + '15' }]}>
              <PiggyBank size={20} color={theme.colors.success} />
              <Text style={styles.statValue}>{formatCurrency(mockFinanceSummary.savings)}</Text>
              <Text style={styles.statLabel}>Savings</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.colors.warning + '15' }]}>
              <Clock size={20} color={theme.colors.warning} />
              <Text style={styles.statValue}>{formatCurrency(mockFinanceSummary.pendingPayments)}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Monthly Subscription</Text>
            <TouchableOpacity style={styles.payButton}>
              <LinearGradient
                colors={theme.gradients.secondary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.payButtonGradient}
              >
                <CreditCard size={18} color={theme.colors.text.white} />
                <Text style={styles.payButtonText}>Pay with MTN MoMo</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.subscriptionCard}>
            <Text style={styles.subscriptionAmount}>E150.00</Text>
            <Text style={styles.subscriptionText}>Due monthly on the 15th</Text>
            {mockFinanceSummary.pendingPayments > 0 && (
              <View style={styles.warningBox}>
                <AlertCircle size={16} color={theme.colors.warning} />
                <Text style={styles.warningText}>Payment due soon</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment History</Text>
          {mockSubscriptions.map((subscription) => (
            <View key={subscription.id} style={styles.historyCard}>
              <View style={styles.historyLeft}>
                <View
                  style={[
                    styles.historyIcon,
                    { backgroundColor: getStatusColor(subscription.status) + '15' },
                  ]}
                >
                  <DollarSign size={20} color={getStatusColor(subscription.status)} />
                </View>
                <View>
                  <Text style={styles.historyPeriod}>{subscription.period}</Text>
                  <Text style={styles.historyMethod}>{subscription.paymentMethod}</Text>
                  <Text style={styles.historyDate}>
                    {new Date(subscription.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>
              <View style={styles.historyRight}>
                <Text style={styles.historyAmount}>{formatCurrency(subscription.amount)}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(subscription.status) + '15' },
                  ]}
                >
                  <Text style={[styles.statusText, { color: getStatusColor(subscription.status) }]}>
                    {subscription.status.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          ))}
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
  headerTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.white,
  },
  content: {
    flex: 1,
  },
  summaryContainer: {
    padding: theme.spacing.md,
  },
  balanceCard: {
    marginBottom: theme.spacing.md,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  balanceLabel: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.white,
    opacity: 0.9,
  },
  balanceAmount: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.white,
    marginBottom: theme.spacing.xs,
  },
  balanceSubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.white,
    opacity: 0.8,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadow.sm,
  },
  statValue: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.secondary,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  payButton: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  payButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  payButtonText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.white,
  },
  subscriptionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadow.sm,
    marginBottom: theme.spacing.md,
  },
  subscriptionAmount: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  subscriptionText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.secondary,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.warning + '15',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.sm,
  },
  warningText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.warning,
    fontWeight: theme.fontWeight.medium,
  },
  historyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadow.sm,
  },
  historyLeft: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    flex: 1,
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyPeriod: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  historyMethod: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  historyDate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.light,
    marginTop: 2,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyAmount: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
});
