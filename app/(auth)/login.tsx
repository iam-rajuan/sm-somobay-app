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
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { UserCheck, KeyRound, ArrowLeft, BookOpen, Search, ShieldCheck } from 'lucide-react-native';
import { useApp, DEFAULT_MEMBER } from '../../context/AppContext';

export default function LoginScreen() {
  const router = useRouter();
  const { language, theme, colors, setActiveMember } = useApp();
  const [accountNo, setAccountNo] = useState('SM-2840-001');
  const [pin, setPin] = useState('123456');

  const handleLogin = (targetAcc?: string) => {
    const acc = targetAcc || accountNo;
    if (acc === 'SM-2840-002') {
      setActiveMember({
        ...DEFAULT_MEMBER,
        accountNo: 'SM-2840-002',
        name: 'মোছাঃ রহিমা বেগম',
        nameEn: 'Mst. Rahima Begum',
        fatherName: 'মোঃ আব্দুল হক (স্বামী)',
        fatherNameEn: 'Md. Abdul Haque (Spouse)',
        address: 'সিলিমপুর, কালিহাতী, টাঙ্গাইল',
        addressEn: 'Silimpur, Kalihati, Tangail',
        centerNo: 'কেন্দ্র নং- ০২',
        centerNoEn: 'Center No- 02',
        mobile: '01822-334455',
        loanTerms: {
          ...DEFAULT_MEMBER.loanTerms,
          loanAmount: 80000,
          installmentCount: 50,
          formNo: 'SM-LN-042',
          perInstallment: 1840,
          weeklyInstallment: 1840,
          outstandingDue: 27600,
        },
      });
    } else {
      setActiveMember(DEFAULT_MEMBER);
    }
    router.replace('/(tabs)/profile');
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.text} />
          <Text style={[styles.backText, { color: colors.text }]}>
            {language === 'bn' ? 'ফিরে যান' : 'Back'}
          </Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.iconCircle, { backgroundColor: colors.primaryLight }]}>
            <BookOpen size={30} color={colors.primary} />
          </View>

          <Text style={[styles.title, { color: colors.text }]}>
            {language === 'bn' ? 'সদস্য ডিজিটাল পাশ বই' : 'Member Passbook Login'}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            {language === 'bn'
              ? 'আপনার সদস্য সঞ্চয়ী হিসাব নম্বর ও পিন লিখুন'
              : 'Enter your member account number & security PIN'}
          </Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
                {language === 'bn' ? 'সঞ্চয়ী হিসাব নং (ACCOUNT NO)' : 'ACCOUNT NUMBER (হিসাব নং)'}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                placeholder={language === 'bn' ? 'যেমন: SM-2840-001' : 'e.g. SM-2840-001'}
                placeholderTextColor={colors.textMuted}
                value={accountNo}
                onChangeText={setAccountNo}
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
                {language === 'bn' ? 'গোপন পিন / পাসওয়ার্ড' : 'PIN / PASSWORD'}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                placeholder="••••••"
                placeholderTextColor={colors.textMuted}
                value={pin}
                onChangeText={setPin}
                secureTextEntry
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity
              style={[styles.loginBtn, { backgroundColor: colors.primary }]}
              onPress={() => handleLogin()}
              activeOpacity={0.8}
            >
              <Text style={styles.loginBtnText}>
                {language === 'bn' ? 'ডিজিটাল পাশ বই দেখুন' : 'Access Digital Passbook'}
              </Text>
            </TouchableOpacity>

            {/* Quick Demo Accounts */}
            <View style={[styles.demoBox, { borderColor: colors.border, backgroundColor: colors.cardMuted }]}>
              <Text style={[styles.demoTitle, { color: colors.textMuted }]}>
                {language === 'bn' ? 'ডেমো অ্যাকাউন্ট দ্রুত লগইন:' : 'Quick Demo Passbooks:'}
              </Text>
              <View style={styles.demoButtonsRow}>
                <TouchableOpacity
                  style={[styles.demoBtn, { borderColor: colors.border, backgroundColor: colors.card }]}
                  onPress={() => {
                    setAccountNo('SM-2840-001');
                    handleLogin('SM-2840-001');
                  }}
                >
                  <Text style={[styles.demoBtnAcc, { color: colors.primary }]}>SM-2840-001</Text>
                  <Text style={[styles.demoBtnName, { color: colors.text }]}>
                    {language === 'bn' ? 'মোঃ আব্দুল করিম' : 'Md. Abdul Karim'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.demoBtn, { borderColor: colors.border, backgroundColor: colors.card }]}
                  onPress={() => {
                    setAccountNo('SM-2840-002');
                    handleLogin('SM-2840-002');
                  }}
                >
                  <Text style={[styles.demoBtnAcc, { color: colors.primary }]}>SM-2840-002</Text>
                  <Text style={[styles.demoBtnName, { color: colors.text }]}>
                    {language === 'bn' ? 'মোছাঃ রহিমা বেগম' : 'Mst. Rahima Begum'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  backText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
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
    letterSpacing: 0.5,
  },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 15,
    fontFamily: 'monospace',
  },
  loginBtn: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  loginBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  demoBox: {
    marginTop: 18,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
  },
  demoTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  demoButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  demoBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  demoBtnAcc: {
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  demoBtnName: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
});
