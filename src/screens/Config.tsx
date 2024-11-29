import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, useColorScheme } from 'react-native';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const systemTheme = useColorScheme(); // Detecta o tema do sistema (light ou dark)
  const [theme, setTheme] = useState('system'); // Estado que armazena a escolha do tema
  const appVersion = '1.0.0'; // Versão do app

  useEffect(() => {
    // Carregar a preferência de tema armazenada
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        // Se não tiver uma preferência salva, use o tema do sistema
        setTheme(systemTheme);
      }
    };

    loadTheme();
  }, [systemTheme]);

  useEffect(() => {
    // Salvar a preferência de tema sempre que o usuário mudar
    const saveTheme = async () => {
      await AsyncStorage.setItem('theme', theme);
    };

    saveTheme();
  }, [theme]);

  const getCurrentTheme = () => {
    if (theme === 'system') {
      return systemTheme; // Usar o tema do sistema
    }
    return theme; // Usar o tema escolhido (light ou dark)
  };

  const currentTheme = getCurrentTheme();

  // Definindo as cores com base no tema atual
  const containerStyle = currentTheme === 'dark' ? styles.darkContainer : styles.lightContainer;

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Opções de Tema */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tema</Text>
        <View style={styles.radioButtonGroup}>
          {[{ value: 'system', label: 'Automático (sistema)' }, { value: 'light', label: 'Tema Claro' }, { value: 'dark', label: 'Tema Escuro' }]
            .map((option) => (
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
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  lightContainer: {
    backgroundColor: '#ead8b1',
  },
  section: {
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    color: '#fff',
  },
  linkText: {
    color: '#001f3f',
    fontSize: 18,
  },
});

export default SettingsScreen;
