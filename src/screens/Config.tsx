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
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="system"
              status={theme === 'system' ? 'checked' : 'unchecked'}
              onPress={() => setTheme('system')}
            />
            <Text style={styles.radioText}>Automático (sistema)</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="light"
              status={theme === 'light' ? 'checked' : 'unchecked'}
              onPress={() => setTheme('light')}
            />
            <Text style={styles.radioText}>Tema Claro</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="dark"
              status={theme === 'dark' ? 'checked' : 'unchecked'}
              onPress={() => setTheme('dark')}
            />
            <Text style={styles.radioText}>Tema Escuro</Text>
          </View>
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
    backgroundColor: '#E6E8EA',
    borderRadius: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioText: {
    marginLeft: 12,
    fontSize: 18,
  },
  linkText: {
    color: 'blue',
    fontSize: 18,
  },
});

export default SettingsScreen;
