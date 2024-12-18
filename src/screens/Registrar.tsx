import React, { useState, useContext } from "react";
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
import { ThemeContext } from "../../App"; // Importando o ThemeContext

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
  const { theme } = useContext(ThemeContext); // Obtendo o tema atual

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

    try {
      const response = await fetch(
        "http://passaportecultural.rf.gd/php/visita.php",
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
    if (photos.length >= 5) {
      Alert.alert(
        "Limite máximo atingido",
        "Você só pode adicionar até 5 fotos"
      );
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

  // Função para excluir uma foto
  const removePhoto = (uri: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.uri !== uri));
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        theme === "dark" ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <Text
        style={[
          styles.title,
          theme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        Fotos
      </Text>
      {photos.map((photo, index) => (
        <View key={index} style={styles.photoContainer}>
          <Image source={{ uri: photo.uri }} style={styles.image} />
          {photo.date && (
            <Text
              style={[
                styles.dateText,
                theme === "dark" ? styles.darkText : styles.lightText,
              ]}
            >
              Data: {photo.date}
            </Text>
          )}
          {/* Exibe o botão de excluir apenas para fotos após a primeira */}
          {index > 0 && (
            <TouchableOpacity
              style={[
                styles.removeButton,
                theme === "dark" && styles.darkButton,
              ]}
              onPress={() => removePhoto(photo.uri)}
            >
              <Text
                style={[
                  styles.removeButtonText,
                  theme === "dark" && styles.darkText,
                ]}
              >
                Excluir
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity
        style={[
          styles.addButton,
          theme === "dark" ? styles.darkButton : styles.lightButton,
        ]}
        onPress={addPhoto}
      >
        <Text style={styles.addButtonText}>Adicionar Foto</Text>
      </TouchableOpacity>
      <Text
        style={[
          styles.title,
          theme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        A que local sua visita está atribuída?
      </Text>
      <View
        style={[
          styles.radioContainer,
          theme === "dark"
            ? styles.darkRadioContainer
            : styles.lightRadioContainer,
        ]}
      >
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
              color={theme === "dark" ? "#fff" : "#001f3f"}
              uncheckedColor={theme === "dark" ? "#aaa" : "#555"} // Cor do ícone no estado não selecionado
              onPress={() => setSelectedOption(option)}
            />
            <Text
              style={[
                theme === "dark" ? styles.darkText : styles.lightText,
                selectedOption !== option
                  ? { color: theme === "dark" ? "#aaa" : "#555" }
                  : {},
              ]}
            >
              {option}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          !(photos.length >= 3 && selectedOption) && styles.buttonDisabled,
          theme === "dark" ? styles.darkButton : styles.lightButton,
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
  },
  lightContainer: {
    backgroundColor: "#ead8b1",
  },
  darkContainer: {
    backgroundColor: "#001529",
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  lightText: {
    color: "#000",
  },
  darkText: {
    color: "#fff",
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
  removeButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  radioContainer: {
    padding: 10,
    width: 350,
    height: 250,
    borderRadius: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lightRadioContainer: {
    backgroundColor: "rgb(196, 221, 230)",
  },
  darkRadioContainer: {
    backgroundColor: "rgb(70, 70, 70)",
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
  },
  buttonDisabled: {
    backgroundColor: "rgb(196, 221, 230)",
  },
  lightButton: {
    backgroundColor: "#001f3f",
  },
  darkButton: {
    backgroundColor: "#444",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
