import React, { useState } from "react";
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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { setUser } = useUser(); // Acesse o contexto para salvar os dados do usuário

  async function handleLogin() {
    const data = new FormData();
    data.append("email", email);
    data.append("senha", password);

    try {
      const response = await fetch(
        "http://192.168.0.9/PassaporteCulturalSite/php/loginAluno.php",
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
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.CadText}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text>Primeira vez? Clique aqui para se cadastrar</Text>
      </TouchableOpacity>
      <Button title="Entrar" onPress={handleLogin} color={"#001f3f"} />
    </View>
  );
}

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
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "rgb(196, 221, 230)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  CadText: {
    justifyContent: "center",
    marginLeft: 25,
    marginBottom: 20,
  },
});
