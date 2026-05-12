import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius } from '@theme/theme';
import { Chip } from '@components/Chip';
import { ServiceCard } from '@components/ServiceCard';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'hair', label: '💇‍♀️ Hair' },
  { key: 'nails', label: '💅 Nails' },
  { key: 'facial', label: '🧖‍♀️ Facial' },
  { key: 'massage', label: '💆 Massage' },
  { key: 'mens', label: '✂️ Men\'s' },
];

const allServices = [
  { icon: '💇‍♀️', name: 'Haircut & Blow-Dry', duration: '60 min', price: 'AED 250' },
  { icon: '💅', name: 'Gel Manicure', duration: '45 min', price: 'AED 180' },
  { icon: '🧖‍♀️', name: 'Signature Facial', duration: '75 min', price: 'AED 350' },
  { icon: '💆', name: 'Full Body Massage', duration: '90 min', price: 'AED 400' },
  { icon: '✂️', name: 'Men\'s Grooming', duration: '30 min', price: 'AED 150' },
  { icon: '✨', name: 'Luxury Hair Treatment', duration: '90 min', price: 'AED 520' },
];

export default function BookScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = allServices.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={s.topTitle}>Services</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={s.searchBar}>
        <Text style={s.searchIcon}>🔍</Text>
        <TextInput
          style={s.searchInput}
          placeholder="Search services...     بحث"
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={colors.textTertiary}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.chips}>
        {categories.map(cat => (
          <Chip
            key={cat.key}
            label={cat.label}
            active={activeCategory === cat.key}
            onPress={() => setActiveCategory(cat.key)}
          />
        ))}
      </ScrollView>

      <View style={s.serviceList}>
        {filtered.map((svc, i) => (
          <ServiceCard
            key={i}
            {...svc}
            onPress={() => router.push('/(customer)/stylist')}
          />
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
  backArrow: { fontSize: 20, color: colors.charcoal },
  topTitle: { fontWeight: '600', fontSize: 16, color: colors.charcoal },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    elevation: 2,
  },
  searchIcon: { fontSize: 18 },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.charcoal,
  },
  chips: { marginBottom: spacing.lg },
  serviceList: { gap: 10 },
});
