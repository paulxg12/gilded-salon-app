import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius } from '@theme/theme';
import { ServiceCard } from '@components/ServiceCard';
import { Chip } from '@components/Chip';

const popularServices = [
  { icon: '💇‍♀️', name: 'Haircut & Style', duration: '60 min', price: 'AED 250' },
  { icon: '💅', name: 'Gel Manicure', duration: '45 min', price: 'AED 180' },
  { icon: '🧖‍♀️', name: 'Moroccan Facial', duration: '75 min', price: 'AED 350' },
  { icon: '💆', name: 'Full Body Massage', duration: '90 min', price: 'AED 400' },
];

const featuredStylists = [
  { name: 'Noora', title: 'Senior Stylist', rating: 4.8, emoji: '👩' },
  { name: 'Karim', title: 'Master Barber', rating: 5.0, emoji: '👨' },
  { name: 'Layla', title: 'Nail Artist', rating: 4.9, emoji: '👩‍🦰' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.topBar}>
        <View>
          <Text style={s.logo}>GILDED</Text>
          <Text style={s.location}>Dubai Marina</Text>
        </View>
        <View style={s.topIcons}>
          <TouchableOpacity style={s.notifBell}>
            <Text style={{ fontSize: 18 }}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.avatarSmall}>
            <Text style={{ fontSize: 14 }}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={s.hero}>
        <Text style={s.heroBadge}>Limited Time</Text>
        <Text style={s.heroTitle}>20% off your{'\n'}first appointment</Text>
        <Text style={s.heroSub}>Use code: GILDED20 • Valid until May 30</Text>
      </View>

      <View style={s.sectionHeader}>
        <Text style={s.sectionTitle}>Book in 3 taps</Text>
      </View>
      <View style={s.quickAction}>
        {['Service', 'Stylist', 'Time'].map((step, i) => (
          <View key={step} style={s.quickStep}>
            <View style={s.stepNum}><Text style={s.stepNumText}>{i + 1}</Text></View>
            <Text style={s.stepLabel}>{step}</Text>
            <Text style={s.stepValue}>Select</Text>
          </View>
        ))}
      </View>

      <View style={s.sectionHeader}>
        <Text style={s.sectionTitle}>Popular services</Text>
        <TouchableOpacity onPress={() => router.push('/(customer)/book')}>
          <Text style={s.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.hScroll}>
        {popularServices.map((svc, i) => (
          <ServiceCard key={i} {...svc} variant="vertical" onPress={() => router.push('/(customer)/book')} />
        ))}
      </ScrollView>

      <View style={{ height: spacing.xl }} />

      <View style={s.sectionHeader}>
        <Text style={s.sectionTitle}>Featured stylists</Text>
        <TouchableOpacity onPress={() => router.push('/(customer)/book')}>
          <Text style={s.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.hScroll}>
        {featuredStylists.map((stylist, i) => (
          <TouchableOpacity key={i} style={s.stylistCard} activeOpacity={0.7}>
            <View style={s.stylistAvatar}>
              <Text style={s.stylistEmoji}>{stylist.emoji}</Text>
            </View>
            <Text style={s.stylistName}>{stylist.name}</Text>
            <Text style={s.stylistTitle}>{stylist.title}</Text>
            <Text style={s.stylistRating}>{'★'.repeat(Math.floor(stylist.rating))}☆ {stylist.rating.toFixed(1)}</Text>
            <TouchableOpacity style={s.stylistBookBtn}>
              <Text style={s.stylistBookBtnText}>Book</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
    marginBottom: spacing.lg,
  },
  logo: { fontSize: 28, fontWeight: '800', color: colors.charcoal, letterSpacing: -0.5 },
  location: { fontSize: 12, color: colors.textSecondary },
  topIcons: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  notifBell: { padding: 4 },
  avatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.goldLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    backgroundColor: colors.gold,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  heroBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 11,
    fontWeight: '500',
    color: colors.white,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginTop: 6,
    lineHeight: 26,
  },
  heroSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.charcoal },
  seeAll: { fontSize: 13, color: colors.gold, fontWeight: '500' },
  hScroll: { marginBottom: spacing.sm },
  quickAction: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  quickStep: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    elevation: 2,
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  stepNumText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  stepLabel: { fontSize: 11, color: colors.textSecondary },
  stepValue: { fontSize: 13, fontWeight: '600', color: colors.charcoal, marginTop: 2 },
  stylistCard: {
    minWidth: 160,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: 14,
    marginRight: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    elevation: 2,
  },
  stylistAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.goldLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  stylistEmoji: { fontSize: 24 },
  stylistName: { fontWeight: '600', fontSize: 14, color: colors.charcoal },
  stylistTitle: { fontSize: 12, color: colors.textSecondary },
  stylistRating: { fontSize: 12, color: colors.gold, marginVertical: 4 },
  stylistBookBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: colors.gold,
    borderRadius: 6,
  },
  stylistBookBtnText: { color: colors.white, fontWeight: '600', fontSize: 12 },
});
