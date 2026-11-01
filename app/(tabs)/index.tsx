import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Search,
  ShieldCheck,
  Users,
  PiggyBank,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Receipt,
  Coins,
  UserPlus,
  BookOpen,
  FileText,
} from 'lucide-react-native';
import { MemberCard } from '../../components/MemberCard';
import { useApp } from '../../context/AppContext';
import { useRouter } from 'expo-router';

export default function MobileDashboardScreen() {
  const router = useRouter();
  const { language, theme, colors, formatMoney, formatNum, activeMember, selectMemberByAccount } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedMember, setVerifiedMember] = useState<boolean>(false);

  const handleVerify = () => {
    if (searchQuery.trim()) {
      selectMemberByAccount(searchQuery.trim());
    }
    setVerifiedMember(true);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      {/* Quick Lookup Bar (Mobile Gatekeeper) */}
      <View style={[styles.lookupCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.lookupTitleRow}>
          <Text style={[styles.lookupTitle, { color: colors.text }]}>
            {language === 'bn' ? 'গেটকিপার সদস্য অনুসন্ধান' : 'Gatekeeper Member Lookup'}
          </Text>
          <View style={[styles.badgePill, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>
              {language === 'bn' ? 'লাইভ যাচাই' : 'Live Check'}
            </Text>
          </View>
        </View>

        <Text style={[styles.lookupSubtitle, { color: colors.textMuted }]}>
          {language === 'bn'
            ? 'আদায় এন্ট্রির পূর্বে সদস্যের হিসাব নং দিয়ে স্থিতি যাচাই করুন'
            : 'Verify member savings & loan balance before recording collection'}
        </Text>

        <View style={styles.searchRow}>
          <View style={[styles.searchInputWrapper, { backgroundColor: colors.cardMuted, borderColor: colors.border }]}>
            <Search size={16} color={colors.textMuted} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder={language === 'bn' ? 'যেমন: SM-2840-001 বা ১০২৪' : 'e.g. SM-2840-001'}
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="characters"
            />
          </View>
          <TouchableOpacity
            style={[styles.verifyBtn, { backgroundColor: colors.primary }]}
            onPress={handleVerify}
            activeOpacity={0.8}
          >
            <Text style={styles.verifyBtnText}>
              {language === 'bn' ? 'যাচাই' : 'Verify'}
            </Text>
          </TouchableOpacity>
        </View>

        {verifiedMember && (
          <View style={[styles.verifiedBox, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
            <View style={styles.verifiedHeader}>
              <CheckCircle size={16} color={colors.primary} />
              <Text style={[styles.verifiedText, { color: colors.primary }]}>
                {language === 'bn'
                  ? `যাচাইকৃত: ${activeMember.name} (${activeMember.accountNo})`
                  : `Verified: ${activeMember.nameEn} (${activeMember.accountNo})`}
              </Text>
            </View>
            <Text style={[styles.verifiedSub, { color: colors.textSecondary }]}>
              {language === 'bn'
                ? `${activeMember.centerNo} • সঞ্চয়: ${formatMoney(activeMember.ledgerRows[0]?.savingsClosingBalance || 0)} • ঋণ বকেয়া: ${formatMoney(activeMember.loanTerms.outstandingDue || 0)}`
                : `${activeMember.centerNoEn} • Savings: ${formatMoney(activeMember.ledgerRows[0]?.savingsClosingBalance || 0)} • Loan Due: ${formatMoney(activeMember.loanTerms.outstandingDue || 0)}`}
            </Text>
            <TouchableOpacity
              style={[styles.quickCollectBtn, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/(tabs)/collections')}
            >
              <Text style={styles.quickCollectBtnText}>
                {language === 'bn' ? 'আদায় এন্ট্রি করুন →' : 'Record Collection →'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Quick Metric Cards */}
      <View style={styles.metricsGrid}>
        <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.metricIcon, { backgroundColor: colors.primaryLight }]}>
            <TrendingUp size={18} color={colors.primary} />
          </View>
          <Text style={[styles.metricLabel, { color: colors.textMuted }]}>
            {language === 'bn' ? 'আজকের মোট আদায়' : 'Today Collected'}
          </Text>
          <Text style={[styles.metricValue, { color: colors.text }]}>
            {formatMoney(24500)}
          </Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#e0f2fe' }]}>
            <Users size={18} color="#0284c7" />
          </View>
          <Text style={[styles.metricLabel, { color: colors.textMuted }]}>
            {language === 'bn' ? 'বরাদ্দকৃত কেন্দ্র' : 'Assigned Center'}
          </Text>
          <Text style={[styles.metricValue, { color: colors.text }]}>
            {language === 'bn' ? 'কেন্দ্র-০১ (৩২ জন)' : 'Center-01 (32)'}
          </Text>
        </View>
      </View>

      {/* COMMON BANKING OPERATIONS BAR (DIRECT REPLICA OF DASHBOARD SCREENSHOT 2) */}
      <View style={[styles.opsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.opsHeaderRow}>
          <Text style={[styles.opsLabel, { color: colors.textSecondary }]}>
            {language === 'bn' ? 'সাধারণ ব্যাংকিং কার্যক্রম:' : 'COMMON BANKING OPERATIONS:'}
          </Text>
          <View style={[styles.badgePill, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>
              {language === 'bn' ? 'ফিল্ড ও কাউন্টার' : 'Field & Counter'}
            </Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.opsScrollContent}>
          {/* 1. Common Collection Slip */}
          <TouchableOpacity
            style={[styles.opBtn, { backgroundColor: colors.cardMuted, borderColor: colors.border }]}
            onPress={() => router.push('/(tabs)/collections')}
            activeOpacity={0.7}
          >
            <Receipt size={13} color={colors.primary} />
            <Text style={[styles.opBtnText, { color: colors.text }]}>
              {language === 'bn' ? 'কালেকশন স্লিপ' : 'Collection Slip'}
            </Text>
          </TouchableOpacity>

          {/* 2. Installment Collection */}
          <TouchableOpacity
            style={[styles.opBtn, { backgroundColor: colors.cardMuted, borderColor: colors.border }]}
            onPress={() => router.push('/(tabs)/collections')}
            activeOpacity={0.7}
          >
            <Coins size={13} color="#0284c7" />
            <Text style={[styles.opBtnText, { color: colors.text }]}>
              {language === 'bn' ? 'কিস্তি আদায়' : 'Installment'}
            </Text>
          </TouchableOpacity>

          {/* 3. New Member (Passbook Cover) */}
          <TouchableOpacity
            style={[styles.opBtn, { backgroundColor: colors.cardMuted, borderColor: colors.border }]}
            onPress={() => router.push('/(tabs)/profile')}
            activeOpacity={0.7}
          >
            <UserPlus size={13} color="#7c3aed" />
            <Text style={[styles.opBtnText, { color: colors.text }]}>
              {language === 'bn' ? 'নতুন সদস্য' : 'New Member'}
            </Text>
          </TouchableOpacity>

          {/* 4. Disburse Loan */}
          <TouchableOpacity
            style={[styles.opBtn, { backgroundColor: colors.cardMuted, borderColor: colors.border }]}
            onPress={() => router.push('/(tabs)/profile')}
            activeOpacity={0.7}
          >
            <TrendingUp size={13} color="#d97706" />
            <Text style={[styles.opBtnText, { color: colors.text }]}>
              {language === 'bn' ? 'ঋণ বিতরণ' : 'Disburse Loan'}
            </Text>
          </TouchableOpacity>

          {/* 5. Passbook Ledger Spread */}
          <TouchableOpacity
            style={[styles.opBtn, { backgroundColor: colors.cardMuted, borderColor: colors.border }]}
            onPress={() => router.push('/(tabs)/profile')}
            activeOpacity={0.7}
          >
            <BookOpen size={13} color={colors.primary} />
            <Text style={[styles.opBtnText, { color: colors.text }]}>
              {language === 'bn' ? 'ডিজিটাল পাশ বই' : 'Passbook Ledger'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Assigned Samity Members List */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {language === 'bn' ? 'আজকের আদায় তালিকা (কেন্দ্র-০১)' : "Today's Collection List (Center-01)"}
        </Text>
        <Text style={[styles.sectionBadge, { color: colors.primary }]}>
          {language === 'bn' ? 'এলেঙ্গা সমিতি' : 'Elenga Center'}
        </Text>
      </View>

      <MemberCard
        name="Md. Abdul Karim"
        nameBangla="মোঃ আব্দুল করিম"
        accountNo="SM-2840-001"
        centerNo="কেন্দ্র-০১"
        mobile="01711-223344"
        groupName="এলেঙ্গা সমিতি"
        savingsBalance={13400}
        loanBalance={28750}
        onPress={() => {
          selectMemberByAccount('SM-2840-001');
          router.push('/(tabs)/collections');
        }}
      />

      <MemberCard
        name="Mst. Rahima Begum"
        nameBangla="মোছাঃ রহিমা বেগম"
        accountNo="SM-2840-002"
        centerNo="কেন্দ্র-০১"
        mobile="01822-334455"
        groupName="এলেঙ্গা সমিতি"
        savingsBalance={18800}
        loanBalance={27600}
        onPress={() => {
          selectMemberByAccount('SM-2840-002');
          router.push('/(tabs)/collections');
        }}
      />

      <MemberCard
        name="Kabir Hossain"
        nameBangla="কবীর হোসেন"
        accountNo="SM-2840-003"
        centerNo="কেন্দ্র-০১"
        mobile="01911-223344"
        groupName="এলেঙ্গা সমিতি"
        savingsBalance={8500}
        loanBalance={0}
        onPress={() => {
          selectMemberByAccount('SM-2840-003');
          router.push('/(tabs)/collections');
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  lookupCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  lookupTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lookupTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  lookupSubtitle: {
    fontSize: 11,
    marginTop: 2,
    marginBottom: 12,
    lineHeight: 16,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 8,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 13,
    fontWeight: '500',
  },
  verifyBtn: {
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  verifiedBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  verifiedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  verifiedSub: {
    fontSize: 11,
    marginTop: 3,
    marginLeft: 22,
  },
  quickCollectBtn: {
    alignSelf: 'flex-start',
    marginTop: 8,
    marginLeft: 22,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  quickCollectBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
  },
  metricIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  opsCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  opsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  opsLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  opsScrollContent: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  opBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
  },
  opBtnText: {
    fontSize: 11,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  sectionBadge: {
    fontSize: 11,
    fontWeight: '600',
  },
});
