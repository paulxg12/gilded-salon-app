import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius } from '@theme/theme';
import { Button } from '@components/Button';
import { signInWithPhone, confirmCode, signUpWithEmail, signInWithEmail, createUserProfile } from '@firebase/auth';
import { FirebaseAuth } from '@firebase/config';

export default function AuthScreen() {
  const [mode, setMode] = useState<'phone' | 'email' | 'code' | 'register'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [confirmation, setConfirmation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    setLoading(true);
    try {
      const c = await signInWithPhone(phone);
      setConfirmation(c);
      setMode('code');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    try {
      await confirmCode(confirmation, code);
      router.replace('/');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
    setLoading(false);
  };

  const handleEmailSignIn = async () => {
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      router.replace('/');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const user = await signUpWithEmail(email, password, name);
      await createUserProfile(user, { name, phone: '', email });
      router.replace('/');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
    setLoading(false);
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.logo}>GILDED<span style={s.logoAccent}>.</span></Text>
        <Text style={s.tagline}>Salon booking, elevated.</Text>
      </View>

      <View style={s.tabs}>
        <TouchableOpacity
          style={[s.tab, mode === 'phone' && s.tabActive]}
          onPress={() => setMode('phone')}
        >
          <Text style={[s.tabText, mode === 'phone' && s.tabTextActive]}>Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.tab, (mode === 'email' || mode === 'register') && s.tabActive]}
          onPress={() => setMode('email')}
        >
          <Text style={[s.tabText, (mode === 'email' || mode === 'register') && s.tabTextActive]}>Email</Text>
        </TouchableOpacity>
      </View>

      {mode === 'phone' && (
        <View style={s.form}>
          <Text style={s.label}>Phone Number</Text>
          <TextInput
            style={s.input}
            placeholder="+971 50 123 4567"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor={colors.textTertiary}
          />
          <Button title="Send Code" onPress={handleSendCode} loading={loading} full />
          <TouchableOpacity onPress={() => setMode('register')}>
            <Text style={s.switchText}>New here? Create an account</Text>
          </TouchableOpacity>
        </View>
      )}

      {mode === 'code' && (
        <View style={s.form}>
          <Text style={s.label}>Verification Code</Text>
          <TextInput
            style={s.input}
            placeholder="123456"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            placeholderTextColor={colors.textTertiary}
          />
          <Button title="Verify" onPress={handleVerifyCode} loading={loading} full />
        </View>
      )}

      {mode === 'email' && (
        <View style={s.form}>
          <Text style={s.label}>Email</Text>
          <TextInput
            style={s.input}
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={colors.textTertiary}
          />
          <Text style={s.label}>Password</Text>
          <TextInput
            style={s.input}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={colors.textTertiary}
          />
          <Button title="Sign In" onPress={handleEmailSignIn} loading={loading} full />
          <TouchableOpacity onPress={() => setMode('register')}>
            <Text style={s.switchText}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      )}

      {mode === 'register' && (
        <View style={s.form}>
          <Text style={s.label}>Full Name</Text>
          <TextInput
            style={s.input}
            placeholder="Fatima Al Zahra"
            value={name}
            onChangeText={setName}
            placeholderTextColor={colors.textTertiary}
          />
          <Text style={s.label}>Email</Text>
          <TextInput
            style={s.input}
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={colors.textTertiary}
          />
          <Text style={s.label}>Password</Text>
          <TextInput
            style={s.input}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={colors.textTertiary}
          />
          <Button title="Create Account" onPress={handleRegister} loading={loading} full />
          <TouchableOpacity onPress={() => setMode('email')}>
            <Text style={s.switchText}>Already have an account? Sign in</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    paddingHorizontal: spacing.xl,
    paddingTop: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.charcoal,
    letterSpacing: -0.5,
  },
  logoAccent: { color: colors.gold },
  tagline: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabActive: { backgroundColor: colors.gold },
  tabText: { fontWeight: '600', fontSize: 14, color: colors.textSecondary },
  tabTextActive: { color: colors.white },
  form: { gap: 12 },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    fontSize: 15,
    backgroundColor: colors.white,
    color: colors.charcoal,
  },
  switchText: {
    textAlign: 'center',
    color: colors.gold,
    fontWeight: '500',
    fontSize: 13,
    marginTop: 8,
  },
});
