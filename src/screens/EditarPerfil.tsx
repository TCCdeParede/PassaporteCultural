import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'; // Para fazer requisição ao backend

const EditProfileScreen = () => {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null); // Permitir que seja null inicialmente

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setProfileImage(result.assets[0].uri); // Define a imagem escolhida
    }
  };

  const handleSave = async () => {
    try {
      // Lógica para salvar no banco de dados MySQL
      const formData = new FormData();
      formData.append('name', name);

      if (profileImage) {
        const uriParts = profileImage.split('.');
        const fileType = uriParts[uriParts.length - 1];
        
        formData.append('profileImage', {
          uri: profileImage,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await axios.post('http://seu-servidor.com/update-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        alert('Perfil atualizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      alert('Falha ao atualizar o perfil.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Exibe a imagem de perfil */}
      <View style={styles.imageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Image source={require('../../assets/DefaultUserIcon.png')} style={styles.profileImage} />
        )}
        <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
          <Text style={styles.editImageText}>Editar</Text>
        </TouchableOpacity>
      </View>

      {/* Atualizar Nome */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#402E7A',
    padding: 10,
    borderRadius: 20,
  },
  editImageText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    borderRadius: 50,
  },
  saveButton: {
    backgroundColor: '#402E7A',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
