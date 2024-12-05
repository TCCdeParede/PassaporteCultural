<<<<<<< HEAD
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { UserProvider } from "./src/UserContext"; // Importa o contexto do usuário
import Routes from "./src/routes"; // Importa suas rotas
=======
import React, { createContext, useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Routes from './src/routes';
>>>>>>> c10dd58275a0f305b76c85ee58450d8b2939faf0


// Contexto para o tema

export const ThemeContext = createContext<{ theme: string; setTheme: (theme: string) => void }>({
  theme: 'light',
  setTheme: () => {},
});

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>('light');

  // Carregar o tema salvo no AsyncStorage
  useEffect(() => {
<<<<<<< HEAD
    // Manter a splash screen visível até que a tela principal esteja pronta
    const prepare = async () => {
      try {
        // Aqui você pode adicionar qualquer lógica de inicialização (carregamento de dados, etc)
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Aguarda 3 segundos
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hide(); // Esconde a splash screen após o tempo configurado
=======
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
>>>>>>> c10dd58275a0f305b76c85ee58450d8b2939faf0
      }
    };
    loadTheme();
  }, []);

  // Atualizar AsyncStorage ao mudar o tema
  useEffect(() => {
    AsyncStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* Ajusta a barra de status dependendo do tema atual */}
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <Routes />
    </ThemeContext.Provider>
  );
};

export default App;
