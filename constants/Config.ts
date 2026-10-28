import { Platform } from 'react-native';

/**
 * Android emulator uses 10.0.2.2 to access host machine localhost.
 * iOS simulator uses localhost.
 * For physical devices, set your local network IP (e.g., http://192.168.1.100:5000/api/v1).
 */
export const API_BASE_URL = Platform.select({
  android: 'http://10.0.2.2:5000/api/v1',
  ios: 'http://localhost:5000/api/v1',
  default: 'http://localhost:5000/api/v1',
});

export const APP_CONFIG = {
  name: 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ',
  englishName: 'S.M. Khudra Sanchay O Rindan Samabay Samity Limited',
  shortName: 'S.M. Somobay Somity (এস, এম)',
  registrationNo: 'ট-ক ২৮৪০/২১',
  headOffice: 'Elenga, Kalihati, Tangail, Bangladesh',
  passbookTitle: 'সঞ্চয় ও ঋণের পাশ বই',
  version: '1.0.0',
  currencySymbol: '৳',
};

