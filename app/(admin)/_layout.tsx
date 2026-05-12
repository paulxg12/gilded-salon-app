import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@theme/colors';

export default function AdminLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="bookings" />
        <Stack.Screen name="stylists" />
        <Stack.Screen name="services" />
        <Stack.Screen name="customers" />
        <Stack.Screen name="analytics" />
        <Stack.Screen name="settings" />
      </Stack>
    </>
  );
}
