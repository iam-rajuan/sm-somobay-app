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
  name: 'Somity Management System',
  version: '1.0.0',
  currencySymbol: '৳',
};

