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
import { useUser } from "../UserContext"; // Importe o contexto
import { ThemeContext } from "../../App"; // Importe o contexto de tema

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { setUser } = useUser(); // Acesse o contexto para salvar os dados do usuário
  const { theme } = useContext(ThemeContext); // Acesse o tema atual

  async function handleLogin() {
    const data = new FormData();
    data.append("email", email);
    data.append("senha", password);

    try {
      const response = await fetch(
        "http:///PassaporteCulturalSite/php/loginAluno.php",
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
          pontos: responseData.pontos,
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
      <TouchableOpacity
        style={[
          styles.CadText,
          theme === "dark" ? styles.darkText : styles.lightText,
        ]}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text
          style={[
            styles.CadText,
            theme === "dark" ? styles.darkLink : styles.lightLink,
          ]}
        >
          Primeira vez? Clique aqui para se cadastrar
        </Text>
      </TouchableOpacity>
      <Button title="Entrar" onPress={handleLogin} color={theme === "dark" ? "#555" : "#001f3f"} />
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
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  lightInput: {
    backgroundColor: "rgb(196, 221, 230)", // Cor de fundo do input no modo claro
    color: "#000", // Cor do texto no input no modo claro (garante que o texto será preto)
  },
  darkInput: {
    backgroundColor: "#333", // Cor de fundo do input no modo escuro
    borderColor: "#444",
    color: "#fff", // Cor do texto no input no modo escuro
  },
  CadText: {
    justifyContent: "center",
    marginLeft: 25,
    marginBottom: 20,
  },
  lightLink: {
    color: "#000", // Link azul no modo claro
  },
  darkLink: {
    color: "#80D8FF", // Link azul claro no modo escuro
  },
});
