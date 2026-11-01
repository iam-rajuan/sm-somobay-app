import React from 'react';
import { Tabs } from 'expo-router';
import { LayoutDashboard, Receipt, BookOpen, ArrowLeft, Sun, Moon, Globe } from 'lucide-react-native';
import { TouchableOpacity, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../../context/AppContext';

export default function TabLayout() {
  const router = useRouter();
  const { language, toggleLanguage, theme, toggleTheme, colors } = useApp();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 62,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: colors.card,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 16,
          color: colors.text,
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.replace('/')}
            style={{ marginLeft: 16, padding: 4 }}
          >
            <ArrowLeft size={20} color={colors.text} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, gap: 10 }}>
            {/* Theme Toggle */}
            <TouchableOpacity onPress={toggleTheme} style={{ padding: 4 }}>
              {theme === 'dark' ? (
                <Sun size={18} color="#fbbf24" />
              ) : (
                <Moon size={18} color={colors.textSecondary} />
              )}
            </TouchableOpacity>

            {/* Language Toggle */}
            <TouchableOpacity
              onPress={toggleLanguage}
              style={{
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.cardMuted,
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: colors.primary }}>
                {language === 'bn' ? 'EN' : 'বাং'}
              </Text>
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: language === 'bn' ? 'মাঠকর্মী ড্যাশবোর্ড' : 'Field Dashboard',
          tabBarLabel: language === 'bn' ? 'হোম' : 'Home',
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          title: language === 'bn' ? 'দৈনিক আদায় এন্ট্রি' : 'Daily Collection',
          tabBarLabel: language === 'bn' ? 'আদায়' : 'Collection',
          tabBarIcon: ({ color, size }) => <Receipt size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: language === 'bn' ? 'সঞ্চয় ও ঋণের পাশ বই' : 'Digital Passbook',
          tabBarLabel: language === 'bn' ? 'পাশ বই' : 'Passbook',
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
