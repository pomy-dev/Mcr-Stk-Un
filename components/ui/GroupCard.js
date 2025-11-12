import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const groupColors = {
  'stokfellas': '#06b6d4',
  'micro-loan': '#10b981',
  'workers-union': '#f59e0b',
};

const groupIcons = {
  'stokfellas': '💰',
  'micro-loan': '📊',
  'workers-union': '🤝',
};

export const GroupCard= ({ group, onPress }) => {
  const color = groupColors[group.type];
  const icon = groupIcons[group.type];

  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: color }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.titleSection}>
          <Text style={styles.groupName}>{group.name}</Text>
          <Text style={styles.groupType}>{group.type.replace('-', ' ')}</Text>
        </View>
      </View>
      <Text style={styles.description} numberOfLines={2}>{group.description}</Text>
      <View style={styles.footer}>
        <Text style={styles.members}>{group.total_members} members</Text>
        <View style={[styles.badge, { backgroundColor: color }]}>
          <Text style={styles.badgeText}>{group.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  titleSection: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  groupType: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 12,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  members: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
