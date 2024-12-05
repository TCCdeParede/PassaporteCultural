// src/routes/tab.routes.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import Foto from '../screens/Foto';
import Perfil from '../screens/Perfil';
import Config from '../screens/Config';
import EditarPerfil from '../screens/EditarPerfil';
import Registrar from '../screens/Registrar';
import LoginScreen from '../screens/login';
import CadastroAlunoScreen from '../screens/cadastro';
import Revisao from '../screens/revisao';
import { UserProvider } from '..//UserContext'; // Ajuste o caminho para o seu contexto

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffff',
        tabBarInactiveTintColor: '#3a6d8c',
        tabBarStyle: {
          position: 'absolute',
          height: 70,
          backgroundColor: '#001f3f',
          shadowRadius: 10,
          elevation: 5,
          alignItems: 'center',
          alignContent: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 14,
          paddingBottom: 5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="Foto"
        component={Foto}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Revisão"
        component={Revisao}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="clipboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Configurações"
        component={Config}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppRoutes() {
  return (
    <UserProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroAlunoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabRoutes"
          component={TabRoutes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditarPerfil"
          component={EditarPerfil}
          options={{
            title: 'Editar Perfil',
            headerShown: true,
            headerStyle: {
              backgroundColor: '#001f3f',
            },
            headerTintColor: '#FFF',
          }}
        />
        <Stack.Screen
          name="RegistrarVisita"
          component={Registrar}
          options={{
            title: 'Registrar Visita',
            headerShown: true,
            headerStyle: {
              backgroundColor: '#001f3f',
            },
            headerTintColor: '#FFF',
          }}
        />
      </Stack.Navigator>
    </UserProvider>
  );
}
