import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../type";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "../UserContext";
import * as FileSystem from "expo-file-system"; // Para manipulação de arquivos

type RegistrarVisitaScreenProps = {
  route: RouteProp<RootStackParamList, "RegistrarVisita">;
};

type Photo = {
  uri: string;
  location: { latitude: number; longitude: number } | null;
  date: string;
};

export default function RegistrarVisitaScreen({
  route,
}: RegistrarVisitaScreenProps) {
  const { photoUri, location } = route.params;
  const [selectedOption, setSelectedOption] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([
    {
      uri: photoUri,
      location,
      date: new Date().toLocaleString(),
    },
  ]);
  const { user } = useUser();
  const navigation = useNavigation();

  // Função para converter a imagem para base64
  const convertToBase64 = async (uri: string) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    } catch (error) {
      console.error("Erro ao converter a imagem para base64", error);
      return null;
    }
  };

  // Função para enviar os dados ao backend
  const submitData = async () => {
    if (!user) {
      Alert.alert("Erro", "Usuário não encontrado. Faça login novamente.");
      navigation.navigate("Login");
      return;
    }

    // Converter todas as imagens para base64
    const photosBase64 = await Promise.all(
      photos.map(async (photo) => ({
        uri: await convertToBase64(photo.uri), // Converte a imagem para base64
        location: photo.location,
        date: photo.date,
      }))
    );

    const data = {
      userId: user.rm, // Pegando o RM do usuário logado
      local: selectedOption,
      photos: photosBase64, // Passando as imagens codificadas em base64
      rev: "Pendente",
      rmprof: null,
    };

    console.log(
      "Dados enviados para o backend:",
      JSON.stringify(data, null, 2)
    );

    try {
      const response = await fetch(
        "http://192.168.18.5/PassaporteCulturalSite/php/visita.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const text = await response.text();
      console.log("Resposta do servidor:", text); // Log da resposta do servidor

      try {
        const result = JSON.parse(text);
        if (result.status === "success") {
          Alert.alert("Sucesso", "Visita registrada com sucesso!");
          navigation.navigate("Foto");
        } else {
          Alert.alert("Erro", result.message || "Erro ao enviar os dados.");
        }
      } catch (error) {
        console.error("Erro ao tentar fazer parse do JSON:", error);
        Alert.alert(
          "Erro",
          "Resposta inesperada do servidor. Tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };

  // Função para adicionar mais fotos
  const addPhoto = async () => {
    if (photos.length >= 3) {
      Alert.alert("Limite atingido", "Você já atingiu o limite de 3 fotos.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.75,
    });

    if (!result.canceled) {
      const newPhoto: Photo = {
        uri: result.assets[0].uri,
        location: null,
        date: new Date().toLocaleString(),
      };

      setPhotos((prev) => [...prev, newPhoto]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Fotos</Text>
      {photos.map((photo, index) => (
        <View key={index} style={styles.photoContainer}>
          <Image source={{ uri: photo.uri }} style={styles.image} />
          {index === 0 && photo.date && (
            <Text style={styles.dateText}>Data: {photo.date}</Text>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addPhoto}>
        <Text style={styles.addButtonText}>Adicionar Foto</Text>
      </TouchableOpacity>
      <Text style={styles.title}>A que local sua visita está atribuída?</Text>
      <View style={styles.radioContainer}>
        {[
          "Show",
          "Teatro",
          "Feira",
          "Centro Histórico",
          "Museu",
          "Visita Técnica",
          "Exposição",
          "Cinema",
          "Biblioteca",
          "Evento Esportivo",
        ].map((option) => (
          <View key={option} style={styles.radioButton}>
            <RadioButton
              value={option}
              status={selectedOption === option ? "checked" : "unchecked"}
              color="#001f3f"
              onPress={() => setSelectedOption(option)}
            />
            <Text>{option}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          !(photos.length >= 3 && selectedOption) && styles.buttonDisabled,
        ]}
        onPress={submitData}
        disabled={photos.length < 3 || !selectedOption}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "#ead8b1",
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  photoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateText: {
    fontSize: 14,
    color: "#111",
  },
  locationText: {
    fontSize: 14,
    color: "#111",
  },
  radioContainer: {
    backgroundColor: "rgb(196, 221, 230)",
    padding: 10,
    width: 350,
    height: 250,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  radioButton: {
    width: "45%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#001f3f",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#001f3f",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: "rgb(196, 221, 230)",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
