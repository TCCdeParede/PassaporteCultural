import React from 'react';
import { UserProvider } from './src/UserContext'; // Importa o contexto do usuário
import Routes from './src/routes'; // Importa suas rotas

export default function App() {
  return (
    // Envolvemos as rotas com o UserProvider
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}
