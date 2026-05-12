import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius } from '@theme/theme';

const customers = [
  { name: 'Fatima R.', phone: '+971 50 234 5678', email: 'fatima.r@email.com', visits: 12, spend: 'AED 3,450', lastVisit: 'May 5', stylist: 'Noora' },
  { name: 'Sarah M.', phone: '+971 55 876 5432', email: 'sarah.m@email.com', visits: 8, spend: 'AED 2,100', lastVisit: 'May 8', stylist: 'Layla' },
  { name: 'Amal K.', phone: '+971 52 345 6789', email: 'amal.k@email.com', visits: 5, spend: 'AED 1,750', lastVisit: 'May 9', stylist: 'Layla' },
  { name: 'Hessa A.', phone: '+971 54 456 7890', email: 'hessa.a@email.com', visits: 3, spend: 'AED 1,200', lastVisit: 'Apr 28', stylist: 'Karim' },
  { name: 'Mona L.', phone: '+971 58 567 8901', email: 'mona.l@email.com', visits: 15, spend: 'AED 5,200', lastVisit: 'May 8', stylist: 'Layla' },
  { name: 'Nora S.', phone: '+971 50 678 9012', email: 'nora.s@email.com', visits: 2, spend: 'AED 360', lastVisit: 'Apr 22', stylist: 'Any' },
  { name: 'Ahmed O.', phone: '+971 56 789 0123', email: 'ahmed.o@email.com', visits: 6, spend: 'AED 950', lastVisit: 'Apr 30', stylist: 'Karim' },
  { name: 'Layla H.', phone: '+971 52 890 1234', email: 'layla.h@email.com', visits: 1, spend: 'AED 520', lastVisit: 'May 11', stylist: 'Noora' },
];

export default function AdminCustomers() {
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
            <Text style={s.pageTitle}>Customers</Text>
            <Text style={s.pageSub}>Client directory</Text>
          </View>
          <TouchableOpacity style={s.exportBtn}>
            <Text style={s.exportBtnText}>Export CSV</Text>
          </TouchableOpacity>
        </View>

        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>All Customers</Text>
          </View>
          <View style={s.tableHeader}>
            <Text style={[s.th, { flex: 1.2 }]}>Name</Text>
            <Text style={s.th}>Phone</Text>
            <Text style={s.th}>Email</Text>
            <Text style={[s.th, { flex: 0.5 }]}>Visits</Text>
            <Text style={[s.th, { flex: 0.8 }]}>Lifetime Spend</Text>
            <Text style={[s.th, { flex: 0.6 }]}>Last Visit</Text>
            <Text style={[s.th, { flex: 0.7 }]}>Preferred Stylist</Text>
          </View>
          {customers.map((c, i) => (
            <View key={i} style={s.tableRow}>
              <Text style={[s.td, { flex: 1.2, fontWeight: '500' }]}>{c.name}</Text>
              <Text style={s.td}>{c.phone}</Text>
              <Text style={s.td}>{c.email}</Text>
              <Text style={[s.td, { flex: 0.5 }]}>{c.visits}</Text>
              <Text style={[s.td, { flex: 0.8 }]}>{c.spend}</Text>
              <Text style={[s.td, { flex: 0.6 }]}>{c.lastVisit}</Text>
              <Text style={[s.td, { flex: 0.7 }]}>{c.stylist}</Text>
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
  exportBtn: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: colors.gold, borderRadius: borderRadius.md },
  exportBtnText: { color: colors.white, fontWeight: '600', fontSize: 13 },
  section: { backgroundColor: colors.white, borderRadius: borderRadius.lg, overflow: 'hidden' },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  sectionTitle: { fontWeight: '700', fontSize: 15, color: colors.charcoal },
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
