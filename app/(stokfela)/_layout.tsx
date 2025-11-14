import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" />
      <Stack.Screen name="Contributions" />
      <Stack.Screen name="LoanDetails" />
      <Stack.Screen name="Transactions" />
      <Stack.Screen name="StartGroup" />
    </Stack>
  );
}
