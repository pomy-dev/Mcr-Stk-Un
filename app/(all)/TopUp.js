import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../../components/ui/Button';
import { mockGroupSettings } from '../../utils/mockData';

export default function TopUpScreen() {
  const { groupId } = router.setParams;
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [transactionProof, setTransactionProof] = useState('');
  const [loading, setLoading] = useState(false);

  const settings = mockGroupSettings.find(s => s.group_id === groupId);
  const paymentMethods = settings?.payment_methods || [];

  const handleTopUp = async () => {
    if (!amount || !selectedMethod) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      Alert.alert('Success', 'Top-up of E' + amount + ' initiated successfully!');
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
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
        <Text style={styles.icon}>⬇️</Text>
        <Text style={styles.title}>Top Up Your Account</Text>
        <Text style={styles.subtitle}>Add funds to your group account</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Amount (Emalangeni)</Text>
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
        <Text style={styles.label}>Payment Method</Text>
        <View style={styles.methodsContainer}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method}
              style={[
                styles.methodButton,
                selectedMethod === method && styles.methodButtonSelected,
              ]}
              onPress={() => setSelectedMethod(method)}
            >
              <View style={styles.methodCheckbox}>
                {selectedMethod === method && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text
                style={[
                  styles.methodText,
                  selectedMethod === method && styles.methodTextSelected,
                ]}
              >
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Transaction Reference/Proof</Text>
        <TextInput
          style={[styles.input, styles.proofInput]}
          placeholder="Enter transaction reference number or receipt number"
          value={transactionProof}
          onChangeText={setTransactionProof}
          editable={!loading}
          placeholderTextColor="#cbd5e1"
          multiline
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 Make a transfer using your selected payment method and keep your receipt. Then enter the transaction reference above.
        </Text>
      </View>

      <Button
        title={loading ? 'Processing...' : 'Confirm Top Up'}
        onPress={handleTopUp}
        disabled={loading || !amount || !selectedMethod}
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
    marginBottom: 32,
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
  methodsContainer: {
    gap: 10,
  },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
  },
  methodButtonSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  methodCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkmark: {
    color: '#2563eb',
    fontWeight: '700',
  },
  methodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  methodTextSelected: {
    color: '#2563eb',
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
  proofInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  infoBox: {
    backgroundColor: '#fef3c7',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 12,
    color: '#92400e',
    lineHeight: 16,
  },
  submitButton: {
    marginTop: 8,
  },
});
