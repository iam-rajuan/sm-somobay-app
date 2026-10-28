import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Search, ShieldCheck, Users, PiggyBank, TrendingUp, CheckCircle } from 'lucide-react-native';
import { MemberCard } from '../../components/MemberCard';
import Colors from '../../constants/Colors';

export default function MobileDashboardScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedMember, setVerifiedMember] = useState<boolean>(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Quick Lookup Bar (Mobile Gatekeeper) */}
      <View style={styles.lookupCard}>
        <Text style={styles.lookupTitle}>
          Gatekeeper Lookup (হিসাব অনুসন্ধান)
        </Text>
        <Text style={styles.lookupSubtitle}>
          Enter member Account No to verify balance before collection
        </Text>

        <View style={styles.searchRow}>
          <View style={styles.searchInputWrapper}>
            <Search size={18} color="#94a3b8" />
            <TextInput
              style={styles.searchInput}
              placeholder="e.g. M-10023"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="characters"
            />
          </View>
          <TouchableOpacity
            style={styles.verifyBtn}
            onPress={() => setVerifiedMember(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.verifyBtnText}>Verify</Text>
          </TouchableOpacity>
        </View>

        {verifiedMember && (
          <View style={styles.verifiedBox}>
            <View style={styles.verifiedHeader}>
              <CheckCircle size={16} color="#16a34a" />
              <Text style={styles.verifiedText}>যাচাইকৃত: মোঃ রফিকুল ইসলাম (এস-১০২৪)</Text>
            </View>
            <Text style={styles.verifiedSub}>কেন্দ্র-০৪ (এলেঙ্গা) • পিতা: আব্দুল জলিল • সঞ্চয়: ৳২৪,৫০০ • ঋণ: ৳১,৫০০</Text>
          </View>
        )}
      </View>

      {/* Quick Metric Cards */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <View style={[styles.metricIcon, { backgroundColor: '#dcfce7' }]}>
            <TrendingUp size={20} color="#16a34a" />
          </View>
          <Text style={styles.metricLabel}>Today Collected</Text>
          <Text style={styles.metricValue}>৳18,500</Text>
        </View>

        <View style={styles.metricCard}>
          <View style={[styles.metricIcon, { backgroundColor: '#e0f2fe' }]}>
            <Users size={20} color="#0284c7" />
          </View>
          <Text style={styles.metricLabel}>Assigned Center</Text>
          <Text style={styles.metricValue}>কেন্দ্র-০৪ (৩২ জন)</Text>
        </View>
      </View>

      {/* Assigned Samity Members List */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>আজকের আদায় তালিকা (কেন্দ্র-০৪)</Text>
        <Text style={styles.sectionBadge}>এলেঙ্গা কেন্দ্র</Text>
      </View>

      <MemberCard
        name="Md. Rafiqul Islam"
        nameBangla="মোঃ রফিকুল ইসলাম"
        accountNo="এস-১০২৪"
        centerNo="কেন্দ্র-০৪"
        mobile="+880 1712-345678"
        groupName="এলেঙ্গা কেন্দ্র"
        savingsBalance={24500}
        loanBalance={65000}
      />

      <MemberCard
        name="Farhana Akhter"
        nameBangla="ফারহানা আক্তার"
        accountNo="এস-১০২৫"
        centerNo="কেন্দ্র-০৪"
        mobile="+880 1819-876543"
        groupName="এলেঙ্গা কেন্দ্র"
        savingsBalance={12000}
        loanBalance={30000}
      />

      <MemberCard
        name="Kabir Hossain"
        nameBangla="কবীর হোসেন"
        accountNo="এস-১০২৬"
        centerNo="কেন্দ্র-০৪"
        mobile="+880 1911-223344"
        groupName="এলেঙ্গা কেন্দ্র"
        savingsBalance={8500}
        loanBalance={0}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  lookupCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  lookupTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  lookupSubtitle: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
    marginBottom: 12,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 8,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '600',
  },
  verifyBtn: {
    backgroundColor: '#16a34a',
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
    padding: 10,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  verifiedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#166534',
  },
  verifiedSub: {
    fontSize: 11,
    color: '#15803d',
    marginTop: 2,
    marginLeft: 22,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  sectionBadge: {
    fontSize: 11,
    color: '#16a34a',
    fontWeight: '600',
  },
});

