import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../type';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

type RegistrarVisitaScreenProps = {
  route: RouteProp<RootStackParamList, 'RegistrarVisita'>;
};

export default function RegistrarVisitaScreen({ route }: RegistrarVisitaScreenProps) {
  const { photoUri, location } = route.params; // Primeira foto com localização
  const [selectedOption, setSelectedOption] = useState('');
  const [photos, setPhotos] = useState([
    {
      uri: photoUri,
      location,  // A localização é armazenada apenas para a primeira foto
      date: new Date().toLocaleString(), // Adicionando data e hora ao registrar a foto
    },
  ]); // Inicializando com a primeira foto que já tem a localização
  const navigation = useNavigation();

  const submitData = () => {
    console.log('Fotos:', photos);
    console.log('Selecionado:', selectedOption);

    navigation.goBack();
  };

  // Função para adicionar uma nova foto
  const addPhoto = async () => {
    if (photos.length >= 3) {
      alert('Você já atingiu o limite de 3 fotos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.75,
    });


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>A que local sua visita está atribuída?</Text>
      {photos[0].location && (
        <Text>Localização da primeira foto: Latitude {photos[0].location.latitude}, Longitude {photos[0].location.longitude}</Text>
      )}

      {/* Exibir as fotos com tamanho reduzido */}
      {photos.map((photo, index) => (
        <View key={index} style={styles.photoContainer}>
          <Image source={{ uri: photo.uri }} style={styles.image} />
          <Text style={styles.dateText}>Data: {photo.date}</Text>
          {photo.location && (
            <Text style={styles.locationText}>
              Localização: Latitude {photo.location.latitude}, Longitude {photo.location.longitude}
            </Text>
          )}
        </View>
      ))}

      {/* Adicionar mais fotos, até 3 */}
      <TouchableOpacity style={styles.addButton} onPress={addPhoto}>
        <Text style={styles.addButtonText}>Adicionar Foto</Text>
      </TouchableOpacity>

      <View>
        {['teatro', 'feira', 'cinema', 'museu', 'biblioteca'].map((option) => (
          <View key={option} style={styles.radioContainer}>
            <RadioButton
              value={option}
              status={selectedOption === option ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption(option)}
            />
            <Text>{option}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={submitData}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    flexGrow: 1, // Garante que o conteúdo ocupe toda a altura disponível
  },
  image: {
    width: 200, // Reduzindo a largura da imagem
    height: 150, // Reduzindo a altura da imagem
    borderRadius: 10,
    marginBottom: 15, // Dando um espaço entre as imagens
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  photoContainer: {
    alignItems: 'center', 
    marginBottom: 20,
  },
  dateText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E8EA',
    borderRadius: 25,
    width: 250,
    marginVertical: 5, // Dá espaço entre as opções
  },
  addButton: {
    backgroundColor: '#402E7A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#402E7A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
}