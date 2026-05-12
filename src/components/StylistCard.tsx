import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius } from '@theme/theme';

interface StylistCardProps {
  name: string;
  title: string;
  rating: number;
  reviewCount?: number;
  emoji: string;
  available?: boolean;
  nextAvailable?: string;
  onPress?: () => void;
}

export function StylistCard({ name, title, rating, reviewCount, emoji, available, nextAvailable, onPress }: StylistCardProps) {
  return (
    <TouchableOpacity style={s.card} onPress={onPress} activeOpacity={0.7}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>{emoji}</Text>
      </View>
      <View style={s.info}>
        <Text style={s.name}>{name}</Text>
        <Text style={s.title}>{title}</Text>
        <Text style={s.rating}>
          {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))} {rating.toFixed(1)}
          {reviewCount ? ` (${reviewCount} reviews)` : ''}
        </Text>
      </View>
      <View style={s.right}>
        {available !== undefined && (
          available ? (
            <Text style={s.available}>✓ Available Today</Text>
          ) : (
            <Text style={s.nextAvail}>{nextAvailable || 'Unavailable'}</Text>
          )
        )}
        <TouchableOpacity style={s.bookBtn} onPress={onPress}>
          <Text style={s.bookBtnText}>Book</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    elevation: 2,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.goldLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 24 },
  info: { flex: 1 },
  name: { fontWeight: '600', fontSize: 15, color: colors.charcoal },
  title: { fontSize: 12, color: colors.textSecondary },
  rating: { fontSize: 12, color: colors.gold, marginTop: 2 },
  right: { alignItems: 'flex-end', gap: 6 },
  available: { fontSize: 11, color: colors.teal, fontWeight: '500' },
  nextAvail: { fontSize: 11, color: colors.textSecondary },
  bookBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: colors.gold,
    borderRadius: 6,
  },
  bookBtnText: { color: colors.white, fontWeight: '600', fontSize: 12 },
});
