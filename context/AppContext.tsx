import React, { createContext, useContext, useState } from 'react';
import Colors from '../constants/Colors';

export type Language = 'bn' | 'en';
export type Theme = 'light' | 'dark';

export interface PassbookData {
  accountNo: string;
  name: string;
  nameEn: string;
  fatherName: string;
  fatherNameEn: string;
  address: string;
  addressEn: string;
  centerNo: string;
  centerNoEn: string;
  mobile: string;
  officerSignature: string;
  joiningDate: string;
  loanTerms: {
    loanAmount: number;
    disburseDate: string;
    installmentCount: number;
    formNo: string;
    perInstallment: number;
    dailyInstallment: number;
    weeklyInstallment: number;
    monthlyInstallment: number;
    outstandingDue: number;
  };
  ledgerRows: {
    date: string;
    savingsDeposit: number;
    savingsWithdraw: number;
    savingsProfit: number;
    savingsClosingBalance: number;
    loanInstallmentNo: number;
    loanCollected: number;
    loanRemainingBalance: number;
    officerSignature: string;
  }[];
}

export const DEFAULT_MEMBER: PassbookData = {
  accountNo: 'SM-2840-001',
  name: 'মোঃ আব্দুল করিম',
  nameEn: 'Md. Abdul Karim',
  fatherName: 'মরহুম মোঃ রহিম উদ্দিন',
  fatherNameEn: 'Late Md. Rahim Uddin',
  address: 'এলেঙ্গা উত্তরপাড়া, কালিহাতী, টাঙ্গাইল',
  addressEn: 'Elenga Uttarpara, Kalihati, Tangail',
  centerNo: 'কেন্দ্র নং- ০১ (এলেঙ্গা সমিতি)',
  centerNoEn: 'Center No- 01 (Elenga Somity)',
  mobile: '01711-223344',
  officerSignature: 'স্বাক্ষরিত (মাঠ কর্মকর্তা)',
  joiningDate: '2022-01-15',
  loanTerms: {
    loanAmount: 50000,
    disburseDate: '2026-05-10',
    installmentCount: 46,
    formNo: 'SM-LN-089',
    perInstallment: 1250,
    dailyInstallment: 0,
    weeklyInstallment: 1250,
    monthlyInstallment: 0,
    outstandingDue: 28750,
  },
  ledgerRows: [
    {
      date: '2026-10-28',
      savingsDeposit: 200,
      savingsWithdraw: 0,
      savingsProfit: 0,
      savingsClosingBalance: 13400,
      loanInstallmentNo: 23,
      loanCollected: 1250,
      loanRemainingBalance: 28750,
      officerSignature: 'করিম (সিল)',
    },
    {
      date: '2026-10-21',
      savingsDeposit: 200,
      savingsWithdraw: 0,
      savingsProfit: 0,
      savingsClosingBalance: 13200,
      loanInstallmentNo: 22,
      loanCollected: 1250,
      loanRemainingBalance: 30000,
      officerSignature: 'করিম (সিল)',
    },
    {
      date: '2026-10-14',
      savingsDeposit: 0,
      savingsWithdraw: 1000,
      savingsProfit: 0,
      savingsClosingBalance: 13000,
      loanInstallmentNo: 21,
      loanCollected: 1250,
      loanRemainingBalance: 31250,
      officerSignature: 'করিম (সিল)',
    },
    {
      date: '2026-10-07',
      savingsDeposit: 200,
      savingsWithdraw: 0,
      savingsProfit: 0,
      savingsClosingBalance: 14000,
      loanInstallmentNo: 20,
      loanCollected: 1250,
      loanRemainingBalance: 32500,
      officerSignature: 'করিম (সিল)',
    },
    {
      date: '2026-09-30',
      savingsDeposit: 500,
      savingsWithdraw: 0,
      savingsProfit: 150,
      savingsClosingBalance: 13800,
      loanInstallmentNo: 19,
      loanCollected: 1250,
      loanRemainingBalance: 33750,
      officerSignature: 'করিম (সিল)',
    },
  ],
};

