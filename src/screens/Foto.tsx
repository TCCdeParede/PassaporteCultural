import { useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { FotoScreenNavigationProp } from "../type"; // Importe os tipos de navegação

export default function FotoScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation<FotoScreenNavigationProp>(); // Aplicando o tipo de navegação

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          É necessário conceder permissão para acessar a câmera
        </Text>
        <Button onPress={requestPermission} title="Conceder Permissão" />
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
      const locationPermission =
        await Location.requestForegroundPermissionsAsync();

      if (!locationPermission.granted) {
        alert("É necessário conceder permissão para acessar a localização");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      // Redireciona para a tela `RegistrarVisita` com os dados da foto e localização
      navigation.navigate("RegistrarVisita", {
        photoUri: result.assets[0].uri,
        location: { latitude, longitude },
        date: new Date().toLocaleString(), // Adicionando data e hora
      });
    }
  };

  return (
    <View style={styles.container}>
      <>
        <Text style={styles.title}>Tirar uma foto</Text>
        <View style={styles.reminderBox}>
          <Text style={styles.subtitle}>Lembre-se de:</Text>
          <Text style={styles.reminderText}>• Foto nítida</Text>
          <Text style={styles.reminderText}>
            • Facilidade de localizar onde está
          </Text>
          <Text style={styles.reminderText}>
            • Selecione corretamente o local de sua visita
          </Text>
          <TouchableOpacity style={styles.button} onPress={openCamera}>
            <Text style={styles.buttonText}>Abrir Câmera</Text>
          </TouchableOpacity>
        </View>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  reminderBox: {
    backgroundColor: "#E6E8EA",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reminderText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  button: {
    backgroundColor: "#402E7A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
