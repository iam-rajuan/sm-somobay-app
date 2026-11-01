import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { User, Shield, CreditCard, LogOut, CheckCircle2, BookOpen, FileSpreadsheet, ShieldCheck, Plus, Edit3, X, Save } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../../context/AppContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { language, colors, formatMoney, formatNum, activeMember, addPassbookEntry, updateCoverInfo } = useApp();
  const [activeTab, setActiveTab] = useState<'cover' | 'ledger'>('cover');

  // Input states for adding new record into ledger
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [entryDeposit, setEntryDeposit] = useState('200');
  const [entryWithdraw, setEntryWithdraw] = useState('0');
  const [entryLoanPaid, setEntryLoanPaid] = useState('1250');
  const [entryOfficerSig, setEntryOfficerSig] = useState('মাঠকর্মী (সিল)');

  // Input states for editing cover fields
  const [showEditCover, setShowEditCover] = useState(false);
  const [editName, setEditName] = useState(activeMember.name);
  const [editFather, setEditFather] = useState(activeMember.fatherName);
  const [editAddress, setEditAddress] = useState(activeMember.address);
  const [editCenter, setEditCenter] = useState(activeMember.centerNo);
  const [editAccNo, setEditAccNo] = useState(activeMember.accountNo);
  const [editSig, setEditSig] = useState(activeMember.officerSignature);

  // Compute page totals
  const totalDeposit = activeMember.ledgerRows.reduce((acc, r) => acc + r.savingsDeposit, 0);
  const totalWithdraw = activeMember.ledgerRows.reduce((acc, r) => acc + r.savingsWithdraw, 0);
  const totalLoanCollected = activeMember.ledgerRows.reduce((acc, r) => acc + r.loanCollected, 0);

  const handleSaveEntry = () => {
    addPassbookEntry({
      savingsDeposit: parseFloat(entryDeposit) || 0,
      savingsWithdraw: parseFloat(entryWithdraw) || 0,
      loanCollected: parseFloat(entryLoanPaid) || 0,
      officerSignature: entryOfficerSig,
    });
    setShowAddEntry(false);
    Alert.alert(
      language === 'bn' ? 'সফল!' : 'Success!',
      language === 'bn' ? 'পাশ বইয়ে নতুন লেনদেন রেকর্ড যুক্ত হয়েছে।' : 'New passbook record successfully posted.'
    );
  };

  const handleSaveCover = () => {
    updateCoverInfo({
      name: editName,
      fatherName: editFather,
      address: editAddress,
      centerNo: editCenter,
      accountNo: editAccNo,
      officerSignature: editSig,
    });
    setShowEditCover(false);
    Alert.alert(
      language === 'bn' ? 'হালনাগাদ সম্পন্ন' : 'Updated',
      language === 'bn' ? 'কভার পেজের তথ্য সফলভাবে হালনাগাদ হয়েছে।' : 'Cover page information updated successfully.'
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      {/* Tab Switcher: Passbook Cover vs Inside Ledger */}
      <View style={[styles.tabContainer, { backgroundColor: colors.cardMuted, borderColor: colors.border }]}>
        <TouchableOpacity
          style={[
            styles.tabBtn,
            activeTab === 'cover' && [styles.tabBtnActive, { backgroundColor: colors.card }],
          ]}
          onPress={() => setActiveTab('cover')}
        >
          <BookOpen size={14} color={activeTab === 'cover' ? colors.primary : colors.textMuted} />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'cover' ? colors.text : colors.textMuted },
            ]}
          >
            {language === 'bn' ? '১. বইয়ের কভার পেজ' : '1. Passbook Cover'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabBtn,
            activeTab === 'ledger' && [styles.tabBtnActive, { backgroundColor: colors.card }],
          ]}
          onPress={() => setActiveTab('ledger')}
        >
          <FileSpreadsheet size={14} color={activeTab === 'ledger' ? colors.primary : colors.textMuted} />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'ledger' ? colors.text : colors.textMuted },
            ]}
          >
            {language === 'bn' ? '২. ভেতরের পৃষ্ঠা (হিসাব)' : '2. Inner Ledger'}
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'cover' ? (
        /* ==========================================================
           1. PASSBOOK COVER PAGE (Exact Replica of Physical Book)
           ========================================================== */
        <View style={styles.coverBook}>
          <View style={styles.coverHeader}>
            <Text style={styles.coverGovt}>
              {language === 'bn' ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক অনুমোদিত' : 'Approved by Govt. of Bangladesh'}
            </Text>
            <Text style={styles.coverBrand}>
              {language === 'bn' ? 'সোশ্যাল ম্যানেজমেন্ট' : 'Social Management'}
            </Text>

            {/* Logo: S-M Handshake */}
            <View style={styles.coverLogoBadge}>
              <Text style={styles.coverLogoText}>S-M</Text>
              <Text style={styles.coverLogoIcon}>🤝</Text>
            </View>

            <Text style={styles.coverOrg}>
              {language === 'bn'
                ? 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ'
                : 'S.M. Khudra Sanchay O Rindan Samabay Samity Ltd.'}
            </Text>
            <Text style={styles.coverOffice}>
              {language === 'bn' ? 'প্রধান কার্যালয়: এলেঙ্গা, কালিহাতী, টাঙ্গাইল।' : 'Head Office: Elenga, Kalihati, Tangail.'}
            </Text>
            <View style={styles.coverRegPill}>
              <Text style={styles.coverRegText}>
                {language === 'bn' ? 'নিবন্ধন নম্বর: ট-ক ২৮৪০/২১' : 'Registration No: T-K 2840/21'}
              </Text>
            </View>

            <Text style={styles.coverBookTitle}>
              {language === 'bn' ? 'সঞ্চয় ও ঋণের পাশ বই' : 'Savings & Loan Passbook'}
            </Text>
          </View>

          {/* Action to Edit Cover Fields */}
          <View style={styles.coverEditRow}>
            <TouchableOpacity
              style={[styles.editCoverToggleBtn, { backgroundColor: '#14532d', borderColor: '#4ade80' }]}
              onPress={() => setShowEditCover(!showEditCover)}
            >
              <Edit3 size={12} color="#ffffff" />
              <Text style={styles.editCoverToggleText}>
                {showEditCover
                  ? (language === 'bn' ? 'ফর্ম বন্ধ করুন' : 'Close Editor')
                  : (language === 'bn' ? 'কভার পেজের তথ্য পূরণ / পরিবর্তন' : 'Fill / Edit Cover Fields')}
              </Text>
            </TouchableOpacity>
          </View>

          {showEditCover ? (
            /* Cover Fields Editor */
            <View style={[styles.coverFieldsBox, { backgroundColor: '#022c22' }]}>
              <Text style={{ color: '#86efac', fontWeight: 'bold', fontSize: 13, marginBottom: 8 }}>
                {language === 'bn' ? 'কভার পেজের ৬টি ফিল্ড এন্ট্রি করুন:' : 'Enter 6 Cover Page Fields:'}
              </Text>
              <View style={styles.inputFieldWrap}>
                <Text style={styles.inputFieldLabel}>১. সদস্য/সদস্যার নাম:</Text>
                <TextInput style={styles.coverInput} value={editName} onChangeText={setEditName} />
              </View>
              <View style={styles.inputFieldWrap}>
                <Text style={styles.inputFieldLabel}>২. পিতা/স্বামীর নাম:</Text>
                <TextInput style={styles.coverInput} value={editFather} onChangeText={setEditFather} />
              </View>
              <View style={styles.inputFieldWrap}>
                <Text style={styles.inputFieldLabel}>৩. ঠিকানা:</Text>
                <TextInput style={styles.coverInput} value={editAddress} onChangeText={setEditAddress} />
              </View>
              <View style={styles.inputFieldWrap}>
                <Text style={styles.inputFieldLabel}>৪. কেন্দ্র নং:</Text>
                <TextInput style={styles.coverInput} value={editCenter} onChangeText={setEditCenter} />
              </View>
              <View style={styles.inputFieldWrap}>
                <Text style={styles.inputFieldLabel}>৫. সঞ্চয়ী হিসাব নং:</Text>
                <TextInput style={styles.coverInput} value={editAccNo} onChangeText={setEditAccNo} />
              </View>
              <View style={styles.inputFieldWrap}>
                <Text style={styles.inputFieldLabel}>৬. কর্মকর্তার স্বাক্ষর:</Text>
                <TextInput style={styles.coverInput} value={editSig} onChangeText={setEditSig} />
              </View>
              <TouchableOpacity style={styles.saveCoverBtn} onPress={handleSaveCover}>
                <Save size={14} color="#ffffff" />
                <Text style={styles.saveCoverBtnText}>
                  {language === 'bn' ? 'সংরক্ষণ করুন' : 'Save Changes'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* 6 Display Fields */
            <View style={styles.coverFieldsBox}>
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>
                  {language === 'bn' ? '১. সদস্য / সদস্যার নাম:' : '1. Member Name:'}
                </Text>
                <Text style={styles.fieldValueBold}>
                  {language === 'bn' ? activeMember.name : activeMember.nameEn}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>
                  {language === 'bn' ? '২. পিতা / স্বামীর নাম:' : '2. Father / Husband:'}
                </Text>
                <Text style={styles.fieldValue}>
                  {language === 'bn' ? activeMember.fatherName : activeMember.fatherNameEn}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>
                  {language === 'bn' ? '৩. ঠিকানা:' : '3. Address:'}
                </Text>
                <Text style={styles.fieldValue}>
                  {language === 'bn' ? activeMember.address : activeMember.addressEn}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>
                  {language === 'bn' ? '৪. কেন্দ্র নং:' : '4. Center No:'}
                </Text>
                <Text style={styles.fieldValue}>
                  {language === 'bn' ? activeMember.centerNo : activeMember.centerNoEn}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>
                  {language === 'bn' ? '৫. সঞ্চয়ী হিসাব নং:' : '5. Savings A/C No:'}
                </Text>
                <Text style={styles.fieldValueAcc}>
                  {activeMember.accountNo}
                </Text>
              </View>

              <View style={[styles.fieldRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.fieldLabel}>
                  {language === 'bn' ? '৬. কর্মকর্তার স্বাক্ষর:' : '6. Officer Signature:'}
                </Text>
                <Text style={styles.fieldValueSig}>
                  {activeMember.officerSignature}
                </Text>
              </View>
            </View>
          )}
        </View>
      ) : (
        /* ==========================================================
           2. INNER SPREAD (8 Loan Terms + 3-Part Ledger Table)
           ========================================================== */
        <View style={styles.ledgerSection}>
          {/* Upper Section: 8 Loan Parameters */}
          <View style={[styles.loanTermsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.loanTermsHeader}>
              <ShieldCheck size={16} color={colors.primary} />
              <Text style={[styles.loanTermsTitle, { color: colors.text }]}>
                {language === 'bn' ? 'ভেতরের পৃষ্ঠার ঋণের তথ্য (৮টি প্যারামিটার)' : 'Inside Page: Loan Information'}
              </Text>
            </View>

            <View style={styles.loanTermsGrid}>
              <View style={[styles.termItem, { backgroundColor: colors.cardMuted }]}>
                <Text style={[styles.termLabel, { color: colors.textMuted }]}>
                  {language === 'bn' ? '১. ঋণের পরিমাণ' : '1. Loan Amount'}
                </Text>
                <Text style={[styles.termVal, { color: colors.primary }]}>
                  {formatMoney(activeMember.loanTerms.loanAmount)}
                </Text>
              </View>

              <View style={[styles.termItem, { backgroundColor: colors.cardMuted }]}>
                <Text style={[styles.termLabel, { color: colors.textMuted }]}>
                  {language === 'bn' ? '২. বিতরণের তারিখ' : '2. Disburse Date'}
                </Text>
                <Text style={[styles.termVal, { color: colors.text }]}>
                  {formatNum(activeMember.loanTerms.disburseDate)}
                </Text>
              </View>

              <View style={[styles.termItem, { backgroundColor: colors.cardMuted }]}>
                <Text style={[styles.termLabel, { color: colors.textMuted }]}>
                  {language === 'bn' ? '৩. কিস্তির সংখ্যা' : '3. Installments'}
                </Text>
                <Text style={[styles.termVal, { color: colors.text }]}>
                  {formatNum(activeMember.loanTerms.installmentCount)} {language === 'bn' ? 'টি' : 'Inst.'}
                </Text>
              </View>

              <View style={[styles.termItem, { backgroundColor: colors.cardMuted }]}>
                <Text style={[styles.termLabel, { color: colors.textMuted }]}>
                  {language === 'bn' ? '৪. ঋণের ফরম নং' : '4. Form No'}
                </Text>
                <Text style={[styles.termVal, { color: colors.text }]}>
                  {activeMember.loanTerms.formNo}
                </Text>
              </View>

              <View style={[styles.termItem, { backgroundColor: colors.cardMuted }]}>
                <Text style={[styles.termLabel, { color: colors.textMuted }]}>
                  {language === 'bn' ? '৫. প্রতি কিস্তি' : '5. Per Inst.'}
                </Text>
                <Text style={[styles.termVal, { color: colors.primary }]}>
                  {formatMoney(activeMember.loanTerms.perInstallment)}
                </Text>
              </View>

              <View style={[styles.termItem, { backgroundColor: colors.cardMuted }]}>
                <Text style={[styles.termLabel, { color: colors.textMuted }]}>
                  {language === 'bn' ? '৭. সাপ্তাহিক কিস্তি' : '7. Weekly Inst.'}
                </Text>
                <Text style={[styles.termVal, { color: colors.primary }]}>
                  {formatMoney(activeMember.loanTerms.weeklyInstallment)}
                </Text>
              </View>
            </View>
          </View>

          {/* 3-Part Ledger Entries with ADD RECORD INPUT */}
          <View style={[styles.tableContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.tableTitle, { color: colors.text }]}>
                {language === 'bn' ? '৩-অংশ হিসাব খতিয়ান (সঞ্চয়, ঋণ ও সিল)' : '3-Part Passbook Ledger'}
              </Text>
              <TouchableOpacity
                style={[styles.addEntryBtn, { backgroundColor: colors.primary }]}
                onPress={() => setShowAddEntry(!showAddEntry)}
              >
                {showAddEntry ? (
                  <X size={14} color="#ffffff" />
                ) : (
                  <Plus size={14} color="#ffffff" />
                )}
                <Text style={styles.addEntryBtnText}>
                  {showAddEntry
                    ? (language === 'bn' ? 'বাতিল' : 'Cancel')
                    : (language === 'bn' ? '+ বইয়ে এন্ট্রি লিখুন' : '+ Record Entry')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Direct Input Card for writing a record into the book */}
            {showAddEntry && (
              <View style={[styles.addEntryForm, { backgroundColor: colors.cardMuted, borderColor: colors.border }]}>
                <Text style={[styles.formHeading, { color: colors.primary }]}>
                  {language === 'bn' ? 'বইয়ে নতুন হিসাব রেকর্ড ইনপুট করুন:' : 'Input New Record into Passbook:'}
                </Text>

                <View style={styles.inputRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
                      {language === 'bn' ? 'ক. সঞ্চয় জমা (৳):' : 'A. Savings In (৳):'}
                    </Text>
                    <TextInput
                      style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                      keyboardType="numeric"
                      value={entryDeposit}
                      onChangeText={setEntryDeposit}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
                      {language === 'bn' ? 'সঞ্চয় উত্তোলন (৳):' : 'Savings Out (৳):'}
                    </Text>
                    <TextInput
                      style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                      keyboardType="numeric"
                      value={entryWithdraw}
                      onChangeText={setEntryWithdraw}
                    />
                  </View>
                </View>

                <View style={styles.inputRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
                      {language === 'bn' ? 'খ. ঋণ কিস্তি আদায় (৳):' : 'B. Loan Paid (৳):'}
                    </Text>
                    <TextInput
                      style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                      keyboardType="numeric"
                      value={entryLoanPaid}
                      onChangeText={setEntryLoanPaid}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
                      {language === 'bn' ? 'গ. কর্মকর্তার স্বাক্ষর:' : 'C. Officer Sig:'}
                    </Text>
                    <TextInput
                      style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                      value={entryOfficerSig}
                      onChangeText={setEntryOfficerSig}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.saveEntryBtn, { backgroundColor: colors.primary }]}
                  onPress={handleSaveEntry}
                >
                  <Save size={14} color="#ffffff" />
                  <Text style={styles.saveEntryBtnText}>
                    {language === 'bn' ? '✓ বইয়ে রেকর্ড সংরক্ষণ করুন' : '✓ Post Entry into Passbook'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* List of Entries */}
            {activeMember.ledgerRows.map((row, idx) => (
              <View key={idx} style={[styles.ledgerCard, { borderColor: colors.border, backgroundColor: colors.card }]}>
                {/* Date & Verification strip */}
                <View style={styles.entryTop}>
                  <Text style={[styles.entryDate, { color: colors.textMuted }]}>
                    📅 {formatNum(row.date)}
                  </Text>
                  <Text style={[styles.entrySig, { color: colors.primary }]}>
                    ✓ {row.officerSignature}
                  </Text>
                </View>

                {/* 2-Column Split: Savings vs Loan */}
                <View style={styles.entrySplit}>
                  {/* Part A: Savings */}
                  <View style={[styles.splitCol, { backgroundColor: colors.cardMuted, borderColor: colors.border }]}>
                    <Text style={[styles.splitColTitle, { color: colors.primary }]}>
                      {language === 'bn' ? 'ক. সঞ্চয় হিসাব' : 'A. Savings'}
                    </Text>
                    <View style={styles.splitRow}>
                      <Text style={[styles.splitLabel, { color: colors.textMuted }]}>
                        {language === 'bn' ? 'জমা:' : 'Deposit:'}
                      </Text>
                      <Text style={[styles.splitVal, { color: colors.primary }]}>
                        {row.savingsDeposit > 0 ? formatMoney(row.savingsDeposit) : '—'}
                      </Text>
                    </View>
                    <View style={styles.splitRow}>
                      <Text style={[styles.splitLabel, { color: colors.textMuted }]}>
                        {language === 'bn' ? 'উত্তোলন:' : 'Withdraw:'}
                      </Text>
                      <Text style={[styles.splitVal, { color: colors.danger }]}>
                        {row.savingsWithdraw > 0 ? formatMoney(row.savingsWithdraw) : '—'}
                      </Text>
                    </View>
                    <View style={[styles.splitRow, { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 4 }]}>
                      <Text style={[styles.splitLabelBold, { color: colors.text }]}>
                        {language === 'bn' ? 'সমাপনী স্থিতি:' : 'Balance:'}
                      </Text>
                      <Text style={[styles.splitValBold, { color: colors.text }]}>
                        {formatMoney(row.savingsClosingBalance)}
                      </Text>
                    </View>
                  </View>

                  {/* Part B: Loan */}
                  <View style={[styles.splitCol, { backgroundColor: colors.cardMuted, borderColor: colors.border }]}>
                    <Text style={[styles.splitColTitle, { color: colors.danger }]}>
                      {language === 'bn' ? 'খ. ঋণের হিসাব' : 'B. Loan'}
                    </Text>
                    <View style={styles.splitRow}>
                      <Text style={[styles.splitLabel, { color: colors.textMuted }]}>
                        {language === 'bn' ? 'কিস্তি নং:' : 'Inst No:'}
                      </Text>
                      <Text style={[styles.splitVal, { color: colors.text }]}>
                        #{formatNum(row.loanInstallmentNo)}
                      </Text>
                    </View>
                    <View style={styles.splitRow}>
                      <Text style={[styles.splitLabel, { color: colors.textMuted }]}>
                        {language === 'bn' ? 'আদায়:' : 'Paid:'}
                      </Text>
                      <Text style={[styles.splitVal, { color: colors.primary }]}>
                        {formatMoney(row.loanCollected)}
                      </Text>
                    </View>
                    <View style={[styles.splitRow, { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 4 }]}>
                      <Text style={[styles.splitLabelBold, { color: colors.text }]}>
                        {language === 'bn' ? 'অবশিষ্ট ঋণ:' : 'Due:'}
                      </Text>
                      <Text style={[styles.splitValBold, { color: colors.danger }]}>
                        {formatMoney(row.loanRemainingBalance)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}

            {/* Bottom Total Summary */}
            <View style={[styles.totalSummaryBox, { backgroundColor: colors.cardMuted, borderColor: colors.border }]}>
              <Text style={[styles.totalTitle, { color: colors.text }]}>
                {language === 'bn' ? 'পৃষ্ঠার সর্বমোট আদায় ও স্থিতি:' : 'Page Total Summary:'}
              </Text>
              <View style={styles.totalRow}>
                <Text style={[styles.totalText, { color: colors.textSecondary }]}>
                  {language === 'bn' ? 'মোট সঞ্চয় জমা:' : 'Total Savings In:'}
                </Text>
                <Text style={[styles.totalTextBold, { color: colors.primary }]}>
                  {formatMoney(totalDeposit)}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={[styles.totalText, { color: colors.textSecondary }]}>
                  {language === 'bn' ? 'মোট ঋণ আদায়:' : 'Total Loan Paid:'}
                </Text>
                <Text style={[styles.totalTextBold, { color: colors.primary }]}>
                  {formatMoney(totalLoanCollected)}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={[styles.totalText, { color: colors.textSecondary }]}>
                  {language === 'bn' ? 'বর্তমান বকেয়া ঋণ:' : 'Current Loan Due:'}
                </Text>
                <Text style={[styles.totalTextBold, { color: colors.danger }]}>
                  {formatMoney(activeMember.loanTerms.outstandingDue)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Switch Member / Logout Button */}
      <TouchableOpacity
        style={[styles.logoutBtn, { borderColor: colors.border, backgroundColor: colors.card }]}
        onPress={() => router.replace('/')}
      >
        <LogOut size={16} color={colors.danger} />
        <Text style={[styles.logoutText, { color: colors.danger }]}>
          {language === 'bn' ? 'লগআউট / অন্য একাউন্ট দেখুন' : 'Switch Account / Logout'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 36,
  },
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    padding: 4,
    marginBottom: 16,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
  },
  tabBtnActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  coverBook: {
    backgroundColor: '#052e16',
    borderRadius: 14,
    padding: 18,
    borderWidth: 3,
    borderColor: '#15803d',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  coverHeader: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#166534',
    paddingBottom: 16,
  },
  coverGovt: {
    fontSize: 10,
    color: '#86efac',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  coverBrand: {
    fontSize: 11,
    color: '#bbf7d0',
    fontWeight: 'bold',
    marginTop: 2,
    letterSpacing: 1,
  },
  coverLogoBadge: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#4ade80',
  },
  coverLogoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#052e16',
  },
  coverLogoIcon: {
    fontSize: 14,
    marginTop: 1,
  },
  coverOrg: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 2,
  },
  coverOffice: {
    fontSize: 11,
    color: '#cbd5e1',
    marginTop: 3,
  },
  coverRegPill: {
    backgroundColor: '#166534',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 8,
  },
  coverRegText: {
    fontSize: 10,
    color: '#dcfce7',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  coverBookTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fef08a',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  coverEditRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  editCoverToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  editCoverToggleText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  coverFieldsBox: {
    backgroundColor: '#022c22',
    borderRadius: 10,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#166534',
  },
  inputFieldWrap: {
    marginBottom: 8,
  },
  inputFieldLabel: {
    fontSize: 11,
    color: '#86efac',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  coverInput: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: '#166534',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 38,
    color: '#ffffff',
    fontSize: 13,
  },
  saveCoverBtn: {
    backgroundColor: '#16a34a',
    borderRadius: 6,
    height: 38,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  saveCoverBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  fieldRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#064e3b',
  },
  fieldLabel: {
    fontSize: 10,
    color: '#86efac',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  fieldValueBold: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 2,
  },
  fieldValue: {
    fontSize: 13,
    color: '#e2e8f0',
    marginTop: 2,
  },
  fieldValueAcc: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fef08a',
    fontFamily: 'monospace',
    marginTop: 2,
  },
  fieldValueSig: {
    fontSize: 11,
    color: '#a7f3d0',
    fontStyle: 'italic',
    marginTop: 2,
  },
  ledgerSection: {
    gap: 14,
  },
  loanTermsCard: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
  },
  loanTermsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  loanTermsTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  loanTermsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  termItem: {
    width: '48%',
    padding: 8,
    borderRadius: 6,
  },
  termLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  termVal: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  tableContainer: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    gap: 10,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  addEntryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  addEntryBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  addEntryForm: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  formHeading: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  textInput: {
    height: 38,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 8,
    fontSize: 13,
  },
  saveEntryBtn: {
    height: 38,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  saveEntryBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ledgerCard: {
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    gap: 8,
  },
  entryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryDate: {
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  entrySig: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  entrySplit: {
    flexDirection: 'row',
    gap: 8,
  },
  splitCol: {
    flex: 1,
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    gap: 3,
  },
  splitColTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  splitLabel: {
    fontSize: 10,
  },
  splitVal: {
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  splitLabelBold: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  splitValBold: {
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  totalSummaryBox: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
    marginTop: 4,
  },
  totalTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 11,
  },
  totalTextBold: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 14,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});
