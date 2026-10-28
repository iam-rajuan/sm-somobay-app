import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { CheckSquare, Square, Send, CheckCircle2 } from 'lucide-react-native';
import { CollectionInput } from '../../components/CollectionInput';
import Colors from '../../constants/Colors';

export default function CollectionsScreen() {
  const [savingsAmount, setSavingsAmount] = useState('200');
  const [loanAmount, setLoanAmount] = useState('1500');
  const [dpsAmount, setDpsAmount] = useState('1000');
  const [sendSms, setSendSms] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const totalCollection =
    (parseFloat(savingsAmount) || 0) +
    (parseFloat(loanAmount) || 0) +
    (parseFloat(dpsAmount) || 0);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      Alert.alert(
        'Collection Recorded',
        `৳${totalCollection} recorded successfully. SMS receipt queued for member.`
      );
    }, 500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.memberBanner}>
        <Text style={styles.memberLabel}>COLLECTION FOR</Text>
        <Text style={styles.memberName}>Md. Rafiqul Islam (রফিকুল)</Text>
        <Text style={styles.memberAccount}>Account: M-10023 • Mobile: 01712-345678</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Enter Collection Amounts</Text>

        <CollectionInput
          label="General Savings Deposit (সাধারণ সঞ্চয়)"
          value={savingsAmount}
          onChangeText={setSavingsAmount}
        />

        <CollectionInput
          label="Micro-Loan Installment (ঋণের কিস্তি)"
          value={loanAmount}
          onChangeText={setLoanAmount}
        />

        <CollectionInput
          label="DPS Monthly Deposit (ডিপিএস কিস্তি)"
          value={dpsAmount}
          onChangeText={setDpsAmount}
        />

        <TouchableOpacity
          style={styles.smsOption}
          onPress={() => setSendSms(!sendSms)}
          activeOpacity={0.8}
        >
          {sendSms ? (
            <CheckSquare size={20} color="#16a34a" />
          ) : (
            <Square size={20} color="#94a3b8" />
          )}
          <Text style={styles.smsText}>Send instant SMS receipt to member phone</Text>
        </TouchableOpacity>

        {/* Total Summary */}
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total Received (সর্বমোট আদায়):</Text>
          <Text style={styles.totalValue}>৳{totalCollection.toLocaleString()}</Text>
        </View>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Send size={18} color="#ffffff" />
          <Text style={styles.submitBtnText}>Post Collection Entry</Text>
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
    paddingBottom: 32,
  },
  memberBanner: {
    backgroundColor: '#14532d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  memberLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#86efac',
    letterSpacing: 0.5,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 2,
  },
  memberAccount: {
    fontSize: 12,
    color: '#bbf7d0',
    marginTop: 2,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  formTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
  },
  smsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 12,
  },
  smsText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  totalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  submitBtn: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: '#16a34a',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

