import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/ui/StatCard';
import { TransactionItem } from '../../components/ui/TransactionItem';
import { mockGroups, mockMemberAccounts, mockTransactions } from '../../utils/mockData';

export default function GroupDetailScreen({ navigation, route }) {
  const { groupId } = route.params;

  const group = mockGroups.find(g => g.id === groupId);
  const account = mockMemberAccounts.find(a => a.group_id === groupId);
  const transactions = mockTransactions.filter(t => t.group_id === groupId);

  if (!group || !account) {
    return (
      <View style={styles.container}>
        <Text>Group not found</Text>
      </View>
    );
  }

  const groupTypeInfo = {
    'stokfellas': {
      icon: '💰',
      color: '#06b6d4',
      description: 'Rotating savings group for shared benefits',
    },
    'micro-loan': {
      icon: '📊',
      color: '#10b981',
      description: 'Small business lending and investment',
    },
    'workers-union': {
      icon: '🤝',
      color: '#f59e0b',
      description: 'Worker welfare and collective savings',
    },
  };

  const info = groupTypeInfo[group.type];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={[styles.header, { borderColor: info.color }]}>
        <Text style={styles.icon}>{info.icon}</Text>
        <Text style={styles.groupName}>{group.name}</Text>
        <Text style={styles.groupType}>{group.type.replace('-', ' ')}</Text>
        <Text style={styles.description}>{group.description}</Text>
      </View>

      <View style={styles.statsContainer}>
        <StatCard
          icon="👥"
          label="Total Members"
          value={group.total_members}
          color={info.color}
          style={{ flex: 1 }}
        />
        <StatCard
          icon="📅"
          label="Created"
          value={new Date(group.created_at).toLocaleDateString()}
          color="#8b5cf6"
          style={{ flex: 1 }}
        />
      </View>

      <View style={styles.accountStats}>
        <Text style={styles.statsTitle}>Your Account</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Contributed</Text>
            <Text style={[styles.statValue, { color: '#10b981' }]}>E{account.total_contributed}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Balance</Text>
            <Text style={[styles.statValue, { color: '#2563eb' }]}>E{account.current_balance}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Borrowed</Text>
            <Text style={[styles.statValue, { color: '#ef4444' }]}>E{account.total_borrowed}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Interest</Text>
            <Text style={[styles.statValue, { color: '#8b5cf6' }]}>E{account.interest_accumulated}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionEmoji}>⬇️</Text>
            <Text style={styles.actionName}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionEmoji}>⬆️</Text>
            <Text style={styles.actionName}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionEmoji}>💳</Text>
            <Text style={styles.actionName}>Loan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionEmoji}>📤</Text>
            <Text style={styles.actionName}>Transfer</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        {transactions.slice(0, 3).map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </View>

      <Button
        title="Exit Group"
        variant="outline"
        style={styles.exitButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderTopWidth: 4,
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  groupName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'center',
  },
  groupType: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'capitalize',
    marginBottom: 12,
  },
  description: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  accountStats: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  viewAll: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
  },
  exitButton: {
    marginTop: 8,
  },
});
