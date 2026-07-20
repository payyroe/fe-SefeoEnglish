import { Stack } from 'expo-router';

export default function HostLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="schedule" options={{ headerShown: false }} />
      <Stack.Screen name="teaching-history" options={{ headerShown: false }} />
      <Stack.Screen name="evaluation/[roomId]/index" options={{ headerShown: false }} />
      <Stack.Screen name="evaluation/[roomId]/[studentId]" options={{ headerShown: false }} />
    </Stack>
  );
}