export const MOCK_MEMBERS: Record<string, PassbookData> = {
  'SM-2840-001': DEFAULT_MEMBER,
  'SM-2840-002': {
    accountNo: 'SM-2840-002',
    name: 'মোছাঃ রহিমা বেগম',
    nameEn: 'Mst. Rahima Begum',
    fatherName: 'মোঃ আব্দুল হক (স্বামী)',
    fatherNameEn: 'Md. Abdul Haque (Spouse)',
    address: 'গ্রাম: সিলিমপুর, ডাকঘর: কালিহাতী, টাঙ্গাইল',
    addressEn: 'Village: Silimpur, Post: Kalihati, Tangail',
    centerNo: 'কেন্দ্র নং- ০১ (এলেঙ্গা সমিতি)',
    centerNoEn: 'Center No- 01 (Elenga Somity)',
    mobile: '01822-334455',
    officerSignature: 'স্বাক্ষরিত (মাঠ কর্মকর্তা)',
    joiningDate: '2021-03-10',
    loanTerms: {
      loanAmount: 80000,
      disburseDate: '2026-03-15',
      installmentCount: 50,
      formNo: 'SM-LN-042',
      perInstallment: 1840,
      dailyInstallment: 0,
      weeklyInstallment: 1840,
      monthlyInstallment: 0,
      outstandingDue: 27600,
    },
    ledgerRows: [
      {
        date: '2026-10-26',
        savingsDeposit: 200,
        savingsWithdraw: 0,
        savingsProfit: 0,
        savingsClosingBalance: 18800,
        loanInstallmentNo: 35,
        loanCollected: 1840,
        loanRemainingBalance: 27600,
        officerSignature: 'রহমান (সিল)',
      },
      {
        date: '2026-10-19',
        savingsDeposit: 200,
        savingsWithdraw: 0,
        savingsProfit: 0,
        savingsClosingBalance: 18600,
        loanInstallmentNo: 34,
        loanCollected: 1840,
        loanRemainingBalance: 29440,
        officerSignature: 'রহমান (সিল)',
      },
    ],
  },
  'SM-2840-003': {
    accountNo: 'SM-2840-003',
    name: 'কবীর হোসেন',
    nameEn: 'Kabir Hossain',
    fatherName: 'মরহুম শমসের আলী',
    fatherNameEn: 'Late Shamsher Ali',
    address: 'এলেঙ্গা বাসস্ট্যান্ড, কালিহাতী, টাঙ্গাইল',
    addressEn: 'Elenga Bus Stand, Kalihati, Tangail',
    centerNo: 'কেন্দ্র নং- ০১ (এলেঙ্গা সমিতি)',
    centerNoEn: 'Center No- 01 (Elenga Somity)',
    mobile: '01911-223344',
    officerSignature: 'স্বাক্ষরিত (মাঠ কর্মকর্তা)',
    joiningDate: '2023-01-20',
    loanTerms: {
      loanAmount: 0,
      disburseDate: '—',
      installmentCount: 0,
      formNo: '—',
      perInstallment: 0,
      dailyInstallment: 0,
      weeklyInstallment: 0,
      monthlyInstallment: 0,
      outstandingDue: 0,
    },
    ledgerRows: [
      {
        date: '2026-10-28',
        savingsDeposit: 500,
        savingsWithdraw: 0,
        savingsProfit: 0,
        savingsClosingBalance: 8500,
        loanInstallmentNo: 0,
        loanCollected: 0,
        loanRemainingBalance: 0,
        officerSignature: 'করিম (সিল)',
      },
      {
        date: '2026-10-21',
        savingsDeposit: 500,
        savingsWithdraw: 0,
        savingsProfit: 0,
        savingsClosingBalance: 8000,
        loanInstallmentNo: 0,
        loanCollected: 0,
        loanRemainingBalance: 0,
        officerSignature: 'করিম (সিল)',
      },
    ],
  },
};

const toBengaliDigits = (val: string | number): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(val).replace(/[0-9]/g, (w) => bengaliDigits[+w]);
};

interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof Colors.light;
  formatMoney: (val: number) => string;
  formatNum: (val: number | string) => string;
  activeMember: PassbookData;
  membersList: PassbookData[];
  selectMemberByAccount: (accountNo: string) => boolean;
  setActiveMember: (m: PassbookData) => void;
  addPassbookEntry: (entry: {
    savingsDeposit?: number;
    savingsWithdraw?: number;
    loanCollected?: number;
    officerSignature?: string;
  }) => void;
  updateCoverInfo: (info: Partial<PassbookData>) => void;
  updateLoanTerms: (terms: Partial<PassbookData['loanTerms']>) => void;
}

