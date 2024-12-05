import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { UserProvider } from "./src/UserContext"; // Importa o contexto do usuário
import Routes from "./src/routes"; // Importa suas rotas

export default function App() {
  useEffect(() => {
    // Manter a splash screen visível até que a tela principal esteja pronta
    const prepare = async () => {
      try {
        // Aqui você pode adicionar qualquer lógica de inicialização (carregamento de dados, etc)
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Aguarda 3 segundos
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hide(); // Esconde a splash screen após o tempo configurado
      }
    };

    prepare();

    // Impede a auto ocultação da splash screen
    SplashScreen.preventAutoHideAsync();
  }, []);

  return (
    <UserProvider>
      <StatusBar barStyle="dark-content" />
      <Routes />
    </UserProvider>
  );
}
