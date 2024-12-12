import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../App'; // Certifique-se de ajustar o caminho conforme necessário

const ConfigScreen: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState<string>(theme);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  const changeTheme = async (newTheme: string) => {
    setSelectedTheme(newTheme);
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <View
      style={[
        styles.container,
        selectedTheme === 'dark' ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <Text
        style={[
          styles.sectionTitle,
          selectedTheme === 'dark' ? styles.darkText : styles.lightText,
        ]}
      >
        Tema
      </Text>
      {['system', 'light', 'dark'].map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => changeTheme(option)}
          style={[
            styles.radioButtonContainer,
            selectedTheme === 'dark' ? styles.darkButton : styles.lightButton,
          ]}
        >
          <RadioButton
            value={option}
            status={selectedTheme === option ? 'checked' : 'unchecked'}
            uncheckedColor={selectedTheme === 'dark' ? '#FFF' : '#000'}
            color={selectedTheme === 'dark' ? '#FFF' : '#000'}
          />
          <Text
            style={[
              styles.radioText,
              selectedTheme === 'dark' ? styles.darkText : styles.lightText,
            ]}
          >
            {option === 'system' ? 'Automático' : option === 'light' ? 'Claro' : 'Escuro'}
          </Text>
        </TouchableOpacity>
      ))}

      <Text
        style={[
          styles.versionText,
          selectedTheme === 'dark' ? styles.darkText : styles.lightText,
        ]}
      >
        Versão do Aplicativo: 1.0.0
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#001529',
  },
  lightContainer: {
    backgroundColor: '#ead8b1',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 8,
    padding: 10,
  },
  darkButton: {
    backgroundColor: '#333',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lightButton: {
    backgroundColor: 'rgb(196, 221, 230)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
  },
  linkText: {
    marginTop: 20,
    fontSize: 16,
  },
  darkLink: {
    color: '#80D8FF',
  },
  lightLink: {
    color: '#007BFF',
  },
  versionText: {
    marginTop: 30,
    fontSize: 14,
  },
  darkText: {
    color: '#FFF',
  },
  lightText: {
    color: '#000',
  },
});

export default ConfigScreen;
