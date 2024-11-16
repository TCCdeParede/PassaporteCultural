import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  login: undefined;
  cadastro: undefined;
  FotoScreen: undefined; // A tela FotoScreen não precisa de parâmetros de entrada
  RegistrarVisita: {
    photoUri: string;
    location: {
      latitude: number;
      longitude: number;
    };
  };
};

export type FotoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FotoScreen'
>;

export type RegistrarVisitaRouteProp = RouteProp<RootStackParamList, 'RegistrarVisita'>;
