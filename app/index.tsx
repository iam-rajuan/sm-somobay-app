import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldCheck, UserCheck, Smartphone, Sun, Moon, Globe, ArrowRight } from 'lucide-react-native';
import { useApp } from '../context/AppContext';

export default function RoleSelectorScreen() {
  const router = useRouter();
  const { language, toggleLanguage, theme, toggleTheme, colors } = useApp();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top Controls Bar */}
        <View style={styles.topControls}>
          <TouchableOpacity
            style={[styles.controlPill, { borderColor: colors.border, backgroundColor: colors.card }]}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            {theme === 'dark' ? (
              <Sun size={16} color="#fbbf24" />
            ) : (
              <Moon size={16} color={colors.textSecondary} />
            )}
            <Text style={[styles.controlText, { color: colors.textSecondary }]}>
              {theme === 'dark' ? 'Light' : 'Dark'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlPill, { borderColor: colors.border, backgroundColor: colors.card }]}
            onPress={toggleLanguage}
            activeOpacity={0.7}
          >
            <Globe size={16} color={colors.primary} />
            <Text style={[styles.controlText, { color: colors.primary, fontWeight: 'bold' }]}>
              {language === 'bn' ? 'English' : 'বাংলা'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Institution Brand Header */}
        <View style={styles.header}>
          {/* Logo with S-M Handshake emblem */}
          <View style={[styles.logoBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.logoText}>S-M</Text>
            <Text style={styles.logoIcon}>🤝</Text>
          </View>

          <View style={[styles.govtPill, { backgroundColor: colors.cardMuted, borderColor: colors.border }]}>
            <ShieldCheck size={14} color={colors.primary} />
            <Text style={[styles.govtText, { color: colors.primary }]}>
              {language === 'bn'
                ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত'
                : 'Approved by Govt. of Bangladesh'}
            </Text>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>
            {language === 'bn'
              ? 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ'
              : 'S.M. Khudra Sanchay O Rindan Samabay Samity Ltd.'}
          </Text>

          <Text style={[styles.subtitle, { color: colors.primary }]}>
            {language === 'bn' ? 'সোশ্যাল ম্যানেজমেন্ট • সঞ্চয় ও ঋণের পাশ বই' : 'Social Management • Savings & Loan Passbook'}
          </Text>

          <Text style={[styles.description, { color: colors.textMuted }]}>
            {language === 'bn'
              ? 'রেজিঃ নং ট-ক ২৮৪০/২১ • প্রধান কার্যালয়: এলেঙ্গা, কালিহাতী, টাঙ্গাইল। শতভাগ স্বচ্ছ ডিজিটাল সমবায় ব্যাংকিং।'
              : 'Reg: T-K 2840/21 • Head Office: Elenga, Kalihati, Tangail. Transparent cooperative micro-banking.'}
          </Text>
        </View>

        {/* Action Modes */}
        <View style={styles.modesContainer}>
          {/* 1. Member Digital Passbook Mode */}
          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderLeftColor: colors.primary,
              },
            ]}
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.8}
          >
            <View style={[styles.cardIcon, { backgroundColor: colors.primaryLight }]}>
              <UserCheck size={26} color={colors.primary} />
            </View>
            <View style={styles.cardText}>
              <View style={styles.cardBadgeRow}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>
                  {language === 'bn' ? 'সদস্য ডিজিটাল পাশ বই' : 'Member Digital Passbook'}
                </Text>
              </View>
              <Text style={[styles.cardSubtitle, { color: colors.primary }]}>
                {language === 'bn' ? 'ব্যক্তিগত সঞ্চয় ও ঋণের লেজার খতিয়ান' : 'Personal Savings & Loan Ledger'}
              </Text>
              <Text style={[styles.cardDesc, { color: colors.textMuted }]}>
                {language === 'bn'
                  ? 'দৈনিক/সাপ্তাহিক সঞ্চয় স্থিতি, ডিপিএস জমা, কিস্তি বিবরণী ও ডিজিটাল পাশ বই কার্ড।'
                  : 'Live balances, weekly deposits, installment schedule, and electronic passbook statement.'}
              </Text>
            </View>
            <ArrowRight size={18} color={colors.textMuted} style={{ alignSelf: 'center' }} />
          </TouchableOpacity>

          {/* 2. Field Officer Collection Mode */}
          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderLeftColor: '#0284c7',
              },
            ]}
            onPress={() => router.push('/(tabs)')}
            activeOpacity={0.8}
          >
            <View style={[styles.cardIcon, { backgroundColor: '#e0f2fe' }]}>
              <Smartphone size={26} color="#0284c7" />
            </View>
            <View style={styles.cardText}>
              <View style={styles.cardBadgeRow}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>
                  {language === 'bn' ? 'মাঠকর্মী আদায় পোর্টাল' : 'Field Officer Mode'}
                </Text>
              </View>
              <Text style={[styles.cardSubtitle, { color: '#0284c7' }]}>
                {language === 'bn' ? 'কেন্দ্রভিত্তিক কিস্তি ও সঞ্চয় আদায়' : 'Center-Wise Collection Entry'}
              </Text>
              <Text style={[styles.cardDesc, { color: colors.textMuted }]}>
                {language === 'bn'
                  ? 'সদস্য গেটকিপার যাচাই, ইনস্ট্যান্ট এসএমএস রিসিট ও অফলাইন আদায় ডাটা।'
                  : 'Member lookup, batch collections, offline sync, and real-time SMS dispatch.'}
              </Text>
            </View>
            <ArrowRight size={18} color={colors.textMuted} style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textMuted }]}>
            {language === 'bn'
              ? 'এস, এম সমবায় ব্যাংকিং মোবাইল অ্যাপ v২.০'
              : 'S.M. Cooperative Banking Mobile App v2.0'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    padding: 20,
    justifyContent: 'space-between',
    minHeight: '100%',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginBottom: 10,
  },
  controlPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  controlText: {
    fontSize: 12,
    fontWeight: '500',
  },
  header: {
    alignItems: 'center',
    marginVertical: 10,
  },
  logoBadge: {
    width: 68,
    height: 68,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#15803d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  logoIcon: {
    fontSize: 18,
    marginTop: 2,
  },
  govtPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
  },
  govtText: {
    fontSize: 11,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
  description: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
    maxWidth: 320,
  },
  modesContainer: {
    gap: 14,
    marginVertical: 18,
  },
  card: {
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
  },
  cardBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  cardDesc: {
    fontSize: 11,
    marginTop: 5,
    lineHeight: 16,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 11,
  },
});
