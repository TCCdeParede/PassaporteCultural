import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../UserContext";
import { ThemeContext } from "../../App";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { setUser } = useUser();
  const { theme } = useContext(ThemeContext);

  async function handleLogin() {
    const data = new FormData();
    data.append("email", email);
    data.append("senha", password);

    try {
      const response = await fetch(
        "http://192.168.1.107/PassaporteCulturalSite/php/loginAluno.php",
        {
          method: "POST",
          body: data,
        }
      );
      const responseData = await response.json();

      if (responseData.status === "success") {
        // Salvar os dados do aluno no contexto
        setUser({
          name: responseData.nome,
          turma: responseData.turma,
          pontMesGeral: responseData.pontMesGeral,
          pontAnoGeral: responseData.pontAnoGeral,
          pontMesComputado: responseData.pontMesComputado,
          pontAnoComputado: responseData.pontAnoComputado,
          rm: responseData.rm,
          foto: responseData.foto,
        });

        // Redirecionar para a tela principal
        navigation.navigate("TabRoutes");
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
        Login
      </Text>
      <TextInput
        style={[
          styles.input,
          theme === "dark" ? styles.darkInput : styles.lightInput,
        ]}
        placeholder="Email"
        placeholderTextColor={theme === "dark" ? "#ccc" : "#333"}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[
          styles.input,
          theme === "dark" ? styles.darkInput : styles.lightInput,
        ]}
        placeholder="Senha"
        placeholderTextColor={theme === "dark" ? "#ccc" : "#333"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text
          style={[
            styles.CadText,
            theme === "dark" ? styles.darkLink : styles.lightLink,
          ]}
        >
          Primeira vez? Clique aqui para se cadastrar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("RedefinirSenha")}>
        <Text
          style={[
            styles.CadText,
            theme === "dark" ? styles.darkLink : styles.lightLink,
          ]}
        >
          Esqueceu sua senha? Clique aqui
        </Text>
      </TouchableOpacity>
      <Button
        title="Entrar"
        onPress={handleLogin}
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
    marginTop: 15,
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
  CadText: {
    marginVertical: 10,
    textAlign: "center",
  },
  lightLink: {
    color: "#000",
  },
  darkLink: {
    color: "#80D8FF",
  },
});
