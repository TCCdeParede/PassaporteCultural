import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper'; // Instale a biblioteca se necessário
import { useNavigation } from '@react-navigation/native';

export default function PhotoReviewScreen({ route }) {
  const { photoUri } = route.params;
  const [selectedOption, setSelectedOption] = useState('');
  const navigation = useNavigation();

  const submitData = () => {
    // Aqui você pode enviar a foto e a seleção para o banco de dados
    console.log('Foto:', photoUri);
    console.log('Selecionado:', selectedOption);

    // Voltar para a tela de captura de foto
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.image} />
      <Text style={styles.title}>A que local sua visita está atribuida?</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E8EA',
    borderRadius: 25,
    width: 250,
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
