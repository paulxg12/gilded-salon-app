import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius } from '@theme/theme';

export default function AdminSettings() {
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
            <Text style={s.pageTitle}>Settings</Text>
            <Text style={s.pageSub}>Salon configuration</Text>
          </View>
          <TouchableOpacity style={s.saveBtn}>
            <Text style={s.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        <View style={s.section}>
          <View style={s.sectionHeader}><Text style={s.sectionTitle}>Salon Profile</Text></View>
          <View style={s.settingsContent}>
            <View style={s.settingRow}>
              <View style={s.settingLabel}>
                <Text style={s.settingLabelText}>Salon Name</Text>
                <Text style={s.settingDesc}>As displayed to customers</Text>
              </View>
              <TextInput style={s.input} value="Gilded Salon — Dubai Marina" />
            </View>
            <View style={s.settingRow}>
              <View style={s.settingLabel}>
                <Text style={s.settingLabelText}>Location</Text>
                <Text style={s.settingDesc}>Dubai Marina, Dubai, UAE</Text>
              </View>
              <TextInput style={s.input} value="Marina Walk, Shop 12" />
            </View>
            <View style={s.settingRow}>
              <View style={s.settingLabel}>
                <Text style={s.settingLabelText}>Contact Phone</Text>
                <Text style={s.settingDesc}>Displayed on booking confirmations</Text>
              </View>
              <TextInput style={s.input} value="+971 4 123 4567" />
            </View>
          </View>
        </View>

        <View style={s.section}>
          <View style={s.sectionHeader}><Text style={s.sectionTitle}>Business Hours</Text></View>
          <View style={s.settingsContent}>
            <View style={s.settingRow}>
              <Text style={s.settingLabelText}>Saturday - Thursday</Text>
              <Text style={s.hours}>9:00 AM — 9:00 PM</Text>
            </View>
            <View style={s.settingRow}>
              <Text style={s.settingLabelText}>Friday (Jumu'ah Break)</Text>
              <Text style={s.hours}>9:00 AM — 12:30 PM · 2:00 PM — 9:00 PM</Text>
            </View>
          </View>
        </View>

        <View style={s.section}>
          <View style={s.sectionHeader}><Text style={s.sectionTitle}>Payment & Deposits</Text></View>
          <View style={s.settingsContent}>
            <View style={s.settingRow}>
              <View style={s.settingLabel}>
                <Text style={s.settingLabelText}>Deposit Requirement</Text>
                <Text style={s.settingDesc}>Percentage to confirm a booking</Text>
              </View>
              <View style={s.rangeRow}>
                <View style={s.rangeBg}>
                  <View style={[s.rangeFill, { width: '20%' }]} />
                </View>
                <Text style={s.rangeLabel}>20%</Text>
              </View>
            </View>
            <View style={s.settingRow}>
              <Text style={s.settingLabelText}>Allow BNPL (Tabby/Tamara)</Text>
              <View style={s.toggleOn} />
            </View>
            <View style={s.settingRow}>
              <Text style={s.settingLabelText}>Accept Apple Pay</Text>
              <View style={s.toggleOn} />
            </View>
          </View>
        </View>

        <View style={s.section}>
          <View style={s.sectionHeader}><Text style={s.sectionTitle}>Notifications</Text></View>
          <View style={s.settingsContent}>
            {['New booking alerts', 'Cancellation alerts', 'Daily summary email', 'SMS reminders to customers'].map((n, i) => (
              <View key={i} style={s.settingRow}>
                <Text style={s.settingLabelText}>{n}</Text>
                <View style={s.toggleOn} />
              </View>
            ))}
          </View>
        </View>

        <View style={s.section}>
          <View style={s.sectionHeader}><Text style={[s.sectionTitle, {color: colors.teal}]}>📲 WhatsApp Integration</Text></View>
          <View style={s.settingsContent}>
            <View style={s.settingRow}>
              <View style={s.settingLabel}>
                <Text style={s.settingLabelText}>Admin WhatsApp Number</Text>
                <Text style={s.settingDesc}>Receives notifications for new bookings</Text>
              </View>
              <TextInput style={s.input} value="+971 50 123 4567" placeholder="+971 50 123 4567" />
            </View>
            <View style={[s.settingRow, {borderBottomWidth: 0}]}>
              <View style={s.settingLabel}>
                <Text style={s.settingLabelText}>Auto-send Booking Invoice</Text>
                <Text style={s.settingDesc}>WhatsApp invoice to customer on confirmation</Text>
              </View>
              <View style={s.toggleOn} />
            </View>
          </View>
        </View>

        <View style={s.section}>
          <View style={s.sectionHeader}><Text style={s.sectionTitle}>Language</Text></View>
          <View style={s.settingsContent}>
            <View style={s.settingRow}>
              <Text style={s.settingLabelText}>Admin Portal Language</Text>
              <View style={s.langRow}>
                <TouchableOpacity style={s.langActiveBtn}><Text style={s.langActiveText}>English</Text></TouchableOpacity>
                <TouchableOpacity style={s.langInactiveBtn}><Text style={s.langInactiveText}>العربية</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
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
  saveBtn: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: colors.gold, borderRadius: borderRadius.md },
  saveBtnText: { color: colors.white, fontWeight: '600', fontSize: 13 },
  section: { backgroundColor: colors.white, borderRadius: borderRadius.lg, marginBottom: spacing.xl, overflow: 'hidden' },
  sectionHeader: { padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  sectionTitle: { fontWeight: '700', fontSize: 15, color: colors.charcoal },
  settingsContent: { padding: spacing.xl },
  settingRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  settingLabel: { flex: 1 },
  settingLabelText: { fontSize: 14, fontWeight: '500', color: colors.charcoal },
  settingDesc: { fontSize: 12, color: colors.textSecondary, fontWeight: '400', marginTop: 2 },
  input: {
    padding: 8, borderWidth: 1, borderColor: colors.border, borderRadius: 6,
    fontSize: 13, width: 240, color: colors.charcoal, backgroundColor: colors.white,
  },
  hours: { fontSize: 13, color: colors.charcoal },
  rangeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rangeBg: { width: 120, height: 6, backgroundColor: colors.cream, borderRadius: 3, overflow: 'hidden' },
  rangeFill: { height: '100%', backgroundColor: colors.gold, borderRadius: 3 },
  rangeLabel: { fontWeight: '600', fontSize: 14, color: colors.charcoal },
  toggleOn: {
    width: 44, height: 24, borderRadius: 12, backgroundColor: colors.gold,
  },
  langRow: { flexDirection: 'row', gap: 6 },
  langActiveBtn: { paddingHorizontal: 10, paddingVertical: 4, backgroundColor: colors.gold, borderRadius: 6 },
  langActiveText: { color: colors.white, fontWeight: '600', fontSize: 13 },
  langInactiveBtn: { paddingHorizontal: 10, paddingVertical: 4, backgroundColor: colors.cream, borderRadius: 6 },
  langInactiveText: { color: colors.textSecondary, fontSize: 13 },
});
