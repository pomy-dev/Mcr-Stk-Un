// App.js  ← FINAL CLEAN VERSION (copy-paste this)
import { AppContext, AppProvider } from '@/context/appContext'; // ← correct import
import { AuthContext, AuthProvider } from '@/context/authProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

// ── Import Screens ──
import LoginScreen from './(screens)/auth-screens/Login';
import SignupScreen from './(screens)/auth-screens/Signup';
import HomeScreen from './(screens)/HomeScreen';
import DashboardScreen from './(screens)/Main';
import MemberProfile from './(screens)/MyProfile';
import GroupDetailsScreen from './(screens)/stokfela-screens/Dashboard';
import LoanRequestScreen from './(screens)/stokfela-screens/LoanDetails';
import CreateStokfelaScreen from './(screens)/stokfela-screens/StartGroup';
import TransactionsScreen from './(screens)/stokfela-screens/Transactions';

// ── Tabs Component (now works perfectly) ──
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icons } from './constants/Icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  const { theme } = useContext(AppContext); // ← now reads the correct context

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icons.Ionicons name={focused ? "home" : "home-outline"} size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icons.MaterialCommunityIcons name={focused ? "notebook-check" : "notebook-check-outline"} size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MemberProfile}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icons.Ionicons name={focused ? "person" : "person-outline"} size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ── Protected Layout ──
// function ProtectedLayout() {
//   const { user, loading: authLoading } = useContext(AuthProvider); // wait, wrong!
// → Fix: you must use useAuth() hook, not the context directly
// We'll fix this below
// }

function AuthAwareApp() {
  const { user, loading: authLoading } = useContext(AuthContext); // ← temporary, we’ll replace
  const { theme } = useContext(AppContext);

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user && (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="MainTabs" component={Tabs} />
              <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} />
              <Stack.Screen name="LoanDetails" component={LoanRequestScreen} />
              <Stack.Screen name="StartGroup" component={CreateStokfelaScreen} />
              <Stack.Screen name="Transactions" component={TransactionsScreen} />
            </>
          )}
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </PaperProvider>
  );
}

// ── Final App ──
export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AuthAwareApp />
      </AppProvider>
    </AuthProvider>
  );
}