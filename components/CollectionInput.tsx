import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface CollectionInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const CollectionInput: React.FC<CollectionInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '0',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.currencyPrefix}>৳</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 12,
    height: 44,
  },
  currencyPrefix: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16a34a',
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
});

