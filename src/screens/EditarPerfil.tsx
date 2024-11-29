import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useUser } from '../UserContext';

const EditProfileScreen = ({ navigation }: any) => {
  const { user, setUser } = useUser();
  const [name, setName] = useState(user?.name || '');
  const [profileImage, setProfileImage] = useState<string | null>(user?.foto || null);

  // Quando o usuário for alterado, atualizar os estados
  useEffect(() => {
    if (user) {
      setName(user.name);
      setProfileImage(user.foto);
    }
  }, [user]);

  // Função para escolher a nova foto
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Função para salvar as alterações no perfil
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('rmalu', String(user?.rm));
      formData.append('nomealu', name);

      if (profileImage) {
        // Preparar a imagem para envio
        const uriParts = profileImage.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('profileImage', {
          uri: profileImage,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await axios.post('http:///PassaporteCulturalSite/php/updateperfil.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message) {
        // Atualiza o usuário com a nova foto após sucesso
        setUser({
          ...user!,
          name,
          foto: response.data.fotoPath, // Caminho da nova foto retornado pelo servidor
        });
        alert('Perfil atualizado com sucesso!');
        navigation.goBack();
      } else {
        alert('Falha ao atualizar o perfil');
      }
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      alert('Falha ao atualizar o perfil.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {profileImage ? (
          <Image
            source={{
              uri: profileImage,
            }}
            style={styles.profileImage}
          />
        ) : (
          <Image source={require('../../assets/DefaultUserIcon.png')} style={styles.profileImage} />
        )}
        <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
          <Text style={styles.editImageText}>Editar</Text>
        </TouchableOpacity>
      </View>

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
    backgroundColor: '#ead8b1',
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
    backgroundColor: '#001f3f',
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
    backgroundColor: 'rgb(196, 221, 230)',
  },
  saveButton: {
    backgroundColor: '#001f3f',
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
