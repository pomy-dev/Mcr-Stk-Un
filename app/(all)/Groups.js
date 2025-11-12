import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { GroupCard } from '../../components/ui/GroupCard';
import { Button } from '../../components/ui/Button';
import { mockGroups } from '../../utils/mockData';

export default function GroupsScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredGroups = selectedFilter === 'all'
    ? mockGroups
    : mockGroups.filter(g => g.type === selectedFilter);

  const handleGroupPress = (group) => {
    navigation.navigate('GroupDetails')
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome Back! 👋</Text>
          <Text style={styles.subtext}>Manage your savings groups</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {(['all', 'stokfellas', 'micro-loan', 'workers-union']).map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter === 'all' ? 'All Groups' : filter.replace('-', ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredGroups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GroupCard
            group={item}
            onPress={() => handleGroupPress(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />

      <Button
        title="Create New Group"
        onPress={() => navigation.navigate('CreateGroup')}
        style={styles.createButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  subtext: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  filterContainer: {
    marginVertical: 12,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'capitalize',
  },
  filterTextActive: {
    color: '#fff',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
});
