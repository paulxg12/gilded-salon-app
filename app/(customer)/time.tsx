import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius } from '@theme/theme';
import { Chip } from '@components/Chip';
import { Button } from '@components/Button';

const dates = [
  { day: 'Today', num: 9, active: true },
  { day: 'Sat', num: 10 },
  { day: 'Sun', num: 11 },
  { day: 'Mon', num: 12 },
  { day: 'Tue', num: 13 },
  { day: 'Wed', num: 14 },
  { day: 'Thu', num: 15 },
];

const timeSlotsAM = [
  { time: '9:00', avail: true },
  { time: '9:30', avail: true },
  { time: '10:00', avail: false },
  { time: '10:30', avail: true },
  { time: '11:00', avail: true },
  { time: '11:30', avail: true, selected: true },
  { time: '12:00', avail: true },
  { time: '12:30', avail: false },
];

const timeSlotsPM = [
  { time: '12:30', avail: false, label: 'Jumu\'ah' },
  { time: '1:00', avail: false, label: 'Break' },
  { time: '2:00', avail: true },
  { time: '2:30', avail: true },
  { time: '3:00', avail: true },
  { time: '3:30', avail: true },
  { time: '4:00', avail: true },
  { time: '4:30', avail: true },
];

export default function TimeScreen() {
  const [period, setPeriod] = useState<'am' | 'pm'>('am');

  const slots = period === 'am' ? timeSlotsAM : timeSlotsPM;

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={s.topTitle}>Pick a time</Text>
        <View style={{ width: 30 }} />
      </View>

      <Text style={s.sub}>Haircut & Blow-Dry • Noora • 60 min</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.dateRow}>
        {dates.map((d, i) => (
          <TouchableOpacity key={i} style={[s.dateChip, d.active && s.dateChipActive]}>
            <Text style={[s.dateDay, d.active && s.dateDayActive]}>{d.day}</Text>
            <Text style={[s.dateNum, d.active && s.dateNumActive]}>{d.num}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={s.periodRow}>
        <Chip label="AM" active={period === 'am'} onPress={() => setPeriod('am')} />
        <Chip label="PM" active={period === 'pm'} onPress={() => setPeriod('pm')} />
      </View>

      <View style={s.timeGrid}>
        {slots.map((slot, i) => (
          <TouchableOpacity
            key={i}
            style={[
              s.timeSlot,
              slot.avail && s.timeSlotAvail,
              !slot.avail && !slot.label && s.timeSlotUnavail,
              (slot as any).selected && s.timeSlotSelected,
              slot.label && s.timeSlotBreak,
            ]}
          >
            <Text style={[
              s.timeSlotText,
              slot.avail && s.timeSlotAvailText,
              (slot as any).selected && s.timeSlotSelectedText,
              slot.label && s.timeSlotBreakText,
            ]}>
              {slot.label || slot.time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.breakNote}>🕌 Fri 12:30–2:00 PM — Jumu'ah break (Dubai)</Text>

      <Button
        title="Confirm Time"
        variant="primary-teal"
        full
        onPress={() => router.push('/(customer)/summary')}
      />

      <View style={{ height: 40 }} />
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
    marginBottom: spacing.sm,
  },
  backArrow: { fontSize: 20, color: colors.charcoal },
  topTitle: { fontWeight: '600', fontSize: 16, color: colors.charcoal },
  sub: { fontSize: 13, color: colors.textSecondary, marginBottom: spacing.lg },
  dateRow: { marginBottom: spacing.lg },
  dateChip: {
    minWidth: 56,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  dateChipActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  dateDay: { fontSize: 11, color: colors.textSecondary },
  dateDayActive: { color: colors.white },
  dateNum: { fontSize: 16, fontWeight: '700', color: colors.charcoal },
  dateNumActive: { color: colors.white },
  periodRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  timeSlot: {
    width: '22%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeSlotAvail: {
    borderColor: colors.teal,
    backgroundColor: colors.tealLight,
  },
  timeSlotUnavail: {
    backgroundColor: '#F0ECE6',
    borderColor: 'transparent',
  },
  timeSlotSelected: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  timeSlotBreak: {
    backgroundColor: colors.breakBg,
    borderColor: '#FFCC80',
    width: '47%',
  },
  timeSlotText: { fontSize: 13, fontWeight: '500', color: colors.charcoal },
  timeSlotAvailText: { color: colors.teal },
  timeSlotSelectedText: { color: colors.white },
  timeSlotBreakText: { color: colors.breakText },
  breakNote: {
    fontSize: 11,
    color: colors.breakText,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
});
