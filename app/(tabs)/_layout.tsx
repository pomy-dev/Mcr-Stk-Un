import { useAppContext } from '@/app/_layout';
import { HapticTab } from '@/components/haptic-tab';
import { Tabs } from 'expo-router';
import React from 'react';
import { Icons } from '../../constants/Icons';

export default function TabLayout() {
  const { theme } = useAppContext();

  return (
    <Tabs
      screenOptions={{
        // @ts-ignore
        tabBarActiveTintColor: theme.colors.indicator,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (<Icons.Ionicons name="home" size={28} color={color} />),
        }}
      />
      <Tabs.Screen
        name="Dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Icons.Ionicons name="grid" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="MyProfile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Icons.Ionicons name="person" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