const AppContext = createContext<AppContextType>({
  language: 'bn',
  toggleLanguage: () => {},
  setLanguage: () => {},
  theme: 'light',
  toggleTheme: () => {},
  colors: Colors.light,
  formatMoney: (val: number) => `৳${val}`,
  formatNum: (val: number | string) => String(val),
  activeMember: DEFAULT_MEMBER,
  membersList: Object.values(MOCK_MEMBERS),
  selectMemberByAccount: () => false,
  setActiveMember: () => {},
  addPassbookEntry: () => {},
  updateCoverInfo: () => {},
  updateLoanTerms: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('bn');
  const [theme, setTheme] = useState<Theme>('light');
  const [membersMap, setMembersMap] = useState<Record<string, PassbookData>>(MOCK_MEMBERS);
  const [activeMemberAccount, setActiveMemberAccount] = useState<string>('SM-2840-001');

  const activeMember = membersMap[activeMemberAccount] || DEFAULT_MEMBER;
  const membersList = Object.values(membersMap);

  const selectMemberByAccount = (acc: string): boolean => {
    const cleanAcc = acc.trim();
    if (membersMap[cleanAcc]) {
      setActiveMemberAccount(cleanAcc);
      return true;
    }
    const found = membersList.find(
      (m) =>
        m.accountNo.toLowerCase() === cleanAcc.toLowerCase() ||
        m.mobile.includes(cleanAcc) ||
        m.name.includes(cleanAcc)
    );
    if (found) {
      setActiveMemberAccount(found.accountNo);
      return true;
    }
    return false;
  };

  const setActiveMember = (m: PassbookData) => {
    setMembersMap((prev) => ({
      ...prev,
      [m.accountNo]: m,
    }));
    setActiveMemberAccount(m.accountNo);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'dark' ? Colors.dark : Colors.light;

  const formatMoney = (val: number) => {
    const formatted = Math.abs(val).toLocaleString('en-IN');
    const prefix = val < 0 ? '-৳' : '৳';
    if (language === 'bn') {
      return `${prefix}${toBengaliDigits(formatted)}`;
    }
    return `${prefix}${formatted}`;
  };

  const formatNum = (val: number | string) => {
    return language === 'bn' ? toBengaliDigits(val) : String(val);
  };

  // Add a new record directly into the passbook table
  const addPassbookEntry = (entry: {
    savingsDeposit?: number;
    savingsWithdraw?: number;
    loanCollected?: number;
    officerSignature?: string;
  }) => {
    setMembersMap((prevMap) => {
      const prev = prevMap[activeMemberAccount] || DEFAULT_MEMBER;
      const lastRow = prev.ledgerRows[0];
      const prevSavings = lastRow ? lastRow.savingsClosingBalance : 0;
      const prevLoanDue = lastRow ? lastRow.loanRemainingBalance : prev.loanTerms.loanAmount;
      const prevInstNo = lastRow ? lastRow.loanInstallmentNo : 0;

      const deposit = Number(entry.savingsDeposit) || 0;
      const withdraw = Number(entry.savingsWithdraw) || 0;
      const loanPaid = Number(entry.loanCollected) || 0;

      const newSavingsBalance = prevSavings + deposit - withdraw;
      const newLoanBalance = Math.max(0, prevLoanDue - loanPaid);
      const newInstNo = loanPaid > 0 ? prevInstNo + 1 : prevInstNo;

      const today = new Date().toISOString().split('T')[0];

      const newRow = {
        date: today,
        savingsDeposit: deposit,
        savingsWithdraw: withdraw,
        savingsProfit: 0,
        savingsClosingBalance: newSavingsBalance,
        loanInstallmentNo: newInstNo,
        loanCollected: loanPaid,
        loanRemainingBalance: newLoanBalance,
        officerSignature: entry.officerSignature || 'কর্মকর্তা (সিল)',
      };

      const updatedMember = {
        ...prev,
        loanTerms: {
          ...prev.loanTerms,
          outstandingDue: newLoanBalance,
        },
        ledgerRows: [newRow, ...prev.ledgerRows],
      };

      return {
        ...prevMap,
        [activeMemberAccount]: updatedMember,
      };
    });
  };

  const updateCoverInfo = (info: Partial<PassbookData>) => {
    setMembersMap((prevMap) => {
      const prev = prevMap[activeMemberAccount] || DEFAULT_MEMBER;
      return {
        ...prevMap,
        [activeMemberAccount]: {
          ...prev,
          ...info,
        },
      };
    });
  };

  const updateLoanTerms = (terms: Partial<PassbookData['loanTerms']>) => {
    setMembersMap((prevMap) => {
      const prev = prevMap[activeMemberAccount] || DEFAULT_MEMBER;
      return {
        ...prevMap,
        [activeMemberAccount]: {
          ...prev,
          loanTerms: {
            ...prev.loanTerms,
            ...terms,
          },
        },
      };
    });
  };

  return (
    <AppContext.Provider
      value={{
        language,
        toggleLanguage,
        setLanguage,
        theme,
        toggleTheme,
        colors,
        formatMoney,
        formatNum,
        activeMember,
        membersList,
        selectMemberByAccount,
        setActiveMember,
        addPassbookEntry,
        updateCoverInfo,
        updateLoanTerms,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
