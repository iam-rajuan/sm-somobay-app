import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Shield, UserCheck, Smartphone } from 'lucide-react-native';

export default function RoleSelectorScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoBadge}>
            <Smartphone size={32} color="#ffffff" />
          </View>
          <Text style={styles.title}>সমিতি ম্যানেজমেন্ট সিস্টেম</Text>
          <Text style={styles.subtitle}>Somity Management System Mobile</Text>
          <Text style={styles.description}>
            Select your operating mode to access field collection or your personal member passbook.
          </Text>
        </View>

        {/* Mode Buttons */}
        <View style={styles.modesContainer}>
          {/* Field Officer Mode */}
          <TouchableOpacity
            style={[styles.card, styles.officerCard]}
            onPress={() => router.push('/(tabs)')}
            activeOpacity={0.8}
          >
            <View style={styles.cardIconOfficer}>
              <Shield size={24} color="#ffffff" />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Field Officer Mode</Text>
              <Text style={styles.cardSubtitle}>মাঠকর্মী সংগ্রহ ও কিস্তি আদায়</Text>
              <Text style={styles.cardDesc}>
                Somity-wise collection entry, offline sync, member search, SMS receipts.
              </Text>
            </View>
          </TouchableOpacity>

          {/* Member Self-Service Mode */}
          <TouchableOpacity
            style={[styles.card, styles.memberCard]}
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.8}
          >
            <View style={styles.cardIconMember}>
              <UserCheck size={24} color="#16a34a" />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Member Self-Service</Text>
              <Text style={styles.cardSubtitle}>সদস্য ব্যক্তিগত পাসবই ও ঋণ হিসাব</Text>
              <Text style={styles.cardDesc}>
                Live savings balance, DPS maturity, upcoming loan installments, digital ID card.
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Cooperative ERP v1.0 • Connected to Node/Express REST API
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#052e16',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#86efac',
    marginTop: 4,
    fontWeight: '600',
  },
  description: {
    fontSize: 12,
    color: '#cbd5e1',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 18,
    maxWidth: 280,
  },
  modesContainer: {
    gap: 16,
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  officerCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#16a34a',
  },
  memberCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#0ea5e9',
  },
  cardIconOfficer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardIconMember: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: '600',
    marginTop: 1,
  },
  cardDesc: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 6,
    lineHeight: 16,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'center',
  },
});

