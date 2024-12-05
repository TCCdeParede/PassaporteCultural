import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";
import { ThemeContext } from "../../App"; // Importe o contexto de tema

const CadastroAlunoScreen = () => {
  const [rmalu, setRmalu] = useState("");
  const [nomealu, setNomealu] = useState("");
  const [emailalu, setEmailalu] = useState("");
  const [alusenha, setAlusenha] = useState("");
  const [nometur, setNometur] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext); // Acesse o tema atual

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos da sua permissão para acessar a galeria!");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
        quality: 0.5,
      });

      if (!result.canceled) {
        const selectedImageUri = result.assets[0].uri;
        setImageUri(selectedImageUri);
      }
    } catch (error) {
      console.error("Erro ao abrir galeria: ", error);
    }
  };

  const handleSubmit = async () => {
    if (!rmalu || !nomealu || !emailalu || !alusenha || !nometur || !imageUri) {
      Alert.alert("Erro", "Por favor, preencha todos os campos e selecione uma foto!");
      return;
    }

    const formData = new FormData();
    formData.append("rmalu", rmalu);
    formData.append("nomealu", nomealu);
    formData.append("emailalu", emailalu);
    formData.append("alusenha", alusenha);
    formData.append("nometur", nometur);
    formData.append("fotoalu", {
      uri: imageUri,
      type: "image/jpeg",
      name: "foto.jpg",
    });

    try {
      const response = await axios.post(
        "http:///PassaporteCulturalSite/php/cadAluno.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;
      if (data.message) {
        Alert.alert("Sucesso", data.message);
        navigation.navigate("Login");
      } else if (data.error) {
        Alert.alert("Erro", data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao cadastrar aluno!");
    }
  };

  return (
    <View
      style={[
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
        Cadastre-se
      </Text>
      <TextInput
        placeholder="RM"
        placeholderTextColor={theme === "dark" ? "#ccc" : "#333"}
        value={rmalu}
        onChangeText={(text) => {
          if (/^\d{0,5}$/.test(text)) {
            setRmalu(text);
          }
        }}
        keyboardType="numeric"
        maxLength={5}
        style={[
          styles.input,
          theme === "dark" ? styles.darkInput : styles.lightInput,
        ]}
      />

      <TextInput
        placeholder="Nome"
        placeholderTextColor={theme === "dark" ? "#ccc" : "#333"}
        value={nomealu}
        onChangeText={setNomealu}
        style={[
          styles.input,
          theme === "dark" ? styles.darkInput : styles.lightInput,
        ]}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor={theme === "dark" ? "#ccc" : "#333"}
        value={emailalu}
        onChangeText={setEmailalu}
        keyboardType="email-address"
        style={[
          styles.input,
          theme === "dark" ? styles.darkInput : styles.lightInput,
        ]}
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor={theme === "dark" ? "#ccc" : "#333"}
        value={alusenha}
        onChangeText={setAlusenha}
        secureTextEntry
        style={[
          styles.input,
          theme === "dark" ? styles.darkInput : styles.lightInput,
        ]}
      />

      <Text
        style={[
          styles.label,
          theme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        Selecione a Turma
      </Text>
      <Picker
        selectedValue={nometur}
        onValueChange={setNometur}
        style={[
          styles.input,
          theme === "dark" ? styles.darkInput : styles.lightInput,
        ]}
      >
        <Picker.Item label="3DSA" value="3DSA" />
        <Picker.Item label="3DSB" value="3DSB" />
        <Picker.Item label="3EAA" value="3EAA" />
        <Picker.Item label="3EAB" value="3EAB" />
        <Picker.Item label="2DSA" value="2DSA" />
        <Picker.Item label="2DSB" value="2DSB" />
        <Picker.Item label="2EAA" value="2EAA" />
        <Picker.Item label="2EAB" value="2EAB" />
        <Picker.Item label="1DSA" value="1DSA" />
        <Picker.Item label="1DSB" value="1DSB" />
        <Picker.Item label="1EAA" value="1EAA" />
        <Picker.Item label="1EAB" value="1EAB" />
      </Picker>

      {!imageUri && (
        <TouchableOpacity
          style={[
            styles.imagePicker,
            theme === "dark" ? styles.darkImagePicker : styles.lightImagePicker,
          ]}
          onPress={pickImage}
        >
          <Text
            style={[
              styles.imagePickerText,
              theme === "dark" ? styles.darkText : styles.lightText,
            ]}
          >
            Selecionar Foto
          </Text>
        </TouchableOpacity>
      )}

      {imageUri && (
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        </TouchableOpacity>
      )}

      <Button title="Cadastrar" onPress={handleSubmit} color={theme === "dark" ? "#555" : "#001f3f"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  lightContainer: {
    backgroundColor: "#ead8b1", // Cor de fundo no modo claro
  },
  darkContainer: {
    backgroundColor: "#001529", // Cor de fundo no modo escuro
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  lightText: {
    color: "#000", // Cor do texto no modo claro
  },
  darkText: {
    color: "#fff", // Cor do texto no modo escuro
  },
  input: {
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  lightInput: {
    backgroundColor: "rgb(196, 221, 230)", // Cor de fundo do input no modo claro
    color: "#000", // Cor do texto no input no modo claro
  },
  darkInput: {
    backgroundColor: "#333", // Cor de fundo do input no modo escuro
    borderColor: "#444",
    color: "#fff", // Cor do texto no input no modo escuro
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  imagePicker: {
    width: 120,  
    height: 120, 
    borderRadius: 60, 
    justifyContent: "center", 
    alignItems: "center", 
    borderWidth: 1,
    alignSelf: "center",
    marginVertical: 10, 
  },
  lightImagePicker: {
    backgroundColor: "rgb(196, 221, 230)",
    borderColor: "#0056b3",
  },
  darkImagePicker: {
    backgroundColor: "#444",
    borderColor: "#0056b3",
  },
  imagePickerText: {
    fontWeight: "bold",
    textAlign: "center",  
    fontSize: 14, 
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 20,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom:20,
  },
});

export default CadastroAlunoScreen;
