import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius } from '@theme/theme';
import { Button } from '@components/Button';

const addons = [
  { id: '1', name: 'Scalp massage', duration: '10 min', price: 50, checked: true },
  { id: '2', name: 'Luxury hair treatment', duration: '20 min', price: 120, checked: false },
  { id: '3', name: 'Styling product (take-home)', duration: '', price: 75, checked: false },
];

export default function SummaryScreen() {
  const [addonList, setAddonList] = useState(addons);

  const toggleAddon = (id: string) => {
    setAddonList(prev => prev.map(a => a.id === id ? { ...a, checked: !a.checked } : a));
  };

  const servicePrice = 250;
  const addonTotal = addonList.filter(a => a.checked).reduce((s, a) => s + a.price, 0);
  const subtotal = servicePrice + addonTotal;
  const vat = subtotal * 0.05;
  const total = subtotal + vat;

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={s.topTitle}>Review & Add-ons</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={s.summaryCard}>
        <View style={s.serviceRow}>
          <View style={s.serviceIcon}>
            <Text style={{ fontSize: 24 }}>💇‍♀️</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.serviceName}>Haircut & Blow-Dry</Text>
            <Text style={s.serviceDetail}>with Noora • Today, 11:30 AM</Text>
            <Text style={s.serviceDetail}>60 min • Dubai Marina</Text>
          </View>
        </View>
        <View style={s.divider} />
        <View style={s.priceRow}>
          <Text style={s.priceLabel}>Service</Text>
          <Text style={s.priceValue}>AED {servicePrice}</Text>
        </View>
        <View style={s.priceRow}>
          <Text style={s.priceLabel}>Service fee</Text>
          <Text style={s.priceValue}>AED 0</Text>
        </View>
        <View style={s.priceRow}>
          <Text style={s.priceLabel}>VAT (5%)</Text>
          <Text style={s.priceValue}>AED {vat.toFixed(2)}</Text>
        </View>
        <View style={[s.priceRow, s.totalRow]}>
          <Text style={s.totalLabel}>Total</Text>
          <Text style={s.totalValue}>AED {total.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={s.addonTitle}>Add-ons</Text>
      <View style={s.addonCard}>
        {addonList.map(addon => (
          <TouchableOpacity
            key={addon.id}
            style={s.addonItem}
            onPress={() => toggleAddon(addon.id)}
          >
            <View style={[s.checkbox, addon.checked && s.checkboxChecked]}>
              {addon.checked && <Text style={s.checkmark}>✓</Text>}
            </View>
            <Text style={s.addonName}>{addon.name}</Text>
            <Text style={s.addonPrice}>+AED {addon.price}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.notesTitle}>Notes for your stylist</Text>
      <View style={s.notesBox}>
        <TextInput
          style={s.notesInput}
          placeholder={'e.g. "I\'d like a looser curl, please"'}
          placeholderTextColor={colors.textTertiary}
          multiline
        />
      </View>

      <Button
        title={`Proceed to Payment — AED ${total.toFixed(2)}`}
        full
        onPress={() => router.push('/(customer)/payment')}
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
    marginBottom: spacing.lg,
  },
  backArrow: { fontSize: 20, color: colors.charcoal },
  topTitle: { fontWeight: '600', fontSize: 16, color: colors.charcoal },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    elevation: 2,
  },
  serviceRow: { flexDirection: 'row', gap: 12, marginBottom: spacing.md },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.goldLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceName: { fontWeight: '600', fontSize: 15, color: colors.charcoal },
  serviceDetail: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.borderLight, marginBottom: spacing.md },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  priceLabel: { fontSize: 14, color: colors.charcoal },
  priceValue: { fontSize: 14, color: colors.charcoal },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12, marginTop: 8 },
  totalLabel: { fontWeight: '700', fontSize: 16, color: colors.charcoal },
  totalValue: { fontWeight: '700', fontSize: 16, color: colors.charcoal },
  addonTitle: { fontWeight: '700', fontSize: 16, color: colors.charcoal, marginBottom: spacing.md },
  addonCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    elevation: 2,
  },
  addonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: colors.gold, borderColor: colors.gold },
  checkmark: { color: colors.white, fontSize: 14, fontWeight: '700' },
  addonName: { flex: 1, fontSize: 14, color: colors.charcoal },
  addonPrice: { fontSize: 14, fontWeight: '600', color: colors.charcoal },
  notesTitle: { fontWeight: '600', fontSize: 14, color: colors.charcoal, marginBottom: spacing.sm },
  notesBox: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  notesInput: { fontSize: 13, color: colors.textTertiary, minHeight: 40 },
});
