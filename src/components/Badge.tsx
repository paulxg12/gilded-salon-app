import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@theme/colors';

type BadgeVariant = 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'active' | 'break';

const badgeStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  confirmed: { bg: colors.successBg, text: colors.success },
  pending: { bg: colors.warningBg, text: colors.warning },
  cancelled: { bg: colors.cancelledBg, text: colors.cancelled },
  completed: { bg: '#E8EAF6', text: '#283593' },
  active: { bg: colors.successBg, text: colors.success },
  break: { bg: colors.breakBg, text: colors.breakText },
};

interface BadgeProps {
  label: string;
  variant: BadgeVariant;
}

export function Badge({ label, variant }: BadgeProps) {
  const style = badgeStyles[variant];
  return (
    <View style={[s.badge, { backgroundColor: style.bg }]}>
      <Text style={[s.text, { color: style.text }]}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
});
