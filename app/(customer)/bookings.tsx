import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius } from '@theme/theme';
import { Chip } from '@components/Chip';
import { Badge } from '@components/Badge';

type Filter = 'upcoming' | 'past' | 'cancelled';

const bookingData = [
  { icon: '💇‍♀️', service: 'Haircut & Blow-Dry', detail: 'Today • 11:30 AM • Noora', location: 'Dubai Marina', status: 'confirmed' as const },
  { icon: '💅', service: 'Gel Manicure', detail: 'May 15 • 2:00 PM • Layla', location: 'Dubai Marina', status: 'confirmed' as const },
  { icon: '🧖‍♀️', service: 'Signature Facial', detail: 'May 8 • 10:00 AM • Completed', location: 'Dubai Marina', status: 'completed' as const },
];

export default function BookingsScreen() {
  const [filter, setFilter] = useState<Filter>('upcoming');

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.topBar}>
        <Text style={s.topTitle}>My Bookings</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 18 }}>🔔</Text>
        </TouchableOpacity>
      </View>

      <View style={s.filterRow}>
        <Chip label="Upcoming" active={filter === 'upcoming'} onPress={() => setFilter('upcoming')} />
        <Chip label="Past" active={filter === 'past'} onPress={() => setFilter('past')} />
        <Chip label="Cancelled" active={filter === 'cancelled'} onPress={() => setFilter('cancelled')} />
      </View>

      <View style={s.bookingList}>
        {bookingData.map((b, i) => (
          <View key={i} style={s.bookingCard}>
            <View style={s.thumb}>
              <Text style={{ fontSize: 20 }}>{b.icon}</Text>
            </View>
            <View style={s.info}>
              <Text style={s.serviceName}>{b.service}</Text>
              <Text style={s.detail}>{b.detail}</Text>
              <Text style={s.detail}>{b.location}</Text>
            </View>
            <View style={s.right}>
              <Badge label={b.status === 'confirmed' ? 'Confirmed' : 'Completed'}
                variant={b.status === 'confirmed' ? 'confirmed' : 'completed'} />
              {b.status === 'confirmed' && (
                <Text style={s.cancel}>Cancel</Text>
              )}
              {b.status === 'completed' && (
                <Text style={s.rebook}>Book Again</Text>
              )}
            </View>
          </View>
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
    marginBottom: spacing.lg,
  },
  topTitle: { fontWeight: '600', fontSize: 17, color: colors.charcoal },
  filterRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  bookingList: { gap: 10 },
  bookingCard: {
    flexDirection: 'row',
    gap: 14,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    elevation: 2,
  },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.goldLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1 },
  serviceName: { fontWeight: '600', fontSize: 14, color: colors.charcoal },
  detail: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  right: { alignItems: 'flex-end', gap: 4 },
  cancel: { fontSize: 11, color: colors.error, marginTop: 4 },
  rebook: { fontSize: 11, color: colors.gold, marginTop: 4 },
});
