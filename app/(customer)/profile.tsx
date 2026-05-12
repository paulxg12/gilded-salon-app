import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius } from '@theme/theme';
import { Button } from '@components/Button';
import { signOut } from '@firebase/auth';

export default function ProfileScreen() {
  const handleLogout = async () => {
    await signOut();
    router.replace('/onboarding');
  };

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.profileHeader}>
        <View style={s.avatar}>
          <Text style={{ fontSize: 32 }}>👤</Text>
        </View>
        <Text style={s.name}>Fatima Al Zahra</Text>
        <Text style={s.email}>fatima@example.com • +971 50 123 4567</Text>
      </View>

      <View style={s.card}>
        <View style={s.settingRow}>
          <Text style={s.settingLabel}>Preferred stylist</Text>
          <Text style={s.settingValueGold}>Noora</Text>
        </View>
        <View style={[s.settingRow, s.settingBorder]}>
          <Text style={s.settingLabel}>Preferred payment</Text>
          <Text style={s.settingValueGrey}>Visa •••• 4242</Text>
        </View>
      </View>

      <View style={s.card}>
        <View style={s.settingRow}>
          <Text style={s.settingLabel}>Notifications</Text>
          <View style={s.toggleOn} />
        </View>
        <View style={[s.settingRow, s.settingBorder]}>
          <Text style={s.settingLabel}>Language</Text>
          <View style={s.langRow}>
            <Text style={s.langActive}>English</Text>
            <Text style={s.langDivider}>|</Text>
            <Text style={s.langInactive}>العربية</Text>
          </View>
        </View>
      </View>

      <View style={s.card}>
        <View style={s.settingRow}>
          <Text style={s.settingLabel}>Saved payment methods</Text>
          <Text style={s.settingValueGrey}>2 cards</Text>
        </View>
        <TouchableOpacity style={[s.settingRow, s.settingBorder]} onPress={handleLogout}>
          <Text style={s.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>

      <Text style={s.version}>GILDED v1.0 • Dubai, UAE</Text>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream, paddingHorizontal: spacing.xl },
  profileHeader: { alignItems: 'center', paddingTop: 60, paddingBottom: spacing.xl },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.goldLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  name: { fontSize: 18, fontWeight: '700', color: colors.charcoal },
  email: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  settingBorder: { borderTopWidth: 1, borderTopColor: colors.borderLight },
  settingLabel: { fontWeight: '500', fontSize: 14, color: colors.charcoal },
  settingValueGold: { color: colors.gold, fontWeight: '500', fontSize: 14 },
  settingValueGrey: { color: colors.textSecondary, fontSize: 13 },
  toggleOn: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.gold,
  },
  langRow: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  langActive: { color: colors.gold, fontWeight: '600', fontSize: 14 },
  langDivider: { color: '#CCC', fontSize: 14 },
  langInactive: { color: colors.textTertiary, fontSize: 14 },
  logoutText: { color: colors.error, fontWeight: '500', fontSize: 14 },
  version: { textAlign: 'center', fontSize: 12, color: '#CCC', marginTop: spacing.xl },
});
