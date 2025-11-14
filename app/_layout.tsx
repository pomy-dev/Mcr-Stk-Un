// app/_layout.tsx
import { AuthProvider } from '@/context/authProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigationContainerRef } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { MD3Theme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

// ──────────────────────────────────────────────────────────────
// 1. Custom themes (you already have these in constants/theme.ts)
// ──────────────────────────────────────────────────────────────
import { CustomDarkTheme, CustomLightTheme } from '@/constants/theme';

// ──────────────────────────────────────────────────────────────
// 2. Context definition
// ──────────────────────────────────────────────────────────────
interface AppContextType {
  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (v: boolean) => void;
  toggleTheme: () => void;
  toggleNotifications: () => void;
  theme: MD3Theme;
  notifications: any[];
  addNotification: (n: any) => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Hook for the rest of the app
export const useAppContext = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
};

// ──────────────────────────────────────────────────────────────
// 3. Provider component (all logic lives here)
// ──────────────────────────────────────────────────────────────
const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load persisted settings
  useEffect(() => {
    const load = async () => {
      try {
        const themeVal = await AsyncStorage.getItem('theme');
        const notifVal = await AsyncStorage.getItem('notificationsEnabled');

        if (themeVal !== null) setIsDarkMode(JSON.parse(themeVal));
        if (notifVal !== null) setNotificationsEnabled(JSON.parse(notifVal));
      } catch (e) {
        console.warn('AsyncStorage load error', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Persist theme
  useEffect(() => {
    AsyncStorage.setItem('theme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Persist notificationsEnabled
  useEffect(() => {
    AsyncStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
  }, [notificationsEnabled]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const toggleNotifications = () => setNotificationsEnabled(prev => !prev);

  const theme = isDarkMode ? CustomDarkTheme : CustomLightTheme;

  const addNotification = (notification: any) => {
    setNotifications(prev => {
      const exists = prev.some(item => item._id === notification._id);
      return exists ? prev : [notification, ...prev];
    });
  };

  // Show nothing while loading – prevents flash of undefined theme
  if (loading) return null;

  const value: AppContextType = {
    isDarkMode,
    setIsDarkMode,
    notificationsEnabled,
    setNotificationsEnabled,
    toggleTheme,
    toggleNotifications,
    theme,
    notifications,
    addNotification,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ──────────────────────────────────────────────────────────────
// 4. Root layout
// ──────────────────────────────────────────────────────────────
export const unstable_settings = { anchor: '(tabs)' };

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppInner />
      </AppProvider>
    </AuthProvider>

  );
}

function AppInner() {
  const { theme } = useAppContext(); // guaranteed to exist
  const navigationRef = useNavigationContainerRef();

  return (
    <PaperProvider theme={theme}>
      <Stack ref={navigationRef}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(stokfela)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}