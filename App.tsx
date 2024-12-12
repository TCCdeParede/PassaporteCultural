import React, { createContext, useState, useEffect } from "react";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Routes from "./src/routes";
import { UserProvider } from "./src/UserContext";

export const ThemeContext = createContext<{
  theme: string;
  setTheme: (theme: string) => void;
}>({
  theme: "light",
  setTheme: () => {},
});

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>("light");

  // Carregar o tema salvo no AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };
    loadTheme();
  }, []);

  // Atualizar AsyncStorage ao mudar o tema
  useEffect(() => {
    AsyncStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <UserProvider>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {/* Ajusta a barra de status dependendo do tema atual */}
        <StatusBar
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />
        <Routes />
      </ThemeContext.Provider>
    </UserProvider>
  );
};

export default App;
