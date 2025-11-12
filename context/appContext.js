// AppContext.js
import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomDarkTheme, CustomLightTheme } from '../constants/theme';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load persisted state + fetch fresh notifications
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const theme = await AsyncStorage.getItem('theme');
        const notifEnabled = await AsyncStorage.getItem('notificationsEnabled');

        if (theme !== null) setIsDarkMode(JSON.parse(theme));
        if (notifEnabled !== null) setNotificationsEnabled(JSON.parse(notifEnabled));

      } catch (error) {
        console.log('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  // Fetch new notifications when online
  useEffect(() => {
    const loadApiNotifications = async () => {
      try {
        if (notificationsEnabled) {
          // const fresh = await fetchNotifications();
          // setNotifications(fresh); // overwrite with fresh ones
        }
      } catch (err) {
        console.log('Error fetching notifications:', err);
      }
    };
    loadApiNotifications();
  }, [notificationsEnabled]);

  // Persist theme
  useEffect(() => {
    AsyncStorage.setItem('theme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Persist notificationsEnabled
  useEffect(() => {
    AsyncStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
  }, [notificationsEnabled]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);

  const theme = isDarkMode ? CustomDarkTheme : CustomLightTheme;

  const addNotification = (notification) => {
    setNotifications((prev) => {
      // Check if the notification already exists
      const exists = prev.some((item) => item._id === notification._id);
      if (!exists) {
        // If it doesn't exist, add it to the list
        return [notification, ...prev];
      }
      // If it exists, return the previous state unchanged
      return prev;
    });
  };

  if (loading) return null;

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        notificationsEnabled,
        setNotificationsEnabled,
        toggleTheme,
        toggleNotifications,
        theme,
        notifications,
        addNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
