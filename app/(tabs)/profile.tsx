import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { User, Shield, CreditCard, LogOut, CheckCircle2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Digital Savings & Loan Passbook Cover */}
      <View style={styles.idCard}>
        <View style={styles.cardTop}>
          <Text style={styles.cardOrg}>এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ</Text>
          <View style={styles.cardPill}>
            <Text style={styles.cardPillText}>রেজিঃ ট-ক ২৮৪০/২১</Text>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 14 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#86efac', letterSpacing: 0.5 }}>
            সঞ্চয় ও ঋণের পাশ বই
          </Text>
          <Text style={{ fontSize: 10, color: '#cbd5e1', marginTop: 2 }}>
            প্রধান কার্যালয়: এলেঙ্গা, কালিহাতী, টাঙ্গাইল
          </Text>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.cardAvatar}>
            <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>এস,এম</Text>
          </View>
          <View style={styles.cardDetails}>
            <Text style={styles.cardName}>মোঃ রফিকুল ইসলাম</Text>
            <Text style={{ fontSize: 12, color: '#bbf7d0', marginTop: 1 }}>পিতা: মৃত আব্দুল জলিল</Text>
            <Text style={{ fontSize: 11, color: '#e2e8f0', marginTop: 1 }}>ঠিকানা: এলেঙ্গা, কালিহাতী, টাঙ্গাইল</Text>
          </View>
        </View>

        <View style={styles.cardBottom}>
          <View>
            <Text style={styles.cardMetaLabel}>কেন্দ্র নং (CENTER NO)</Text>
            <Text style={styles.cardMetaVal}>কেন্দ্র-০৪ (এলেঙ্গা)</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.cardMetaLabel}>সঞ্চয়ী হিসাব নং (A/C NO)</Text>
            <Text style={styles.cardMetaVal}>এস-১০২৪</Text>
          </View>
        </View>
      </View>

      {/* Member Services Links */}
      <View style={styles.menuCard}>
        <View style={styles.menuItem}>
          <CreditCard size={18} color="#16a34a" />
          <Text style={styles.menuText}>Electronic Passbook Statement</Text>
        </View>

        <View style={styles.menuDivider} />

        <View style={styles.menuItem}>
          <Shield size={18} color="#16a34a" />
          <Text style={styles.menuText}>Loan Amortization Schedule</Text>
        </View>

        <View style={styles.menuDivider} />

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.replace('/')}
        >
          <LogOut size={18} color="#ef4444" />
          <Text style={[styles.menuText, { color: '#ef4444' }]}>Switch Mode / Logout</Text>
        </TouchableOpacity>
      </View>
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
  },
  idCard: {
    backgroundColor: '#052e16',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardOrg: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#86efac',
    letterSpacing: 0.5,
  },
  cardPill: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cardPillText: {
    fontSize: 9,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  cardAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardNameBn: {
    fontSize: 13,
    color: '#bbf7d0',
    marginTop: 1,
  },
  cardAcc: {
    fontSize: 12,
    color: '#e2e8f0',
    fontFamily: 'monospace',
    marginTop: 3,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#14532d',
  },
  cardMetaLabel: {
    fontSize: 9,
    color: '#86efac',
    fontWeight: 'bold',
  },
  cardMetaVal: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
    marginTop: 2,
  },
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
  },
});

