import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function FotoScreen() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const navigation = useNavigation();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>É necessário conceder permissão para acessar a câmera</Text>
        <Button onPress={requestPermission} title="Conceder Permissão"/>
      </View>
    );
  }

  const openCamera = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.75,
    };

    const result = await ImagePicker.launchCameraAsync(options);

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
      navigation.navigate('RegistrarVisita', { photoUri: result.assets[0].uri });
    }
  };

  return (
      <View style={styles.container}>
        <>
          <Text style={styles.title}>Tirar uma foto</Text>
          <View style={styles.reminderBox}>
            <Text style={styles.subtitle}>Lembre-se de:</Text>
            <Text style={styles.reminderText}>• Foto nítida</Text>
            <Text style={styles.reminderText}>• Facilidade de localizar onde está</Text>
            <Text style={styles.reminderText}>• Selecione corretamente o local de sua visita</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={openCamera} // Chamar a função que abre a câmera
            >
              <Text style={styles.buttonText}>Abrir Câmera</Text>
            </TouchableOpacity>
          </View>
        </>
        
        {/* A câmera será ativada ao pressionar o botão */}
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  reminderBox: {
    backgroundColor: '#E6E8EA',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reminderText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
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
