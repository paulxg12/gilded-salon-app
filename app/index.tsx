import { Redirect } from 'expo-router';
import { useAuth } from '@hooks/useAuth';

export default function Index() {
  const { loading, user, isAdmin } = useAuth();

  if (loading) return null;

  if (!user) return <Redirect href="/onboarding" />;
  if (isAdmin) return <Redirect href="/(admin)" />;
  return <Redirect href="/(customer)" />;
}
