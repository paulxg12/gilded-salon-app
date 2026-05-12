import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, borderRadius } from '@theme/theme';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export function Chip({ label, active, onPress }: ChipProps) {
  return (
    <TouchableOpacity
      style={[s.chip, active && s.active]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[s.text, active && s.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  active: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  text: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.charcoal,
  },
  activeText: { color: colors.white },
});
