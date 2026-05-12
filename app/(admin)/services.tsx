import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius } from '@theme/theme';

const services = [
  { icon: '💇‍♀️', name: 'Haircut & Blow-Dry', duration: '60 min', category: 'Hair', price: 'AED 250' },
  { icon: '💅', name: 'Gel Manicure', duration: '45 min', category: 'Nails', price: 'AED 180' },
  { icon: '🧖‍♀️', name: 'Signature Facial', duration: '75 min', category: 'Facial', price: 'AED 350' },
  { icon: '💆', name: 'Full Body Massage', duration: '90 min', category: 'Massage', price: 'AED 400' },
  { icon: '✂️', name: "Men's Grooming", duration: '30 min', category: "Men's", price: 'AED 150' },
  { icon: '✨', name: 'Luxury Hair Treatment', duration: '90 min', category: 'Hair', price: 'AED 520' },
  { icon: '💎', name: 'Scalp Massage (Add-on)', duration: '10 min', category: 'Add-on', price: 'AED 50' },
];

export default function AdminServices() {
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
            <Text style={s.pageTitle}>Services</Text>
            <Text style={s.pageSub}>Manage your menu</Text>
          </View>
          <TouchableOpacity style={s.addBtn}>
            <Text style={s.addBtnText}>+ Add Service</Text>
          </TouchableOpacity>
        </View>

        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Service Menu</Text>
            <Text style={s.sectionAction}>Reorder</Text>
          </View>
          <View style={s.list}>
            {services.map((svc, i) => (
              <View key={i} style={s.serviceCard}>
                <View style={s.iconWrap}>
                  <Text style={{ fontSize: 18 }}>{svc.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.serviceName}>{svc.name}</Text>
                  <Text style={s.serviceMeta}>{svc.duration} · {svc.category}</Text>
                </View>
                <Text style={s.servicePrice}>{svc.price}</Text>
                <View style={s.cardActions}>
                  <TouchableOpacity style={s.editBtn}><Text style={s.editBtnText}>Edit</Text></TouchableOpacity>
                  <TouchableOpacity style={s.delBtn}><Text style={s.delBtnText}>Remove</Text></TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
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
  section: { backgroundColor: colors.white, borderRadius: borderRadius.lg, overflow: 'hidden' },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  sectionTitle: { fontWeight: '700', fontSize: 15, color: colors.charcoal },
  sectionAction: { fontSize: 12, color: colors.gold, fontWeight: '600' },
  list: { padding: spacing.xl, gap: spacing.sm },
  serviceCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10,
    backgroundColor: colors.cream, borderRadius: borderRadius.md,
  },
  iconWrap: {
    width: 40, height: 40, borderRadius: 10, backgroundColor: colors.goldLight,
    alignItems: 'center', justifyContent: 'center',
  },
  serviceName: { fontSize: 13, fontWeight: '600', color: colors.charcoal },
  serviceMeta: { fontSize: 11, color: colors.textSecondary },
  servicePrice: { fontSize: 14, fontWeight: '700', color: colors.gold, marginHorizontal: spacing.sm },
  cardActions: { flexDirection: 'row', gap: 4 },
  editBtn: { paddingHorizontal: 10, paddingVertical: 3, backgroundColor: colors.gold, borderRadius: 6 },
  editBtnText: { color: colors.white, fontSize: 11, fontWeight: '500' },
  delBtn: { paddingHorizontal: 10, paddingVertical: 3, backgroundColor: colors.cancelledBg, borderRadius: 6 },
  delBtnText: { color: colors.error, fontSize: 11, fontWeight: '500' },
});
