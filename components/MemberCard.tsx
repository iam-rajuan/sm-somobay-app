import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User, Phone } from 'lucide-react-native';
import Colors from '../constants/Colors';

interface MemberCardProps {
  name: string;
  nameBangla?: string;
  accountNo: string;
  centerNo?: string;
  mobile: string;
  groupName: string;
  savingsBalance?: number;
  loanBalance?: number;
}

export const MemberCard: React.FC<MemberCardProps> = ({
  name,
  nameBangla,
  accountNo,
  centerNo,
  mobile,
  groupName,
  savingsBalance = 0,
  loanBalance = 0,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <User size={20} color="#ffffff" />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{nameBangla || name}</Text>
          <Text style={styles.accountNo}>
            হিসাব: {accountNo} {centerNo ? `• ${centerNo}` : `• ${groupName}`}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.balanceRow}>
        <View style={styles.balanceItem}>
          <Text style={styles.balanceLabel}>Savings (সঞ্চয়)</Text>
          <Text style={[styles.balanceValue, { color: Colors.light.primary }]}>
            ৳{savingsBalance.toLocaleString()}
          </Text>
        </View>

        <View style={styles.balanceItem}>
          <Text style={styles.balanceLabel}>Loan Due (বকেয়া ঋণ)</Text>
          <Text style={[styles.balanceValue, { color: Colors.light.danger }]}>
            ৳{loanBalance.toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  accountNo: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 10,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceItem: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 11,
    color: '#94a3b8',
    marginBottom: 2,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  balanceValue: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

