import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius } from '@theme/theme';
import { Button } from '@components/Button';

const methods = [
  { id: 'card', icon: '💳', name: 'Card', desc: 'Visa •••• 4242' },
  { id: 'apple_pay', icon: '🍎', name: 'Apple Pay', desc: '' },
  { id: 'tabby', icon: null, name: 'Tabby', desc: '4 installments • AED 78.75/mo', brand: '#8B5CF6', text: 'T' },
  { id: 'tamara', icon: null, name: 'Tamara', desc: 'Pay in 3 • AED 105/mo', brand: '#00A3A3', text: 'TAM' },
];

export default function PaymentScreen() {
  const [selected, setSelected] = useState('card');
  const [deposit, setDeposit] = useState(false);

  const total = 315;
  const depositAmt = total * 0.2;

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={s.topTitle}>Payment</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={s.priceCard}>
        <View style={s.priceRow}><Text>Haircut & Blow-Dry</Text><Text>AED 250</Text></View>
        <View style={s.priceRow}><Text>Scalp massage</Text><Text>AED 50</Text></View>
        <View style={s.priceRow}><Text>VAT (5%)</Text><Text>AED 15</Text></View>
        <View style={[s.priceRow, s.totalRow]}><Text style={s.totalLabel}>Total</Text><Text style={s.totalLabel}>AED {total}</Text></View>
      </View>

      <Text style={s.sectionTitle}>Payment method</Text>
      <View style={s.methodList}>
        {methods.map(m => (
          <TouchableOpacity
            key={m.id}
            style={[s.methodCard, selected === m.id && s.methodCardSelected]}
            onPress={() => setSelected(m.id)}
          >
            <View style={[s.radio, selected === m.id && s.radioSelected]}>
              {selected === m.id && <View style={s.radioInner} />}
            </View>
            <Text style={s.methodIcon}>
              {m.icon || (
                <Text style={{ fontWeight: '700', color: m.brand, fontSize: 16 }}>{m.text}</Text>
              )}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={s.methodName}>{m.name}</Text>
              {m.desc ? <Text style={s.methodDesc}>{m.desc}</Text> : null}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={s.depositCard}>
        <View style={s.depositRow}>
          <Text style={s.depositLabel}>Pay 20% deposit to confirm</Text>
          <TouchableOpacity
            style={[s.toggle, deposit && s.toggleOn]}
            onPress={() => setDeposit(!deposit)}
          >
            <View style={[s.toggleKnob, deposit && s.toggleKnobOn]} />
          </TouchableOpacity>
        </View>
        <Text style={s.depositSub}>
          Pay AED {depositAmt.toFixed(0)} now, remaining AED {total - depositAmt} at appointment
        </Text>
      </View>

      <Button
        title={`Confirm Booking — AED ${deposit ? depositAmt.toFixed(0) : total}`}
        variant="primary-teal"
        full
        onPress={() => router.push('/(customer)/confirmation')}
      />

      <Text style={s.secure}>🔒 Secured with 256-bit SSL encryption</Text>
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
  priceCard: {
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
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    fontSize: 14,
    color: colors.charcoal,
  },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12, marginTop: 8 },
  totalLabel: { fontWeight: '700', fontSize: 16, color: colors.charcoal },
  sectionTitle: { fontWeight: '700', fontSize: 16, color: colors.charcoal, marginBottom: spacing.md },
  methodList: { gap: spacing.sm, marginBottom: spacing.lg },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  methodCardSelected: { borderColor: colors.gold },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: colors.gold },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.gold,
  },
  methodIcon: { fontSize: 20 },
  methodName: { fontWeight: '600', fontSize: 14, color: colors.charcoal },
  methodDesc: { fontSize: 12, color: colors.textSecondary },
  depositCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  depositRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  depositLabel: { fontWeight: '500', fontSize: 14, color: colors.charcoal },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#CCC',
    justifyContent: 'center',
    padding: 2,
  },
  toggleOn: { backgroundColor: colors.gold },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  toggleKnobOn: { alignSelf: 'flex-end' },
  depositSub: { fontSize: 12, color: colors.textSecondary, marginTop: 6 },
  secure: {
    textAlign: 'center',
    fontSize: 11,
    color: colors.textTertiary,
    marginTop: spacing.sm,
  },
});
