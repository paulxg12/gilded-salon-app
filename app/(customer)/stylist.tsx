import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius } from '@theme/theme';
import { Chip } from '@components/Chip';
import { StylistCard } from '@components/StylistCard';
import { Button } from '@components/Button';

const stylists = [
  { name: 'Noora Al Maktoum', title: 'Senior Stylist', rating: 4.8, reviewCount: 126, emoji: '👩', available: true },
  { name: 'Layla Hassan', title: 'Nail & Beauty Specialist', rating: 4.9, reviewCount: 98, emoji: '👩‍🦰', available: true },
  { name: 'Karim Othman', title: 'Master Barber', rating: 5.0, reviewCount: 214, emoji: '👨', available: false, nextAvailable: '3:00 PM' },
  { name: 'Aisha Rashid', title: 'Facial Specialist', rating: 4.7, reviewCount: 72, emoji: '👩', available: true },
  { name: 'Mariam Khalid', title: 'Junior Stylist', rating: 4.5, reviewCount: 34, emoji: '👩', available: true },
];

export default function StylistScreen() {
  const [gender, setGender] = useState<'female' | 'male' | 'all'>('female');

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={s.topTitle}>Choose your stylist</Text>
        <View style={{ width: 30 }} />
      </View>

      <Text style={s.sub}>For: Haircut & Blow-Dry</Text>

      <TouchableOpacity style={s.anyStylist}>
        <View style={s.anyIcon}>
          <Text style={{ fontSize: 20 }}>🤖</Text>
        </View>
        <View style={s.anyInfo}>
          <Text style={s.anyName}>Any Stylist</Text>
          <Text style={s.anyDesc}>Auto-assign best available</Text>
        </View>
        <Text style={s.anyBadge}>Recommended</Text>
      </TouchableOpacity>

      <View style={s.genderRow}>
        <Chip label="👩 Female" active={gender === 'female'} onPress={() => setGender('female')} />
        <Chip label="👨 Male" active={gender === 'male'} onPress={() => setGender('male')} />
        <Chip label="All" active={gender === 'all'} onPress={() => setGender('all')} />
      </View>

      <View style={s.stylistList}>
        {stylists
          .filter(s => gender === 'all' || (gender === 'male' ? s.emoji === '👨' : s.emoji !== '👨'))
          .map((stylist, i) => (
            <StylistCard
              key={i}
              {...stylist}
              onPress={() => router.push('/(customer)/time')}
            />
          ))}
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream, paddingHorizontal: spacing.xl },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    marginBottom: spacing.sm,
  },
  backArrow: { fontSize: 20, color: colors.charcoal },
  topTitle: { fontWeight: '600', fontSize: 16, color: colors.charcoal },
  sub: { fontSize: 13, color: colors.textSecondary, marginBottom: spacing.lg },
  anyStylist: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.gold,
    borderStyle: 'dashed',
    marginBottom: spacing.md,
  },
  anyIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anyInfo: { flex: 1 },
  anyName: { fontWeight: '600', fontSize: 14, color: colors.charcoal },
  anyDesc: { fontSize: 12, color: colors.textSecondary },
  anyBadge: {
    fontSize: 12,
    color: colors.gold,
    fontWeight: '500',
  },
  genderRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  stylistList: { gap: 10 },
});
