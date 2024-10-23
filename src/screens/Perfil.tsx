import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const PerfilScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Substitua 'YOUR_UNSPLASH_ACCESS_KEY' pela sua chave de acesso do Unsplash
  const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY';

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get('https://picsum.photos/100');
        setProfileImage(response.request.responseURL); // Obtem a URL da imagem
      } catch (error) {
        console.error('Erro ao buscar imagem de perfil:', error);
      }
    };
    fetchProfileImage();
  }, []);

  return (
    <View style={styles.container}>
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ) : (
        <Image source={require('../../assets/DefaultUserIcon.png')} style={styles.profileImage} />
      )}
      <View style={styles.info}>
        <Text style={styles.name}>Nome do Aluno</Text>
        <Text style={styles.turma}>Turma: 3°DSB</Text>
        <Text style={styles.pontos}>Pontos: 150</Text>
      </View>

      <TouchableOpacity
        style={styles.EditarButton}
        onPress={() => navigation.navigate('EditarPerfil')}
      >
        <Text style={styles.EditarButtonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.SairButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.SairButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileImage: {
    width: 250,
    height: 250,
    borderRadius: 150,
    marginBottom: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  turma: {
    fontSize: 25,
    color: '#555',
    marginTop: 10,
  },
  pontos: {
    fontSize: 25,
    color: '#555',
    marginBottom: 20,
    marginTop: 10,
  },
  info: {
    backgroundColor: '#E6E8EA',
    width: 350,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 10,
  },
  EditarButton: {
    backgroundColor: '#402E7A',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  EditarButtonText: {
    color: '#FFF',
    textAlign: 'center',
    height: 20,
    width: 100,
  },
  SairButton: {
    backgroundColor: '#9B111E',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  SairButtonText: {
    color: '#FFF',
    textAlign: 'center',
    height: 20,
    width: 100,
  },
});

export default PerfilScreen;
