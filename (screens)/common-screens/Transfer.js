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

export default function TransferScreen({ navigation, route }) {
  const { groupId } = route.params;
  const [amount, setAmount] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    if (!amount || !recipientEmail) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      Alert.alert(
        'Transfer Submitted',
        `Transfer of E${amount} to ${recipientEmail} has been initiated.\n\nIt will be processed within 24 hours.`,
      );
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
        <Text style={styles.icon}>⬆️</Text>
        <Text style={styles.title}>Transfer Funds</Text>
        <Text style={styles.subtitle}>Send money to another member</Text>
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
        <Text style={styles.label}>Recipient Email</Text>
        <TextInput
          style={styles.input}
          placeholder="recipient@example.com"
          value={recipientEmail}
          onChangeText={setRecipientEmail}
          editable={!loading}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#cbd5e1"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description (Optional)</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="What is this transfer for?"
          value={description}
          onChangeText={setDescription}
          editable={!loading}
          placeholderTextColor="#cbd5e1"
          multiline
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Transfer Info</Text>
        <Text style={styles.infoText}>
          • Transfers are processed instantly within your group
        </Text>
        <Text style={styles.infoText}>
          • Both parties will receive notifications
        </Text>
        <Text style={styles.infoText}>
          • Transfers cannot be reversed, verify the recipient
        </Text>
      </View>

      <Button
        title={loading ? 'Processing...' : 'Confirm Transfer'}
        onPress={handleTransfer}
        disabled={loading || !amount || !recipientEmail}
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
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  infoBox: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#065f46',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#065f46',
    lineHeight: 16,
    marginBottom: 4,
  },
  submitButton: {
    marginTop: 8,
  },
});
