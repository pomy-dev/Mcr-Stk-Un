import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button } from '../../components/ui/Button';
import { mockGroupSettings, mockGroups } from '../../utils/mockData';

export default function PaySubscriptionScreen({ navigation }) {
  const [selectedGroupId, setSelectedGroupId] = useState(mockGroups[0].id);
  const [loading, setLoading] = useState(false);

  const group = mockGroups.find(g => g.id === selectedGroupId);
  const settings = mockGroupSettings.find(s => s.group_id === selectedGroupId);

  const handlePaySubscription = async () => {
    try {
      setLoading(true);
      Alert.alert(
        'Subscription Payment',
        `Subscription of E${settings?.subscription_amount} for ${group?.name} has been recorded.\n\nPlease make payment via ${settings?.payment_methods?.[0]}.`,
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
        <Text style={styles.icon}>📅</Text>
        <Text style={styles.title}>Pay Subscription</Text>
        <Text style={styles.subtitle}>Keep your membership active</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Select Group</Text>
        {mockGroups.map((g) => (
          <TouchableOpacity
            key={g.id}
            style={[
              styles.groupOption,
              selectedGroupId === g.id && styles.groupOptionSelected,
            ]}
            onPress={() => setSelectedGroupId(g.id)}
          >
            <View style={styles.groupCheckbox}>
              {selectedGroupId === g.id && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{g.name}</Text>
              <Text style={styles.groupType}>{g.type}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {settings && group && (
        <>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Subscription Details</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Frequency:</Text>
              <Text style={styles.summaryValue}>
                {settings.subscription_frequency.charAt(0).toUpperCase() +
                  settings.subscription_frequency.slice(1)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Amount:</Text>
              <Text style={[styles.summaryValue, { fontWeight: '700', color: '#2563eb' }]}>
                E{settings.subscription_amount}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Payment Methods:</Text>
              <Text style={styles.summaryValue}>
                {settings.payment_methods.join(', ')}
              </Text>
            </View>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Payment Instructions</Text>
            <Text style={styles.infoText}>
              1. Make a payment of E{settings.subscription_amount} to the group account using {settings.payment_methods[0]}
            </Text>
            <Text style={styles.infoText}>
              2. Keep your receipt with the transaction reference
            </Text>
            <Text style={styles.infoText}>
              3. Click "Confirm Payment" below to complete
            </Text>
          </View>

          <Button
            title={loading ? 'Processing...' : 'Confirm Subscription Payment'}
            onPress={handlePaySubscription}
            disabled={loading}
            style={styles.submitButton}
          />
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
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  groupOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  groupOptionSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  groupCheckbox: {
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
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  groupType: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'capitalize',
  },
  summaryCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#0284c7',
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0c4a6e',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#0c4a6e',
  },
  summaryValue: {
    fontSize: 12,
    color: '#0c4a6e',
    textAlign: 'right',
    flex: 1,
    marginLeft: 12,
  },
  infoBox: {
    backgroundColor: '#fef3c7',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400e',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#92400e',
    lineHeight: 16,
    marginBottom: 4,
  },
  submitButton: {
    marginTop: 8,
  },
});
