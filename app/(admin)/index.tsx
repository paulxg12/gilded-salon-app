import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius } from '@theme/theme';
import { Badge } from '@components/Badge';

const stats = [
  { label: "Today's Bookings", value: '12', change: '↑ 3 more than yesterday', up: true, progress: 70 },
  { label: 'Revenue Today', value: 'AED 3,450', change: '↑ 22% vs last Friday', up: true, progress: 85 },
  { label: 'Active Stylists', value: '6 / 8', change: '↓ 2 on break', up: false, progress: 75 },
  { label: 'Pending Payments', value: 'AED 840', change: '4 deposits awaiting confirmation', up: null, progress: 30 },
];

const schedule = [
  { time: '9:00 AM', service: 'Haircut & Blow-Dry', stylist: 'Noora', customer: 'Sarah M.', status: 'completed' as const, amount: 'AED 250' },
  { time: '10:00 AM', service: 'Signature Facial', stylist: 'Layla', customer: 'Amal K.', status: 'completed' as const, amount: 'AED 350' },
  { time: '11:30 AM', service: 'Haircut & Blow-Dry', stylist: 'Noora', customer: 'Fatima R.', status: 'confirmed' as const, amount: 'AED 250' },
  { time: '1:00 PM', service: '—', stylist: '—', customer: '—', status: 'break' as const, amount: '—' },
];

const activity = [
  { time: '2 min ago', event: 'Booking cancelled — Gel Manicure', customer: 'Mona L.' },
  { time: '15 min ago', event: 'New booking — Full Body Massage', customer: 'Hessa A.' },
  { time: '32 min ago', event: 'Payment confirmed — AED 250', customer: 'Fatima R.' },
  { time: '1 hr ago', event: 'Review posted ★★★★★', customer: 'Layla H.' },
  { time: '2 hrs ago', event: 'New customer registered', customer: 'Sarah M.' },
];

