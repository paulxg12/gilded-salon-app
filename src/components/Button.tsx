import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { colors, borderRadius } from '@theme/theme';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'primary-teal' | 'outline' | 'ghost';
  full?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({ title, onPress, variant = 'primary', full, loading, disabled, style }: ButtonProps) {
  const isOutline = variant === 'outline';
  const isTeal = variant === 'primary-teal';
  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity
      style={[
        s.base,
        isOutline && s.outline,
        isTeal && s.teal,
        isGhost && s.ghost,
        full && s.full,
        disabled && s.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? colors.gold : colors.white} />
      ) : (
        <Text style={[
          s.text,
          isOutline && s.outlineText,
          isTeal && s.tealText,
          isGhost && s.ghostText,
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: borderRadius.md,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.gold,
  },
  teal: {
    backgroundColor: colors.teal,
  },
  ghost: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
  },
  full: { width: '100%' },
  disabled: { opacity: 0.5 },
  text: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 15,
  },
  outlineText: { color: colors.gold },
  tealText: { color: colors.white },
  ghostText: { color: colors.gold, fontWeight: '500', fontSize: 14 },
});
