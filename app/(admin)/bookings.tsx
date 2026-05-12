import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius } from '@theme/theme';
import { Badge } from '@components/Badge';

const bookings = [
  { id: '#G-2847', customer: 'Fatima R.', service: 'Haircut & Blow-Dry', stylist: 'Noora', date: 'May 9', time: '11:30 AM', amount: 'AED 250', status: 'confirmed' as const, whatsapp: true },
  { id: '#G-2846', customer: 'Nora S.', service: 'Gel Manicure', stylist: 'Layla', date: 'May 9', time: '2:00 PM', amount: 'AED 180', status: 'pending' as const, whatsapp: false },
  { id: '#G-2845', customer: 'Hessa A.', service: 'Full Body Massage', stylist: 'Karim', date: 'May 9', time: '3:30 PM', amount: 'AED 400', status: 'confirmed' as const, whatsapp: true },
  { id: '#G-2844', customer: 'Amal K.', service: 'Signature Facial', stylist: 'Layla', date: 'May 9', time: '10:00 AM', amount: 'AED 350', status: 'completed' as const, whatsapp: true },
  { id: '#G-2843', customer: 'Mona L.', service: 'Gel Manicure', stylist: 'Layla', date: 'May 8', time: '4:00 PM', amount: 'AED 180', status: 'cancelled' as const, whatsapp: false },
  { id: '#G-2842', customer: 'Sarah M.', service: 'Haircut & Blow-Dry', stylist: 'Noora', date: 'May 8', time: '9:00 AM', amount: 'AED 250', status: 'completed' as const, whatsapp: true },
  { id: '#G-2841', customer: 'Ahmed O.', service: "Men's Grooming", stylist: 'Karim', date: 'May 10', time: '5:00 PM', amount: 'AED 150', status: 'pending' as const, whatsapp: false },
  { id: '#G-2840', customer: 'Layla H.', service: 'Luxury Hair Treatment', stylist: 'Noora', date: 'May 11', time: '10:30 AM', amount: 'AED 520', status: 'confirmed' as const, whatsapp: true },
];

export default function AdminBookings() {
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
            <Text style={s.pageTitle}>Bookings</Text>
            <Text style={s.pageSub}>Manage all appointments</Text>
          </View>
          <View style={s.searchBox}>
            <Text style={{ fontSize: 14, color: colors.textTertiary }}>🔍</Text>
            <Text style={{ fontSize: 13, color: colors.textTertiary }}>Search bookings...</Text>
          </View>
        </View>

        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>All Bookings</Text>
            <View style={s.badgeRow}>
              <Badge label="Upcoming" variant="confirmed" />
              <Badge label="Past" variant="completed" />
              <Badge label="Cancelled" variant="cancelled" />
            </View>
          </View>

          <View style={s.tableHeader}>
            <Text style={[s.th, { flex: 0.65 }]}>Booking ID</Text>
            <Text style={s.th}>Customer</Text>
            <Text style={s.th}>Service</Text>
            <Text style={s.th}>Stylist</Text>
            <Text style={[s.th, { flex: 0.45 }]}>Date</Text>
            <Text style={[s.th, { flex: 0.45 }]}>Time</Text>
            <Text style={[s.th, { flex: 0.5 }]}>Amount</Text>
            <Text style={[s.th, { flex: 0.5 }]}>Status</Text>
            <Text style={[s.th, { flex: 0.5 }]}>📲 WA</Text>
          </View>
          {bookings.map((b, i) => (
            <View key={i} style={s.tableRow}>
              <Text style={[s.td, { flex: 0.65, fontWeight: '500' }]}>{b.id}</Text>
              <Text style={s.td}>{b.customer}</Text>
              <Text style={s.td}>{b.service}</Text>
              <Text style={s.td}>{b.stylist}</Text>
              <Text style={[s.td, { flex: 0.45 }]}>{b.date}</Text>
              <Text style={[s.td, { flex: 0.45 }]}>{b.time}</Text>
              <Text style={[s.td, { flex: 0.5 }]}>{b.amount}</Text>
              <View style={[s.td, { flex: 0.5 }]}>
                <Badge label={b.status.charAt(0).toUpperCase() + b.status.slice(1)} variant={b.status} />
              </View>
              <View style={[s.td, { flex: 0.5 }]}>
                <Badge label={b.whatsapp ? '✓ Sent' : '—'} variant={b.whatsapp ? 'confirmed' : 'pending'} />
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
  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 8,
    backgroundColor: colors.white, borderRadius: borderRadius.md, width: 200,
  },
  section: { backgroundColor: colors.white, borderRadius: borderRadius.lg, overflow: 'hidden' },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  sectionTitle: { fontWeight: '700', fontSize: 15, color: colors.charcoal },
  badgeRow: { flexDirection: 'row', gap: 6 },
  tableHeader: {
    flexDirection: 'row', paddingVertical: 10, paddingHorizontal: spacing.xl,
    backgroundColor: '#FAF8F5', borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  th: { flex: 1, fontSize: 11, fontWeight: '600', textTransform: 'uppercase', color: colors.textSecondary, letterSpacing: 0.5 },
  tableRow: {
    flexDirection: 'row', paddingVertical: 12, paddingHorizontal: spacing.xl,
    borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  td: { flex: 1, fontSize: 13, color: colors.charcoal },
});