export default function AdminDashboard() {
  const navItems = [
    { label: 'Dashboard', icon: '📊', page: 'index', active: true },
    { label: 'Bookings', icon: '📅', page: 'bookings' },
    { label: 'Stylists', icon: '👩', page: 'stylists' },
    { label: 'Services', icon: '💇‍♀️', page: 'services' },
    { label: 'Customers', icon: '👥', page: 'customers' },
    { label: 'Analytics', icon: '📈', page: 'analytics' },
    { label: 'Settings', icon: '⚙️', page: 'settings' },
  ];

  return (
    <View style={s.root}>
      <View style={s.sidebar}>
        <View style={s.logoArea}>
          <Text style={s.logo}>GILDED<span style={s.logoAccent}>.</span></Text>
          <Text style={s.logoSub}>Admin Portal</Text>
        </View>
        {navItems.map(item => (
          <TouchableOpacity
            key={item.page}
            style={[s.navItem, item.active && s.navItemActive]}
            onPress={() => router.push(`/(admin)/${item.page}` as any)}
          >
            <Text style={s.navIcon}>{item.icon}</Text>
            <Text style={[s.navLabel, item.active && s.navLabelActive]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
        <View style={s.sidebarFooter}>
          <View style={s.adminAvatar}><Text style={s.adminAvatarText}>F</Text></View>
          <View>
            <Text style={s.adminName}>Fatima Al Zahra</Text>
            <Text style={s.adminRole}>Salon Owner</Text>
          </View>
        </View>
      </View>

      <ScrollView style={s.main} showsVerticalScrollIndicator={false}>
        <View style={s.topBar}>
          <View>
            <Text style={s.pageTitle}>Dashboard</Text>
            <Text style={s.pageSub}>Welcome back, Fatima. Here's your salon today.</Text>
          </View>
          <View style={s.topRight}>
            <View style={s.searchBox}>
              <Text style={{ fontSize: 14, color: colors.textTertiary }}>🔍</Text>
              <Text style={{ fontSize: 13, color: colors.textTertiary }}>Search...</Text>
            </View>
            <TouchableOpacity style={s.notifIcon}>
              <Text style={{ fontSize: 16 }}>🔔</Text>
              <View style={s.notifDot} />
            </TouchableOpacity>
            <View style={s.adminAvatarSmall}><Text style={{ fontSize: 16, color: colors.charcoal }}>F</Text></View>
          </View>
        </View>

        <View style={s.statsGrid}>
          {stats.map((stat, i) => (
            <View key={i} style={s.statCard}>
              <View style={s.statHeader}>
                <Text style={s.statLabel}>{stat.label}</Text>
              </View>
              <Text style={s.statValue}>{stat.value}</Text>
              <Text style={[s.statChange, stat.up === true && s.statUp, stat.up === false && s.statDown]}>
                {stat.change}
              </Text>
              <View style={s.progressBar}>
                <View style={[s.progressFill, { width: `${stat.progress}%` }]} />
              </View>
            </View>
          ))}
        </View>

        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Today's Schedule</Text>
            <Text style={s.sectionAction}>View all →</Text>
          </View>
          {schedule.map((row, i) => (
            <View key={i} style={s.tableRow}>
              <Text style={s.tableCell}>{row.time}</Text>
              <Text style={s.tableCell}>{row.service}</Text>
              <Text style={s.tableCell}>{row.stylist}</Text>
              <Text style={s.tableCell}>{row.customer}</Text>
              <View style={s.tableCell}>
                {row.status === 'break' ? (
                  <Badge label="Jumu'ah Break" variant="break" />
                ) : (
                  <Badge label={row.status.charAt(0).toUpperCase() + row.status.slice(1)} variant={row.status} />
                )}
              </View>
              <Text style={s.tableCell}>{row.amount}</Text>
            </View>
          ))}
        </View>

        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Recent Activity</Text>
            <Text style={s.sectionAction}>View all →</Text>
          </View>
          {activity.map((act, i) => (
            <View key={i} style={s.activityRow}>
              <Text style={s.activityTime}>{act.time}</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.activityEvent}>{act.event}</Text>
                <Text style={s.activityCustomer}>{act.customer}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, flexDirection: 'row', backgroundColor: colors.cream },
  sidebar: {
    width: 240,
    backgroundColor: colors.charcoal,
    paddingTop: 60,
  },
  logoArea: { padding: spacing.xl, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  logo: { fontSize: 20, fontWeight: '800', color: colors.white, letterSpacing: -0.5 },
  logoAccent: { color: colors.gold },
  logoSub: { fontSize: 11, color: '#666', marginTop: 2 },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: spacing.xl,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  navItemActive: { backgroundColor: colors.goldDim, borderLeftColor: colors.gold },
  navIcon: { fontSize: 16, width: 20, textAlign: 'center' },
  navLabel: { fontSize: 13, fontWeight: '500', color: '#888' },
  navLabelActive: { color: colors.gold },
  sidebarFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    marginTop: 'auto',
  },
  adminAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminAvatarText: { color: colors.charcoal, fontSize: 14, fontWeight: '700' },
  adminName: { fontSize: 12, color: colors.white, fontWeight: '500' },
  adminRole: { fontSize: 10, color: '#666' },
  main: { flex: 1, padding: spacing.xxl },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xxl },
  pageTitle: { fontSize: 22, fontWeight: '700', color: colors.charcoal },
  pageSub: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  topRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    width: 200,
  },
  notifIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
    position: 'absolute',
    top: 6,
    right: 6,
  },
  adminAvatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: spacing.xxl },
  statCard: {
    flex: 1,
    minWidth: 180,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    elevation: 2,
  },
  statHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  statLabel: { fontSize: 12, color: colors.textSecondary, fontWeight: '500' },
  statValue: { fontSize: 28, fontWeight: '800', color: colors.charcoal },
  statChange: { fontSize: 12, marginTop: 4, color: colors.textSecondary },
  statUp: { color: colors.teal },
  statDown: { color: colors.error },
  progressBar: { height: 3, backgroundColor: colors.cream, borderRadius: 2, marginTop: 10, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.gold, borderRadius: 2 },
  section: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  sectionTitle: { fontWeight: '700', fontSize: 15, color: colors.charcoal },
  sectionAction: { fontSize: 12, color: colors.gold, fontWeight: '600' },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  tableCell: { flex: 1, fontSize: 13, color: colors.charcoal },
  activityRow: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  activityTime: { fontSize: 12, color: colors.textSecondary, width: 80 },
  activityEvent: { fontSize: 13, color: colors.charcoal },
  activityCustomer: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
});
