import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius } from '@theme/theme';
import { Button } from '@components/Button';

export default function ConfirmationScreen() {
  return (
    <View style={s.container}>
      <View style={s.content}>
        <View style={s.checkmark}>
          <Text style={s.checkmarkText}>✓</Text>
        </View>
        <Text style={s.title}>Booking Confirmed!</Text>
        <Text style={s.sub}>We'll send a reminder before your appointment</Text>

        <View style={s.detailsCard}>
          <Text style={s.bookingId}>BOOKING #G-2847</Text>
          <View style={s.divider} />
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Service</Text>
            <Text style={s.detailValue}>Haircut & Blow-Dry</Text>
          </View>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Stylist</Text>
            <Text style={s.detailValue}>Noora Al Maktoum</Text>
          </View>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Date</Text>
            <Text style={s.detailValue}>Today, 11:30 AM</Text>
          </View>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Location</Text>
            <Text style={s.detailValue}>Dubai Marina</Text>
          </View>
          <View style={s.divider} />
          <View style={s.amountRow}>
            <Text style={s.amountLabel}>Amount paid</Text>
            <Text style={s.amountValue}>AED 315</Text>
          </View>
        </View>

        <View style={s.actionRow}>
          <TouchableOpacity style={s.actionBtn}>
            <Text style={s.actionBtnText}>📅 Add to Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.actionBtn}>
            <Text style={s.actionBtnText}>↗ Share</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Book another service →"
          variant="ghost"
          onPress={() => router.push('/(customer)/book')}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
  },
  content: { alignItems: 'center', paddingTop: 40 },
  checkmark: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  checkmarkText: { color: colors.white, fontSize: 32, fontWeight: '700' },
  title: { fontSize: 24, fontWeight: '700', color: colors.charcoal, marginBottom: spacing.xs },
  sub: { fontSize: 14, color: colors.textSecondary, textAlign: 'center' },
  detailsCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  bookingId: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 12,
    color: colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  divider: { height: 1, backgroundColor: colors.borderLight, marginVertical: spacing.sm },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailLabel: { fontSize: 14, color: colors.textSecondary },
  detailValue: { fontSize: 14, fontWeight: '500', color: colors.charcoal },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  amountLabel: { fontSize: 15, fontWeight: '700', color: colors.charcoal },
  amountValue: { fontSize: 15, fontWeight: '700', color: colors.teal },
  actionRow: { flexDirection: 'row', gap: 10, marginBottom: spacing.md },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.gold,
    alignItems: 'center',
  },
  actionBtnText: { color: colors.gold, fontWeight: '500', fontSize: 13 },
});
