import { router } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatCard } from '../components/ui/StatCard';
import { TransactionItem } from '../components/ui/TransactionItem';
import { mockGroups, mockMemberAccounts, mockTransactions } from '../utils/mockData';

export default function DashboardScreen({ navigation }) {
  const [selectedGroup, setSelectedGroup] = useState('1');

  const account = mockMemberAccounts.find(a => a.group_id === selectedGroup);
  const transactions = mockTransactions.filter(t => t.group_id === selectedGroup).slice(0, 5);
  const currentGroup = mockGroups.find(g => g.id === selectedGroup);

  const handleTopUp = () => {
    router.push({
      pathname: '/(all)/TopUp',
      params: { groupId: selectedGroup },
    });
  };

  const handleTransfer = () => {
    router.push({
      pathname: '/(app)/transfer',
      params: { groupId: selectedGroup },
    });
  };

  const handleRequestLoan = () => {
    router.push({
      pathname: '/(app)/request-loan',
      params: { groupId: selectedGroup },
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Your group performance</Text>
      </View>

      <View style={styles.groupSelector}>
        <Text style={styles.selectorLabel}>Select Group</Text>
        <FlatList
          data={mockGroups}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.groupButton,
                selectedGroup === item.id && styles.groupButtonActive,
              ]}
              onPress={() => setSelectedGroup(item.id)}
            >
              <Text
                style={[
                  styles.groupButtonText,
                  selectedGroup === item.id && styles.groupButtonTextActive,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          scrollEnabled={false}
          contentContainerStyle={styles.groupList}
        />
      </View>

      {account && (
        <>
          <View style={styles.statsGrid}>
            <StatCard
              icon="💰"
              label="Total Contributed"
              value={`E${account.total_contributed}`}
              color="#10b981"
              style={styles.statItem}
            />
            <StatCard
              icon="📊"
              label="Current Balance"
              value={`E${account.current_balance}`}
              color="#2563eb"
              style={styles.statItem}
            />
            <StatCard
              icon="📈"
              label="Interest Earned"
              value={`E${account.interest_accumulated}`}
              color="#8b5cf6"
              style={styles.statItem}
            />
            <StatCard
              icon="💳"
              label="Amount Borrowed"
              value={`E${account.total_borrowed}`}
              color="#ef4444"
              style={styles.statItem}
            />
          </View>

          <View style={styles.actionsContainer}>
            <Text style={styles.actionsTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity style={styles.actionButton} onPress={handleTopUp}>
                <Text style={styles.actionIcon}>⬇️</Text>
                <Text style={styles.actionText}>Top Up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleTransfer}>
                <Text style={styles.actionIcon}>⬆️</Text>
                <Text style={styles.actionText}>Transfer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleRequestLoan}>
                <Text style={styles.actionIcon}>💳</Text>
                <Text style={styles.actionText}>Request Loan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('Subscribe')}
              >
                <Text style={styles.actionIcon}>📅</Text>
                <Text style={styles.actionText}>Pay Subscription</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.transactionsContainer}>
            <View style={styles.transactionsHeader}>
              <Text style={styles.transactionsTitle}>Recent Transactions</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </View>
        </>
      )}
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
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
  },
  groupSelector: {
    marginBottom: 24,
  },
  selectorLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  groupList: {
    gap: 12,
  },
  groupButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  groupButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  groupButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  groupButtonTextActive: {
    color: '#fff',
  },
  statsGrid: {
    gap: 12,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
  },
  actionsContainer: {
    marginBottom: 24,
  },
  actionsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  transactionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  viewAllText: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '600',
  },
});
