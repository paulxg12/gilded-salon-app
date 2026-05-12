import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius } from '@theme/theme';

const stats = [
  { label: 'This Week', value: 'AED 18,200', change: '↑ 12% vs last week' },
  { label: 'Avg. Booking Value', value: 'AED 267', change: '↑ 5% vs last month' },
  { label: 'Booking Volume', value: '68', change: '↑ 8% vs last week' },
  { label: 'Cancellation Rate', value: '4.2%', change: '↓ 0.8% improvement' },
];

const bars = [
  { height: '30%', val: '8K' },
  { height: '45%', val: '12K' },
  { height: '35%', val: '9.5K' },
  { height: '55%', val: '15K' },
  { height: '50%', val: '13.5K' },
  { height: '65%', val: '18K' },
  { height: '70%', val: '18.2K' },
];

const sideMetrics = [
  { label: 'Top Service', value: 'Haircut & Blow-Dry' },
  { label: 'Top Stylist', value: 'Noora' },
  { label: 'Top Customer', value: 'Mona L. (AED 5.2K)' },
  { label: 'Busiest Day', value: 'Friday' },
  { label: 'Peak Time', value: '11:00 AM - 1:00 PM' },
  { label: 'BNPL Usage', value: '18% of bookings' },
];

export default function AdminAnalytics() {
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
            <Text style={s.pageTitle}>Analytics</Text>
            <Text style={s.pageSub}>Revenue & performance insights</Text>
          </View>
          <View style={s.toggleGroup}>
            <TouchableOpacity style={s.toggleActive}><Text style={s.toggleActiveText}>7 Days</Text></TouchableOpacity>
            <TouchableOpacity style={s.toggle}><Text style={s.toggleText}>30 Days</Text></TouchableOpacity>
            <TouchableOpacity style={s.toggle}><Text style={s.toggleText}>90 Days</Text></TouchableOpacity>
          </View>
        </View>

        <View style={s.statsGrid}>
          {stats.map((stat, i) => (
            <View key={i} style={s.statCard}>
              <Text style={s.statLabel}>{stat.label}</Text>
              <Text style={s.statValue}>{stat.value}</Text>
              <Text style={[s.statChange, stat.change.includes('↑') ? s.statUp : s.statDown]}>
                {stat.change}
              </Text>
            </View>
          ))}
        </View>

        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Revenue Trend</Text>
            <Text style={s.sectionAction}>Download report</Text>
          </View>
          <View style={s.chartArea}>
            <View style={s.chart}>
              {bars.map((bar, i) => (
                <View key={i} style={[s.chartBar, { height: bar.height as any }]}>
                  <Text style={s.chartBarVal}>{bar.val}</Text>
                </View>
              ))}
            </View>
            <View style={s.chartSide}>
              {sideMetrics.map((m, i) => (
                <View key={i} style={s.metric}>
                  <Text style={s.metricLabel}>{m.label}</Text>
                  <Text style={s.metricValue}>{m.value}</Text>
                </View>
              ))}
            </View>
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
  toggleGroup: {
    flexDirection: 'row', gap: 4, padding: 4, backgroundColor: colors.cream, borderRadius: borderRadius.md,
  },
  toggle: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  toggleActive: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: colors.gold, borderRadius: 6 },
  toggleText: { fontSize: 12, color: colors.textSecondary, fontWeight: '600' },
  toggleActiveText: { fontSize: 12, color: colors.white, fontWeight: '600' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: spacing.xxl },
  statCard: {
    flex: 1, minWidth: 180, backgroundColor: colors.white, borderRadius: borderRadius.lg,
    padding: spacing.lg, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12, elevation: 2,
  },
  statLabel: { fontSize: 12, color: colors.textSecondary, fontWeight: '500' },
  statValue: { fontSize: 28, fontWeight: '800', color: colors.charcoal, marginTop: 4 },
  statChange: { fontSize: 12, marginTop: 4, color: colors.textSecondary },
  statUp: { color: colors.teal },
  statDown: { color: colors.error },
  section: { backgroundColor: colors.white, borderRadius: borderRadius.lg, overflow: 'hidden' },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  sectionTitle: { fontWeight: '700', fontSize: 15, color: colors.charcoal },
  sectionAction: { fontSize: 12, color: colors.gold, fontWeight: '600' },
  chartArea: {
    flexDirection: 'row', gap: 12, padding: spacing.xl,
  },
  chart: {
    flex: 2, height: 200, backgroundColor: colors.cream, borderRadius: borderRadius.md,
    flexDirection: 'row', alignItems: 'flex-end', padding: 12, gap: 6,
  },
  chartBar: {
    flex: 1, borderRadius: 4, backgroundColor: colors.gold,
    minHeight: 8, position: 'relative',
  },
  chartBarVal: {
    position: 'absolute', top: -18, left: 0, right: 0, textAlign: 'center',
    fontSize: 10, fontWeight: '600', color: colors.gold,
  },
  chartSide: { flex: 1, gap: spacing.sm },
  metric: {
    flexDirection: 'row', justifyContent: 'space-between', padding: spacing.sm,
    backgroundColor: colors.cream, borderRadius: borderRadius.md,
  },
  metricLabel: { fontSize: 12, color: colors.charcoal },
  metricValue: { fontSize: 12, fontWeight: '700', color: colors.charcoal },
});
