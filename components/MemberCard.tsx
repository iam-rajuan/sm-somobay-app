import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User, Phone, ChevronRight } from 'lucide-react-native';
import { useApp } from '../context/AppContext';

interface MemberCardProps {
  name: string;
  nameBangla?: string;
  accountNo: string;
  centerNo?: string;
  mobile: string;
  groupName: string;
  savingsBalance?: number;
  loanBalance?: number;
  onPress?: () => void;
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
  onPress,
}) => {
  const { language, colors, formatMoney } = useApp();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.75 : 1}
    >
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <User size={18} color="#ffffff" />
        </View>
        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.text }]}>
            {language === 'bn' ? (nameBangla || name) : name}
          </Text>
          <Text style={[styles.accountNo, { color: colors.textMuted }]}>
            {accountNo} • {centerNo || groupName} • {mobile}
          </Text>
        </View>
        {onPress && (
          <ChevronRight size={16} color={colors.textMuted} />
        )}
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <View style={styles.balanceRow}>
        <View style={styles.balanceItem}>
          <Text style={[styles.balanceLabel, { color: colors.textMuted }]}>
            {language === 'bn' ? 'সাধারণ সঞ্চয়' : 'Savings'}
          </Text>
          <Text style={[styles.balanceValue, { color: colors.primary }]}>
            {formatMoney(savingsBalance)}
          </Text>
        </View>

        <View style={styles.balanceItem}>
          <Text style={[styles.balanceLabel, { color: colors.textMuted }]}>
            {language === 'bn' ? 'বকেয়া ঋণ' : 'Loan Due'}
          </Text>
          <Text style={[styles.balanceValue, { color: loanBalance > 0 ? colors.danger : colors.textMuted }]}>
            {loanBalance > 0 ? formatMoney(loanBalance) : '—'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 13,
    marginVertical: 5,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  accountNo: {
    fontSize: 11,
    marginTop: 2,
    fontFamily: 'monospace',
  },
  divider: {
    height: 1,
    marginVertical: 9,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceItem: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 10,
    marginBottom: 2,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  balanceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});
