import React, { useState } from "react";
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

const CadastroAlunoScreen = () => {
  const [rmalu, setRmalu] = useState("");
  const [nomealu, setNomealu] = useState("");
  const [emailalu, setEmailalu] = useState("");
  const [alusenha, setAlusenha] = useState("");
  const [nometur, setNometur] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null); // Armazena o URI da imagem
  const navigation = useNavigation();

  const pickImage = async () => {
    // Solicita permissões para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos da sua permissão para acessar a galeria!"
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true, // Inclui a imagem como base64 no retorno
        quality: 0.5, // Reduz qualidade para economizar armazenamento
      });

      if (!result.canceled) {
        const selectedImageUri = result.assets[0].uri; // Corrigido para o novo formato
        setImageUri(selectedImageUri);
      }
    } catch (error) {
      console.error("Erro ao abrir galeria: ", error);
    }
  };

  const handleSubmit = async () => {
    if (!rmalu || !nomealu || !emailalu || !alusenha || !nometur || !imageUri) {
      Alert.alert(
        "Erro",
        "Por favor, preencha todos os campos e selecione uma foto!"
      );
      return;
    }

    const formData = new FormData();
    formData.append("rmalu", rmalu);
    formData.append("nomealu", nomealu);
    formData.append("emailalu", emailalu);
    formData.append("alusenha", alusenha);
    formData.append("nometur", nometur);

    // Adiciona a imagem
    formData.append("fotoalu", {
      uri: imageUri,
      type: "image/jpeg",
      name: "foto.jpg",
    });

    try {
      const response = await axios.post(
        "http://192.168.1.105/PassaporteCulturalSite/php/cadAluno.php",
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
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>
      <TextInput
        placeholder="RM"
        value={rmalu}
        onChangeText={(text) => {
          // Verifica se o texto contém apenas números e se o comprimento é 5
          if (/^\d{0,5}$/.test(text)) {
            setRmalu(text);
          }
        }}
        keyboardType="numeric"
        maxLength={5}
        style={styles.input}
      />

      <TextInput
        placeholder="Nome"
        value={nomealu}
        onChangeText={setNomealu}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={emailalu}
        onChangeText={setEmailalu}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={alusenha}
        onChangeText={setAlusenha}
        secureTextEntry
        style={styles.input}
      />

      <Text style={styles.label}>Selecione a Turma</Text>
      <Picker
        selectedValue={nometur}
        onValueChange={setNometur}
        style={styles.input}
      >
        <Picker.Item label="3DSA" value="3DSA" />
        <Picker.Item label="3DSB" value="3DSB" />
        <Picker.Item label="3EAA" value="3EAA" />
        <Picker.Item label="3EAB" value="3EAB" />
      </Picker>

      {/* Se não houver imagem selecionada, exibe o botão */}
      {!imageUri && (
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Text style={styles.imagePickerText}>Selecionar Foto</Text>
        </TouchableOpacity>
      )}

      {/* Exibe a imagem e permite selecionar outra ao clicar nela */}
      {imageUri && (
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        </TouchableOpacity>
      )}

      <Button title="Cadastrar" onPress={handleSubmit} color={"#001f3f"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ead8b1",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "rgb(196, 221, 230)",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgb(196, 221, 230)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0056b3",
    alignSelf: "center",
    marginVertical: 5
  },
  imagePickerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 20,
    borderRadius: 50,
    alignSelf: "center",
  },
});

export default CadastroAlunoScreen;
