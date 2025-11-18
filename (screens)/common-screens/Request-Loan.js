import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button } from '../../components/ui/Button';
import { mockGroupSettings, mockMemberAccounts } from '../../utils/mockData';

export default function RequestLoanScreen({ navigation, route }) {
  const { groupId } = route.params;
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [loading, setLoading] = useState(false);

  const settings = mockGroupSettings.find(s => s.group_id === groupId);
  const account = mockMemberAccounts.find(a => a.group_id === groupId);

  const minLoan = settings?.min_loan_amount || 1000;
  const maxLoan = settings?.max_loan_amount || 50000;
  const interestRate = settings?.interest_rate || 0;
  const loanTermDays = settings?.loan_term_days || 30;

  const handleRequestLoan = async () => {
    if (!amount || !purpose) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const amountNum = parseFloat(amount);
    if (amountNum < minLoan) {
      Alert.alert('Error', `Minimum loan amount is E${minLoan}`);
      return;
    }
    if (amountNum > maxLoan) {
      Alert.alert('Error', `Maximum loan amount is E${maxLoan}`);
      return;
    }

    try {
      setLoading(true);
      const totalWithInterest = amountNum * (1 + interestRate / 100);
      Alert.alert(
        'Loan Request Submitted',
        `You've requested E${amountNum}\n\nAmount with ${interestRate}% interest: E${totalWithInterest.toFixed(2)}\nLoan term: ${loanTermDays} days\n\nPending admin approval`,
      );
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.icon}>💳</Text>
        <Text style={styles.title}>Request a Loan</Text>
        <Text style={styles.subtitle}>Borrow from your group</Text>
      </View>

      <View style={styles.termsBox}>
        <Text style={styles.termsTitle}>Loan Terms</Text>
        <View style={styles.termRow}>
          <Text style={styles.termLabel}>Minimum:</Text>
          <Text style={styles.termValue}>E{minLoan}</Text>
        </View>
        <View style={styles.termRow}>
          <Text style={styles.termLabel}>Maximum:</Text>
          <Text style={styles.termValue}>E{maxLoan}</Text>
        </View>
        <View style={styles.termRow}>
          <Text style={styles.termLabel}>Interest Rate:</Text>
          <Text style={styles.termValue}>{interestRate}%</Text>
        </View>
        <View style={styles.termRow}>
          <Text style={styles.termLabel}>Loan Term:</Text>
          <Text style={styles.termValue}>{loanTermDays} days</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Loan Amount (Emalangeni)</Text>
        <View style={styles.amountInputContainer}>
          <Text style={styles.currencySymbol}>E</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            editable={!loading}
            placeholderTextColor="#cbd5e1"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Purpose of Loan</Text>
        <TextInput
          style={[styles.input, styles.purposeInput]}
          placeholder="What will you use this loan for? (e.g., Business investment, Education, Emergency)"
          value={purpose}
          onChangeText={setPurpose}
          editable={!loading}
          placeholderTextColor="#cbd5e1"
          multiline
        />
      </View>

      {amount && (
        <View style={styles.calculationBox}>
          <Text style={styles.calcTitle}>Loan Calculation</Text>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Principal:</Text>
            <Text style={styles.calcValue}>E{parseFloat(amount).toFixed(2)}</Text>
          </View>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Interest ({interestRate}%):</Text>
            <Text style={styles.calcValue}>
              E{(parseFloat(amount) * interestRate / 100).toFixed(2)}
            </Text>
          </View>
          <View style={[styles.calcRow, styles.calcRowTotal]}>
            <Text style={styles.calcLabelTotal}>Total to Repay:</Text>
            <Text style={styles.calcValueTotal}>
              E{(parseFloat(amount) * (1 + interestRate / 100)).toFixed(2)}
            </Text>
          </View>
        </View>
      )}

      <Button
        title={loading ? 'Submitting...' : 'Submit Loan Request'}
        onPress={handleRequestLoan}
        disabled={loading || !amount || !purpose}
        style={styles.submitButton}
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
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
  },
  termsBox: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#0284c7',
  },
  termsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0c4a6e',
    marginBottom: 12,
  },
  termRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  termLabel: {
    fontSize: 12,
    color: '#0c4a6e',
  },
  termValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0c4a6e',
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingLeft: 16,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '700',
    color: '#64748b',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1e293b',
  },
  purposeInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  calculationBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  calcTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  calcRowTotal: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  calcLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  calcLabelTotal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1e293b',
  },
  calcValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
  },
  calcValueTotal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563eb',
  },
  submitButton: {
    marginTop: 8,
  },
});
