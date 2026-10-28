import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { UserCheck, KeyRound, ArrowLeft } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [accountNo, setAccountNo] = useState('');
  const [pin, setPin] = useState('');

  const handleLogin = () => {
    // Scaffold phase: route directly to tab navigation
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#0f172a" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.iconCircle}>
            <UserCheck size={32} color="#16a34a" />
          </View>

          <Text style={styles.title}>Member Sign In</Text>
          <Text style={styles.subtitle}>Enter your Somity Account No and PIN</Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>ACCOUNT NUMBER (হিসাব নং)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. M-10023"
                value={accountNo}
                onChangeText={setAccountNo}
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>PIN / PASSWORD</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••"
                value={pin}
                onChangeText={setPin}
                secureTextEntry
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.loginBtnText}>Access Passbook</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  backText: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 0.5,
  },
  input: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 14,
    fontSize: 15,
    backgroundColor: '#f8fafc',
    color: '#0f172a',
  },
  loginBtn: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  loginBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

