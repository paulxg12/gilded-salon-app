import { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius, typography } from '@theme/theme';
import { Button } from '@components/Button';

const { width } = Dimensions.get('window');

const slides = [
  {
    emoji: '📅',
    title: 'Book top stylists\nin seconds',
    subtitle: 'Browse salons, pick your stylist,\nand book in just a few taps.',
  },
  {
    emoji: '💳',
    title: 'Pay your way',
    subtitle: 'Card, Apple Pay, Tabby or Tamara.\nFlexible payments for everyone.',
  },
  {
    emoji: '⏰',
    title: 'No more waiting',
    subtitle: 'Real-time availability. No double-booking.\nYour time is respected.',
  },
];

export default function OnboardingScreen() {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      router.replace('/auth');
    }
  };

  const slide = slides[current];

  return (
    <View style={s.container}>
      <View style={s.skipRow}>
        {current < slides.length - 1 && (
          <TouchableOpacity onPress={() => router.replace('/auth')}>
            <Text style={s.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={s.content}>
        <Text style={s.emoji}>{slide.emoji}</Text>
        <Text style={s.title}>{slide.title}</Text>
        <Text style={s.subtitle}>{slide.subtitle}</Text>
      </View>

      <View style={s.footer}>
        <View style={s.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[s.dot, i === current && s.dotActive]} />
          ))}
        </View>
        <Button title={current === slides.length - 1 ? 'Get Started' : 'Next'} onPress={handleNext} full />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    paddingHorizontal: spacing.xl,
    paddingTop: 60,
    paddingBottom: 40,
  },
  skipRow: {
    alignItems: 'flex-end',
    height: 40,
  },
  skipText: {
    fontSize: 13,
    color: colors.gold,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.charcoal,
    textAlign: 'center',
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 21,
  },
  footer: {
    gap: 16,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
  },
  dotActive: {
    width: 24,
    borderRadius: 4,
    backgroundColor: colors.gold,
  },
});
