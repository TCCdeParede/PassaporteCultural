// ForgotPasswordScreen.tsx
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../App";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  async function handlePasswordReset() {
    const data = new FormData();
    data.append("email", email);

    try {
      const response = await fetch(
        "http://passaportecultural.rf.gd/php/redefinirSenhaAluno.php",
        {
          method: "POST",
          body: data,
        }
      );
      const responseData = await response.json();

      if (responseData.status === "success") {
        Alert.alert("Sucesso", responseData.message, [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      } else {
        Alert.alert("Erro", responseData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao tentar conectar com o servidor");
    }
  }

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
        Recuperar Senha
      </Text>
      <TextInput
        style={[
          styles.input,
          theme === "dark" ? styles.darkInput : styles.lightInput,
        ]}
        placeholder="Digite seu email"
        placeholderTextColor={theme === "dark" ? "#ccc" : "#333"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button
        title="Enviar"
        onPress={handlePasswordReset}
        color={theme === "dark" ? "#555" : "#001f3f"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  lightContainer: {
    backgroundColor: "#ead8b1",
  },
  darkContainer: {
    backgroundColor: "#001529",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  lightText: {
    color: "#000",
  },
  darkText: {
    color: "#fff",
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  lightInput: {
    backgroundColor: "rgb(196, 221, 230)",
    borderColor: "#000",
    color: "#000",
  },
  darkInput: {
    backgroundColor: "#333",
    borderColor: "#444",
    color: "#fff",
  },
});
