import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { CheckSquare, Square, Send, CheckCircle2, UserCheck, ShieldCheck } from 'lucide-react-native';
import { CollectionInput } from '../../components/CollectionInput';
import { useApp } from '../../context/AppContext';

export default function CollectionsScreen() {
  const { language, colors, formatMoney, formatNum, activeMember, addPassbookEntry, membersList, selectMemberByAccount } = useApp();
  const [savingsAmount, setSavingsAmount] = useState('200');
  const [loanAmount, setLoanAmount] = useState(String(activeMember.loanTerms.perInstallment || 0));
  const [dpsAmount, setDpsAmount] = useState('500');
  const [sendSms, setSendSms] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    setLoanAmount(String(activeMember.loanTerms.perInstallment || 0));
    setSavingsAmount('200');
  }, [activeMember.accountNo]);

  const totalCollection =
    (parseFloat(savingsAmount) || 0) +
    (parseFloat(loanAmount) || 0) +
    (parseFloat(dpsAmount) || 0);

  const handleSubmit = () => {
    setSubmitted(true);
    addPassbookEntry({
      savingsDeposit: parseFloat(savingsAmount) || 0,
      loanCollected: parseFloat(loanAmount) || 0,
      officerSignature: 'মাঠকর্মী (সিল)',
    });

    setTimeout(() => {
      setSubmitted(false);
      Alert.alert(
        language === 'bn' ? 'আদায় পাশ বইয়ে সংরক্ষিত!' : 'Passbook Updated!',
        language === 'bn'
          ? `${formatMoney(totalCollection)} সফলভাবে আদায় হয়েছে এবং পাশ বইয়ের খতিয়ানে নতুন রেকর্ড যুক্ত হয়েছে।`
          : `Successfully recorded ${formatMoney(totalCollection)} directly into member digital passbook.`
      );
    }, 400);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      {/* Fast Member Selector Switcher */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.memberChipsScroll}>
        <View style={styles.memberChipsRow}>
          {membersList.map((m) => {
            const isSelected = m.accountNo === activeMember.accountNo;
            return (
              <TouchableOpacity
                key={m.accountNo}
                onPress={() => selectMemberByAccount(m.accountNo)}
                style={[
                  styles.memberChip,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.card,
                    borderColor: isSelected ? colors.primary : colors.border,
                  },
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.memberChipText,
                    { color: isSelected ? '#ffffff' : colors.text },
                  ]}
                >
                  {m.accountNo} • {language === 'bn' ? m.name.split(' ')[0] : m.nameEn.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Member Identity Banner */}
      <View style={[styles.memberBanner, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.bannerTop}>
          <View style={[styles.badgePill, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>
              {language === 'bn' ? 'সঞ্চয় ও ঋণের পাশ বই • আদায় খতিয়ান' : 'Passbook Collection Voucher'}
            </Text>
          </View>
          <Text style={[styles.accountBadge, { color: colors.textMuted }]}>
            {activeMember.accountNo}
          </Text>
        </View>

        <Text style={[styles.memberName, { color: colors.text }]}>
          {language === 'bn' ? activeMember.name : activeMember.nameEn}
        </Text>

        <Text style={[styles.memberAccount, { color: colors.textMuted }]}>
          {language === 'bn' ? activeMember.centerNo : activeMember.centerNoEn} • {activeMember.mobile}
        </Text>

        {/* Balances Strip matching Screenshot 1 */}
        <View style={[styles.balanceStrip, { backgroundColor: colors.cardMuted, borderColor: colors.border }]}>
          <View style={styles.balCol}>
            <Text style={[styles.balLabel, { color: colors.textMuted }]}>
              {language === 'bn' ? 'সাধারণ সঞ্চয়' : 'Savings'}
            </Text>
            <Text style={[styles.balVal, { color: colors.primary }]}>
              {formatMoney(activeMember.ledgerRows[0]?.savingsClosingBalance || 13400)}
            </Text>
          </View>
          <View style={styles.balCol}>
            <Text style={[styles.balLabel, { color: colors.textMuted }]}>
              {language === 'bn' ? 'ঋণ বকেয়া' : 'Loan Due'}
            </Text>
            <Text style={[styles.balVal, { color: colors.danger }]}>
              {formatMoney(activeMember.loanTerms.outstandingDue || 28750)}
            </Text>
          </View>
          <View style={styles.balCol}>
            <Text style={[styles.balLabel, { color: colors.textMuted }]}>
              {language === 'bn' ? 'প্রতি কিস্তি' : 'Per Inst.'}
            </Text>
            <Text style={[styles.balVal, { color: colors.text }]}>
              {formatMoney(activeMember.loanTerms.perInstallment || 1250)}
            </Text>
          </View>
        </View>
      </View>

      {/* Collection Form */}
      <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.formTitle, { color: colors.text }]}>
          {language === 'bn' ? 'আদায়ের অংক এন্ট্রি করুন' : 'Enter Collection Amounts'}
        </Text>

        {/* 1. General Savings */}
        <CollectionInput
          label={language === 'bn' ? '১. সাধারণ সঞ্চয় জমা (General Savings)' : '1. General Savings Deposit'}
          value={savingsAmount}
          onChangeText={setSavingsAmount}
        />
        {/* Savings Quick Presets */}
        <View style={styles.presetsRow}>
          {[50, 100, 200, 500].map((amt) => (
            <TouchableOpacity
              key={amt}
              onPress={() => setSavingsAmount(String(amt))}
              style={[styles.presetChip, { borderColor: colors.border, backgroundColor: colors.cardMuted }]}
            >
              <Text style={[styles.presetChipText, { color: colors.textSecondary }]}>
                +{formatNum(amt)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 2. Micro-loan installment */}
        <CollectionInput
          label={language === 'bn' ? '২. ক্ষুদ্রঋণ কিস্তি আদায় (Loan Installment)' : '2. Micro-Loan Installment'}
          value={loanAmount}
          onChangeText={setLoanAmount}
        />
        {/* Loan Installment Presets */}
        <View style={styles.presetsRow}>
          <TouchableOpacity
            onPress={() => setLoanAmount(String(activeMember.loanTerms.perInstallment || 0))}
            style={[styles.presetChip, { borderColor: colors.border, backgroundColor: colors.cardMuted }]}
          >
            <Text style={[styles.presetChipText, { color: colors.primary }]}>
              {language === 'bn' ? 'নির্ধারিত' : 'Exact'} ({formatMoney(activeMember.loanTerms.perInstallment || 0)})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setLoanAmount(String((activeMember.loanTerms.perInstallment || 0) * 2))}
            style={[styles.presetChip, { borderColor: colors.border, backgroundColor: colors.cardMuted }]}
          >
            <Text style={[styles.presetChipText, { color: colors.textSecondary }]}>
              {language === 'bn' ? '২ কিস্তি' : 'Double'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setLoanAmount('0')}
            style={[styles.presetChip, { borderColor: colors.border, backgroundColor: colors.cardMuted }]}
          >
            <Text style={[styles.presetChipText, { color: colors.danger }]}>
              {language === 'bn' ? 'বাদ (০)' : 'Skip (0)'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 3. DPS */}
        <CollectionInput
          label={language === 'bn' ? '৩. ডিপিএস মাসিক কিস্তি (DPS Deposit)' : '3. DPS Monthly Deposit'}
          value={dpsAmount}
          onChangeText={setDpsAmount}
        />

        {/* SMS receipt option */}
        <TouchableOpacity
          style={styles.smsOption}
          onPress={() => setSendSms(!sendSms)}
          activeOpacity={0.8}
        >
          {sendSms ? (
            <CheckSquare size={20} color={colors.primary} />
          ) : (
            <Square size={20} color={colors.textMuted} />
          )}
          <Text style={[styles.smsText, { color: colors.textSecondary }]}>
            {language === 'bn'
              ? 'সদস্যের মোবাইলে তাৎক্ষণিক কনফার্মেশন এসএমএস প্রেরণ'
              : 'Send instant SMS collection receipt to member'}
          </Text>
        </TouchableOpacity>

        {/* Total Summary */}
        <View style={[styles.totalBox, { backgroundColor: colors.cardMuted, borderColor: colors.border }]}>
          <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>
            {language === 'bn' ? 'সর্বমোট আদায় (Grand Total):' : 'Grand Total Received:'}
          </Text>
          <Text style={[styles.totalValue, { color: colors.primary }]}>
            {formatMoney(totalCollection)}
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitBtn, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={submitted}
        >
          <Send size={18} color="#ffffff" />
          <Text style={styles.submitBtnText}>
            {submitted
              ? (language === 'bn' ? 'সংরক্ষণ হচ্ছে...' : 'Saving...')
              : (language === 'bn' ? '✓ আদায় এন্ট্রি নিশ্চিত করুন' : '✓ Confirm Collection Entry')}
          </Text>
        </TouchableOpacity>
      </View>
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
  memberBanner: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  bannerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  accountBadge: {
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  memberName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  memberAccount: {
    fontSize: 12,
    marginTop: 4,
  },
  balanceStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 10,
  },
  balCol: {
    alignItems: 'center',
    flex: 1,
  },
  balLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 2,
  },
  balVal: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  formCard: {
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  formTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  smsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
    marginBottom: 14,
  },
  smsText: {
    fontSize: 12,
    flex: 1,
  },
  totalBox: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  submitBtn: {
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  memberChipsScroll: {
    marginBottom: 12,
  },
  memberChipsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  memberChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  memberChipText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  presetsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  presetChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  presetChipText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
