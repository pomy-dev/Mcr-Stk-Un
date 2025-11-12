import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const transactionIcons = {
  deposit: '↓',
  withdrawal: '↑',
  loan: '💳',
  interest: '📈',
  subscription: '📅',
};

const transactionColors = {
  deposit: '#10b981',
  withdrawal: '#ef4444',
  loan: '#f59e0b',
  interest: '#8b5cf6',
  subscription: '#06b6d4',
};

export const TransactionItem = ({ transaction }) => {
  const icon = transactionIcons[transaction.type];
  const color = transactionColors[transaction.type];
  const isIncoming = ['deposit', 'interest'].includes(transaction.type);
  const formattedDate = new Date(transaction.created_at).toLocaleDateString();

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
        <Text style={[styles.icon, { color }]}>{icon}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.type}>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</Text>
        <Text style={styles.description} numberOfLines={1}>{transaction.description}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: isIncoming ? '#10b981' : '#ef4444' }]}>
          {isIncoming ? '+' : '-'}E{transaction.amount}
        </Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
    fontWeight: '600',
  },
  details: {
    flex: 1,
  },
  type: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#64748b',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  date: {
    fontSize: 11,
    color: '#94a3b8',
  },
});

TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    type: PropTypes.oneOf(['deposit', 'withdrawal', 'loan', 'interest', 'subscription']).isRequired,
    description: PropTypes.string,
    amount: PropTypes.number.isRequired,
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};
