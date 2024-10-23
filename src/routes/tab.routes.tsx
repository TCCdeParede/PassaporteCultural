import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import Foto from '../screens/Foto';
import Perfil from '../screens/Perfil';
import Config from '../screens/Config';
import EditarPerfil from '../screens/EditarPerfil'; // Importando a tela EditarPerfil
import Registrar from '../screens/Registrar'; // Importando a tela EditarPerfil

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#402E7A',
        tabBarInactiveTintColor: '#808080',
        tabBarStyle: {
          position: 'absolute',
          height: 60,
          backgroundColor: '#E6E8EA',
          marginBottom: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 10 },
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
    <Stack.Navigator>
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
            backgroundColor: '#402E7A',
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
            backgroundColor: '#402E7A',
          },
          headerTintColor: '#FFF',
        }}
      />
    </Stack.Navigator>
  );
}
