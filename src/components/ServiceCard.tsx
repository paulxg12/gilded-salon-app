import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius } from '@theme/theme';

interface ServiceCardProps {
  icon: string;
  name: string;
  duration: string;
  price: string;
  onPress?: () => void;
  variant?: 'horizontal' | 'vertical';
}

export function ServiceCard({ icon, name, duration, price, onPress, variant = 'horizontal' }: ServiceCardProps) {
  if (variant === 'vertical') {
    return (
      <TouchableOpacity style={s.cardV} onPress={onPress} activeOpacity={0.7}>
        <View style={s.iconWrapV}>
          <Text style={s.iconText}>{icon}</Text>
        </View>
        <Text style={s.nameV} numberOfLines={1}>{name}</Text>
        <Text style={s.metaV}>{duration}</Text>
        <Text style={s.priceV}>{price}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={s.card} onPress={onPress} activeOpacity={0.7}>
      <View style={s.iconWrap}>
        <Text style={s.iconText}>{icon}</Text>
      </View>
      <View style={s.info}>
        <Text style={s.name}>{name}</Text>
        <Text style={s.meta}>{duration}</Text>
        <Text style={s.price}>{price}</Text>
      </View>
      <TouchableOpacity style={s.bookBtn} onPress={onPress}>
        <Text style={s.bookBtnText}>Book</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    elevation: 2,
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.goldLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { fontSize: 28 },
  info: { flex: 1 },
  name: { fontWeight: '600', fontSize: 14, color: colors.charcoal },
  meta: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  price: { fontWeight: '700', color: colors.gold, fontSize: 15, marginTop: 4 },
  bookBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: colors.gold,
    borderRadius: 6,
  },
  bookBtnText: { color: colors.white, fontWeight: '600', fontSize: 12 },
  cardV: {
    minWidth: 140,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    elevation: 2,
  },
  iconWrapV: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  nameV: { fontWeight: '600', fontSize: 14, color: colors.charcoal },
  metaV: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  priceV: { fontWeight: '700', color: colors.gold, fontSize: 14, marginTop: 6 },
});
