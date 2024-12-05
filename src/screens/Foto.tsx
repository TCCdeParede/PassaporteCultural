import React, { useContext } from "react";
import { useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { FotoScreenNavigationProp } from "../type";
import { useUser } from "../UserContext";
import { ThemeContext } from "../../App"; // Importa o contexto de tema

export default function FotoScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation<FotoScreenNavigationProp>();
  const { user } = useUser();
  const { theme } = useContext(ThemeContext); // Obtém o tema atual
  const isDarkMode = theme === "dark";

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
        <Text style={[styles.message, isDarkMode && styles.darkText]}>
          É necessário conceder permissão para acessar a câmera
        </Text>
        <Button
          onPress={requestPermission}
          title="Conceder Permissão"
          color={isDarkMode ? "#555" : "#001f3f"}
        />
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
      const locationPermission = await Location.requestForegroundPermissionsAsync();

      if (!locationPermission.granted) {
        alert("É necessário conceder permissão para acessar a localização");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      if (user) {
        navigation.navigate("RegistrarVisita", {
          photoUri: result.assets[0].uri,
          location: { latitude, longitude },
          date: new Date().toISOString(),
          rmalu: user.rm,
        });
      } else {
        alert("Usuário não autenticado. Faça login novamente.");
        navigation.navigate("Login");
      }
    }
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>Adicionar Visita</Text>
      <View style={[styles.reminderBox, isDarkMode && styles.darkReminderBox]}>
        <Text style={[styles.subtitle, isDarkMode && styles.darkText]}>Lembre-se de:</Text>
        <Text style={[styles.reminderText, isDarkMode && styles.darkText]}>• Foto nítida</Text>
        <Text style={[styles.reminderText, isDarkMode && styles.darkText]}>
          • Facilidade de localizar onde está
        </Text>
        <Text style={[styles.reminderText, isDarkMode && styles.darkText]}>• Selfie sua</Text>
        <Text style={[styles.reminderText, isDarkMode && styles.darkText]}>
          • Foto dentro da exposição
        </Text>
        <Text style={[styles.reminderText, isDarkMode && styles.darkText]}>
          • Foto dentro de um item da exposição
        </Text>
        <Text style={[styles.reminderText, isDarkMode && styles.darkText]}>
          • Selecione corretamente o local de sua visita
        </Text>
        <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={openCamera}>
          <Text style={styles.buttonText}>Abrir Câmera</Text>
        </TouchableOpacity>
      </View>
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
  lightContainer: {
    backgroundColor: "#ead8b1",
  },
  darkContainer: {
    backgroundColor: "#001529",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  reminderBox: {
    backgroundColor: "rgb(196, 221, 230)",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  darkReminderBox: {
    backgroundColor: "#333",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reminderText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#001f3f",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  darkButton: {
    backgroundColor: "#555",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  darkText: {
    color: "#FFF",
  },
});
