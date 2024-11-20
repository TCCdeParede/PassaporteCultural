import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

const SettingsScreen = () => {
  const [theme, setTheme] = useState('system'); // Pode ser 'system', 'light', ou 'dark'
  const appVersion = '1.0.0'; // Defina a versão do app

  return (
    <View style={styles.container}>
      {/* Opções de Tema */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tema</Text>
        <View style={styles.radioButtonGroup}>
          {[
            { value: 'system', label: 'Automático (sistema)' },
            { value: 'light', label: 'Tema Claro' },
            { value: 'dark', label: 'Tema Escuro' },
          ].map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.radioButtonContainer}
              onPress={() => setTheme(option.value)}
            >
              <RadioButton
                value={option.value}
                color="#001f3f"
                status={theme === option.value ? 'checked' : 'unchecked'}
                onPress={() => setTheme(option.value)}
              />
              <Text style={styles.radioText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Termos de Uso */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => Linking.openURL('https://seusite.com/termos')}>
          <Text style={styles.linkText}>Ler os Termos de Uso</Text>
        </TouchableOpacity>
      </View>

      {/* Versão do Aplicativo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Versão do Aplicativo</Text>
        <Text>{appVersion}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ead8b1",
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioButtonGroup: {
    flexDirection: 'column',
    backgroundColor: '#6a9ab0',
    borderRadius: 10,
    padding: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#6a9ab0',
    marginBottom: 10,
  },
  radioText: {
    marginLeft: 12,
    fontSize: 18,
    color: "#fff",
  },
  linkText: {
    color: '#001f3f',
    fontSize: 18,
  },
});

export default SettingsScreen;
