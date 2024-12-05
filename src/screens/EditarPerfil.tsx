import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useUser } from "../UserContext";
import { ThemeContext } from "../../App"; // Importando o contexto de tema

const EditProfileScreen = ({ navigation }: any) => {
  const { user, setUser } = useUser();
  const { theme } = useContext(ThemeContext); // Obtendo o tema atual
  const [name, setName] = useState(user?.name || "");
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.foto
      ? `http://192.168.0.9/PassaporteCulturalSite/${user.foto.replace(
          "../",
          ""
        )}`
      : null
  );

  useEffect(() => {
    if (user) {
      setName(user.name);
      setProfileImage(
        user.foto
          ? `http://192.168.0.9/PassaporteCulturalSite/${user.foto.replace(
              "../",
              ""
            )}`
          : null
      );
    }
  }, [user]);

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

  const handleSave = async () => {
    if (!user) {
      alert("Usuário não encontrado.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("rmalu", String(user.rm));
      formData.append("nomealu", name);

      if (profileImage && profileImage !== user.foto) {
        const uriParts = profileImage.split(".");
        const fileType = uriParts[uriParts.length - 1];
        formData.append("profileImage", {
          uri: profileImage,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await axios.post(
        "http:///PassaporteCulturalSite/php/updateperfil.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      if (response.data.message) {
        setUser({
          ...user,
          name,
          foto: response.data.fotoPath || user.foto,
        });
        alert("Perfil atualizado com sucesso!");
        navigation.goBack();
      } else {
        alert("Falha ao atualizar o perfil.");
      }
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Falha ao atualizar o perfil.");
    }
  };

  return (
    <View
      style={[
        styles.container,
        theme === "dark" ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require("../../assets/DefaultUserIcon.png")
          }
          style={styles.profileImage}
        />
        <TouchableOpacity
          style={[
            styles.editImageButton,
            theme === "dark" && styles.darkButton,
          ]}
          onPress={pickImage}
        >
          <Text
            style={[styles.editImageText, theme === "dark" && styles.darkText]}
          >
            Editar
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[
          styles.input,
          theme === "dark" ? styles.darkInput : styles.lightInput,
        ]}
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        style={[styles.saveButton, theme === "dark" && styles.darkButton]}
        onPress={handleSave}
      >
        <Text
          style={[styles.saveButtonText, theme === "dark" && styles.darkText]}
        >
          Salvar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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
  imageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  editImageButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#001f3f",
    padding: 10,
    borderRadius: 20,
  },
  darkButton: {
    backgroundColor: "#555",
  },
  editImageText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  darkText: {
    color: "#FFF",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    width: "100%",
    borderRadius: 50,
  },
  lightInput: {
    backgroundColor: "rgb(196, 221, 230)",
    borderColor: "#ccc",
  },
  darkInput: {
    backgroundColor: "#333",
    borderColor: "#444",
    color: "#FFF",
  },
  saveButton: {
    backgroundColor: "#001f3f",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
