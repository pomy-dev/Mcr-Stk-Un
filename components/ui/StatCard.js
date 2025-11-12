import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';


export const StatCard = ({
  icon,
  label,
  value,
  color = '#2563eb',
  style,
}) => {
  return (
    <View style={[styles.card, { borderTopColor: color }, style]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderTopWidth: 3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 28,
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
    fontWeight: '500',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
  },
});
