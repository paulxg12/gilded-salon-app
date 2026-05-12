import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius } from '@theme/theme';

const stylists = [
  { name: 'Noora Al Maktoum', title: 'Senior Stylist', rating: '★★★★☆ 4.8', emoji: '👩', status: 'Available', statusColor: colors.teal },
  { name: 'Layla Hassan', title: 'Nail & Beauty Specialist', rating: '★★★★★ 4.9', emoji: '👩‍🦰', status: 'Available', statusColor: colors.teal },
  { name: 'Karim Othman', title: 'Master Barber', rating: '★★★★★ 5.0', emoji: '👨', status: 'On Break', statusColor: colors.breakText },
  { name: 'Aisha Rashid', title: 'Facial Specialist', rating: '★★★★☆ 4.7', emoji: '👩', status: 'Available', statusColor: colors.teal },
  { name: 'Omar Farouk', title: 'Massage Therapist', rating: '★★★★☆ 4.6', emoji: '👨', status: 'On Leave', statusColor: colors.breakText },
  { name: 'Mariam Khalid', title: 'Junior Stylist', rating: '★★★★☆ 4.5', emoji: '👩', status: 'Available', statusColor: colors.teal },
];

export default function AdminStylists() {
  return (
    <View style={s.root}>
      <View style={s.sidebar}>
        <TouchableOpacity onPress={() => router.push('/(admin)')}>
          <Text style={s.logo}>← GILDED</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={s.main}>
        <View style={s.topBar}>
          <View>
            <Text style={s.pageTitle}>Stylists</Text>
            <Text style={s.pageSub}>Manage your team</Text>
          </View>
          <TouchableOpacity style={s.addBtn}>
            <Text style={s.addBtnText}>+ Add Stylist</Text>
          </TouchableOpacity>
        </View>

        <View style={s.grid}>
          {stylists.map((s, i) => (
            <View key={i} style={s.card}>
              <View style={s.avatar}>
                <Text style={{ fontSize: 24 }}>{s.emoji}</Text>
              </View>
              <Text style={s.name}>{s.name}</Text>
              <Text style={s.title}>{s.title}</Text>
              <Text style={s.rating}>{s.rating}</Text>
              <Text style={[s.status, { color: s.statusColor }]}>● {s.status}</Text>
              <View style={s.cardActions}>
                <TouchableOpacity style={s.editBtn}><Text style={s.editBtnText}>Edit</Text></TouchableOpacity>
                <TouchableOpacity style={s.delBtn}><Text style={s.delBtnText}>Remove</Text></TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, flexDirection: 'row', backgroundColor: colors.cream },
  sidebar: { width: 200, backgroundColor: colors.charcoal, padding: spacing.xl, paddingTop: 60 },
  logo: { fontSize: 18, fontWeight: '800', color: colors.gold },
  main: { flex: 1, padding: spacing.xxl },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xxl },
  pageTitle: { fontSize: 22, fontWeight: '700', color: colors.charcoal },
  pageSub: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  addBtn: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: colors.gold, borderRadius: borderRadius.md },
  addBtnText: { color: colors.white, fontWeight: '600', fontSize: 13 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: {
    width: 180,
    backgroundColor: colors.cream,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.goldLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  name: { fontWeight: '600', fontSize: 14, color: colors.charcoal, textAlign: 'center' },
  title: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  rating: { fontSize: 12, color: colors.gold, marginVertical: 4 },
  status: { fontSize: 11, fontWeight: '500' },
  cardActions: { flexDirection: 'row', gap: 6, marginTop: spacing.sm },
  editBtn: { paddingHorizontal: 12, paddingVertical: 4, backgroundColor: colors.gold, borderRadius: 6 },
  editBtnText: { color: colors.white, fontSize: 11, fontWeight: '500' },
  delBtn: { paddingHorizontal: 12, paddingVertical: 4, backgroundColor: colors.cancelledBg, borderRadius: 6 },
  delBtnText: { color: colors.error, fontSize: 11, fontWeight: '500' },
});
